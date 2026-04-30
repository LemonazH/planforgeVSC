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
      {/* BG GLOW REMOVED FOR MORE SOBER LOOK */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* HERO */}
      <section className="py-24 md:py-36 relative border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="container mx-auto px-6 text-center max-w-4xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium border border-gray-200 mb-10 transition-colors hover:bg-gray-200">
            <span className="text-gray-900">✦</span> Accesso Gratuito · Nessuna Carta Richiesta
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight text-gray-900">
            Il tuo business plan professionale,<br />
            <span className="text-gray-500">pronto in 12 minuti.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rispondi a 10 sezioni strutturate. L&apos;AI analizza dati di mercato reali, benchmark di settore e genera un piano pronto per investitori, banche e partner.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/auth?redirect=/wizard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gray-900 text-white text-base hover:bg-gray-800">
                Crea il tuo Business Plan <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#come-funziona" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                Scopri come funziona
              </Button>
            </a>
          </motion.div>
          <motion.p variants={itemVariants} className="text-xs text-gray-500">Il piano gratuito include 3 business plan completi.</motion.p>
        </motion.div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex gap-3 flex-wrap justify-center"
          >
            {['Startup & Founder', 'Studi di Consulenza', 'Business Angel', 'PMI in Crescita', 'Commercialisti', 'Manager'].map((t, i) => (
              <span key={i} className="text-sm px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="come-funziona" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Processo Strutturato</h2>
            <p className="text-gray-500 text-lg">Tre passaggi per ottenere un documento di altissima qualità.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {[
              { icon: Target, t: 'Dati Mirati', d: 'Wizard guidato in 10 step che raccoglie esclusivamente i dati essenziali del tuo modello di business.' },
              { icon: Search, t: 'Analisi AI Reale', d: 'L&apos;Intelligenza Artificiale ricerca dati di mercato, parametri di settore e concorrenti.' },
              { icon: BarChart3, t: 'Piano Definitivo', d: 'Ricevi un documento completo, professionalmente formattato, ottimizzato per valutazioni tecniche e finanziarie.' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full bg-white border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                  <CardHeader>
                    <div className="w-10 h-10 rounded border border-gray-200 bg-gray-50 text-gray-800 flex items-center justify-center mb-4 transition-colors duration-300">
                      <f.icon className="w-5 h-5 opacity-80" />
                    </div>
                    <CardTitle className="text-lg font-medium text-gray-900">{f.t}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 leading-relaxed">{f.d}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-gray-50 border-t border-gray-200 relative">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Tariffazione Trasparente</h2>
            <p className="text-gray-500 text-lg">Strumenti professionali, senza sorprese.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE */}
            <Card className="bg-white border-gray-200 flex flex-col hover:border-gray-300 transition-colors relative shadow-sm">
              <CardHeader className="p-8 pb-6">
                <p className="text-sm font-medium text-gray-500 mb-2">Gratuito</p>
                <div className="text-5xl font-bold mb-2 text-gray-900">€0</div>
                <p className="text-gray-500 text-sm">Per sempre</p>
              </CardHeader>
              <CardContent className="flex-1 p-8 pt-0 space-y-4">
                {['3 business plan completi', 'Ricerca dati AI', 'Export testo', 'Tutte le 10 sezioni'].map((f, i) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Link href="/auth?redirect=/wizard" className="w-full">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-700">Inizia gratis</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PRO */}
            <Card className="bg-white border-gray-300 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute -top-3 right-6 bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
                Consigliato
              </div>
              <CardHeader className="p-8 pb-6 relative z-10">
                <p className="text-sm font-medium text-gray-900 mb-2">Pro</p>
                <div className="text-5xl font-bold mb-2 text-gray-900">€19<span className="text-xl font-normal text-gray-500">/mese</span></div>
                <p className="text-gray-500 text-sm">Fatturazione annuale</p>
              </CardHeader>
              <CardContent className="flex-1 p-8 pt-0 space-y-4 relative z-10">
                {[
                  'Piani illimitati', 'Export PDF professionale',
                  'Versioni multiple e revisioni', 'Personalizzazione brand',
                  'Supporto prioritario', 'Editor inline'
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gray-900" />
                    <span className="text-gray-700 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-8 pt-0 relative z-10">
                <a href="/api/checkout" className="w-full">
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">Inizia il periodo di prova</Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-gray-200 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">Pronto a validare il tuo progetto?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            12 minuti di tempo per un business plan professionale, strutturato per banche e investitori.
          </p>
          <Link href="/auth?redirect=/wizard">
            <Button size="lg" className="px-8 bg-gray-900 text-white hover:bg-gray-800">
              Inizia ora, è gratis <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
