import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FeaturedCaseStudy from './components/FeaturedCaseStudy';
import AdditionalWork from './components/AdditionalWork';
import { PERSONAL_INFO } from './data';
import { Mail, Linkedin, MapPin, Sun, Moon } from 'lucide-react';

// Check for saved theme preference or system preference
function getInitialTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('dustin_portfolio_theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Sync theme with html element and localStorage on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('dustin_portfolio_theme', next);
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text font-sans antialiased selection:bg-[#FF4E00] selection:text-white transition-colors duration-300">

      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 bg-editorial-bg/95 backdrop-blur-md border-b border-editorial-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-editorial-border text-editorial-text flex items-center justify-center font-display font-bold text-sm tracking-tighter bg-editorial-panel">
              DP
            </div>
            <div>
              <span className="font-display font-black text-editorial-text text-sm leading-none block uppercase tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[9px] text-[#FF4E00] font-mono tracking-[0.2em] uppercase block mt-1">
                Technical PM // Full Stack Engineer
              </span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 border border-editorial-border bg-editorial-panel text-[#FF4E00] hover:bg-[#FF4E00] hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main>
        <Hero />
        <FeaturedCaseStudy />
        <AdditionalWork />
      </main>

      {/* FOOTER */}
      <footer className="bg-editorial-card border-t border-editorial-border text-editorial-muted text-xs py-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display font-black text-editorial-text tracking-widest uppercase text-xs block mb-1">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] text-editorial-muted/70 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#FF4E00]" /> {PERSONAL_INFO.location}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#FF4E00] transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#FF4E00]" /> Email
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4E00] transition-colors flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-[#FF4E00]" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-6 border-t border-editorial-border mt-6 text-center text-[10px] font-mono tracking-widest uppercase text-editorial-muted/60">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
