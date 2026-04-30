'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const sb = getSupabaseBrowser();
      const { data } = await sb.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border2 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">◈</span>
          <span className="font-bold text-sm tracking-tight">PlanForge</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            BETA
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <a href="/#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block">Prezzi</a>
              <Link href="/auth?redirect=/wizard">
                <Button size="sm">Inizia gratis</Button>
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
    </nav>
  );
}
