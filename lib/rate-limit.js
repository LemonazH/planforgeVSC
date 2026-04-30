// lib/rate-limit.js
// Rate limiting basato su Supabase — persiste across redeploy Vercel
import { getSupabaseAdmin } from './supabase-server';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_REQUESTS_PRO = 30;

/**
 * Controlla se l'utente può effettuare una richiesta
 * @param {string} userId
 * @param {boolean} isPro
 * @returns {Promise<{ allowed: boolean, remaining: number, resetAt: Date, limit: number }>}
 */
export async function checkRateLimit(userId, isPro = false) {
  const sb = getSupabaseAdmin();
  const limit = isPro ? RATE_LIMIT_MAX_REQUESTS_PRO : RATE_LIMIT_MAX_REQUESTS;
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

  const { data: record } = await sb
    .from('rate_limits')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!record || new Date(record.window_start) < windowStart) {
    const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS);

    await sb
      .from('rate_limits')
      .upsert({
        user_id: userId,
        request_count: 1,
        window_start: now.toISOString(),
      }, { onConflict: 'user_id' });

    return { allowed: true, remaining: limit - 1, resetAt, limit };
  }

  if (record.request_count >= limit) {
    const resetAt = new Date(new Date(record.window_start).getTime() + RATE_LIMIT_WINDOW_MS);
    return { allowed: false, remaining: 0, resetAt, limit };
  }

  const { error } = await sb
    .from('rate_limits')
    .update({ request_count: record.request_count + 1 })
    .eq('user_id', userId);

  if (error) {
    console.error('Rate limit update error:', error);
  }

  const resetAt = new Date(new Date(record.window_start).getTime() + RATE_LIMIT_WINDOW_MS);
  return {
    allowed: true,
    remaining: limit - (record.request_count + 1),
    resetAt,
    limit,
  };
}

/**
 * Resetta il rate limit per un utente (utile dopo upgrade)
 * @param {string} userId
 */
export async function resetRateLimit(userId) {
  const sb = getSupabaseAdmin();
  await sb.from('rate_limits').delete().eq('user_id', userId);
}

/**
 * Pulizia record scaduti — chiamare periodicamente o via cron
 */
export async function cleanupRateLimitStore() {
  const sb = getSupabaseAdmin();
  const cutoff = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  await sb.from('rate_limits').delete().lt('window_start', cutoff);
}
