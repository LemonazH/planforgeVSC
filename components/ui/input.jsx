export function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-border2 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
