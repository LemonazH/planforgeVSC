export function Footer() {
  return (
    <footer className="w-full py-10 relative overflow-hidden bg-bg border-t border-border2">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl text-white/70">◈</span>
          <span className="font-medium tracking-tight text-white/50">PlanForge</span>
        </div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} · Business planning di livello enterprise.
        </p>
      </div>
    </footer>
  );
}
