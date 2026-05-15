import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';

export const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: string) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Programs', id: 'programs' },
    { name: 'Leadership', id: 'leadership' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Talent Hub', id: 'talent-hub' },
    { name: 'Podcast', id: 'podcast' },
    { name: 'Calendar', id: 'calendar' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Heart size={20} fill="currentColor" />
          </div>
          <div>
            <span className={`text-xl font-black tracking-tighter ${scrolled || isDark ? 'text-slate-900 dark:text-white' : 'text-white'}`}>SFEO</span>
            <p className="text-[8px] font-bold text-amber-500 uppercase tracking-widest leading-none">Street Fishing</p>
          </div>
        </div>

        {/* Desktop Links - Refactored to "Button-based" Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                currentView === link.id 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105' 
                  : (scrolled || isDark 
                      ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white')
              }`}
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${scrolled || isDark ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400' : 'hover:bg-white/10 text-white'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => onNavigate('partnership')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all active:scale-95 border-b-4 border-amber-700 hover:border-b-2 hover:translate-y-[2px]"
            >
              Partner
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={toggleTheme} className={scrolled || isDark ? 'text-slate-900 dark:text-white' : 'text-white'}>
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${scrolled || isDark ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'bg-white/10 text-white'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsOpen(false);
                  }}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-left text-sm uppercase tracking-widest transition-all ${
                    currentView === link.id 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  onNavigate('partnership');
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-amber-500 text-slate-950 py-5 rounded-2xl font-black text-center text-sm uppercase tracking-widest shadow-xl shadow-amber-500/30 active:scale-95 border-b-4 border-amber-700"
              >
                Become a Vision Partner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};