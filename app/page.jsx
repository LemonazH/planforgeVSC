'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, BarChart3, Target, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="py-20 md:py-28 bg-white border-b border-border2">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full bg-green-bg text-green border border-green-border mb-8 font-semibold">
            <span className="text-sm">✦</span> Gratis · Nessuna carta di credito richiesta
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Il tuo business plan<br />
            <span className="text-gray-500">professionale, in 12 minuti.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rispondi a 10 sezioni strutturate. L'AI analizza dati di mercato reali,
            benchmark di settore e genera un piano pronto per investitori, banche e partner.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/auth?redirect=/wizard">
              <Button size="lg" className="w-full sm:w-auto font-bold text-base px-8 h-14">
                Crea il tuo Business Plan <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#come-funziona">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium text-base h-14">
                Come funziona
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-400">Il piano gratuito include 3 business plan completi</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-6 bg-bg2 border-b border-border2">
        <div className="container mx-auto px-4 flex gap-3 flex-wrap justify-center">
          {['Startup & Founder', 'PMI in crescita', 'Studi di consulenza', 'Business angel', 'Commercialisti', 'Manager'].map(t => (
            <span key={t} className="text-xs px-4 py-1.5 rounded-full border border-border2 bg-white text-gray-600 font-medium">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="come-funziona" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Come funziona</h2>
            <p className="text-gray-500 text-lg">Tre passaggi per un business plan che vale migliaia di euro di consulenza</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, t: 'Compila il wizard', d: '10 sezioni strutturate guidano la raccolta di tutti i dati rilevanti per il tuo business.' },
              { icon: Search, t: 'AI analizza e ricerca', d: 'Gemini AI cerca dati di mercato reali, analizza competitor e benchmark di settore aggiornati.' },
              { icon: BarChart3, t: 'Ricevi il documento', d: 'Un business plan professionale completo, formattato e pronto per banche e investitori.' },
            ].map((f, i) => (
              <Card key={i} className="bg-bg2 border-border2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent text-white flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{f.t}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{f.d}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-bg2">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Semplice. Trasparente.</h2>
            <p className="text-gray-500 text-lg">Inizia gratis, passa al Pro quando ne hai bisogno</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* FREE */}
            <Card className="bg-white border-border2">
              <CardHeader className="pb-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Gratuito</p>
                <div className="text-5xl font-extrabold mb-2">€0</div>
                <p className="text-gray-500">Per sempre</p>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                {['3 business plan completi', 'Ricerca AI dati di mercato', 'Export copia testo', 'Tutte le 10 sezioni'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green" />
                    <span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link href="/auth?redirect=/wizard" className="w-full">
                  <Button variant="outline" className="w-full font-bold">Inizia gratis</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PRO */}
            <Card className="bg-white border-2 border-accent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                PIÙ POPOLARE
              </div>
              <CardHeader className="pb-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Pro</p>
                <div className="text-5xl font-extrabold mb-2">€19<span className="text-xl font-normal text-gray-500">/mese</span></div>
                <p className="text-gray-500">Fatturato annualmente</p>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                {[
                  'Piani illimitati', 'Export PDF professionale',
                  'Versioni multiple e revisioni', 'Personalizzazione branding',
                  'Supporto prioritario', 'Editor inline'
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green" />
                    <span className="text-gray-900 font-medium">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <a href="/api/checkout" className="w-full">
                  <Button className="w-full font-bold">Inizia il periodo di prova</Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Pronto a creare il tuo business plan?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Gratis, in 12 minuti, pronto per banche e investitori.
          </p>
          <Link href="/auth?redirect=/wizard">
            <Button size="lg" variant="secondary" className="font-bold px-8 h-14">
              Inizia ora — è gratis <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
