'use client';
import { useState, useEffect, useCallback } from 'react';
import { exportToPdf } from '@/lib/pdf-export';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft, Check, Download, Copy, RefreshCw, Save, Edit3, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── STEPS DATA ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'executive_clarity', icon: '◈', title: 'Executive Clarity', sub: 'Strategic Narrative & The Why',
    fields: [
      { key: 'companyName', label: 'Nome azienda / progetto', type: 'text', placeholder: 'Es. TechFlow S.r.l.', required: true },
      { key: 'sector', label: 'Settore di appartenenza', type: 'text', placeholder: 'Es. SaaS B2B, Food Tech, E-commerce...', required: true },
      { key: 'stage', label: 'Fase del progetto', type: 'select', required: true, options: ['Idea (pre-seed)', 'MVP / Prototipo', 'Early Stage (seed)', 'Growth Stage', 'Scale-up', 'Azienda consolidata'] },
      { key: 'strategicNarrative', label: 'Strategic Narrative (Il "Perché")', type: 'textarea', placeholder: 'Qual è la vision? Perché questa opportunità esiste ora? Qual è la vostra "North Star"?', required: true },
    ],
  },
  {
    id: 'problem_solution', icon: '◎', title: 'Problem & Solution Fit', sub: 'Value Proposition',
    fields: [
      { key: 'painPoints', label: 'Core Pain Points', type: 'textarea', placeholder: 'Quali sono i problemi reali, urgenti e monetizzabili che risolvi?', required: true },
      { key: 'solution', label: 'La Soluzione', type: 'textarea', placeholder: 'Come il tuo prodotto/servizio risolve questi problemi? Qual è la Value Prop?', required: true },
      { key: 'uniqueAdvantage', label: 'Unfair Advantage', type: 'textarea', placeholder: 'Perché voi? Qual è il vostro vantaggio difficilmente replicabile?', required: true },
    ],
  },
  {
    id: 'market_intelligence', icon: '◉', title: 'Market Intelligence', sub: 'TAM, SAM, SOM',
    fields: [
      { key: 'targetCustomer', label: 'Segmentazione Target (ICP)', type: 'textarea', placeholder: 'Definisci l\'Ideal Customer Profile con precisione analitica.', required: true },
      { key: 'marketSize', label: 'TAM, SAM, SOM stimati', type: 'text', placeholder: 'Es. TAM €5B, SAM €1B, SOM €50M (l\'AI approfondirà i dati)' },
      { key: 'marketTrends', label: 'Macro-Trend & Catalyst', type: 'textarea', placeholder: 'Quali trend di mercato o normativi stanno accelerando questa opportunità?', required: true },
    ],
  },
  {
    id: 'competition', icon: '◆', title: 'Competitive Landscape', sub: 'MECE Analysis',
    fields: [
      { key: 'mainCompetitors', label: 'Competitor Diretti & Indiretti', type: 'textarea', placeholder: 'Chi sono i player principali? Quali le soluzioni alternative?', required: true },
      { key: 'competitivePositioning', label: 'Posizionamento (vs Competitors)', type: 'textarea', placeholder: 'Come ti posizioni rispetto a loro su prezzo, qualità, UX, tecnologia?', required: true },
      { key: 'barriers', label: 'Barriere all\'ingresso', type: 'text', placeholder: 'Network effect, economie di scala, brevetti, IP proprietaria...' },
    ],
  },
  {
    id: 'business_model', icon: '◇', title: 'Business Model', sub: 'Revenue Engines',
    fields: [
      { key: 'revenueModel', label: 'Revenue Engines (Modelli di Ricavo)', type: 'select', required: true, options: ['B2B SaaS / Abbonamento', 'B2C Subscription', 'Marketplace / Commissioni', 'E-commerce / D2C', 'Enterprise Licensing', 'Freemium', 'Pay-per-use', 'Misto'] },
      { key: 'pricingStrategy', label: 'Pricing Strategy', type: 'textarea', placeholder: 'Come sono strutturati i prezzi e perché? (es. Value-based pricing, cost-plus...)', required: true },
      { key: 'unitEconomics', label: 'Unit Economics (Marginalità)', type: 'text', placeholder: 'Es. Margine lordo stimato 75%, payback period 6 mesi...' },
    ],
  },
  {
    id: 'gtm', icon: '◫', title: 'Go-To-Market Precision', sub: 'Acquisition & CAC',
    fields: [
      { key: 'channels', label: 'Canali di Acquisizione Primari', type: 'textarea', placeholder: 'Qual è il "playbook" di acquisizione? Inbound, Outbound, Partner?', required: true },
      { key: 'salesStrategy', label: 'Sales Motion', type: 'select', required: true, options: ['Product-Led Growth (PLG)', 'Sales-Led (Enterprise)', 'Inbound Marketing', 'Channel / Partnership', 'Performance Marketing (B2C)'] },
      { key: 'cacLtv', label: 'Target CAC & LTV', type: 'text', placeholder: 'Es. CAC target €200, LTV target €2000 (Rapporto 1:10)' },
    ],
  },
  {
    id: 'operating_model', icon: '◱', title: 'Operating Model', sub: 'Execution Plan',
    fields: [
      { key: 'operations', label: 'Struttura Operativa', type: 'textarea', placeholder: 'Come verrà erogato il valore? Qual è l\'infrastruttura necessaria?', required: true },
      { key: 'roadmap', label: 'Strategic Roadmap (12-18 mesi)', type: 'textarea', placeholder: 'Milestones principali, rilasci prodotto, aperture mercati...' },
      { key: 'kpis', label: 'Core KPIs (Metriche chiave)', type: 'text', placeholder: 'Es. MRR Growth, Churn Rate, NRR, DAU/MAU...' },
    ],
  },
  {
    id: 'management_team', icon: '◳', title: 'Management & Governance', sub: 'Leadership',
    fields: [
      { key: 'founders', label: 'Leadership Team', type: 'textarea', placeholder: 'Background dei founder, track record, domain expertise...', required: true },
      { key: 'hiringPlan', label: 'Talent Acquisition Plan', type: 'textarea', placeholder: 'Quali sono i ruoli chiave da assumere nei prossimi 12 mesi?' },
      { key: 'advisors', label: 'Advisors & Board', type: 'text', placeholder: 'Nomi o profili di advisor o membri del board strategici.' },
    ],
  },
  {
    id: 'financial_discipline', icon: '◰', title: 'Financial Discipline', sub: 'Proiezioni',
    fields: [
      { key: 'currentRevenue', label: 'Run Rate / Revenue attuale', type: 'text', placeholder: 'Es. €0 (pre-revenue) oppure €15K/mese MRR' },
      { key: 'revenueTarget', label: 'Proiezioni Finanziarie (Anno 1 - 3)', type: 'text', placeholder: 'Es. A1: €300K, A2: €1.2M, A3: €3.5M', required: true },
      { key: 'burnRate', label: 'Cash Burn Rate mensile previsto', type: 'text', placeholder: 'Es. Burn rate previsto: €25K/mese', required: true },
      { key: 'breakeven', label: 'Breakeven Point', type: 'text', placeholder: 'In che mese/anno è previsto il raggiungimento della profittabilità?' },
    ],
  },
  {
    id: 'capital_allocation', icon: '◲', title: 'Capital Allocation', sub: 'Ask & Exit',
    fields: [
      { key: 'fundingNeeded', label: 'The Ask (Capitale Richiesto)', type: 'text', placeholder: 'Es. €750.000 Seed round', required: true },
      { key: 'fundingUse', label: 'Use of Funds (Allocazione)', type: 'textarea', placeholder: 'Come sarà allocato il capitale in modo rigoroso? (Es. 40% R&D, 40% GTM, 20% OpEx)', required: true },
      { key: 'exitStrategy', label: 'Exit Strategy', type: 'select', options: ['M&A Strategica', 'IPO', 'Private Equity Buyout', 'Sostenibile / Dividendi'] },
    ],
  },
];

