import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProcessingViewProps {
  fileName: string;
  onComplete: () => void;
}

export const ProcessingView = ({ fileName, onComplete }: ProcessingViewProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing image...");

  useEffect(() => {
    const stages = [
      { progress: 20, status: "Detecting watermark regions..." },
      { progress: 40, status: "Applying AI inpainting..." },
      { progress: 60, status: "Refining details..." },
      { progress: 80, status: "Optimizing quality..." },
      { progress: 100, status: "Complete!" },
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].progress);
        setStatus(stages[currentStage].status);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

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
