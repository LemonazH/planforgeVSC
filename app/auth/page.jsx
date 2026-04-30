'use client';
import { useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'magic' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const reset = () => { setError(''); setMessage(''); };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); reset();
    const sb = getSupabaseBrowser();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push('/dashboard');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); reset();
    const sb = getSupabaseBrowser();
    const { error } = await sb.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setMessage('Controlla la tua email per confermare l\'account!');
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true); reset();
    const sb = getSupabaseBrowser();
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setMessage(`Link di accesso inviato a ${email}!`);
  };

  const handleGoogle = async () => {
    setLoading(true);
    const sb = getSupabaseBrowser();
    await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true); reset();
    const sb = getSupabaseBrowser();
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setMessage('Email di reset inviata! Controlla la casella di posta.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] bg-gradient-to-b from-[#121214] to-[#0A0A0A] border border-[#27272A] rounded-2xl p-8 shadow-glass relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl text-white/80">◈</span>
            <span className="font-semibold text-xl tracking-tight text-white">PlanForge</span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {error && <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">{error}</div>}
            {message && <div className="p-3 mb-6 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">{message}</div>}

            {mode === 'login' && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">Bentornato</h2>
                <p className="text-sm text-gray-400 mb-8 text-center">Accedi al tuo account PlanForge</p>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-medium text-gray-400">Password</label>
                      <button type="button" onClick={() => setMode('forgot')} className="text-xs text-gray-500 hover:text-white transition-colors">Password dimenticata?</button>
                    </div>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <Button type="submit" className="w-full mt-2" disabled={loading}>
                    {loading ? 'Accesso in corso...' : 'Accedi'}
                  </Button>
                </form>

                <div className="relative my-8 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#27272A]"></div></div>
                  <span className="relative bg-[#0E0E10] px-3 text-xs text-gray-500 uppercase tracking-wider">oppure</span>
                </div>

                <div className="space-y-3">
                  <Button variant="secondary" className="w-full" onClick={handleGoogle}>Continua con Google</Button>
                  <Button variant="outline" className="w-full" onClick={() => setMode('magic')}>Accedi senza password</Button>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-8">
                  Non hai un account?{' '}
                  <button onClick={() => setMode('signup')} className="text-white hover:text-gray-300 font-medium transition-colors">Registrati gratis</button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">Inizia ora</h2>
                <p className="text-sm text-gray-400 mb-8 text-center">Gratis · 3 business plan inclusi</p>
                <form onSubmit={handleSignup} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Nome completo</label>
                    <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Mario Rossi" required className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Password</label>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimo 8 caratteri" required minLength={8} className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <Button type="submit" className="w-full mt-2" disabled={loading}>
                    {loading ? 'Creazione in corso...' : 'Crea account gratis'}
                  </Button>
                </form>

                <div className="relative my-8 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#27272A]"></div></div>
                  <span className="relative bg-[#0E0E10] px-3 text-xs text-gray-500 uppercase tracking-wider">oppure</span>
                </div>

                <Button variant="secondary" className="w-full mb-6" onClick={handleGoogle}>Continua con Google</Button>
                
                <p className="text-center text-xs text-gray-600 mb-4">
                  Registrandoti accetti i nostri Termini di servizio.
                </p>
                <p className="text-center text-sm text-gray-500">
                  Hai già un account?{' '}
                  <button onClick={() => setMode('login')} className="text-white hover:text-gray-300 font-medium transition-colors">Accedi</button>
                </p>
              </>
            )}

            {mode === 'magic' && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">Link Magico</h2>
                <p className="text-sm text-gray-400 mb-8 text-center">Ricevi un link di accesso sicuro senza digitare la password.</p>
                <form onSubmit={handleMagicLink} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <Button type="submit" className="w-full mt-2" disabled={loading}>
                    {loading ? 'Invio in corso...' : 'Invia link magico'}
                  </Button>
                </form>
                <div className="text-center mt-8">
                  <button onClick={() => setMode('login')} className="text-sm text-gray-500 hover:text-white transition-colors">
                    ← Torna al login
                  </button>
                </div>
              </>
            )}

            {mode === 'forgot' && (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">Reset Password</h2>
                <p className="text-sm text-gray-400 mb-8 text-center">Un link per reimpostare la tua parola d'ordine.</p>
                <form onSubmit={handleForgot} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-[#050505] border-[#27272A] focus:border-gray-500 text-white" />
                  </div>
                  <Button type="submit" className="w-full mt-2" disabled={loading}>
                    {loading ? 'Invio in corso...' : 'Invia link di reset'}
                  </Button>
                </form>
                <div className="text-center mt-8">
                  <button onClick={() => setMode('login')} className="text-sm text-gray-500 hover:text-white transition-colors">
                    ← Torna al login
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
