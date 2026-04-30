import * as React from "react"

const Progress = React.forwardRef(({ className, value, max = 100, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-2 w-full overflow-hidden rounded-full bg-bg2 ${className}`}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-green transition-all duration-500 ease-in-out shadow-glow"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
