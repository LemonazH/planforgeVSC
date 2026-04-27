// lib/validation.js
// Schemi di validazione Zod per tutti gli input utente

import { z } from 'zod';

// Schema per il wizard - business plan generation
export const businessPlanSchema = z.object({
  // Step 1: Panoramica
  companyName: z.string().min(1, 'Nome azienda richiesto').max(100, 'Nome troppo lungo'),
  sector: z.string().min(1, 'Settore richiesto').max(100),
  stage: z.enum([
    'Idea (pre-seed)',
    'MVP / Prototipo',
    'Early Stage (seed)',
    'Growth Stage',
    'Scale-up',
    'Azienda consolidata'
  ]),
  country: z.string().min(1, 'Mercato principale richiesto').max(100),
  description: z.string().min(10, 'Descrizione troppo breve').max(2000),

  // Step 2: Vision & Mission
  vision: z.string().min(10, 'Vision troppo breve').max(1000),
  mission: z.string().min(10, 'Mission troppo breve').max(1000),
  values: z.string().max(500).optional(),
  uniqueAdvantage: z.string().min(10, 'USP troppo breve').max(1000),

  // Step 3: Analisi di Mercato
  targetCustomer: z.string().min(10, 'Target customer richiesto').max(1000),
  marketSize: z.string().max(200).optional(),
  painPoints: z.string().min(10, 'Pain points richiesti').max(1000),
  marketTrends: z.string().min(10, 'Trend di mercato richiesti').max(1000),
  geography: z.string().min(1, 'Geografie target richieste').max(200),

  // Step 4: Competizione
  mainCompetitors: z.string().min(5, 'Competitor richiesti').max(1000),
  indirectCompetitors: z.string().max(500).optional(),
  competitiveAdvantage: z.string().min(10, 'Vantaggio competitivo richiesto').max(1000),
  barriers: z.string().max(500).optional(),

  // Step 5: Prodotto
  productDescription: z.string().min(10, 'Descrizione prodotto richiesta').max(2000),
  revenueModel: z.enum([
    'Abbonamento SaaS',
    'Freemium + Upgrade',
    'Pay-per-use',
    'Licensing B2B',
    'Marketplace',
    'E-commerce prodotti fisici',
    'Servizi professionali',
    'Misto'
  ]),
  pricing: z.string().min(5, 'Strategia pricing richiesta').max(500),
  roadmap: z.string().max(1000).optional(),

  // Step 6: Marketing
  channels: z.string().min(10, 'Canali di acquisizione richiesti').max(1000),
  salesStrategy: z.enum([
    'Self-service (product-led)',
    'Inbound + SDR',
    'Enterprise sales',
    'Channel partners',
    'Retail / distribuzione',
    'Misto'
  ]),
  cac: z.string().max(200).optional(),
  ltv: z.string().max(200).optional(),
  marketingBudget: z.string().min(5, 'Budget marketing richiesto').max(200),

  // Step 7: Team
  founders: z.string().min(10, 'Info team richieste').max(1000),
  teamSize: z.enum([
    'Solo founder',
    '2-3 persone',
    '4-10 persone',
    '11-30 persone',
    '31-100 persone',
    '100+ persone'
  ]),
  hiringPlan: z.string().max(1000).optional(),
  keyPartners: z.string().max(500).optional(),

  // Step 8: Financials
  currentRevenue: z.string().max(200).optional(),
  revenueTarget: z.string().min(5, 'Target ricavi richiesto').max(500),
  fixedCosts: z.string().min(5, 'Costi fissi richiesti').max(500),
  margins: z.string().max(200).optional(),
  breakeven: z.string().max(200).optional(),

  // Step 9: Funding
  fundingNeeded: z.string().min(5, 'Capitale richiesto').max(500),
  fundingUse: z.string().min(10, 'Uso fondi richiesto').max(1000),
  fundingType: z.enum([
    'Equity (partecipazione)',
    'Prestito bancario',
    'Grant / Bando pubblico',
    'Revenue-based financing',
    'Crowdfunding',
    'Non cerco finanziamenti'
  ]),
  exitStrategy: z.enum([
    'Nessuna (crescita sostenibile)',
    'Acquisizione strategica',
    'IPO / Quotazione',
    'Management buyout',
    'Da definire'
  ]).optional(),

  // Step 10: Rischi
  mainRisks: z.string().min(10, 'Rischi principali richiesti').max(1000),
  mitigations: z.string().min(10, 'Mitigazioni richieste').max(1000),
  regulatoryIssues: z.string().max(500).optional(),
  additionalNotes: z.string().max(2000).optional(),
});

// Funzione di validazione sicura
export function validateBusinessPlan(data) {
  return businessPlanSchema.safeParse(data);
}

// Sanitizzazione input per prevenire injection
export function sanitizeForPrompt(text) {
  // Rimuovi potenziali marker di system prompt injection
  return text
    .replace(/\[\s*SYSTEM\s*\]/gi, '')
    .replace(/\[\s*INSTRUCTION\s*\]/gi, '')
 .replace(/\[\s*PROMPT\s*\]/gi, '')
    .replace(/<\s*system\s*>/gi, '')
    .replace(/<\s*instruction\s*>/gi, '')
    .replace(/<\s*\/?script\s*>/gi, '')
    .slice(0, 5000); // Limita lunghezza massima
}
