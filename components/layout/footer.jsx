export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-950 border-t border-gray-900 text-center">
      <div className="container mx-auto px-4">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} PlanForge · Fatto con ◈ AI
        </p>
      </div>
    </footer>
  );
}
