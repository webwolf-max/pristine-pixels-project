import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-watermark.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      
      {/* Animated circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Technology</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Remove Watermarks{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Advanced AI technology that cleanly removes watermarks from your images and videos in seconds. No technical skills required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                variant="hero"
                onClick={onGetStarted}
                className="shadow-elegant"
              >
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">100K+</div>
                <div className="text-sm text-muted-foreground">Files Processed</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">&lt;5s</div>
                <div className="text-sm text-muted-foreground">Avg. Time</div>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="AI Watermark Removal Demo" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-effect rounded-full px-6 py-3 shadow-elegant">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Processing in real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
