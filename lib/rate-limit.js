// lib/rate-limit.js
// Rate limiting semplice basato su memory store (per produzione usare Redis)

// Store in-memory: userId -> { count, resetTime }
const rateLimitStore = new Map();

// Configurazione
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 ora
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 richieste per ora per utente free
const RATE_LIMIT_MAX_REQUESTS_PRO = 30; // 30 per utenti pro

/**
 * Controlla se l'utente può effettuare una richiesta
 * Per produzione con più istanze, sostituire con Redis
 * @param {string} userId
 * @param {boolean} isPro
 * @returns {{ allowed: boolean, remaining: number, resetAt: Date, limit: number }}
 */
export function checkRateLimit(userId, isPro = false) {
  const now = Date.now();
  const limit = isPro ? RATE_LIMIT_MAX_REQUESTS_PRO : RATE_LIMIT_MAX_REQUESTS;
  
  const userRecord = rateLimitStore.get(userId);
  
  // Se non c'è record o è scaduto, crea nuovo
  if (!userRecord || userRecord.resetTime < now) {
    const resetAt = new Date(now + RATE_LIMIT_WINDOW_MS);
    rateLimitStore.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt,
      limit,
    };
  }
  
  // Record esistente, controlla limite
  if (userRecord.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(userRecord.resetTime),
      limit,
    };
  }
  
  // Incrementa contatore
  userRecord.count++;
  rateLimitStore.set(userId, userRecord);
  
  return {
    allowed: true,
    remaining: limit - userRecord.count,
    resetAt: new Date(userRecord.resetTime),
    limit,
  };
}

/**
 * Resetta il rate limit per un utente (utile dopo upgrade)
 * @param {string} userId
 */
export function resetRateLimit(userId) {
  rateLimitStore.delete(userId);
}

/**
 * Pulizia periodica dei record scaduti (chiamare ogni ora)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [userId, record] of rateLimitStore.entries()) {
    if (record.resetTime < now) {
      rateLimitStore.delete(userId);
    }
  }
}

// Pulizia automatica ogni ora
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, RATE_LIMIT_WINDOW_MS);
}
