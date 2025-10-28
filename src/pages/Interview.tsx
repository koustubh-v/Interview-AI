// src/pages/Interview.tsx
import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Bookmark, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { interviewAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

// Define a type for the interview turn state
interface InterviewTurn {
  question: string;
  phase: string;
  question_counter: number;
}

const Interview = () => {
  const [currentTurn, setCurrentTurn] = useState<InterviewTurn | null>(null);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false); // Placeholder for audio logic
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { sessionId } = useParams<{ sessionId: string }>();
  const { state } = useLocation(); // To get role/user data from Dashboard
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const totalQuestions = 8; // You can make this dynamic later

  // 1. Start the interview on page load
  useEffect(() => {
    if (!sessionId || !state || !user) {
      toast({ title: "Error", description: "Missing interview data.", variant: "destructive" });
      navigate("/dashboard");
      return;
    }

    const startInterview = async () => {
      setIsLoading(true);
      try {
        const userData = {
          name: state.name,
          role: state.role,
          experience: state.experience
        };
        
        const firstTurn: InterviewTurn = await interviewAPI.startInterview(
          sessionId,
          userData
        );
        setCurrentTurn(firstTurn);
      } catch (error: any) {
        console.error("Failed to start interview:", error);
        const errorMsg = error.response?.data?.error || "Could not start interview.";
        toast({ title: "Error", description: errorMsg, variant: "destructive" });
        navigate("/dashboard");
      }
      setIsLoading(false);
    };

    startInterview();
  }, [sessionId, state, user, navigate, toast]);

  // 2. Handle submitting an answer
  const handleSubmitAnswer = async () => {
    if (!sessionId || !answer) {
      toast({ title: "Please provide an answer", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // We'll submit the text answer for now.
      // Audio logic would go here, setting 'answer' from transcription.
      const response = await interviewAPI.submitAnswer(sessionId, answer);

      // Show live feedback
      if (response.feedback) {
        toast({ title: "Quick Tip", description: response.feedback });
      }

      setAnswer(""); // Clear textarea

      if (response.interview_complete) {
        // 3. Interview is over, go to feedback page
        toast({ title: "Interview Complete!", description: "Generating your feedback..." });
        navigate(`/feedback/${sessionId}`);
      } else {
        // 4. Load the next question
        setCurrentTurn({
          question: response.question,
          phase: response.phase,
          question_counter: response.question_counter
        });
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      toast({ title: "Error", description: "Could not submit your answer.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };
  
  if (isLoading || !currentTurn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground mt-4">Preparing your interview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation showProfile={true} />
      
      <div className="flex-1 flex flex-col container mx-auto px-4 md:px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {/* Top Section: Progress and Info */}
          <div className="mb-4 md:mb-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{state?.role || 'Interview'}</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentTurn.question_counter} of {totalQuestions}
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex gap-1.5">
              {[...Array(totalQuestions)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                    i < currentTurn.question_counter ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6 flex-1">
            {/* Left Column: AI Avatar and Controls */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <GlassCard className="text-center animate-scale-in flex-1 flex flex-col justify-center py-6 md:py-8">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full bg-primary/10 border-2 border-primary/30 animate-glow-pulse flex items-center justify-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-card flex items-center justify-center border-2 border-primary/20">
                    <div className="text-3xl md:text-4xl">🤖</div>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl font-bold mb-2">AI Interviewer</h2>
                <p className="text-xs md:text-sm text-muted-foreground px-4">
                  {isRecording ? "Listening..." : "Ready for your answer"}
                </p>
              </GlassCard>
              
              <GlassCard className="animate-fade-in-up">
                <div className="text-center py-4 md:py-6">
                  <div className="flex justify-center mb-4">
                    <Button
                      size="lg"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 hover:scale-110 ${
                        isRecording 
                          ? "bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/50" 
                          : "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/50"
                      }`}
                    >
                      {isRecording ? <MicOff className="h-6 w-6 md:h-8 md:w-8" /> : <Mic className="h-6 w-6 md:h-8 md:w-8" />}
                    </Button>
                  </div>
                  <p className="text-sm md:text-base font-semibold">Voice Answer (Coming Soon)</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Please use the text box for now.</p>
                </div>
              </GlassCard>
            </div>
            
            {/* Right Column: Question and Actions */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <GlassCard className="animate-fade-in-up flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-base md:text-xl font-semibold flex-1">{currentTurn.question}</h3>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 shrink-0">
                    <Bookmark className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
                
                <div className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50 flex-1 mb-4">
                  <p className="text-xs md:text-sm font-medium mb-2">💡 Tips for great answers:</p>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>Structure using STAR (Situation, Task, Action, Result)</li>
                    <li>Be specific with numbers and outcomes</li>
                    <li>Keep your response concise</li>
                  </ul>
                </div>

                <Textarea 
                  className="glass-button min-h-[120px] text-sm"
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

              </GlassCard>
              
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                  onClick={handleSubmitAnswer}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Submit Answer & Get Next Question"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;