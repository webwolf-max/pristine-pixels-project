import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { UploadZone } from "@/components/UploadZone";
import { ProcessingView } from "@/components/ProcessingView";
import { ResultsView } from "@/components/ResultsView";

type ViewState = "hero" | "upload" | "processing" | "results";

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>("hero");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string>("");

  const handleGetStarted = () => {
    setViewState("upload");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setViewState("processing");
  };

  const handleProcessingComplete = () => {
    // In a real app, this would be the actual processed image URL
    // For now, we'll use the original as a demo
    if (selectedFile) {
      setProcessedUrl(URL.createObjectURL(selectedFile));
      setViewState("results");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setProcessedUrl("");
    setViewState("upload");
  };

  return (
    <div className="min-h-screen">
      {viewState === "hero" && <HeroSection onGetStarted={handleGetStarted} />}
      
      {viewState === "upload" && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Upload Your File
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose an image or video with a watermark to remove
            </p>
          </div>
          <UploadZone onFileSelect={handleFileSelect} />
        </section>
      )}
      
      {viewState === "processing" && selectedFile && (
        <section className="container mx-auto px-4 py-20">
          <ProcessingView
            fileName={selectedFile.name}
            onComplete={handleProcessingComplete}
          />
        </section>
      )}
      
      {viewState === "results" && selectedFile && processedUrl && (
        <section className="container mx-auto px-4 py-20">
          <ResultsView
            originalFile={selectedFile}
            processedUrl={processedUrl}
            onReset={handleReset}
          />
        </section>
      )}
    </div>
  );
};

export default Index;
