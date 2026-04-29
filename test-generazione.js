// Test completo di generazione business plan
// Uso: node test-generazione.js

// Dati di test per simulare un'azienda SaaS
const DATI_TEST = {
  // Panoramica
  companyName: "TechFlow S.r.l.",
  sector: "SaaS B2B - Workflow Automation",
  stage: "Early Stage (seed)",
  country: "Italia",
  description: "Piattaforma SaaS che automatizza i flussi di lavoro aziendali per PMI italiane. Integra AI per ottimizzare i processi ripetitivi e ridurre i tempi operativi del 40%.",

  // Vision & Mission
  vision: "Diventare il leader europeo nell'automazione dei processi aziendali per PMI, riducendo il carico burocratico di milioni di aziende entro il 2030.",
  mission: "Democratizzare l'automazione aziendale offrendo strumenti potenti ma semplici alle PMI italiane, permettendo loro di competere con le grandi imprese in termini di efficienza operativa.",
  values: "Innovazione, Semplicità, Trasparenza, Customer Success",
  uniqueAdvantage: "Unica piattaforma italiana con integrazione nativa di AI generativa + workflow automation + conformità GDPR out-of-the-box. Setup in 15 minuti vs settimane dei competitor.",

  // Mercato
  targetCustomer: "PMI italiane (10-250 dipendenti) nei settori: manifatturiero, logistica, servizi professionali. Decision maker: CEO, COO, Responsabili IT.",
  marketSize: "Mercato workflow automation Europa ~€12B, Italia ~€800M con CAGR 25%",
  painPoints: "Processi manuali lenti, errori umani nei data entry, mancanza di integrazione tra software esistenti, costi elevati di soluzioni enterprise",
  marketTrends: "Crescita 35% annuo AI enterprise, digitalizzazione PMI spinta da PNNR, aumento remote work richiede tool collaborativi",
  geography: "Italia 2025, Spagna e Germania 2026, Francia 2027",

  // Competizione
  mainCompetitors: "Zapier (leader globale ma costoso), Make (complesso), Microsoft Power Automate (richiede ecosistema MS), n8n (tecnico)",
  indirectCompetitors: "Excel + macro, consulenti processi manuali, software verticali legacy",
  competitiveAdvantage: "Prezzo 60% inferiore a Zapier, supporto in italiano, template pre-configurati per normativa italiana, integrazione con FattureInCloud e altri software locali",
  barriers: "Network effect crescente, dati proprietari su workflow ottimizzati per PMI italiane, certificazioni ISO 27001 e GDPR",

  // Prodotto
  productDescription: "Piattaforma no-code con: 1) Builder visuale workflow, 2) Libreria 200+ integrazioni, 3) AI assistant per suggerimenti ottimizzazione, 4) Analytics dashboard, 5) Mobile app per approvazioni",
  revenueModel: "Abbonamento SaaS",
  pricing: "Starter €49/mese (fino a 5 utenti), Professional €149/mese (fino a 20 utenti), Enterprise €499/mese (illimitato + supporto dedicato)",
  roadmap: "Q1 2025: Launch marketplace integrazioni italiane. Q2: AI predictive analytics. Q3: Mobile app v2. Q4: Espansione Spagna",

  // Marketing
  channels: "Content marketing (blog SEO), LinkedIn Ads, partnership con commercialisti, webinar gratuiti, referral program",
  salesStrategy: "Self-service (product-led)",
  cac: "~€180 per cliente B2B SME",
  ltv: "~€3.600 su 36 mesi (LTV/CAC = 20x)",
  marketingBudget: "€60K anno 1, €150K anno 2",

  // Team
  founders: "CEO Marco Rossi (ex McKinsey, 10 anni digital transformation), CTO Luca Bianchi (ex Google Zurich, ML specialist), CPO Giulia Verdi (ex Figma, product design)",
  teamSize: "4-10 persone",
  hiringPlan: "Q1: +2 full-stack dev, +1 customer success. Q2: +1 sales, +1 marketing. Q3: +2 dev, +1 solutions architect",
  keyPartners: "AWS (infrastruttura), Stripe (pagamenti), FattureInCloud (integrazione fatturazione), commercialisti partner",

  // Finanziari
  currentRevenue: "€12K MRR (150 clienti attivi)",
  revenueTarget: "Anno 1: €400K ARR · Anno 3: €3M ARR",
  fixedCosts: "Team €35K/mese, AWS €3K/mese, ufficio €2K/mese, software €1K/mese = €41K/mese totali",
  margins: "75% gross margin (tipico SaaS B2B)",
  breakeven: "Mese 22 con 850 clienti paganti",

  // Funding
  fundingNeeded: "€750.000 seed round",
  fundingUse: "50% sviluppo prodotto (team engineering), 30% marketing e vendite, 15% espansione internazionale, 5% legale e operativo",
  fundingType: "Equity (partecipazione)",
  exitStrategy: "Acquisizione strategica",

  // Rischi
  mainRisks: "1) Competitor globali riducono prezzi, 2) Adozione più lenta delle PMI italiane, 3) Problemi di scalabilità tecnica",
  mitigations: "1) Focus su nicchia italiana con localizzazione, 2) Programma onboarding gratuito, 3) Architettura cloud-native con auto-scaling",
  regulatoryIssues: "GDPR, ISO 27001 in corso",
  additionalNotes: "Primo cliente pilota: azienda manifatturiera con 120 dipendenti, ha ridotto tempi processi del 45%"
};

