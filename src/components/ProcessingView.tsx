import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface ProcessingViewProps {
  fileName: string;
  file: File;
  onComplete: (processedImageUrl: string) => void;
}

export const ProcessingView = ({ fileName, file, onComplete }: ProcessingViewProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing image...");

  useEffect(() => {
    const processImage = async () => {
      try {
        setProgress(20);
        setStatus("Detecting watermark regions...");
        
        const reader = new FileReader();
        const imageData = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        setProgress(40);
        setStatus("Applying AI inpainting...");

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/remove-watermark`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData }),
        });

        setProgress(80);
        setStatus("Optimizing quality...");

        if (!response.ok) {
          throw new Error('Failed to process image');
        }

        const data = await response.json();
        
        setProgress(100);
        setStatus("Complete!");
        
        setTimeout(() => onComplete(data.processedImageUrl), 500);
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Processing Failed",
          description: "Failed to remove watermark. Please try again.",
          variant: "destructive",
        });
      }
    };

    processImage();
  }, [file, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-effect rounded-2xl p-8 shadow-elegant">
        <div className="flex flex-col items-center space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-pulse">
              {progress === 100 ? (
                <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
              ) : (
                <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
              )}
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
          </div>

          {/* File name */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Processing {fileName}</h3>
            <p className="text-sm text-muted-foreground">{status}</p>
          </div>

          {/* Progress bar */}
          <div className="w-full space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">AI</div>
              <div className="text-xs text-muted-foreground">Powered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">HD</div>
              <div className="text-xs text-muted-foreground">Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">Fast</div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
