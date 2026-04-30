import { Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: 'PlanForge — Business Plan AI Professionale',
  description: 'Crea business plan professionali in minuti grazie all\'AI. Analisi di mercato reale, proiezioni finanziarie, pronto per investitori e banche.',
  keywords: 'business plan, AI, professionale, startup, PMI, investitori',
  openGraph: {
    title: 'PlanForge — Business Plan AI',
    description: 'Crea business plan professionali con l\'AI in 12 minuti.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className="dark selection:bg-accent selection:text-black">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fill='%23EAB308' font-size='90'>◈</text></svg>" />
      </head>
      <body className={`${outfit.className} flex flex-col min-h-screen bg-bg text-text`}>
        <Toaster position="bottom-right" theme="dark" toastOptions={{ style: { background: '#111111', border: '1px solid #27272A', color: '#FAFAFA' } }} />
        <Navbar />
        <main className="flex-1 w-full flex flex-col mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
