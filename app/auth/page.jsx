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
      <div className="absolute inset-0 bg-[#FAFAFA] opacity-50 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] bg-white border border-gray-200 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl text-gray-900">◈</span>
            <span className="font-semibold text-xl tracking-tight text-gray-900">PlanForge</span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error && <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">{error}</div>}
            {message && <div className="p-3 mb-6 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">{message}</div>}

            {mode === 'login' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Bentornato</h2>
                  <p className="text-sm text-gray-500">Accedi al tuo account PlanForge</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
                      <button type="button" onClick={() => setMode('forgot')} className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium">Password dimenticata?</button>
                    </div>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? 'Accesso in corso...' : 'Accedi'}
                  </Button>
                </form>

                <div className="relative my-8 text-center flex items-center justify-center">
                  <div className="absolute w-full border-t border-gray-200"></div>
                  <span className="relative bg-white px-4 text-xs font-medium text-gray-400 uppercase tracking-widest">oppure</span>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={handleGoogle}>Continua con Google</Button>
                  <Button variant="ghost" className="w-full" onClick={() => setMode('magic')}>Accedi senza password</Button>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-8">
                  Non hai un account?{' '}
                  <button onClick={() => setMode('signup')} className="text-gray-900 hover:underline font-semibold transition-colors">Registrati gratis</button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Inizia ora</h2>
                  <p className="text-sm text-gray-500">Gratis · 3 business plan inclusi</p>
                </div>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Nome completo</label>
                    <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Mario Rossi" required className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Password</label>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimo 8 caratteri" required minLength={8} className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? 'Creazione in corso...' : 'Crea account gratis'}
                  </Button>
                </form>

                <div className="relative my-8 text-center flex items-center justify-center">
                  <div className="absolute w-full border-t border-gray-200"></div>
                  <span className="relative bg-white px-4 text-xs font-medium text-gray-400 uppercase tracking-widest">oppure</span>
                </div>

                <Button variant="outline" className="w-full mb-6" onClick={handleGoogle}>Continua con Google</Button>
                
                <p className="text-center text-xs text-gray-400 mb-2">
                  Registrandoti accetti i nostri Termini di servizio.
                </p>
                <p className="text-center text-sm text-gray-500">
                  Hai già un account?{' '}
                  <button onClick={() => setMode('login')} className="text-gray-900 hover:underline font-semibold transition-colors">Accedi</button>
                </p>
              </>
            )}

            {mode === 'magic' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Link Magico</h2>
                  <p className="text-sm text-gray-500">Ricevi un link sicuro per accedere senza password.</p>
                </div>
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? 'Invio in corso...' : 'Invia link magico'}
                  </Button>
                </form>
                <div className="text-center mt-8">
                  <button onClick={() => setMode('login')} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    ← Torna al login
                  </button>
                </div>
              </>
            )}

            {mode === 'forgot' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Reset Password</h2>
                  <p className="text-sm text-gray-500">Un link per reimpostare la tua parola d&apos;ordine.</p>
                </div>
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className="bg-gray-50 border-gray-200 focus:border-gray-400 focus:ring-gray-200 text-gray-900 shadow-sm" />
                  </div>
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? 'Invio in corso...' : 'Invia link di reset'}
                  </Button>
                </form>
                <div className="text-center mt-8">
                  <button onClick={() => setMode('login')} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
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
