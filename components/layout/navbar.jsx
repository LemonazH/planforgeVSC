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
            className="text-2xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >◈</motion.span>
          <span className="font-semibold text-lg tracking-tight text-white transition-colors duration-300">PlanForge</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded border-[#27272A] bg-[#18181B] text-gray-300 font-medium tracking-wide">
            BETA
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <a href="/#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">Prezzi</a>
              <Link href="/auth?redirect=/wizard">
                <Button size="sm">Inizia Ora</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-500 hidden sm:block">{user.email}</span>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
