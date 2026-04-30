'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function getUser() {
      const sb = getSupabaseBrowser();
      const { data } = await sb.auth.getUser();
      setUser(data.user);
    }
    getUser();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-border2 shadow-glass' : 'bg-transparent border-b border-transparent'}`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.span 
            className="text-2xl text-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >◈</motion.span>
          <span className="font-extrabold text-xl tracking-tighter text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent transition-all duration-500">PlanForge</span>
          <span className="text-[10px] px-2 py-0.5 rounded border-accent/20 bg-accent/10 text-accent font-bold tracking-widest uppercase shadow-glow">
            BETA
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <a href="/#pricing" className="text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-white transition-colors duration-200 hidden sm:block">Pricing</a>
              <Link href="/auth?redirect=/wizard">
                <Button size="sm" className="shadow-[0_0_20px_rgba(234,179,8,0.2)]">Inizia Ora</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-xs font-mono text-text-muted hidden sm:block opacity-70">{user.email}</span>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Hub Dashboard</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
