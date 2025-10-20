import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsViewProps {
  originalFile: File;
  processedUrl: string;
  onReset: () => void;
}

export const ResultsView = ({ originalFile, processedUrl, onReset }: ResultsViewProps) => {
  const [showComparison, setShowComparison] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [originalUrl] = useState(() => URL.createObjectURL(originalFile));

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `watermark-removed-${originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Watermark Removed!</h2>
          <p className="text-muted-foreground mt-1">Your file is ready to download</p>
        </div>
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="w-4 h-4" />
          Process Another
        </Button>
      </div>

      {/* Comparison Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 p-1 rounded-lg bg-muted">
          <button
            onClick={() => setShowComparison(true)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              showComparison
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            )}
          >
            <ArrowLeftRight className="w-4 h-4 inline mr-2" />
            Compare
          </button>
          <button
            onClick={() => setShowComparison(false)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              !showComparison
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            )}
          >
            Result Only
          </button>
        </div>
      </div>

      {/* Image Display */}
      <div className="relative rounded-2xl overflow-hidden shadow-elegant bg-card">
        {showComparison ? (
          <div className="relative aspect-video w-full">
            {/* Original Image */}
            <div className="absolute inset-0">
              <img
                src={originalUrl}
                alt="Original with watermark"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-destructive/90 text-destructive-foreground text-sm font-medium rounded-full">
                Before
              </div>
            </div>

            {/* Processed Image with Slider */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={processedUrl}
                alt="Processed without watermark"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent/90 text-accent-foreground text-sm font-medium rounded-full">
                After
              </div>
            </div>

            {/* Slider */}
            <div className="absolute inset-0 flex items-center">
              <div
                className="absolute w-1 h-full bg-primary shadow-glow"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary shadow-glow flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>
          </div>
        ) : (
          <div className="relative aspect-video w-full">
            <img
              src={processedUrl}
              alt="Processed without watermark"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          variant="hero"
          onClick={handleDownload}
          className="shadow-elegant"
        >
          <Download className="w-5 h-5" />
          Download Processed File
        </Button>
      </div>
    </div>
  );
};
