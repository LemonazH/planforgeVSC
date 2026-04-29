# PlanForge — Roadmap Sviluppo

## Analisi completata (sessione 1)

### Stack
- Next.js 14 (App Router) + Supabase + Gemini 2.5 Flash-Lite + Stripe + Zod v4
- Styling: tutto inline styles (~800+ righe), nessuna libreria UI
- Hosting target: Vercel

---

## PRIORITÀ 1 — Fix bug e inconsistenze

- [ ] **Landing page dice "1 business plan"** ma il DB ha `plans_limit = 3` — allineare
- [ ] **PDF Export promesso nella landing Pro** ma non implementato — feature broken
- [ ] **Rate limiting in-memory** si resetta ad ogni redeploy Vercel — bypassabile. Soluzione: tabella Supabase o Upstash Redis
- [ ] **`cookies()` in `supabase-server.js`** va wrappato in `await cookies()` per Next.js 14+ — può dare errori
- [ ] **`.env.example` contiene API key reali** (Gemini, Stripe) — va ripulito

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
