export function Footer() {
  return (
    <footer className="w-full py-12 relative overflow-hidden bg-bg border-t border-border2">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg3/50 pointer-events-none"></div>
      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-96 h-96 bg-accent opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-2xl text-accent/80">◈</span>
          <span className="font-extrabold uppercase tracking-tighter text-text-muted">PlanForge</span>
        </div>
        <p className="text-sm text-text-muted/60 uppercase tracking-widest font-mono">
          © {new Date().getFullYear()} · Engineered for the Bold
        </p>
      </div>
    </footer>
  );
}
