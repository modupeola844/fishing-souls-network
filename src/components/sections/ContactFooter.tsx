import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Instagram, Youtube, Send, Heart, ExternalLink, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const ContactFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted! We will get back to you shortly.");
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Welcome to the SFEO family! You've successfully joined our newsletter.", {
        icon: <CheckCircle className="text-green-500" />
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-slate-950 text-white pt-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Contact</h2>
            <h3 className="text-4xl md:text-6xl font-black font-serif mb-10 leading-tight">Get In Touch</h3>
            
            <div className="space-y-10 mb-16">
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xl">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-2xl font-black">07046740680</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xl">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-2xl font-black">Akobo, Ibadan, Oyo State, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <a href="https://www.instagram.com/streetfishingevangelism?igsh=MXc1azduOXo4bmNvMQ==" target="_blank" className="w-16 h-16 rounded-[1.5rem] bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center text-white shadow-xl">
                <Instagram size={28} />
              </a>
              <a href="#" className="w-16 h-16 rounded-[1.5rem] bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center text-white shadow-xl">
                <Youtube size={28} />
              </a>
              <a href="#" className="w-16 h-16 rounded-[1.5rem] bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center text-white shadow-xl">
                <Send size={28} />
              </a>
              <a href="https://www.instagram.com/stories/streetfishingevangelism/3892467009514534843?utm_source=ig_story_item_share&igsh=dXlmdTBleTd0ZGpn" target="_blank" className="w-16 h-16 rounded-[1.5rem] bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center text-white shadow-xl">
                <div className="font-black text-xs text-center">Tik<br/>Tok</div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl"
          >
            <h4 className="text-3xl font-black mb-10 text-center lg:text-left">Prayer & Volunteer Request</h4>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none transition-all placeholder:text-slate-700 font-bold" required />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Phone Number</label>
                  <input type="tel" placeholder="070..." className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none transition-all placeholder:text-slate-700 font-bold" required />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Purpose</label>
                <select className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 focus:border-amber-500 outline-none transition-all font-bold appearance-none">
                  <option className="bg-slate-950">Prayer Request</option>
                  <option className="bg-slate-950">Volunteer Registration</option>
                  <option className="bg-slate-950">Vision Partnership</option>
                  <option className="bg-slate-950">Youth Empowerment Inquiry</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Your Message</label>
                <textarea placeholder="How can we serve you?" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 h-40 focus:border-amber-500 outline-none transition-all placeholder:text-slate-700 font-bold" required></textarea>
              </div>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                Submit Request <ExternalLink size={24} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Newsletter & Bottom Footer */}
        <div className="py-16 border-t border-white/10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950">
                  <Heart size={28} fill="currentColor" />
                </div>
                <h5 className="text-3xl font-black tracking-tighter">SFEO</h5>
              </div>
              <p className="text-slate-300 text-xl font-bold italic max-w-md mb-10 leading-snug">
                &ldquo;Reaching Souls, Raising Disciples, Impacting Nations.&rdquo;
                <span className="block mt-2 text-slate-500 text-sm font-medium not-italic">A movement dedicated to youth transformation across the globe.</span>
              </p>
              <div className="flex gap-4">
                 <div className="p-1 bg-white/5 rounded-2xl flex items-center gap-2 pr-6">
                   <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                     <Mail size={20} />
                   </div>
                   <span className="text-sm font-bold">info.sfeo@gmail.com</span>
                 </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <h6 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-amber-500">Quick Links</h6>
              <ul className="space-y-4 font-bold text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><a href="#leadership" className="hover:text-white transition-colors">Leadership</a></li>
                <li><a href="#talent-hub" className="hover:text-white transition-colors">Talent Hub</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-amber-500">Join Newsletter</h6>
              <p className="text-slate-400 text-sm mb-6 font-medium">Get the latest updates on our outreaches and missions.</p>
              <form onSubmit={handleNewsletter} className="flex flex-col gap-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" 
                    className="w-full bg-slate-900 rounded-2xl px-6 py-5 focus:border-amber-500 border border-white/5 outline-none font-bold transition-all" 
                    required
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-amber-500/10 ${
                    isSubmitting ? 'bg-slate-800 text-slate-500' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  }`}
                >
                  {isSubmitting ? 'Capturing...' : 'Capture Email'} <Send size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5 text-slate-500 text-sm font-bold">
            <p>&copy; {new Date().getFullYear()} Street Fishing Evangelism Outreach. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};