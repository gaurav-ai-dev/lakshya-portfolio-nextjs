"use client"
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return false; // Default to light mode
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-16 h-8 rounded-full p-1 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(220, 25%, 15%) 0%, hsl(240, 20%, 20%) 100%)'
          : 'linear-gradient(135deg, hsl(45, 100%, 85%) 0%, hsl(35, 100%, 80%) 100%)',
        boxShadow: isDark 
          ? 'inset 0 2px 8px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)' 
          : 'inset 0 2px 8px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)'
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Track background elements */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars for dark mode */}
        <motion.div
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white/60 rounded-full" />
          <div className="absolute top-3 left-4 w-1 h-1 bg-white/40 rounded-full" />
          <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/50 rounded-full" />
        </motion.div>
        
        {/* Clouds for light mode */}
        <motion.div
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1 right-3 w-3 h-1.5 bg-white/60 rounded-full" />
          <div className="absolute bottom-1.5 right-5 w-2 h-1 bg-white/40 rounded-full" />
        </motion.div>
      </div>

      {/* Sliding toggle knob */}
      <motion.div
        layout
        initial={false}
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
        className="relative w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, hsl(230, 25%, 25%) 0%, hsl(220, 30%, 35%) 100%)'
            : 'linear-gradient(135deg, hsl(45, 100%, 65%) 0%, hsl(35, 100%, 55%) 100%)',
          boxShadow: isDark
            ? '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 20px hsl(45, 100%, 65%)'
        }}
      >
        {/* Sun icon */}
        <motion.div
          animate={{ 
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="w-4 h-4 text-amber-900" />
        </motion.div>
        
        {/* Moon icon */}
        <motion.div
          animate={{ 
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="w-3.5 h-3.5 text-blue-200" />
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
