import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Linkedin, MessageCircle, Edit2, Camera, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MediaUpload } from '../ui/MediaUpload';
import { Leader } from '../../types';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export const Leadership = () => {
  const [leaders, setLeaders] = useState<Leader[]>(() => {
    const saved = localStorage.getItem('sfeo_leaders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved leaders", e);
      }
    }
    return [
      {
        id: '1',
        name: "Modupeola Aofolaju",
        role: "Founder & Vision Coordinator",
        bio: "Coach, writer, discipleship mentor and passionate lover of God committed to youth transformation and kingdom impact.",
        image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-modupeola-c52f582b-1778756502268.webp"
      },
      {
        id: '2',
        name: "Mrs Marian Olubukola Fela-Steve (JP)",
        role: "Instructor & Relationship Mentor",
        bio: "CEO La Vista Exclusives, life skills facilitator, counsellor and women empowerment mentor passionate about raising confident and God-sensitive women.",
        image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-marian-21160001-1778756504041.webp"
      },
      {
        id: '3',
        name: "Mrs Funmi Fawibe",
        role: "Vision Partner & Mentor",
        bio: "Dedicated to discipleship growth, spiritual mentorship and kingdom service.",
        image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-emmanuel-02bf831b-1778756501725.webp"
      },
      {
        id: '4',
        name: "Mr Emmanuel",
        role: "Discipleship Instructor & Mentor",
        bio: "Committed to helping believers grow deeper in faith and biblical understanding.",
        image: "https://i.pravatar.cc/400?u=Emmanuel"
      },
      {
        id: '5',
        name: "Mrs Christina Foluso",
        role: "Vision Partner & Teenagers Coach",
        bio: "Vision Partners and teenagers coach dedicated to their spiritual growth.",
        image: "https://i.pravatar.cc/400?u=Christina"
      },
      {
        id: '6',
        name: "Abimbola Adelogun",
        role: "Vision Partner & Baker",
        bio: "Vision Partners and a baker she is a lover of God and she is dedicated to growth.",
        image: "https://i.pravatar.cc/400?u=Abimbola"
      }
    ];
  });

  const [editingLeaderId, setEditingLeaderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sfeo_leaders', JSON.stringify(leaders));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        toast.error("Storage full! Cannot save more images. Try smaller photos.");
      }
    }
  }, [leaders]);

  const updateLeaderImage = (id: string, newUrl: string) => {
    setLeaders(prev => prev.map(l => l.id === id ? { ...l, image: newUrl } : l));
    setEditingLeaderId(null);
    toast.success("Profile photo updated permanently!");
  };

  return (
    <section id="leadership" className="py-32 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Leadership</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white font-serif mb-6 leading-tight">Vision Partners & Mentors</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Meet the dedicated hearts behind the SFEO movement. You can now personalize the visuals by updating profile photos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {leaders.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:border-amber-500/50 transition-all duration-500"
            >
              <div className="relative mb-10 w-48 h-48 mx-auto group/img">
                <div className="absolute inset-0 bg-amber-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 -z-10 opacity-20"></div>
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  
                  {/* Edit Trigger Overlay */}
                  <Dialog 
                    open={editingLeaderId === leader.id} 
                    onOpenChange={(open) => setEditingLeaderId(open ? leader.id : null)}
                  >
                    <DialogTrigger asChild>
                      <button className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-black text-sm">
                        <Camera size={20} /> Update Photo
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-white dark:bg-slate-900 rounded-[3rem] border-none shadow-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black font-serif">Update {leader.name}'s Photo</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <MediaUpload 
                          onUpload={(_, url) => updateLeaderImage(leader.id, url)}
                          accept="image/*"
                          label="Select New Profile Photo"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{leader.name}</h4>
                <p className="text-amber-600 dark:text-amber-500 font-bold text-xs uppercase tracking-widest mb-6 px-4 py-1 bg-amber-50 dark:bg-amber-900/20 inline-block rounded-full">{leader.role}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 h-20 line-clamp-3 group-hover:line-clamp-none transition-all">
                  {leader.bio}
                </p>

                <div className="flex justify-center gap-4">
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center">
                    <Instagram size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center">
                    <MessageCircle size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center">
                    <Mail size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};