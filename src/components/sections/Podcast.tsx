import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Mic2, 
  Play, 
  Pause, 
  ExternalLink, 
  Headphones, 
  Upload, 
  X, 
  Music2,
  Volume2,
  Loader2,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { PodcastEpisode } from '../../types';

// IndexedDB Helper
const DB_NAME = 'SFEO_Podcasts_DB';
const STORE_NAME = 'episodes';
const DB_VERSION = 1;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveToDB = async (episode: PodcastEpisode & { blob: Blob }) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(episode);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const getAllFromDB = async (): Promise<(PodcastEpisode & { blob: Blob })[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const removeFromDB = async (id: string) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const Podcast = () => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newEpisode, setNewEpisode] = useState({
    title: '',
    audioFile: null as File | null
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [progress, setProgress] = useState(0);

  // Load episodes from IndexedDB on mount
  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const stored = await getAllFromDB();
        
        // Default episodes if none stored (optional, but requested to "remain" so we should keep defaults if empty)
        if (stored.length === 0) {
          const defaults: PodcastEpisode[] = [
            { 
              id: '1', 
              title: "The Power of Street Evangelism", 
              duration: "15:20", 
              date: "Jan 12, 2025",
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            },
            { 
              id: '2', 
              title: "Raising Disciples in a Modern World", 
              duration: "24:45", 
              date: "Jan 05, 2025",
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
            },
            { 
              id: '3', 
              title: "Finding Your Purpose in Christ", 
              duration: "18:10", 
              date: "Dec 28, 2024",
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
            }
          ];
          setEpisodes(defaults);
          return;
        }

        const mapped = stored.map(item => ({
          ...item,
          audioUrl: URL.createObjectURL(item.blob)
        }));
        
        setEpisodes(mapped);
      } catch (error) {
        console.error("Failed to load podcasts:", error);
      }
    };

    loadEpisodes();

    // Cleanup URLs on unmount
    return () => {
      episodes.forEach(ep => {
        if (ep.audioUrl.startsWith('blob:')) {
          URL.revokeObjectURL(ep.audioUrl);
        }
      });
    };
  }, []);

  const handlePlayPause = async (episode: PodcastEpisode) => {
    if (!audioRef.current) return;

    const isSameEpisode = currentEpisodeId === episode.id;

    try {
      if (isSameEpisode) {
        if (isPlaying) {
          if (playPromiseRef.current) {
            await playPromiseRef.current.catch(() => {});
          }
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          playPromiseRef.current = audioRef.current.play();
          setIsPlaying(true);
          await playPromiseRef.current;
          playPromiseRef.current = null;
        }
      } else {
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {});
        }
        audioRef.current.pause();
        
        setCurrentEpisodeId(episode.id);
        audioRef.current.src = episode.audioUrl;
        setProgress(0);
        
        playPromiseRef.current = audioRef.current.play();
        setIsPlaying(true);
        await playPromiseRef.current;
        playPromiseRef.current = null;
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Playback error:", error);
      }
      setIsPlaying(false);
      playPromiseRef.current = null;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(currentProgress) ? 0 : currentProgress);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    playPromiseRef.current = null;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEpisode.title || !newEpisode.audioFile) {
      toast.error("Please provide both title and audio file.");
      return;
    }

    setIsUploading(true);
    try {
      const blob = newEpisode.audioFile;
      const url = URL.createObjectURL(blob);
      const duration = "--:--"; 
      
      const newEp: PodcastEpisode = {
        id: Math.random().toString(36).substring(2, 11),
        title: newEpisode.title,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        duration,
        audioUrl: url
      };

      // Save to IndexedDB
      await saveToDB({ ...newEp, blob });

      setEpisodes([newEp, ...episodes]);
      setNewEpisode({ title: '', audioFile: null });
      toast.success("Podcast episode uploaded and saved successfully!");
    } catch (error) {
      toast.error("Failed to upload podcast episode.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await removeFromDB(id);
      setEpisodes(episodes.filter(ep => ep.id !== id));
      if (currentEpisodeId === id) {
        if (audioRef.current) audioRef.current.pause();
        setCurrentEpisodeId(null);
        setIsPlaying(false);
      }
      toast.success("Episode removed from playlist");
    } catch (error) {
      toast.error("Failed to remove episode");
    }
  };

  const currentEpisode = episodes.find(ep => ep.id === currentEpisodeId);

  return (
    <section id="podcast" className="py-24 bg-white dark:bg-slate-900">
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative shadow-3xl flex flex-col items-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

          <div className="max-w-4xl w-full flex flex-col items-center relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full flex flex-col items-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-widest mb-8">
                <Radio size={14} />
                Kingdom Podcast
              </div>
              <h3 className="text-4xl md:text-6xl font-black font-serif mb-8 leading-tight">
                Listen to the <span className="text-amber-500">Voice</span> of Truth
              </h3>
              <p className="text-slate-400 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                Tune into our weekly podcast sessions where we share powerful testimonies, biblical teachings, and insights on youth transformation.
              </p>
              
              <div className="flex flex-wrap justify-center gap-5">
                <button 
                  onClick={() => episodes[0] && handlePlayPause(episodes[0])}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"
                >
                  {isPlaying && currentEpisodeId === episodes[0]?.id ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />} 
                  {isPlaying && currentEpisodeId === episodes[0]?.id ? 'Pause Now' : 'Listen Now'}
                </button>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all">
                      <Upload size={18} /> Upload Episode
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px] rounded-[2rem]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-black font-serif">Upload New Episode</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpload} className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-400">Episode Title</Label>
                        <Input 
                          id="title" 
                          value={newEpisode.title}
                          onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
                          placeholder="e.g. The Power of Faith"
                          className="bg-slate-800 border-slate-700 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-400">Audio File</Label>
                        <div 
                          onClick={() => document.getElementById('audio-upload')?.click()}
                          className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-amber-500 transition-colors"
                        >
                          <Music2 className="mx-auto mb-2 text-slate-500" size={32} />
                          <p className="text-sm text-slate-400">
                            {newEpisode.audioFile ? newEpisode.audioFile.name : 'Click to select audio (MP3, WAV)'}
                          </p>
                          <input 
                            id="audio-upload"
                            type="file" 
                            accept="audio/*" 
                            className="hidden" 
                            onChange={(e) => setNewEpisode({ ...newEpisode, audioFile: e.target.files?.[0] || null })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          type="submit" 
                          disabled={isUploading}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl py-6"
                        >
                          {isUploading ? <Loader2 className="animate-spin mr-2" /> : <Upload className="mr-2" />}
                          Upload Episode
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <AnimatePresence>
                {currentEpisode && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-12 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] flex flex-col sm:flex-row items-center gap-6 w-full max-w-2xl"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 shrink-0">
                      <Volume2 size={32} />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                      <h4 className="font-bold truncate">{currentEpisode.title}</h4>
                      <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-amber-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => handlePlayPause(currentEpisode)}
                      className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 w-full max-w-2xl mx-auto"
            >
              <div className="flex flex-col items-center gap-4 mb-10">
                <Headphones className="text-amber-500" size={32} />
                <h4 className="text-2xl font-black">Latest Episodes</h4>
              </div>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {episodes.map((ep) => (
                  <div 
                    key={ep.id} 
                    onClick={() => handlePlayPause(ep)}
                    className={`p-6 rounded-2xl border transition-all group cursor-pointer relative ${currentEpisodeId === ep.id ? 'bg-amber-500/10 border-amber-500' : 'bg-white/5 border-white/5 hover:border-amber-500/50'}`}
                  >
                    {/* Delete button for user-uploaded podcasts (optional, but good UX) */}
                    {ep.id.length > 5 && (
                      <button 
                        onClick={(e) => handleDelete(e, ep.id)}
                        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    <div className="flex items-center justify-center gap-4 mb-2">
                      <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{ep.date}</p>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className="text-slate-500 text-[10px] font-bold">{ep.duration}</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-center">
                      <h5 className={`text-lg font-bold group-hover:text-amber-500 transition-colors ${currentEpisodeId === ep.id ? 'text-amber-500' : ''}`}>
                        {ep.title}
                      </h5>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentEpisodeId === ep.id && isPlaying ? 'bg-amber-500 text-slate-950 scale-110' : 'bg-white/10 text-white group-hover:bg-amber-500 group-hover:text-slate-950'}`}>
                        {currentEpisodeId === ep.id && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {episodes.length === 0 && (
                  <div className="text-center py-12 text-slate-500 italic">
                    No episodes found. Upload your first podcast!
                  </div>
                )}
              </div>

              <button className="w-full mt-10 text-slate-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white transition-colors">
                View All Episodes <ExternalLink size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};