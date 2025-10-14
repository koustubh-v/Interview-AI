import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Play, History, TrendingUp, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [hasCompletedInterview, setHasCompletedInterview] = useState(false);
  
  useEffect(() => {
    // Show profile popup for first-time users
    const hasVisited = localStorage.getItem("hasVisitedDashboard");
    if (!hasVisited) {
      setShowProfilePopup(true);
      localStorage.setItem("hasVisitedDashboard", "true");
    }
    
    // Check if user has completed interviews
    const completedInterviews = localStorage.getItem("completedInterviews");
    setHasCompletedInterview(!!completedInterviews);
  }, []);
  
  const stats = [
    { label: "Interviews Left", value: "2", icon: Play },
    { 
      label: "Total Completed", 
      value: hasCompletedInterview ? "1" : "No interviews yet.", 
      icon: History 
    },
    { 
      label: "Average Score", 
      value: hasCompletedInterview ? "8.5/10" : "No interviews yet.", 
      icon: TrendingUp 
    },
    { label: "Membership", value: "Buy Now", icon: CreditCard },
  ];
  
  const recentInterviews = hasCompletedInterview ? [
    { date: "2025-01-08", role: "Software Engineer", company: "Google", score: 9.2 },
  ] : [];
  
  return (
    <div className="min-h-screen pb-20">
      <Navigation showProfile={true} />
      
      {/* Profile Update Popup */}
      <Dialog open={showProfilePopup} onOpenChange={setShowProfilePopup}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl">Welcome to InterviewAI! 🎉</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Let's set up your profile to get personalized interview experiences tailored just for you.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowProfilePopup(false)} className="glass-button">
              Skip for Now
            </Button>
            <Link to="/profile">
              <Button className="bg-primary hover:bg-primary/90">
                Update Profile
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <div className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Welcome back, <span className="text-primary">John</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground">
            Ready to practice your next interview?
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <GlassCard 
              key={index}
              className="animate-scale-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <div className="text-base md:text-xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </GlassCard>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Start Interview */}
          <div className="lg:col-span-2">
            <GlassCard className="animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Start New Interview</h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className="p-4 md:p-6 rounded-xl bg-primary/5 border border-primary/20">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Quick Start</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    Jump into a personalized mock interview tailored to your profile
                  </p>
                  <Link to="/interview">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/30 transition-all">
                      <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" style={{ color: 'hsl(var(--primary-foreground))' }} />
                      Start Interview Now
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 rounded-xl glass-card glass-hover cursor-pointer">
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Software Engineering</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Technical & behavioral questions</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl glass-card glass-hover cursor-pointer">
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Product Management</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Strategy & leadership focus</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl glass-card glass-hover cursor-pointer">
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Data Science</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">Analytics & ML questions</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl glass-card glass-hover">
                    <h4 className="text-sm md:text-base font-semibold mb-2">Custom Role</h4>
                    <Input 
                      placeholder="Enter your role..." 
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="glass-button text-xs md:text-sm h-8"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Recent Interviews */}
          <div className="space-y-4 md:space-y-6">
            <GlassCard className="animate-fade-in-up" style={{ animationDelay: "0.1s" } as React.CSSProperties}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Interviews</h2>
              
              {recentInterviews.length > 0 ? (
                <div className="space-y-2 md:space-y-3">
                  {recentInterviews.map((interview, index) => (
                    <Link key={index} to="/feedback">
                      <div className="p-3 rounded-lg glass-card glass-hover cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-sm font-semibold">{interview.role}</div>
                            <div className="text-xs text-muted-foreground">{interview.company}</div>
                          </div>
                          <div className="text-base md:text-lg font-bold text-primary">{interview.score}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{interview.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <History className="h-8 w-8" style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    No interviews yet. Start your first interview to see your progress!
                  </p>
                  <Link to="/interview">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Play className="mr-2 h-4 w-4" style={{ color: 'hsl(var(--primary-foreground))' }} />
                      Start First Interview
                    </Button>
                  </Link>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
