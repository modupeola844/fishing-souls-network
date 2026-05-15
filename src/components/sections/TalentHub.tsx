import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Video, Music, Mic2, Palette, ChevronRight, Users, Sparkles, Star, Heart, Trash2, Film } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MediaUpload } from '../ui/MediaUpload';
import { Talent } from '../../types';

export const TalentHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('Music');
  const [talents, setTalents] = useState<Talent[]>(() => {
    const saved = localStorage.getItem('sfeo_talents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse talents", e);
      }
    }
    return [
      { id: '1', name: "Samuel Peters", role: "Gospel Music", views: "1.2k", mediaUrl: "https://i.pravatar.cc/100?u=1", mediaType: 'image', category: 'Music' },
      { id: '2', name: "Faith Emmanuel", role: "Spoken Word", views: "850", mediaUrl: "https://i.pravatar.cc/100?u=2", mediaType: 'image', category: 'Speaking' },
      { id: '3', name: "David Okon", role: "Creative Art", views: "2.1k", mediaUrl: "https://i.pravatar.cc/100?u=3", mediaType: 'image', category: 'Art' }
    ];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTalent, setNewTalent] = useState<Partial<Talent>>({
    category: 'Music',
    mediaType: 'video'
  });

  useEffect(() => {
    try {
      localStorage.setItem('sfeo_talents', JSON.stringify(talents));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        toast.error("Storage full! Try smaller photos.");
      }
    }
  }, [talents]);

  const categories = [
    { name: 'Music', icon: Music },
    { name: 'Dance', icon: Video },
    { name: 'Art', icon: Palette },
    { name: 'Speaking', icon: Mic2 },
    { name: 'Creative', icon: Sparkles }
  ];

  const handleUpload = () => {
    if (!newTalent.name || !newTalent.mediaUrl) {
      toast.error("Please provide your name and upload a video/photo.");
      return;
    }

    const talent: Talent = {
      id: Date.now().toString(),
      name: newTalent.name || '',
      role: newTalent.role || selectedCategory,
      mediaUrl: newTalent.mediaUrl || '',
      mediaType: newTalent.mediaType as 'image' | 'video',
      views: '0',
      category: selectedCategory
    };

    setTalents([talent, ...talents]);
    setIsDialogOpen(false);
    setNewTalent({ category: 'Music', mediaType: 'video' });
    toast.success("Your talent has been uploaded permanently!");
  };

  const deleteTalent = (id: string) => {
    setTalents(talents.filter(t => t.id !== id));
    toast.info("Talent removed.");
  };

  return (
    <section id="talent-hub" className="py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              Youth Empowerment
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white font-serif mb-8 leading-tight">
              Talent & <span className="text-amber-500">Youth Hub</span>
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium">
              A special platform for African youths to upload talent videos, showcase skills in music, dance, art, and speaking, connect with mentors, and build confidence in their creative purpose.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-16">
              {[
                { icon: Video, title: "Video Uploads", desc: "Showcase your skills", color: "text-red-500" },
                { icon: Users, title: "Mentor Access", desc: "Connect with pros", color: "text-blue-500" },
                { icon: Star, title: "Featured Talents", desc: "Get recognized", color: "text-amber-500" },
                { icon: Heart, title: "Purpose Growth", desc: "Build confidence", color: "text-pink-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center ${item.color} shrink-0`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 dark:text-white text-lg">{item.title}</h5>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-amber-500/30 flex items-center gap-3 group transition-all">
                  Upload Your Talent <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] border-none shadow-3xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black font-serif">Showcase Your Talent</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <MediaUpload 
                    onUpload={(_, url, type) => setNewTalent({ ...newTalent, mediaUrl: url, mediaType: type })}
                    label="Upload Talent Video or Photo"
                    accept="video/*,image/*"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Your Name</label>
                      <Input 
                        placeholder="Full Name"
                        className="rounded-2xl h-12"
                        value={newTalent.name || ''}
                        onChange={(e) => setNewTalent({ ...newTalent, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Talent Area</label>
                      <Input 
                        placeholder="e.g. Gospel Rap"
                        className="rounded-2xl h-12"
                        value={newTalent.role || ''}
                        onChange={(e) => setNewTalent({ ...newTalent, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full h-16 rounded-[2rem] bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-lg"
                    onClick={handleUpload}
                  >
                    Upload to Hub
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-10 shadow-3xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                 </div>
              </div>

              <h4 className="font-black text-2xl text-slate-900 dark:text-white mb-10">Featured Champions</h4>

              <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {talents.map((talent) => (
                    <motion.div 
                      key={talent.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-amber-500 transition-all group"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 shadow-lg group-hover:scale-110 transition-transform relative">
                        {talent.mediaType === 'image' ? (
                          <img src={talent.mediaUrl} alt={talent.name} className="w-full h-full object-cover" />
                        ) : (
                          <video src={talent.mediaUrl} className="w-full h-full object-cover" />
                        )}
                        {talent.mediaType === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                            <Video size={16} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-xl text-slate-900 dark:text-white">{talent.name}</p>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{talent.role}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">{talent.views} views</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="bg-slate-900 dark:bg-slate-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-amber-500 transition-colors shadow-lg">
                          {talent.mediaType === 'video' ? <Video size={20} /> : <Film size={20} />}
                        </button>
                        <button 
                          onClick={() => deleteTalent(talent.id)}
                          className="bg-slate-100 dark:bg-slate-800 text-red-500 w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
                <p className="font-black text-sm text-slate-900 dark:text-white mb-6 uppercase tracking-widest">Explore Categories</p>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-6 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-3 ${selectedCategory === cat.name ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                      <cat.icon size={16} />
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Abstract Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};