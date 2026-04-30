export function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex h-12 w-full rounded-lg border border-border2 bg-bg3/50 px-4 py-2 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-text-muted/50 shadow-inner ${className}`}
      {...props}
    />
  );
}
