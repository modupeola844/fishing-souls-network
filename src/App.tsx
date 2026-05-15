import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Programs } from './components/sections/Programs';
import { Leadership } from './components/sections/Leadership';
import { Gallery } from './components/sections/Gallery';
import { TalentHub } from './components/sections/TalentHub';
import { Calendar } from './components/sections/Calendar';
import { Devotional } from './components/sections/Devotional';
import { ContactFooter } from './components/sections/ContactFooter';
import { Partnership } from './components/sections/Partnership';
import { Testimonials } from './components/sections/Testimonials';
import { Podcast } from './components/sections/Podcast';
import { Toaster } from './components/ui/sonner';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (newView: string) => {
    setView(newView);
    const element = document.getElementById(newView);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 selection:bg-amber-500 selection:text-white">
      <Navbar onNavigate={handleNavigate} currentView={view} />
      
      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Programs />
        <Leadership />
        <Gallery />
        <TalentHub />
        <Podcast />
        <Testimonials />
        <Calendar />
        <Devotional />
        <Partnership />
      </main>

      <ContactFooter />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-5 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="w-16 h-16 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all border border-slate-100 dark:border-slate-700 active:scale-90"
            >
              <ArrowUp size={28} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <a 
          href="https://wa.me/2347046740680" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-500 text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce-subtle"
        >
          <MessageCircle size={32} fill="currentColor" />
        </a>
      </div>

      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

export default App;