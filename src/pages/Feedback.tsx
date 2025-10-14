import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Download, Play, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Feedback = () => {
  const scores = {
    communication: 8.5,
    domainKnowledge: 9.0,
    starFramework: 8.0,
    confidence: 8.8,
    problemSolving: 8.3,
  };
  
  const maxScore = 10;
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  
  return (
    <div className="min-h-screen pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center text-3xl md:text-4xl font-bold text-white animate-scale-in shadow-lg shadow-primary/30">
                {avgScore.toFixed(1)}
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              Great Job, <span className="text-primary">John!</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground">
              Here's your detailed performance analysis
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Radar Chart Section */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <GlassCard className="animate-fade-in-up">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Performance Breakdown</h2>
                
                <div className="space-y-4 md:space-y-6">
                  {Object.entries(scores).map(([category, score], index) => (
                    <div key={category} className="space-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="font-medium capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-bold text-primary">{score}/{maxScore}</span>
                      </div>
                      <div className="h-2.5 md:h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(score / maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              
              <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.2s" } as React.CSSProperties}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Detailed Feedback</h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-primary mb-2">✨ Strengths</h3>
                    <ul className="space-y-1.5 md:space-y-2 text-muted-foreground text-xs md:text-sm">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Excellent use of specific examples and quantifiable results</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Strong confidence and clear articulation of thoughts</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Good technical depth in explaining complex concepts</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-secondary mb-2">💡 Areas for Improvement</h3>
                    <ul className="space-y-1.5 md:space-y-2 text-muted-foreground text-xs md:text-sm">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Consider structuring responses more explicitly using STAR framework</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Add more context about team dynamics and collaboration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-4 md:space-y-6">
              <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.3s" } as React.CSSProperties}>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Actions</h3>
                
                <div className="space-y-2 md:space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  
                  <Button variant="outline" className="w-full glass-card">
                    <Play className="mr-2 h-4 w-4" />
                    Play Recording
                  </Button>
                  
                  <Link to="/dashboard" className="block">
                    <Button variant="outline" className="w-full glass-card">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </GlassCard>
              
              <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.4s" } as React.CSSProperties}>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Model Answer</h3>
                
                <div className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    "In my previous role at TechCorp, we faced a critical deadline when our main server crashed 48 hours before launch..."
                  </p>
                </div>
                
                <Button variant="link" className="text-primary p-0 mt-2 text-xs md:text-sm">
                  Read full model answer →
                </Button>
              </GlassCard>
              
              <GlassCard className="p-4 md:p-6 bg-primary/5 border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.5s" } as React.CSSProperties}>
                <h3 className="text-sm md:text-base font-bold mb-2">Keep Practicing! 🎯</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  You have 2 interviews left this month
                </p>
                <Link to="/interview">
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
