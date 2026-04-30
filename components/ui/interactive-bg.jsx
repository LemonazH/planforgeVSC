'use client';
import { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base soft glowing background for Light Theme */}
      <div 
        className="absolute w-[800px] h-[800px] bg-red-500/[0.03] rounded-full blur-[100px] transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`,
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[100px] transition-transform duration-[800ms] ease-out"
        style={{
          transform: `translate(${mousePosition.x + 200}px, ${mousePosition.y - 300}px)`,
        }}
      />
    </div>
  );
}