// ─── MARKDOWN RENDERER ───────────────────────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold mt-8 mb-3 pb-2 border-b-2 border-accent text-accent">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-sm font-bold mt-5 mb-2 text-gray-800 uppercase tracking-wider">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('| ')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('| ')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (!tableLines[0]) {
        i++;
        continue;
      }
      const headers = tableLines[0].split('|').filter(c => c.trim());
      const rows = tableLines.slice(2)?.map(r => r?.split('|')?.filter(c => c?.trim()))?.filter(r => r?.length > 0) || [];
      elements.push(
        <div key={`t${i}`} className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                {headers.map((h, j) => <th key={j} className="p-2 text-left font-semibold border border-border2 text-xs">{h.trim()}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, ci) => <td key={ci} className="p-2 border border-border2 text-gray-700 text-xs">{cell.trim()}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <p key={i} className="my-1 text-sm text-gray-600 pl-4 relative leading-relaxed">
          <span className="absolute left-0 text-gray-400 text-[10px] top-1">▸</span>
          {parseBold(line.replace(/^[-*]\s/, ''))}
        </p>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-sm text-gray-700 leading-relaxed my-1">
          {parseBold(line)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

function parseBold(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p?.startsWith('**') && p?.endsWith('**')
      ? <strong key={i} className="font-bold text-gray-900">{p.slice(2, -2)}</strong>
      : p
  );
}

// ─── MAIN WIZARD PAGE ────────────────────────────────────────────────────────
export default function WizardPage() {
  const [view, setView] = useState('wizard'); // wizard | generating | output
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [output, setOutput] = useState('');
  const [genProgress, setGenProgress] = useState(0);
  const [genStage, setGenStage] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [searchQueries, setSearchQueries] = useState([]);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOutput, setEditedOutput] = useState('');

  // Genera UUID utente e imposta cookie al mount
  useEffect(() => {
    let uid = document.cookie.match(/pf_uid=([^;]+)/)?.[1];
    if (!uid) {
      uid = crypto.randomUUID();
      document.cookie = `pf_uid=${uid}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgrade') === 'success') {
      setView('wizard');
    }

    // Auto-save load
    const savedData = localStorage.getItem('planforge_draft');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
        toast.info('Bozza recuperata automaticamente.');
      } catch (e) {}
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (Object.keys(data).length > 0 && view === 'wizard') {
      localStorage.setItem('planforge_draft', JSON.stringify(data));
    }
  }, [data, view]);

  const cur = STEPS[step];
  const reqFields = cur.fields.filter(f => f.required);
  const isValid = reqFields.every(f => data[f.key]?.trim?.());

  const handleChange = (key, val) => setData(d => ({ ...d, [key]: val }));

  const STAGES = [
    'Elaborazione dati inseriti...',
    'Ricerca dati di mercato con Google...',
    'Analisi competitor e benchmark...',
    'Modellazione proiezioni finanziarie...',
    'Redazione sezioni strategiche...',
    'Revisione e ottimizzazione finale...',
  ];

  const generate = useCallback(async () => {
    setView('generating');
    setGenProgress(5);

    let stageIdx = 0;
    setGenStage(STAGES[0]);

    const stageInterval = setInterval(() => {
      stageIdx = Math.min(stageIdx + 1, STAGES.length - 1);
      setGenStage(STAGES[stageIdx]);
    }, 8000);

    const progressInterval = setInterval(() => {
      setGenProgress(p => Math.min(p + 1.2, 88));
    }, 600);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: data }),
      });

      clearInterval(stageInterval);
      clearInterval(progressInterval);
      setGenProgress(95);

      const result = await res.json();

      if (res.status === 402 && result.error === 'UPGRADE_REQUIRED') {
        setShowUpgrade(true);
        setView('wizard');
        return;
      }

      if (!res.ok) {
        toast.error(result.error || 'Errore sconosciuto. Riprova.');
        setView('wizard');
        return;
      }

      setOutput(result.text || '');
      setEditedOutput(result.text || '');
      setSearchQueries(result.searchQueries || []);
      setGenProgress(100);
      localStorage.removeItem('planforge_draft'); // Clean draft
      setTimeout(() => setView('output'), 400);

    } catch (err) {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
      toast.error('Errore di connessione. Controlla la rete e riprova.');
      setView('wizard');
    }
  }, [data]);

  const wordCount = (editedOutput || '').split(/\s+/).filter(Boolean).length;

  // ─── VIEWS ────────────────────────────────────────────────────────────────

  if (view === 'generating') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-6 text-accent animate-pulse">◈</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Creazione in corso...</h2>
          <p className="text-sm text-gray-500 mb-8">{genStage}</p>

          <div className="h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${genProgress}%` }}
            />
          </div>

          <div className="text-left space-y-3 bg-white p-6 rounded-xl border border-border2">
            {STAGES.map((s, i) => {
              const idx = STAGES.indexOf(genStage);
              const isPast = i < idx;
              const isCurrent = i === idx;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex shrink-0 items-center justify-center text-[10px] ${
                    isPast ? 'bg-green-bg text-green' : isCurrent ? 'bg-accent text-white' : 'bg-gray-100 text-gray-300'
                  }`}>
                    {isPast ? <Check className="w-3 h-3" /> : isCurrent ? '·' : ''}
                  </div>
                  <span className={`text-sm ${isPast ? 'text-green' : isCurrent ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-gray-400 mt-8 flex items-center justify-center gap-2">
            <RefreshCw className="w-3 h-3 animate-spin" />
            L'AI sta cercando dati reali con Google Search · ~30-60 sec
          </p>
        </div>
      </div>
    );
  }

  if (view === 'output') {
    return (
      <div className="min-h-screen bg-bg2 pb-20">
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-border2 p-4">
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg truncate max-w-[200px]">{data.companyName}</span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-500">{wordCount.toLocaleString()} parole</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">
                    <X className="w-4 h-4 mr-2" /> Annulla
                  </Button>
                  <Button size="sm" onClick={() => { setOutput(editedOutput); setIsEditing(false); toast.success('Modifiche salvate'); }} className="w-full sm:w-auto">
                    <Save className="w-4 h-4 mr-2" /> Salva
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      setExportingPdf(true);
                      try {
                        await exportToPdf('plan-document', `business-plan-${(data.companyName || 'plan').replace(/\s+/g, '-').toLowerCase()}.pdf`);
                        toast.success('PDF scaricato!');
                      } catch (e) {
                        toast.error('Errore export PDF');
                      }
                      setExportingPdf(false);
                    }}
                    loading={exportingPdf}
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="w-4 h-4 mr-2" /> Export PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(output);
                      toast.success('Testo copiato!');
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copia
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> Modifica
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl p-4 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              ['Settore', data.sector],
              ['Fase', data.stage?.split(' ')[0]],
              ['Mercato', data.country],
              ['Modello', data.revenueModel?.split(' ')[0]],
            ].map(([l, v]) => (
              <div key={l} className="bg-white p-3 rounded-lg border border-border2 shadow-sm">
                <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">{l}</p>
                <p className="text-sm font-bold truncate">{v || '—'}</p>
              </div>
            ))}
          </div>

          {searchQueries.length > 0 && !isEditing && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 text-sm text-blue-800 flex gap-2 items-start">
              <Search className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong>Dati integrati da Google:</strong> {searchQueries.join(' · ')}
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="bg-white border border-border2 rounded-xl p-4 shadow-sm">
              <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
                <Edit3 className="w-4 h-4" /> Puoi modificare liberamente il Markdown prima di esportare.
              </div>
              <Textarea 
                value={editedOutput} 
                onChange={e => setEditedOutput(e.target.value)} 
                className="min-h-[60vh] font-mono text-sm"
              />
            </div>
          ) : (
            <div id="plan-document" className="bg-white border border-border2 rounded-xl p-8 md:p-12 shadow-sm">
              <h1 className="text-3xl font-extrabold mb-2 text-gray-900">
                Business Plan — {data.companyName}
              </h1>
              <p className="text-sm text-gray-500 pb-6 mb-8 border-b border-gray-100">
                {data.sector} · {data.country} · {new Date().toLocaleDateString('it-IT')} · Generato da PlanForge AI
              </p>
              <div className="prose max-w-none prose-sm">
                {renderMarkdown(output)}
              </div>
            </div>
          )}

          <div className="mt-8 bg-accent text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-lg mb-1">Vuoi piani illimitati e salvataggio in cloud?</p>
              <p className="text-gray-400 text-sm">Passa a PlanForge Pro per soli €19/mese e gestisci tutto dalla tua dashboard.</p>
            </div>
            <a href="/api/checkout">
              <Button className="bg-white text-accent hover:bg-gray-100 shrink-0 font-bold px-6">
                Passa a Pro →
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── WIZARD VIEW ──────────────────────────────────────────────────────────
  const progress = Math.round((step / STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-bg2 py-8">
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full animate-in fade-in zoom-in duration-200">
            <CardContent className="p-8 text-center">
              <div className="text-4xl text-accent mb-4">◈</div>
              <h2 className="text-2xl font-bold mb-3">Limite gratuito raggiunto</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Hai usato il tuo piano gratuito. Passa a Pro per generare piani illimitati, 
                esportare in PDF senza limiti e avere lo storico salvato.
              </p>
              <a href="/api/checkout" className="block w-full mb-3">
                <Button className="w-full font-bold h-12">Passa a Pro — €19/mese</Button>
              </a>
              <Button variant="ghost" className="w-full" onClick={() => setShowUpgrade(false)}>
                Annulla
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Tracker */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {STEPS.map((s, i) => {
              const isPast = i < step;
              const isCurrent = i === step;
              return (
                <button
                  key={s.id}
                  onClick={() => i <= step && setStep(i)}
                  disabled={i > step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPast || isCurrent 
                      ? 'bg-accent text-white shadow-md' 
                      : 'bg-white border border-border2 text-gray-400'
                  }`}
                >
                  {isPast ? <Check className="w-4 h-4" /> : i + 1}
                </button>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 shadow-sm border-border2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                    {cur.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{cur.title}</h2>
                    <p className="text-sm text-gray-500 font-medium">{cur.sub}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {cur.fields.map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        {f.label}
                        {!f.required && <span className="text-xs font-normal text-gray-400 ml-2">(opzionale)</span>}
                      </label>
                      {f.type === 'textarea' ? (
                        <Textarea
                          value={data[f.key] || ''}
                          onChange={e => handleChange(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="min-h-[100px] transition-all duration-200 focus:shadow-glow"
                        />
                      ) : f.type === 'select' ? (
                        <select 
                          value={data[f.key] || ''} 
                          onChange={e => handleChange(f.key, e.target.value)}
                          className="flex h-10 w-full rounded-md border border-border2 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 focus:shadow-glow"
                        >
                          <option value="">— Seleziona —</option>
                          {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <Input
                          type="text"
                          value={data[f.key] || ''}
                          onChange={e => handleChange(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="transition-all duration-200 focus:shadow-glow"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="w-32"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Indietro
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!isValid}
              className="w-32 font-bold"
            >
              Avanti <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={generate}
              disabled={!isValid}
              className="font-bold px-8 shadow-md"
            >
              Genera Piano ◈
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
