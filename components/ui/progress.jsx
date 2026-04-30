"use client"

import * as React from "react"
import { motion } from "framer-motion"

const Progress = React.forwardRef(({ className, value, max = 100, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-3 w-full overflow-hidden rounded-full bg-border2 border border-border2 shadow-inner ${className}`}
    {...props}
  >
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value || 0}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full bg-accent shadow-glow-strong rounded-full"
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
