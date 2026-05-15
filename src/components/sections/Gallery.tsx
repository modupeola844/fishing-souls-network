import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon, Film, Trash2, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MediaUpload } from '../ui/MediaUpload';
import { Project } from '../../types';
import { toast } from 'sonner';

export const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2025');
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('sfeo_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse projects", e);
      }
    }
    
    // Default data
    return [
      { 
        id: '1',
        year: '2024',
        title: "First Quarter Outreach", 
        description: "We had 100 converts in an evangelism outreach on the street in Akobo baptist Ibadan Oyo State.", 
        mediaUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/hero-street-evangelism-3250100d-1778756502035.webp",
        mediaType: 'image',
        tag: "Street Evangelism"
      },
      { 
        id: '2',
        year: '2024',
        title: "Second Quarter Outreach", 
        description: "Children's day celebration event of 150 children gathering, in event Hall party with film showing of Christian movie, games, snacks and sweets.", 
        mediaUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/children-day-celebration-351c00eb-1778756502289.webp",
        mediaType: 'image',
        tag: "Children Outreach"
      },
      { 
        id: '3',
        year: '2025',
        title: "Youth Discipleship Bootcamp", 
        description: "Training young believers with Bible study sessions, assignments and mentorship.", 
        mediaUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2e9daba5-372b-48ac-9322-03319f200f8a/leader-emmanuel-02bf831b-1778756501725.webp",
        mediaType: 'image',
        tag: "Training"
      }
    ];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    year: activeYear,
    tag: 'Outreach',
    mediaType: 'image'
  });

  useEffect(() => {
    try {
      localStorage.setItem('sfeo_projects', JSON.stringify(projects));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        toast.error("Storage full! Try removing older projects or using smaller images.");
      }
    }
  }, [projects]);

  const handleAddProject = () => {
    if (!newProject.title || !newProject.mediaUrl) {
      toast.error("Please provide a title and upload media.");
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      year: activeYear,
      title: newProject.title || '',
      description: newProject.description || '',
      mediaUrl: newProject.mediaUrl || '',
      mediaType: newProject.mediaType as 'image' | 'video',
      tag: newProject.tag || 'Outreach'
    };

    setProjects([...projects, project]);
    setIsDialogOpen(false);
    setNewProject({ year: activeYear, tag: 'Outreach', mediaType: 'image' });
    toast.success("Project added permanently!");
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast.info("Project removed.");
  };

  const filteredProjects = projects.filter(p => p.year === activeYear);

  return (
    <section id="gallery" className="py-32 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <h2 className="text-amber-500 font-black uppercase tracking-[0.2em] text-sm mb-4">Our History</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white font-serif mb-8 leading-tight">Impact & Projects</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
              Explore our journey and see how we're reaching souls and impacting nations. You can now add your own pictures and videos to showcase our latest works!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-[2rem] shadow-inner">
              {['2024', '2025', '2026'].map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all duration-300 ${activeYear === year ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-xl' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  {year}
                </button>
              ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-14 px-8 rounded-[1.5rem] bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-xl shadow-amber-500/20 gap-2">
                  <Plus size={20} /> Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] border-none shadow-3xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black font-serif">Add New Project Media</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <MediaUpload 
                    onUpload={(_, url, type) => setNewProject({ ...newProject, mediaUrl: url, mediaType: type })}
                    label="Upload Project Photo or Video"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Project Title</label>
                      <Input 
                        placeholder="e.g. Street Outreach"
                        className="rounded-2xl h-12"
                        value={newProject.title || ''}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Tag / Category</label>
                      <Input 
                        placeholder="e.g. Evangelism"
                        className="rounded-2xl h-12"
                        value={newProject.tag || ''}
                        onChange={(e) => setNewProject({ ...newProject, tag: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description</label>
                    <Textarea 
                      placeholder="Tell the story behind this media..."
                      className="rounded-[2rem] min-h-[100px] py-4"
                      value={newProject.description || ''}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                  </div>

                  <Button 
                    className="w-full h-16 rounded-[2rem] bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-lg"
                    onClick={handleAddProject}
                  >
                    Post to Gallery
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="group relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-slate-50 dark:border-slate-800 bg-slate-100 dark:bg-slate-800"
              >
                {item.mediaType === 'image' ? (
                  <img src={item.mediaUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <video src={item.mediaUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="px-4 py-1.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {item.tag}
                  </div>
                  {item.mediaType === 'video' && (
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Film size={14} />
                    </div>
                  )}
                </div>

                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full w-10 h-10 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(item.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <div className="flex items-center gap-3 text-amber-500 text-xs font-black uppercase tracking-[0.2em] mb-4">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    {item.year} Quarter Project
                  </div>
                  <h4 className="text-white font-black text-3xl mb-4 leading-tight group-hover:text-amber-500 transition-colors">{item.title}</h4>
                  <p className="text-slate-300 text-lg leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-2 py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <ImageIcon size={40} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No projects for this year yet</h4>
              <p className="text-slate-500">Be the first to upload an impact story!</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};