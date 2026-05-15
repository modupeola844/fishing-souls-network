import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Quote, Share2, Heart, MessageSquare, ChevronRight } from 'lucide-react';

export const Devotional = () => {
  const devotional = {
    scripture: "Psalm 126:6",
    verse: "He that goeth forth and weepeth, bearing precious seed, shall doubtless come again with rejoicing, bringing his sheaves with him.",
    insight: "The labor of evangelism is never in vain. Every seed sown in tears, prayer, and consistency will one day bring a harvest of joy. Stay committed to the mission of reaching souls.",
    author: "Daily Spiritual Manna"
  };

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-[5rem] overflow-hidden shadow-3xl border border-slate-100 dark:border-slate-800"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000&auto=format&fit=crop" 
                  alt="Morning Devotional" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                
                <div className="absolute top-12 left-12">
                  <div className="px-6 py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-[0.2em] text-amber-600 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                    Daily Devotional
                  </div>
                </div>

                <div className="absolute bottom-12 left-12">
                   <p className="text-white font-serif text-3xl font-bold leading-tight italic">
                     "Walking in the <br />Light of the Word."
                   </p>
                </div>
              </div>
              
              <div className="p-16 lg:p-24 flex flex-col justify-center">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-3xl flex items-center justify-center mb-10">
                  <Quote size={40} />
                </div>
                <h4 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-10 font-serif leading-tight">
                  The Harvest of <span className="text-amber-500">Precious Seeds</span>
                </h4>
                <div className="space-y-10">
                  <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border-l-[12px] border-amber-500 shadow-inner">
                    <p className="text-2xl italic text-slate-700 dark:text-slate-200 font-bold leading-relaxed mb-6">
                      "{devotional.verse}"
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-px bg-amber-500"></div>
                       <p className="text-sm font-black text-amber-600 uppercase tracking-widest">{devotional.scripture}</p>
                    </div>
                  </div>
                  <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {devotional.insight}
                  </p>
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                    <button className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                        <Heart size={20} />
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest">1.2k</span>
                    </button>
                    <button className="flex items-center gap-3 text-slate-400 hover:text-blue-500 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Share2 size={20} />
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest">Share</span>
                    </button>
                  </div>
                  <button className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-amber-500 hover:text-slate-950 transition-all">
                    Archive <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};