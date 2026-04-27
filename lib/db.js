// lib/db.js
// Tutte le operazioni sul database in un unico posto
import { getSupabaseAdmin } from './supabase-server';

// Errori personalizzati per non esporre dettagli interni
class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'DatabaseError';
  }
}

// ─── PROFILO UTENTE ───────────────────────────────────────────────────────

export async function getProfile(userId) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('DB Error getProfile:', error);
    throw new DatabaseError('Profilo non trovato', 'PROFILE_NOT_FOUND');
  }
  return data;
}

export async function updateProfile(userId, updates) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) {
    console.error('DB Error updateProfile:', error);
    throw new DatabaseError('Aggiornamento profilo fallito', 'UPDATE_FAILED');
  }
  return data;
}

// ─── CONTROLLO PIANO & LIMITI ─────────────────────────────────────────────

export async function canGeneratePlan(userId) {
  const profile = await getProfile(userId);

  // Piano Pro attivo → illimitato
  if (profile.plan === 'pro' && profile.subscription_status === 'active') {
    const now = new Date();
    const endAt = profile.subscription_end_at ? new Date(profile.subscription_end_at) : null;
    if (!endAt || endAt > now) {
      return { allowed: true, isPro: true, used: profile.plans_used, limit: null };
    }
    // Abbonamento scaduto → declassa a free
    await updateProfile(userId, { plan: 'free', subscription_status: 'inactive' });
  }

  // Piano free → controlla limite
  const used = profile.plans_used;
  const limit = profile.plans_limit;
  return {
    allowed: used < limit,
    isPro: false,
    used,
    limit,
    remaining: Math.max(0, limit - used),
  };
}

export async function incrementPlanUsage(userId) {
  const sb = getSupabaseAdmin();
  const { error } = await sb.rpc('increment_plans_used', { user_id: userId });
  if (error) {
    // Fallback: update manuale se la RPC non esiste
    const profile = await getProfile(userId);
    await updateProfile(userId, { plans_used: (profile.plans_used || 0) + 1 });
  }
}

// ─── BUSINESS PLANS ───────────────────────────────────────────────────────

export async function savePlan({ userId, formData, outputText, searchQueries }) {
  const sb = getSupabaseAdmin();
  const wordCount = outputText.split(/\s+/).filter(Boolean).length;
  const { data, error } = await sb
    .from('business_plans')
    .insert({
      user_id: userId,
      title: `Business Plan — ${formData.companyName}`,
      company_name: formData.companyName,
      sector: formData.sector,
      stage: formData.stage,
      country: formData.country,
      form_data: formData,
      output_text: outputText,
      search_queries: searchQueries || [],
      word_count: wordCount,
    })
    .select()
    .single();
  if (error) {
    console.error('DB Error savePlan:', error);
    throw new DatabaseError('Salvataggio business plan fallito', 'SAVE_FAILED');
  }
  return data;
}

export async function getUserPlans(userId) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('business_plans')
    .select('id, title, company_name, sector, stage, country, word_count, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('DB Error getUserPlans:', error);
    throw new DatabaseError('Errore caricamento piani', 'LOAD_FAILED');
  }
  return data || [];
}

export async function getPlan(planId, userId) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('business_plans')
    .select('*')
    .eq('id', planId)
    .eq('user_id', userId)
    .single();
  if (error) {
    console.error('DB Error getPlan:', error);
    throw new DatabaseError('Business plan non trovato', 'PLAN_NOT_FOUND');
  }
  return data;
}

export async function deletePlan(planId, userId) {
  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from('business_plans')
    .delete()
    .eq('id', planId)
    .eq('user_id', userId);
  if (error) {
    console.error('DB Error deletePlan:', error);
    throw new DatabaseError('Eliminazione fallita', 'DELETE_FAILED');
  }
}

// ─── STRIPE / ABBONAMENTI ─────────────────────────────────────────────────

export async function getProfileByStripeCustomer(stripeCustomerId) {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();
  if (error) return null;
  return data;
}

export async function activateProSubscription({ userId, stripeCustomerId, stripeSubscriptionId, endAt }) {
  return updateProfile(userId, {
    plan: 'pro',
    stripe_customer_id: stripeCustomerId,
    stripe_subscription_id: stripeSubscriptionId,
    subscription_status: 'active',
    subscription_end_at: endAt,
  });
}

export async function cancelSubscription(stripeCustomerId) {
  const profile = await getProfileByStripeCustomer(stripeCustomerId);
  if (!profile) return;
  return updateProfile(profile.id, {
    subscription_status: 'canceled',
    // Non revocare subito: lascia accesso fino a subscription_end_at
  });
}
