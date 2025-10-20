import { useState, useCallback } from "react";
import { Upload, FileImage, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export const UploadZone = ({ onFileSelect }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-105 shadow-glow"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileInput}
        />
        
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow">
              <Upload className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <FileImage className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-2">
            Drop your file here
          </h3>
          <p className="text-muted-foreground mb-6">
            or click to browse from your device
          </p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileImage className="w-4 h-4" />
              <span>Images: JPG, PNG, WEBP</span>
            </div>
            <div className="flex items-center gap-2">
              <FileVideo className="w-4 h-4" />
              <span>Videos: MP4, AVI, MOV</span>
            </div>
          </div>
        </label>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Maximum file size: 50MB
      </p>
    </div>
  );
};
