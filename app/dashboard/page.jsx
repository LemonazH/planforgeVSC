'use client';
import { useState, useEffect } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { exportToPdf } from '@/lib/pdf-export';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Copy, Download, Trash2, Plus, ChevronRight } from 'lucide-react';
import InteractiveBackground from '@/components/ui/interactive-bg';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    try {
      const sb = getSupabaseBrowser();
      const { data: { user } } = await sb.auth.getUser();
      if (!user) { router.push('/auth'); return; }
      setUser(user);

      const [profileRes, plansRes] = await Promise.all([
        sb.from('profiles').select('*').eq('id', user.id).single(),
        sb.from('business_plans')
          .select('id, title, company_name, sector, stage, country, word_count, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
      ]);

      setProfile(profileRes.data);
      setPlans(plansRes.data || []);
    } catch (err) {
      toast.error('Errore nel caricamento dei dati.');
    } finally {
      setLoading(false);
    }
  }

  async function loadPlanFull(planId) {
    const sb = getSupabaseBrowser();
    const { data, error } = await sb
      .from('business_plans')
      .select('*')
      .eq('id', planId)
      .single();
    
    if (error) {
      toast.error('Errore nel caricamento del piano.');
      return;
    }
    setActivePlan(data);
  }

  async function deletePlan(planId) {
    if (!confirm('Eliminare definitivamente questo business plan?')) return;
    const sb = getSupabaseBrowser();
    const { error } = await sb.from('business_plans').delete().eq('id', planId);
    
    if (error) {
      toast.error('Errore durante l\'eliminazione.');
      return;
    }
    
    setPlans(p => p.filter(x => x.id !== planId));
    if (activePlan?.id === planId) setActivePlan(null);
    toast.success('Business plan eliminato.');
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const isPro = profile?.plan === 'pro' && profile?.subscription_status === 'active';
  const usedFree = profile?.plans_used || 0;
  const limitFree = profile?.plans_limit || 3;

  // ─── PIANO APERTO ────────────────────────────────────────────────────────
  if (activePlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setActivePlan(null)} className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla Dashboard
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={async () => {
                setExportingPdf(true);
                try {
                  await exportToPdf('plan-document', `business-plan-${(activePlan.company_name || 'plan').replace(/\s+/g, '-').toLowerCase()}.pdf`);
                  toast.success('PDF esportato con successo!');
                } catch (e) {
                  toast.error('Errore esportazione PDF');
                }
                setExportingPdf(false);
              }}
              loading={exportingPdf}
            >
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(activePlan.output_text);
                toast.success('Testo copiato negli appunti!');
              }}
            >
              <Copy className="w-4 h-4 mr-2" /> Copia testo
            </Button>
            <Button
              variant="danger"
              onClick={() => deletePlan(activePlan.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Elimina
            </Button>
          </div>
        </div>

        <Card id="plan-document" className="p-8 md:p-12 shadow-sm border-border2">
          <h1 className="text-3xl font-extrabold mb-2">{activePlan.title}</h1>
          <p className="text-sm text-gray-500 pb-6 border-b border-gray-100 mb-8">
            {activePlan.sector} · {activePlan.country} · {new Date(activePlan.created_at).toLocaleDateString('it-IT')} · {activePlan.word_count?.toLocaleString()} parole
          </p>
          <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {activePlan.output_text}
          </div>
        </Card>
      </div>
    );
  }

  // ─── DASHBOARD PRINCIPALE ─────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className={isPro ? "bg-accent text-white" : ""}>
          <CardHeader className="p-5 pb-2">
            <CardDescription className={isPro ? "text-gray-300" : ""}>Piano attivo</CardDescription>
            <CardTitle className="text-2xl">{isPro ? '⭑ Pro' : 'Gratuito'}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            {!isPro && <a href="/api/checkout" className="text-sm text-blue-600 font-medium mt-1 inline-block hover:underline">Passa a Pro →</a>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5 pb-2">
            <CardDescription>Piani generati</CardDescription>
            <CardTitle className="text-2xl">{plans.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            {!isPro && <p className="text-sm text-gray-500">{usedFree}/{limitFree} free usati</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5 pb-2">
            <CardDescription>Ultimo piano</CardDescription>
            <CardTitle className="text-lg truncate">{plans[0]?.company_name || '—'}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-sm text-gray-500">{plans[0] ? new Date(plans[0].created_at).toLocaleDateString('it-IT') : ''}</p>
          </CardContent>
        </Card>

        <Link href="/wizard" className="group h-full flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-green-border bg-green-bg hover:bg-green-50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <p className="font-semibold text-green">Nuovo piano</p>
        </Link>
      </div>

      {/* Barra limiti free */}
      {!isPro && (
        <Card className="mb-8 border-border2">
          <CardContent className="p-6">
            <div className="flex justify-between items-end mb-3">
              <span className="font-semibold">Piano gratuito — utilizzo</span>
              <span className="text-sm text-gray-500">{usedFree} / {limitFree} piani</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${usedFree >= limitFree ? 'bg-red' : 'bg-accent'}`} 
                style={{ width: `${Math.min((usedFree / limitFree) * 100, 100)}%` }}
              />
            </div>
            {usedFree >= limitFree && (
              <p className="text-sm text-red mt-3">
                Limite raggiunto. <a href="/api/checkout" className="font-bold underline">Passa a Pro per continuare →</a>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <h2 className="text-xl font-bold mb-4">I tuoi business plan</h2>

      {plans.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-border2 rounded-xl bg-white">
          <div className="text-5xl text-gray-300 mb-4">◈</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessun business plan ancora</h3>
          <p className="text-gray-500 mb-6">Crea il tuo primo piano in 12 minuti.</p>
          <Link href="/wizard">
            <Button>Crea il primo piano <ChevronRight className="ml-2 w-4 h-4" /></Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map(plan => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{plan.company_name}</h3>
                  <p className="text-sm text-gray-500">
                    {plan.sector} · {plan.country} · {plan.word_count?.toLocaleString()} parole
                  </p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <p className="text-sm text-gray-400 hidden sm:block">
                    {new Date(plan.created_at).toLocaleDateString('it-IT')}
                  </p>
                  <div className="flex gap-2 flex-1 sm:flex-initial">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => loadPlanFull(plan.id)}>
                      Apri
                    </Button>
                    <Button variant="danger" size="icon" className="shrink-0" onClick={() => deletePlan(plan.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
