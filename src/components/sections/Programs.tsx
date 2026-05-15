import React from 'react';
import { motion } from 'framer-motion';
import { Zap, GraduationCap, Users, HeartPulse, Sparkles, Trophy, Home, ChevronRight, BookOpen } from 'lucide-react';

export const Programs = () => {
  const programs = [
    {
      title: "Street Evangelism Outreach",
      desc: "We organize outreach programs, campus evangelism and community missions to spread the Gospel and win souls for Christ.",
      icon: Zap,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/hero-street-evangelism-3250100d-1778756502035.webp",
      color: "bg-amber-500"
    },
    {
      title: "Discipleship Training Program",
      desc: "A 4-week discipleship training focused on spiritual growth, biblical understanding, mentorship, assignments and reflection sessions.",
      icon: GraduationCap,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-emmanuel-02bf831b-1778756501725.webp",
      color: "bg-blue-500"
    },
    {
      title: "Youth Empowerment Hub",
      desc: "Helping young people discover and develop their gifts, talents and purpose through vocational skill workshops and mentorship.",
      icon: Users,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-marian-21160001-1778756504041.webp",
      color: "bg-purple-500"
    },
    {
      title: "Back to School Drive",
      desc: "Equipping underprivileged children with school bags, notebooks, and essential educational materials to ensure a bright academic future for every child.",
      icon: BookOpen,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/back-to-school-project-17024d94-1778866452666.webp",
      color: "bg-sky-500"
    },
    {
      title: "Prayer & Worship Sessions",
      desc: "Online and physical prayer meetings, worship gatherings and spiritual growth sessions to empower believers for kingdom impact.",
      icon: HeartPulse,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/worship-gathering-68b65f61-1778756501997.webp",
      color: "bg-red-500"
    },
    {
      title: "Relationship & Life Mentorship",
      desc: "Helping singles, students and young adults build healthy God-centered lives and relationships through intentional guidance.",
      icon: Sparkles,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-modupeola-c52f582b-1778756502268.webp",
      color: "bg-green-500"
    },
    {
      title: "Believer's Talent Competition",
      desc: "Gathering of champions to display God-given talents. 1st, 2nd and 3rd positions are awarded certificates and cash prizes.",
      icon: Trophy,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/talent-competition-5daa63c5-1778756502677.webp",
      color: "bg-orange-500"
    },
    {
      title: "Family Teach",
      desc: "Annual December gathering to thank God and share the love of Christ by giving foodstuffs to 100+ families from the trench.",
      icon: Home,
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/family-reach-out-christmas-2fa8c846-1778756502486.webp",
      color: "bg-emerald-500"
    }
  ];

  return (
    <section id="programs" className="py-32 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-3xl">
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Impact Channels</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white font-serif mb-8 leading-tight">Our Programs</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">From the streets to the classroom, our programs are designed for transformation and kingdom impact.</p>
          </div>
          <button className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-all">
            Get Involved <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[520px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-slate-50 dark:border-slate-800"
            >
              <img 
                src={program.image} 
                alt={program.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className={`w-16 h-16 ${program.color} rounded-[1.5rem] flex items-center justify-center text-white mb-6 shadow-xl group-hover:rotate-12 transition-transform`}>
                  <program.icon size={28} />
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{program.title}</h4>
                <p className="text-slate-300 text-base leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity line-clamp-3 group-hover:line-clamp-none">
                  {program.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};