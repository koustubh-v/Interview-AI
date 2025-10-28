// src/pages/Feedback.tsx
import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Download, Play, Home, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { FeedbackResponse, interviewAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!sessionId) {
      toast({ title: "Error", description: "No interview session specified.", variant: "destructive" });
      return;
    }
    
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const data = await interviewAPI.getFeedback(sessionId);
        setFeedback(data);
      } catch (error) {
        console.error("Failed to get feedback:", error);
        toast({ title: "Error", description: "Could not load feedback.", variant: "destructive" });
      }
      setIsLoading(false);
    };

    fetchFeedback();
  }, [sessionId, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground mt-4">Generating your feedback report...</p>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-muted-foreground mt-2">Could not load feedback for this session.</p>
        <Link to="/dashboard" className="mt-4">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center text-3xl md:text-4xl font-bold text-white animate-scale-in shadow-lg shadow-primary/30">
                {feedback.overall_score.toFixed(1)}
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              Great Job, <span className="text-primary">{user?.name || 'User'}!</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground">
              Here's your detailed performance analysis
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Detailed Feedback Section */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.2s" } as React.CSSProperties}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Detailed Feedback</h2>
                
                {/* Render the markdown feedback. Using <pre> to preserve whitespace */}
                <pre className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap font-sans">
                  {feedback.detailed_feedback}
                </pre>
              </GlassCard>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-4 md:space-y-6">
              <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.3s" } as React.CSSProperties}>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Actions</h3>
                
                <div className="space-y-2 md:space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report (Soon)
                  </Button>
                  
                  <Button variant="outline" className="w-full glass-card" disabled>
                    <Play className="mr-2 h-4 w-4" />
                    Play Recording (Soon)
                  </Button>
                  
                  <Link to="/dashboard" className="block">
                    <Button variant="outline" className="w-full glass-card">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </GlassCard>
              
              <GlassCard className="p-4 md:p-6 bg-primary/5 border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.5s" } as React.CSSProperties}>
                <h3 className="text-sm md:text-base font-bold mb-2">Keep Practicing! 🎯</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  You have {(user?.free_interviews || 0) + (user?.paid_interviews || 0)} interviews left.
                </p>
                <Link to="/dashboard">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Start Another Interview
                  </Button>
                </Link>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;