// Funzione per costruire il prompt (copiata da gemini.js)
function buildPrompt(d) {
  return `Genera un business plan professionale completo e dettagliato per l'azienda/progetto seguente. Prima di scrivere, USA Google Search per trovare: dati di mercato aggiornati, dimensioni TAM/SAM/SOM per il settore "${d.sector}", trend recenti, benchmark competitor e dati finanziari di aziende simili.

═══════════════════════════════════════════════
DATI AZIENDA
═══════════════════════════════════════════════
Nome: ${d.companyName}
Settore: ${d.sector}
Fase: ${d.stage}
Mercato principale: ${d.country}
Descrizione: ${d.description || 'Non fornita'}

═══════════════════════════════════════════════
IDENTITÀ STRATEGICA
═══════════════════════════════════════════════
Vision: ${d.vision || 'Da definire'}
Mission: ${d.mission || 'Da definire'}
Valori: ${d.values || 'Da definire'}
USP (Vantaggio competitivo unico): ${d.uniqueAdvantage || 'Da definire'}

═══════════════════════════════════════════════
MERCATO & CLIENTE
═══════════════════════════════════════════════
Cliente target: ${d.targetCustomer || 'Da definire'}
Dimensione mercato stimata: ${d.marketSize || 'Cerca con Google Search'}
Pain points principali: ${d.painPoints || 'Da definire'}
Trend di mercato: ${d.marketTrends || 'Cerca con Google Search'}
Geografie target: ${d.geography || d.country}

═══════════════════════════════════════════════
ANALISI COMPETITIVA
═══════════════════════════════════════════════
Competitor diretti: ${d.mainCompetitors || 'Da identificare con ricerca'}
Competitor indiretti: ${d.indirectCompetitors || 'Da identificare'}
Vantaggio vs competitor: ${d.competitiveAdvantage || 'Da definire'}
Barriere all'ingresso: ${d.barriers || 'Da definire'}

═══════════════════════════════════════════════
PRODOTTO / SERVIZIO
═══════════════════════════════════════════════
Descrizione prodotto: ${d.productDescription || 'Da definire'}
Modello di ricavo: ${d.revenueModel || 'Da definire'}
Pricing: ${d.pricing || 'Da definire'}
Roadmap 12 mesi: ${d.roadmap || 'Da definire'}

═══════════════════════════════════════════════
MARKETING & VENDITE
═══════════════════════════════════════════════
Canali acquisizione: ${d.channels || 'Da definire'}
Strategia vendita: ${d.salesStrategy || 'Da definire'}
CAC stimato: ${d.cac || 'Da stimare basandosi su benchmark di settore'}
LTV stimato: ${d.ltv || 'Da stimare'}

═══════════════════════════════════════════════
TEAM & OPERAZIONI
═══════════════════════════════════════════════
Founders: ${d.founders || 'Da definire'}
Team size: ${d.teamSize || 'Da definire'}
Piano assunzioni: ${d.hiringPlan || 'Da definire'}
Partner chiave: ${d.keyPartners || 'Da definire'}

═══════════════════════════════════════════════
PROIEZIONI FINANZIARIE
═══════════════════════════════════════════════
Revenue attuale: ${d.currentRevenue || 'Pre-revenue'}
Target ricavi: ${d.revenueTarget || 'Da definire'}
Costi fissi: ${d.fixedCosts || 'Da definire'}
Margine lordo: ${d.margins || 'Da stimare'}
Breakeven: ${d.breakeven || 'Da calcolare'}

═══════════════════════════════════════════════
FINANZIAMENTO
═══════════════════════════════════════════════
Capitale richiesto: ${d.fundingNeeded || 'Da definire'}
Uso fondi: ${d.fundingUse || 'Da definire'}
Tipo: ${d.fundingType || 'Da definire'}
Exit strategy: ${d.exitStrategy || 'Da definire'}

═══════════════════════════════════════════════
RISCHI & NOTE
═══════════════════════════════════════════════
Rischi principali: ${d.mainRisks || 'Da definire'}
Mitigazioni: ${d.mitigations || 'Da definire'}
Compliance: ${d.regulatoryIssues || 'Da definire'}
Note: ${d.additionalNotes || 'Nessuna'}`;
}

