import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, TrendingUp, Target, Star, Gift, Globe, CheckCircle2 } from 'lucide-react';

export const About = () => {
  const values = [
    { icon: Shield, name: "Faith", desc: "Trusting God in all things regardless of circumstances." },
    { icon: Heart, name: "Love", desc: "Reflecting Christ's heart in everything we do." },
    { icon: Users, name: "Discipleship", desc: "Intentional growth through mentorship and study." },
    { icon: TrendingUp, name: "Growth", desc: "Continuous spiritual and personal improvement." },
    { icon: Target, name: "Purpose", desc: "Living life with kingdom intent and clarity." },
    { icon: Star, name: "Integrity", desc: "Upright living in public and in private." },
    { icon: Gift, name: "Service", desc: "Serving our community with humility and joy." },
    { icon: Globe, name: "Kingdom Impact", desc: "Transforming nations for the glory of God." },
  ];

  const missionPoints = [
    "Reach souls through evangelism",
    "Raise disciples through intentional mentorship",
    "Build young adults spiritually and emotionally",
    "Create a platform for growth, purpose and transformation",
    "Equip believers for kingdom impact",
    "Empower youths with leadership and life skills"
  ];

  return (
    <section id="about" className="py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-3xl border-[12px] border-white dark:border-slate-900">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/discipleship-bootcamp-ui-08da5196-1778756389014.webp" 
                alt="Our Movement"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-multiply"></div>
            </div>
            
            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 bg-amber-500 p-10 rounded-[3rem] shadow-2xl z-20 hidden md:block"
            >
              <p className="text-5xl font-black text-slate-950 mb-1 leading-none">100%</p>
              <p className="text-slate-900 font-black uppercase tracking-widest text-xs opacity-80">Kingdom Focus</p>
            </motion.div>

            <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Who We Are</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10 font-serif leading-tight">
              A Movement Focused on <span className="text-amber-500">Youth</span> Transformation
            </h3>
            <div className="space-y-8 text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p>
                Street Fishing Evangelism Outreach is a Christian outreach and discipleship movement based in Ibadan, Nigeria focused on evangelism, youth transformation, discipleship training, mentorship and kingdom impact.
              </p>
              <p>
                We create environments where young people can grow spiritually, discover purpose, build confidence, develop life skills and become effective disciples of Christ.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {missionPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-bold text-lg">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-40">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative group"
           >
             <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
               <TrendingUp size={40} />
             </div>
             <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-6 font-serif">Our Vision</h4>
             <p className="text-slate-600 dark:text-slate-400 text-xl font-medium leading-relaxed">
               To raise a generation of spiritually grounded, purpose-driven and kingdom-minded youths who will transform society through Christ.
             </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative group"
           >
             <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-3xl flex items-center justify-center mb-10 group-hover:-rotate-6 transition-transform">
               <Target size={40} />
             </div>
             <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-6 font-serif">Our Mission</h4>
             <p className="text-slate-600 dark:text-slate-400 text-xl font-medium leading-relaxed">
               To reach souls through evangelism, raise disciples through intentional mentorship, and build young adults spiritually and emotionally.
             </p>
           </motion.div>
        </div>

        {/* Core Values Grid */}
        <div className="pt-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-24">
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Our DNA</h2>
            <h3 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white font-serif tracking-tighter">Core Values</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 text-center hover:border-amber-500/50 hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500">
                  <value.icon size={40} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{value.name}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};