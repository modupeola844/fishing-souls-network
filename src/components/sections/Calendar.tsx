import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Bell, Target, Heart } from 'lucide-react';

export const Calendar = () => {
  const activities = [
    { name: "Evangelism Outreach", type: "Street Evangelism", date: "Quarterly", icon: "📢", desc: "Reaching communities through prayer walks and music." },
    { name: "Worship Sessions", type: "Spiritual Gathering", date: "Monthly", icon: "🎸", desc: "Deep worship and spiritual growth sessions." },
    { name: "Discipleship Training", type: "4-Week Program", date: "Ongoing", icon: "📖", desc: "Intensive biblical mentorship and assignments." },
    { name: "Back to School Project", type: "Community Support", date: "September", icon: "🎒", desc: "Equipping children with educational materials." },
    { name: "Youth Talent Competition", type: "Oyo State Event", date: "Annual", icon: "🏆", desc: "Showcasing God-given skills for teenagers." },
    { name: "Family Reach", type: "Christmas Project", date: "December", icon: "🎁", desc: "Sharing food packs with vulnerable families." },
    { name: "Kingdom Podcast", type: "Online Sessions", date: "Weekly", icon: "🎙️", desc: "Impactful teachings and stories of transformation." }
  ];

  return (
    <section id="calendar" className="py-32 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Calendar</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white font-serif mb-8 leading-tight">Yearly Activities</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">Join us in our scheduled activities as we impact lives across nations.</p>
          </div>
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2 pr-6 border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg">
              <Bell size={20} className="animate-ring" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Get Reminders</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:border-amber-500/50 transition-all group shadow-xl hover:shadow-2xl hover:-translate-y-2 duration-500 flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-500">{activity.icon}</div>
                <div className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
                  {activity.date}
                </div>
              </div>
              
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{activity.name}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">{activity.type}</p>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                {activity.desc}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold">
                  <Clock size={14} className="text-amber-500" /> <span>Multiple Slots Available</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold">
                  <MapPin size={14} className="text-amber-500" /> <span>Ibadan & Online</span>
                </div>
              </div>

              <button className="w-full py-5 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500 transition-all shadow-md active:scale-95">
                Join Event <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block p-10 rounded-[3rem] bg-amber-500/5 border border-amber-500/10">
            <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Want the Full Schedule?</h5>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Download our comprehensive 2025 activity roadmap to stay informed on all our mission fields.</p>
            <button className="inline-flex items-center gap-4 bg-slate-900 dark:bg-slate-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xl">
              <CalendarIcon size={20} /> Download 2025 Calendar (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};