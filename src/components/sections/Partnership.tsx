import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, CreditCard, Landmark, CheckCircle2, ChevronRight, Copy, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export const Partnership = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountDetails = {
    bank: "Zenith Bank",
    number: "1015532577",
    name: "Street Fishing Evangelism Outreach"
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountDetails.number);
    setCopied(true);
    toast.success("Account number copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSupportClick = () => {
    setShowBankDetails(true);
  };

  const ways = [
    {
      title: "Monthly Partnership",
      desc: "Join our vision partners who give consistently to sustain our outreaches and discipleship programs.",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      title: "One-Time Donation",
      desc: "Support specific projects like our Back to School initiatives or Christmas Family Reach.",
      icon: Gift,
      color: "bg-amber-500"
    },
    {
      title: "Volunteer Your Skills",
      desc: "Become a mentor, instructor, or technical partner in our Youth Empowerment Hub.",
      icon: CheckCircle2,
      color: "bg-blue-500"
    }
  ];

  return (
    <section id="partnership" className="py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Abstract backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Vision Partner</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif mb-8 leading-tight tracking-tight">
              Become a Partner in <span className="text-amber-500">Kingdom</span> Impact
            </h3>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed font-medium">
              Your partnership enables us to reach more souls, provide for more families, and raise a generation that knows their purpose in Christ.
            </p>

            <div className="space-y-8">
              {ways.map((way) => (
                <div key={way.title} className="flex gap-6 group">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${way.color} flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 shrink-0`}>
                    <way.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{way.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{way.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl"
          >
            <h4 className="text-3xl font-black mb-10 text-center">Partnership Support</h4>
            
            <div className="space-y-8 mb-12">
              <div 
                className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 group hover:border-amber-500/50 transition-all cursor-pointer relative overflow-hidden"
                onClick={handleSupportClick}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg">
                    <Landmark size={24} />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg">Bank Transfer</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Nigeria</p>
                  </div>
                </div>
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 group-hover:bg-slate-950 transition-colors">
                  <p className="text-sm font-bold text-amber-500 mb-1">Account Number (Zenith Bank)</p>
                  <p className="text-2xl font-black text-white tracking-tighter uppercase">{accountDetails.number}</p>
                </div>
                <div className="absolute top-8 right-8 text-amber-500/50 group-hover:text-amber-500 transition-colors">
                   <Copy size={20} />
                </div>
              </div>

              <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5">
                 <div className="flex items-center justify-between mb-6">
                   <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Donate with Card</span>
                   <CreditCard className="text-amber-500" size={24} />
                 </div>
                 <div className="flex flex-wrap gap-4">
                   {['₦5,000', '₦10,000', '₦25,000', '₦50,000'].map(amount => (
                     <button key={amount} className="flex-1 min-w-[100px] py-4 rounded-2xl border border-white/10 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 font-black transition-all text-sm active:scale-95">
                       {amount}
                     </button>
                   ))}
                 </div>
              </div>
            </div>

            <button 
              onClick={handleSupportClick}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Support the Vision <ChevronRight size={24} />
            </button>
            
            <p className="text-center text-slate-500 text-xs mt-8 font-medium leading-relaxed italic px-4">
              &ldquo;Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modern Bank Details Modal */}
      <AnimatePresence>
        {showBankDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBankDetails(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 p-10 md:p-12 rounded-[3.5rem] shadow-3xl max-w-lg w-full relative z-10"
            >
              <button 
                onClick={() => setShowBankDetails(false)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>

              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-20 h-20 bg-amber-500 rounded-[2rem] flex items-center justify-center text-slate-950 mb-6 shadow-2xl shadow-amber-500/20">
                  <Landmark size={40} />
                </div>
                <h5 className="text-3xl font-black mb-2 tracking-tight">Bank Details</h5>
                <p className="text-slate-400 font-medium">Direct Transfer for Kingdom Impact</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Account Name</p>
                  <p className="text-xl font-bold text-white leading-tight">{accountDetails.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Bank Name</p>
                    <p className="text-xl font-bold text-white">{accountDetails.bank}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative group cursor-pointer" onClick={copyToClipboard}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-white">{accountDetails.number}</p>
                      <div className="text-amber-500">
                        {copied ? <Check size={18} /> : <Copy size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button 
                  onClick={copyToClipboard}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20 active:scale-95"
                >
                  {copied ? 'Number Copied!' : 'Copy Account Number'}
                </button>
                <p className="text-center text-slate-500 text-xs mt-6 font-bold uppercase tracking-tighter">
                  God bless you for your generosity!
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};