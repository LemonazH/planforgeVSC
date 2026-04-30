# PlanForge — Roadmap Sviluppo

## Analisi completata (sessione 1)

### Stack
- Next.js 14 (App Router) + Supabase + Gemini 2.5 Flash-Lite + Stripe + Zod v4
- Styling: tutto inline styles (~800+ righe), nessuna libreria UI
- Hosting target: Vercel

---

## PRIORITÀ 1 — Fix bug e inconsistenze

- [x] **Landing page dice "1 business plan"** ma il DB ha `plans_limit = 3` — allineato a "3 business plan"
- [x] **PDF Export promesso nella landing Pro** ma non implementato — aggiunto html2pdf.js + pulsante Export PDF in wizard output e dashboard
- [x] **Rate limiting in-memory** si resetta ad ogni redeploy Vercel — migrato a tabella Supabase `rate_limits`
- [x] **`cookies()` in `supabase-server.js`** va wrappato in `await cookies()` per Next.js 14+ — corretto, `getSupabaseServer()` ora è async
- [x] **`.env.example` contiene API key reali** (Gemini, Stripe) — ripulito con placeholder

## PRIORITÀ 2 — Refactoring architetturale

- [ ] **Estrarre componenti riutilizzabili**: Navbar, Button, Card, Input, Modal
- [ ] **Stili inline → CSS Modules o Tailwind** — ~800+ righe di `style={{...}}` sparsi
- [ ] **Wizard `page.jsx` (596 righe)** → scomporre in WizardForm, GeneratingView, OutputView, StepField
- [ ] **Dashboard `page.jsx` (235 righe)** → estrarre PlanCard, StatsCard, PlanViewer
- [ ] **Landing `page.jsx` (273 righe)** → estrarre Hero, Features, Pricing, FAQ, CTA

## PRIORITÀ 3 — Feature mancanti

- [ ] **PDF Export** — `@react-pdf/renderer` o `html2pdf.js` lato client
- [ ] **Auto-save wizard** — localStorage per draft + DB per Pro
- [ ] **Modifica post-generazione** — editor inline sul piano salvato (promesso nella landing Pro)

## PRIORITÀ 4 — UX e robustezza

- [ ] **Toast system** al posto di `alert()` nativi
- [ ] **Error boundaries** React
- [ ] **Loading skeletons** al posto di "Caricamento..."
- [ ] **Gestione redirect post-OAuth** migliorata

## PRIORITÀ 5 — Growth e SEO

- [ ] OG image dinamica per social sharing
- [ ] Sitemap.xml + robots.txt
- [ ] Analytics (generazioni, conversione, drop-off wizard)
- [ ] Email post-generazione con link al piano

## Note

- `.agents/` aggiunto al `.gitignore` — skill non pushate su GitHub/Vercel
- `BP-SaaS/` già nel `.gitignore` — repo di riferimento esterno
- Skill installate: `frontend-design` (anthropics), `find-skills` (vercel-labs)
