import { z } from 'zod';

export const businessPlanSchema = z.object({
  // Step 1
  companyName: z.string().min(1, 'Nome richiesto'),
  sector: z.string().min(1, 'Settore richiesto'),
  stage: z.string().min(1, 'Stage richiesto'),
  strategicNarrative: z.string().min(1, 'Narrative richiesta'),
  
  // Step 2
  painPoints: z.string().min(1, 'Pain points richiesti'),
  solution: z.string().min(1, 'Solution richiesta'),
  uniqueAdvantage: z.string().min(1, 'Vantaggio richiesto'),
  
  // Step 3
  targetCustomer: z.string().min(1, 'Target customer richiesto'),
  marketSize: z.string().optional().transform(val => val ?? ''),
  marketTrends: z.string().min(1, 'Trend di mercato richiesti'),
  
  // Step 4
  mainCompetitors: z.string().min(1, 'Competitor richiesti'),
  competitivePositioning: z.string().min(1, 'Posizionamento richiesto'),
  barriers: z.string().optional().transform(val => val ?? ''),
  
  // Step 5
  revenueModel: z.string().min(1, 'Modello ricavi richiesto'),
  pricingStrategy: z.string().min(1, 'Pricing strategy richiesta'),
  unitEconomics: z.string().optional().transform(val => val ?? ''),
  
  // Step 6
  channels: z.string().min(1, 'Canali richiesti'),
  salesStrategy: z.string().min(1, 'Sales strategy richiesta'),
  cacLtv: z.string().optional().transform(val => val ?? ''),
  
  // Step 7
  operations: z.string().min(1, 'Operations richieste'),
  roadmap: z.string().optional().transform(val => val ?? ''),
  kpis: z.string().optional().transform(val => val ?? ''),
  
  // Step 8
  founders: z.string().min(1, 'Founders richiesti'),
  hiringPlan: z.string().optional().transform(val => val ?? ''),
  advisors: z.string().optional().transform(val => val ?? ''),
  
  // Step 9
  currentRevenue: z.string().optional().transform(val => val ?? ''),
  revenueTarget: z.string().min(1, 'Target ricavi richiesto'),
  burnRate: z.string().min(1, 'Burn rate richiesto'),
  breakeven: z.string().optional().transform(val => val ?? ''),
  
  // Step 10
  fundingNeeded: z.string().min(1, 'Fondi richiesti'),
  fundingUse: z.string().min(1, 'Uso fondi richiesto'),
  exitStrategy: z.string().optional().transform(val => val ?? ''),
});

export function validateBusinessPlan(data) {
  return businessPlanSchema.safeParse(data);
}

export function sanitizeForPrompt(text) {
  return text
    .replace(/\[\s*SYSTEM\s*\]/gi, '')
    .replace(/\[\s*INSTRUCTION\s*\]/gi, '')
    .replace(/\[\s*PROMPT\s*\]/gi, '')
    .replace(/<\s*system\s*>/gi, '')
    .replace(/<\s*instruction\s*>/gi, '')
    .replace(/<\s*\/?script\s*>/gi, '')
    .slice(0, 5000);
}
