import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(207_34%_36%/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(208_24%_56%/0.05),transparent_50%)]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-block">
              <span className="px-3 py-1.5 rounded-full glass-card text-primary text-xs font-medium">
                🚀 AI-Powered Interview Practice
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Your AI-Powered
              <br />
              <span className="text-primary">Interview Coach</span>
            </h1>
            
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              Practice real interviews, get AI-driven feedback, and grow your confidence.
              Master every interview with personalized coaching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="font-medium group"
                >
                  Try InterviewAI
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="glass"
                className="font-medium"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              ✨ No signup required. Try your first interview free.
            </p>
          </div>
          
          {/* Right mockup */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-6 rounded-2xl">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-border/50">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 border border-primary/30 animate-float flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">AI Interview Dashboard</p>
                  <p className="text-xs text-muted-foreground">Interactive mock preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
