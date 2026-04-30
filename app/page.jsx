'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, BarChart3, Target, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* HERO */}
      <section className="py-24 md:py-36 relative border-b border-border2 bg-bg/50 backdrop-blur-sm">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="container mx-auto px-6 text-center max-w-5xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-xs px-5 py-2 rounded-full bg-accent/10 text-accent font-bold uppercase tracking-widest border border-accent/20 mb-10 shadow-glow">
            <span className="animate-pulse">✦</span> Accesso Gratuito · Nessuna Carta Richiesta
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1] text-white">
            Un Business Plan<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-muted to-border2">Da Rockstar, in 12 Minuti.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-2xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            L'eccellenza dell'intelligenza artificiale forgia il tuo futuro. 10 step. Dati di mercato reali. Formattazione immacolata per investitori e board of directors.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/auth?redirect=/wizard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base h-16 rounded-xl shadow-glow-strong">
                FORGIA IL TUO PIANO <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <a href="#come-funziona" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-16 rounded-xl">
                SCOPRI L'ARSENALE
              </Button>
            </a>
          </motion.div>
          <motion.p variants={itemVariants} className="text-sm font-mono text-text-muted/60 uppercase tracking-wider">3 business plan completi nell'Ecosistema Gratuito</motion.p>
        </motion.div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-8 bg-bg3 border-b border-border2">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex gap-4 flex-wrap justify-center"
          >
            {['STARTUP & FOUNDER', 'EXECUTIVE', 'BUSINESS ANGEL', 'STUDI LEGALI', 'COMMERCIALISTI'].map((t, i) => (
              <span key={i} className="text-xs px-5 py-2 rounded border border-border2 bg-bg text-text-muted font-bold tracking-widest uppercase shadow-sm">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="come-funziona" className="py-32 bg-bg relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">DOMINA IL MERCATO</h2>
            <p className="text-text-muted text-xl font-light">L'infrastruttura definitiva che straccia migliaia di euro in consulenze.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: Target, t: 'ACQUISIZIONE DATI', d: 'Wizard chirurgico. 10 frammenti incisivi estratti dal tuo modello di business per addestrare il motore.' },
              { icon: Search, t: 'ANALISI PREDITTIVA', d: 'L\'Agente AI rastrella il web. Preleva benchmark. Valuta competitor. Sputa dati azionabili.' },
              { icon: BarChart3, t: 'FORGIATURA', d: 'Risultato: un master-document immacolato e feroce, ottimizzato per convincere board e VC.' },
            ].map((f, i) => (
              <Card key={i} className="bg-bg2/40 border-border2 hover:border-accent group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-bg border border-border2 text-text group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-500 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-glow">
                    <f.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl uppercase tracking-tighter">{f.t}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-text-muted/80">{f.d}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 bg-bg2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">IL COSTO DEL POTERE</h2>
            <p className="text-text-muted text-xl font-light">Nessun trucco. Scalabilità letale.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* FREE */}
            <Card className="bg-bg box-border hover:-translate-y-2 transition-transform duration-500">
              <CardHeader className="p-10 pb-8">
                <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Essenziale</p>
                <div className="text-7xl font-extrabold tracking-tighter mb-4 text-white">€0</div>
                <p className="text-text-muted font-mono uppercase text-sm tracking-wider">A vita</p>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-6">
                {['3 MASTER PLAN MENSILI', 'MOTORE RICERCA AI', 'TESTO GREZZO', 'L\'INTERA INFRASTRUTTURA'].map(f => (
                  <div key={f} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-text-muted" />
                    <span className="text-text-muted font-bold tracking-tight">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-10 pt-0">
                <Link href="/auth?redirect=/wizard" className="w-full">
                  <Button variant="secondary" className="w-full h-14 text-sm tracking-widest group">ACCEDI <ChevronRight className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/></Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PRO */}
            <Card className="bg-bg border-accent relative shadow-glow-strong hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-20 blur-3xl pointer-events-none"></div>
              
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-glow">
                L'ELITE
              </div>
              <CardHeader className="p-10 pb-8 relative z-10">
                <p className="text-sm font-bold text-accent uppercase tracking-widest mb-4">EXECUTIVE PRO</p>
                <div className="text-7xl font-extrabold tracking-tighter mb-4 text-white">€19<span className="text-2xl font-light text-text-muted tracking-normal">/mo</span></div>
                <p className="text-text-muted font-mono uppercase text-sm tracking-wider">Fatturato Ann.</p>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-6 relative z-10">
                {[
                  'ALL-ACCESS PASS', 'PDF VIP ESPORTAZIONE',
                  'STILI INCISIVI E REVISIONI', 'BRANDING BIANCO',
                  'CANALE SUPPORTO DIRETTO', 'DOMINIO ASSOLUTO'
                ].map(f => (
                  <div key={f} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <span className="text-white font-bold tracking-tight">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-10 pt-0 relative z-10">
                <a href="/api/checkout" className="w-full">
                  <Button className="w-full h-14 text-sm tracking-widest group shadow-glow">
                    AVVIA IL TRIAL <ChevronRight className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-bg border-t border-border2 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/[0.02] pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 uppercase text-white">Pronto A Incassare?</h2>
          <p className="text-text-muted text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light">
            In 12 minuti avrai in mano l'arma che sfonderà le porte del successo. Non aspettare.
          </p>
          <Link href="/auth?redirect=/wizard">
            <Button size="lg" className="h-16 px-10 text-base shadow-glow-strong">
              ACCENDI LA FORGIA — 100% GRATIS <ChevronRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
