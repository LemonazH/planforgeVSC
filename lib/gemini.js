// lib/gemini.js
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `Sei un consulente strategico di livello mondiale specializzato in business plan.
Hai l'esperienza combinata di McKinsey, Goldman Sachs, KPMG e dei migliori studi di consulenza italiani.
Hai creato business plan per startup unicorn, PMI in crescita e grandi corporate.

REGOLE FONDAMENTALI:
1. Usa i dati forniti dall'utente come base strutturale
2. Integra SEMPRE dati di mercato reali cercati via Google (dimensioni mercato, CAGR, benchmark)
3. Fornisci analisi quantitative concrete con numeri specifici e stime motivate
4. Usa linguaggio professionale adatto a presentazioni a investitori istituzionali
5. Struttura il documento con sezioni chiare usando ## per h2 e ### per h3
6. Usa **grassetto** per dati e KPI chiave
7. Includi tabelle markdown per comparazioni (usa | separatore)
8. Include SEMPRE: Analisi SWOT, Competitive Intelligence, Metriche finanziarie (ARR/MRR/CAC/LTV/Churn/Burn/Runway)
9. Aggiungi raccomandazioni strategiche concrete e actionable alla fine
10. Fai riferimento a casi studio reali di aziende simili nel settore

STRUTTURA OUTPUT (segui questo ordine):
## 01. Executive Clarity (Strategic Narrative)
## 02. Problem & Solution Fit
## 03. Market Intelligence (TAM/SAM/SOM)
## 04. Competitive Landscape
## 05. Business Model & Pricing
## 06. Go-To-Market & Acquisition
## 07. Operating Model & Execution Plan
## 08. Management Team & Governance
## 09. Financial Discipline (Projections)
## 10. Capital Allocation & Ask
## 11. Analisi SWOT & Rischi
## 12. Raccomandazioni Strategiche

LINGUA: Italiano professionale. Lunghezza: minimo 2.800 parole.`;

export async function generateBusinessPlan(formData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY non configurata');

  const userPrompt = buildPrompt(formData);

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
    tools: [
      {
        google_search: {}, 
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 6144,
    },
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();

  const candidate = data.candidates?.[0];
  if (!candidate) throw new Error('Nessuna risposta ricevuta da Gemini');

  const text = candidate.content?.parts
    ?.filter(p => p.text)
    ?.map(p => p.text)
    ?.join('\\n') || '';

  if (!text) throw new Error('Risposta vuota da Gemini');

  const searchResults = candidate.groundingMetadata?.webSearchQueries || [];

  return { text, searchQueries: searchResults };
}

function buildPrompt(d) {
  return `Genera un business plan professionale completo e dettagliato.
Prima di scrivere, USA Google Search per trovare: dati di mercato aggiornati per il settore "${d.sector}", trend recenti, benchmark competitor e dati finanziari di aziende simili.

═══════════════════════════════════════════════
EXECUTIVE CLARITY
═══════════════════════════════════════════════
Azienda: ${d.companyName}
Settore: ${d.sector}
Fase: ${d.stage}
Strategic Narrative: ${d.strategicNarrative}

═══════════════════════════════════════════════
PROBLEM & SOLUTION FIT
═══════════════════════════════════════════════
Pain Points: ${d.painPoints}
Soluzione: ${d.solution}
Unfair Advantage: ${d.uniqueAdvantage}

═══════════════════════════════════════════════
MARKET INTELLIGENCE
═══════════════════════════════════════════════
Target Customer: ${d.targetCustomer}
Market Size: ${d.marketSize || 'Cerca con Google'}
Market Trends: ${d.marketTrends}

═══════════════════════════════════════════════
COMPETITION
═══════════════════════════════════════════════
Main Competitors: ${d.mainCompetitors}
Competitive Positioning: ${d.competitivePositioning}
Barriere: ${d.barriers || 'Da definire'}

═══════════════════════════════════════════════
BUSINESS MODEL
═══════════════════════════════════════════════
Revenue Model: ${d.revenueModel}
Pricing Strategy: ${d.pricingStrategy}
Unit Economics: ${d.unitEconomics || 'Da stimare'}

═══════════════════════════════════════════════
GO-TO-MARKET
═══════════════════════════════════════════════
Channels: ${d.channels}
Sales Strategy: ${d.salesStrategy}
CAC / LTV Target: ${d.cacLtv || 'Da stimare con benchmark'}

═══════════════════════════════════════════════
OPERATING MODEL
═══════════════════════════════════════════════
Operations: ${d.operations}
Roadmap: ${d.roadmap || 'Da definire'}
KPIs: ${d.kpis || 'Da definire'}

═══════════════════════════════════════════════
MANAGEMENT TEAM
═══════════════════════════════════════════════
Founders: ${d.founders}
Hiring Plan: ${d.hiringPlan || 'Nessuno indicato'}
Advisors: ${d.advisors || 'Nessuno indicato'}

═══════════════════════════════════════════════
FINANCIAL DISCIPLINE
═══════════════════════════════════════════════
Current Revenue: ${d.currentRevenue || 'Pre-revenue'}
Revenue Target: ${d.revenueTarget}
Burn Rate: ${d.burnRate}
Breakeven: ${d.breakeven || 'Da stimare'}

═══════════════════════════════════════════════
CAPITAL ALLOCATION
═══════════════════════════════════════════════
Funding Needed: ${d.fundingNeeded}
Use of Funds: ${d.fundingUse}
Exit Strategy: ${d.exitStrategy || 'Da definire'}

Ora crea il business plan completo seguendo la struttura indicata.`;
}
