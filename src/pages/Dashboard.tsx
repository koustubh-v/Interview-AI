// src/pages/Dashboard.tsx
import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Play, History, TrendingUp, CreditCard, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { interviewAPI, Interview } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [history, setHistory] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false); // For starting new interview

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch user's history on load
  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const historyData = await interviewAPI.getHistory();
        setHistory(historyData);

        // Show profile popup if user has no name/role and hasn't dismissed it
        const hasVisited = localStorage.getItem("hasVisitedDashboard");
        if (!hasVisited && (!user?.name || !user?.target_role)) {
          setShowProfilePopup(true);
          localStorage.setItem("hasVisitedDashboard", "true");
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        toast({
          title: "Error",
          description: "Could not load your interview history.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };

    if (user) {
      loadDashboard();
    }
  }, [user, toast]);

  // Calculate stats from dynamic data
  const stats = useMemo(() => {
    const totalCompleted = history.length;
    const avgScore =
      totalCompleted > 0
        ? (history.reduce((acc, h) => acc + (h.overall_score || 0), 0) / totalCompleted).toFixed(1)
        : "N/A";

    return [
      { label: "Interviews Left", value: (user?.free_interviews || 0) + (user?.paid_interviews || 0), icon: Play },
      { label: "Total Completed", value: totalCompleted, icon: History },
      { label: "Average Score", value: totalCompleted > 0 ? `${avgScore}/10` : "No scores yet", icon: TrendingUp },
      { label: "Membership", value: (user?.paid_interviews || 0) > 0 ? "Premium" : "Free", icon: CreditCard },
    ];
  }, [user, history]);

  // Function to create a new session and navigate to it
  const handleStartInterview = async (role?: string) => {
    setIsStarting(true);
    const interviewRole = role || user?.target_role || "Software Engineer";

    try {
      const { session_id } = await interviewAPI.createSession();
      // Pass the role and user data to the interview page via state
      navigate(`/interview/${session_id}`, {
        state: {
          role: interviewRole,
          experience: user?.experience_level || 'Fresher',
          name: user?.name || 'Candidate'
        }
      });
    } catch (error: any) {
      console.error("Failed to create session:", error);
      const errorMsg = error.response?.data?.error || "Could not start interview.";
      toast({
        title: "Error starting interview",
        description: errorMsg,
        variant: "destructive",
      });
      setIsStarting(false);
    }
  };

  const recentInterviews = history.slice(0, 3); // Get 3 most recent

  return (
    <div className="min-h-screen pb-20">
      <Navigation showProfile={true} />
      
      {/* Profile Update Popup */}
      <Dialog open={showProfilePopup} onOpenChange={setShowProfilePopup}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl">Welcome to InterviewAI! 🎉</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Let's set up your profile to get personalized interview experiences.
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
            Welcome back, <span className="text-primary">{user?.name || 'User'}</span>
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
                    Jump into an interview for your target role: 
                    <strong> {user?.target_role || "Software Engineer"}</strong>
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/30 transition-all"
                    onClick={() => handleStartInterview(user?.target_role)}
                    disabled={isStarting}
                  >
                    {isStarting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />}
                    Start Interview Now
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <Button variant="outline" className="p-3 md:p-4 h-auto rounded-xl glass-card glass-hover cursor-pointer text-left justify-start" onClick={() => handleStartInterview("Software Engineer")} disabled={isStarting}>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Software Engineering</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">Technical & behavioral questions</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-3 md:p-4 h-auto rounded-xl glass-card glass-hover cursor-pointer text-left justify-start" onClick={() => handleStartInterview("Product Manager")} disabled={isStarting}>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Product Management</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">Strategy & leadership focus</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-3 md:p-4 h-auto rounded-xl glass-card glass-hover cursor-pointer text-left justify-start" onClick={() => handleStartInterview("Data Scientist")} disabled={isStarting}>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2">Data Science</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">Analytics & ML questions</p>
                    </div>
                  </Button>
                  <div className="p-3 md:p-4 rounded-xl glass-card glass-hover">
                    <h4 className="text-sm md:text-base font-semibold mb-2">Custom Role</h4>
                    <Input 
                      placeholder="Enter your role..." 
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="glass-button text-xs md:text-sm h-8"
                      onKeyDown={(e) => { if (e.key === 'Enter' && customRole) handleStartInterview(customRole); }}
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
              
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground mt-4">Loading history...</p>
                </div>
              ) : recentInterviews.length > 0 ? (
                <div className="space-y-2 md:space-y-3">
                  {recentInterviews.map((interview) => (
                    <Link key={interview.id} to={`/feedback/${interview.id}`}>
                      <div className="p-3 rounded-lg glass-card glass-hover cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-sm font-semibold">{interview.user_data?.role || 'Interview'}</div>
                            <div className="text-xs text-muted-foreground">{new Date(interview.created_at).toLocaleDateString()}</div>
                          </div>
                          <div className="text-base md:text-lg font-bold text-primary">{interview.overall_score?.toFixed(1)}</div>
                        </div>
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