// System prompt (copiato da gemini.js)
const SYSTEM_PROMPT = `Sei un consulente strategico di livello mondiale specializzato in business plan. Hai l'esperienza combinata di McKinsey, Goldman Sachs, KPMG e dei migliori studi di consulenza italiani. Hai creato business plan per startup unicorn, PMI in crescita e grandi corporate.

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
## 01. Executive Summary
## 02. Vision, Mission & Valori
## 03. Analisi di Mercato (TAM/SAM/SOM)
## 04. Analisi Competitiva
## 05. Prodotto / Servizio
## 06. Strategia Go-to-Market
## 07. Piano Operativo & Team
## 08. Proiezioni Finanziarie
## 09. Struttura Finanziaria & Investimento
## 10. Analisi SWOT
## 11. Rischi & Mitigazioni
## 12. Raccomandazioni Strategiche

LINGUA: Italiano professionale. Lunghezza: minimo 2.800 parole.`;

async function generaBusinessPlanTest() {
  console.log('🚀 Avvio test generazione business plan...\n');
  console.log('📋 Dati di test:');
  console.log(`   Azienda: ${DATI_TEST.companyName}`);
  console.log(`   Settore: ${DATI_TEST.sector}`);
  console.log(`   Fase: ${DATI_TEST.stage}`);
  console.log(`   Funding: ${DATI_TEST.fundingNeeded}\n`);

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ ERRORE: Variabile GEMINI_API_KEY non trovata!');
    console.log('\n💡 Per risolvere:');
    console.log('   1. Crea un file .env.local nella cartella del progetto');
    console.log('   2. Aggiungi: GEMINI_API_KEY=la_tua_chiave_api');
    console.log('   3. Oppure esegui: set GEMINI_API_KEY=la_tua_chiave_api (Windows)');
    console.log('   4. Oppure: $env:GEMINI_API_KEY="la_tua_chiave_api" (PowerShell)');
    return;
  }

  const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const userPrompt = buildPrompt(DATI_TEST);

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

  console.log('⏳ Chiamata API Gemini in corso... (può richiedere 30-60 secondi)\n');

  try {
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

    if (!candidate) {
      throw new Error('Nessuna risposta ricevuta da Gemini');
    }

    const text = candidate.content?.parts
      ?.filter(p => p.text)
      ?.map(p => p.text)
      ?.join('\n') || '';

    if (!text) {
      throw new Error('Risposta vuota da Gemini');
    }

    const searchQueries = candidate.groundingMetadata?.webSearchQueries || [];

    // Output risultato
    console.log('='.repeat(80));
    console.log('✅ BUSINESS PLAN GENERATO CON SUCCESSO!');
    console.log('='.repeat(80));
    console.log(`\n📊 Lunghezza: ${text.length} caratteri (~${Math.round(text.length / 5)} parole)`);
    console.log(`🔍 Query di ricerca usate: ${searchQueries.length > 0 ? searchQueries.join(', ') : 'Nessuna'}\n`);

    console.log('='.repeat(80));
    console.log('📄 CONTENUTO DEL BUSINESS PLAN:');
    console.log('='.repeat(80));
    console.log('\n' + text);

    // Salva su file
    const fs = require('fs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `business-plan-test-${timestamp}.md`;

    fs.writeFileSync(filename, `# Business Plan - ${DATI_TEST.companyName}\n\n` +
      `**Settore:** ${DATI_TEST.sector}  \n` +
      `**Fase:** ${DATI_TEST.stage}  \n` +
      `**Generato:** ${new Date().toLocaleString('it-IT')}\n\n` +
      `---\n\n${text}`);

    console.log('\n' + '='.repeat(80));
    console.log(`💾 Business plan salvato in: ${filename}`);
    console.log('='.repeat(80));

  } catch (error) {
    console.error('\n❌ ERRORE durante la generazione:');
    console.error(error.message);

    if (error.message.includes('API key')) {
      console.log('\n💡 Verifica che la tua API key sia valida su: https://aistudio.google.com/app/apikey');
    }
  }
}

// Esegui
console.log('🧪 Test Generazione Business Plan');
console.log('=================================\n');
generaBusinessPlanTest();
