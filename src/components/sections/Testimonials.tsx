import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      text: "This ministry helped me grow spiritually and discover purpose. I found a community that truly cares about spiritual growth and kingdom impact.",
      author: "Faith Adeniyi",
      role: "Discipleship Graduate"
    },
    {
      text: "The discipleship training changed my mindset and relationship with God. The mentorship I received here is second to none.",
      author: "Samuel Olaniyi",
      role: "Youth Leader"
    },
    {
      text: "I found a community that truly cares about spiritual growth. Street Fishing Evangelism Outreach is more than a ministry; it's a family.",
      author: "Blessing E.",
      role: "Volunteer"
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white font-serif">Lives Transformed</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute -top-6 left-12 w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                <Quote size={28} />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-amber-500 text-amber-500" />)}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-lg italic leading-relaxed mb-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-slate-50 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-black">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-black text-slate-900 dark:text-white">{t.author}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};