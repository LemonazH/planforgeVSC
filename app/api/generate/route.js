// app/api/generate/route.js
import { NextResponse } from 'next/server';
import { generateBusinessPlan } from '@/lib/gemini';
import { getSupabaseServer } from '@/lib/supabase-server';
import { canGeneratePlan, incrementPlanUsage, savePlan } from '@/lib/db';
import { validateBusinessPlan, sanitizeForPrompt } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

export const maxDuration = 60;
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const sb = getSupabaseServer();
    const { data: { user }, error: authError } = await sb.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Devi essere loggato per generare un business plan.', redirect: '/auth' },
        { status: 401 }
      );
    }

    const access = await canGeneratePlan(user.id);
    if (!access.allowed) {
      return NextResponse.json(
        {
          error: 'UPGRADE_REQUIRED',
          message: `Hai usato tutti e ${access.limit} i tuoi piani gratuiti. Passa a Pro per continuare.`,
          used: access.used,
          limit: access.limit,
        },
        { status: 402 }
      );
    }

    // Rate limiting check
    const rateLimit = checkRateLimit(user.id, access.isPro);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: `Limite di richieste raggiunto. Riprova dopo ${rateLimit.resetAt.toLocaleTimeString()}.`,
          resetAt: rateLimit.resetAt,
          limit: rateLimit.limit,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { formData } = body;

    // Validazione input con Zod
    const validation = validateBusinessPlan(formData);
    if (!validation.success) {
      const errors = validation.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', message: 'Dati non validi', errors },
        { status: 400 }
      );
    }

    // Sanitizzazione dati prima di passarli all'AI
    const sanitizedData = Object.fromEntries(
      Object.entries(validation.data).map(([key, value]) => [
        key,
        typeof value === 'string' ? sanitizeForPrompt(value) : value,
      ])
    );

    const result = await generateBusinessPlan(sanitizedData);

    const savedPlan = await savePlan({
      userId: user.id,
      formData: sanitizedData,
      outputText: result.text,
      searchQueries: result.searchQueries,
    });

    if (!access.isPro) {
      await incrementPlanUsage(user.id);
    }

    return NextResponse.json({
      success: true,
      planId: savedPlan.id,
      text: result.text,
      searchQueries: result.searchQueries,
      isPro: access.isPro,
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite',
    });

  } catch (error) {
    console.error('Generate error:', error);
    if (error.message?.includes('quota')) {
      return NextResponse.json({ error: 'Limite AI raggiunto. Riprova tra qualche ora.' }, { status: 503 });
    }
    return NextResponse.json({ error: error.message || 'Errore nella generazione. Riprova.' }, { status: 500 });
  }
}
