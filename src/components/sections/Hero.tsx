import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Globe } from 'lucide-react';

export const Hero = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/street-evangelism-impact-a792f77d-1778756385279.webp" 
          alt="Street Evangelism Impact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        {/* Soft glowing lighting effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Impacting Nations through Christ
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 font-serif tracking-tight">
              Transforming <span className="text-amber-500 drop-shadow-sm">Lives</span> Through <span className="relative">Evangelism<span className="absolute bottom-2 left-0 w-full h-2 bg-amber-500/30 -z-10"></span></span> & Discipleship
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-medium">
              We are committed to reaching souls, raising disciples, and empowering young people to live purpose-driven lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all group shadow-xl shadow-amber-500/20 active:scale-95"
              >
                Join the Movement
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('partnership')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Become a Vision Partner
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?u=sfeo-${i}`} alt="Member" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-amber-500 flex items-center justify-center text-slate-950 font-black text-[10px] shadow-lg">
                  +500
                </div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white font-bold text-base leading-none">500+ Disciples Raised</p>
                <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-widest font-bold">In Ibadan & Communities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Floating Cards - Scaled down for beauty */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 hidden 2xl:block z-20"
      >
        <div className="p-4 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center gap-4 max-w-xs">
          <div className="w-12 h-12 rounded-xl bg-blue-600/80 flex items-center justify-center text-white shadow-lg">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Global Vision</p>
            <p className="text-slate-400 text-[10px] leading-tight">Impacting nations starting from local communities.</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-20 hidden 2xl:block z-20"
      >
        <div className="p-4 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center gap-4 max-w-xs">
          <div className="w-12 h-12 rounded-xl bg-amber-500/80 flex items-center justify-center text-slate-950 shadow-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Mentorship</p>
            <p className="text-slate-400 text-[10px] leading-tight">Raising purpose-driven youths through Christ.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};