"use client"

import * as React from "react"
import { motion } from "framer-motion"

export const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  ...props 
}, ref) => {
  const base = "relative inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none active:scale-95 shadow-sm overflow-hidden z-10 before:absolute before:inset-0 before:-z-10 before:transition-transform before:duration-300 hover:before:scale-105";
  
  const variants = {
    primary: "bg-accent text-accent-fg hover:shadow-glow-strong before:bg-accent-hover text-black border border-accent",
    secondary: "bg-bg3 text-text border border-border2 hover:border-text hover:bg-border2",
    outline: "border-2 border-border2 bg-transparent hover:border-accent hover:text-accent hover:shadow-glow text-text",
    ghost: "bg-transparent hover:bg-bg3 text-text-muted hover:text-text shadow-none",
    danger: "bg-danger text-white hover:bg-red-600 shadow-glow",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 py-2 text-sm",
    lg: "h-14 px-8 text-base",
    icon: "h-11 w-11",
  };

  return (
    <motion.button 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      ref={ref}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
})
Button.displayName = "Button"
