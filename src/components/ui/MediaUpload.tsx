import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Film, Loader2 } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface MediaUploadProps {
  onUpload: (file: File, url: string, type: 'image' | 'video') => void;
  accept?: string;
  label?: string;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ 
  onUpload, 
  accept = "image/*,video/*",
  label = "Upload Image or Video"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{ url: string; type: 'image' | 'video' } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize logic - Max 800px dimension for localStorage efficiency
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Use JPEG for better compression
          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast.error("Please upload an image or video file.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error("File is too large. Max 50MB allowed.");
      return;
    }

    setIsProcessing(true);
    try {
      if (isImage) {
        const base64 = await processImage(file);
        setPreview({ url: base64, type: 'image' });
        onUpload(file, base64, 'image');
        toast.success("Image processed for permanent storage.");
      } else {
        // For videos, we still use blob URL as base64 is too large for localStorage
        const url = URL.createObjectURL(file);
        setPreview({ url, type: 'video' });
        onUpload(file, url, 'video');
        toast.warning("Videos are saved temporarily for this session. Use images for permanent profile photos.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Failed to process image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearPreview = () => {
    if (preview?.url && preview.url.startsWith('blob:')) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div 
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all cursor-pointer group ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:scale-110 transition-all">
            {isProcessing ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
          </div>
          <div className="text-center">
            <p className="font-black text-slate-900 dark:text-white text-lg">{isProcessing ? 'Processing...' : label}</p>
            <p className="text-slate-500 text-sm font-medium">PNG, JPG (Permanent) or MP4 (Session)</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept={accept} 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 aspect-video flex items-center justify-center">
          {preview.type === 'image' ? (
            <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <video src={preview.url} className="w-full h-full object-cover" controls />
          )}
          
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase flex items-center gap-2">
              {preview.type === 'image' ? <ImageIcon size={12} /> : <Film size={12} />}
              {preview.type}
            </div>
            <Button 
              size="icon" 
              variant="destructive" 
              className="rounded-full w-8 h-8" 
              onClick={clearPreview}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};