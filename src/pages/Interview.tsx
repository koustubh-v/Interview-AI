import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Bookmark, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Interview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  
  const questions = [
    "Tell me about yourself and your experience.",
    "What interests you about this role?",
    "Describe a challenging project you worked on.",
    "How do you handle conflicts in a team environment?",
  ];
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation showProfile={true} />
      
      {/* Single Page Layout */}
      <div className="flex-1 flex flex-col container mx-auto px-4 md:px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {/* Top Section: Progress and Info */}
          <div className="mb-4 md:mb-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Software Engineer Interview</h1>
                <p className="text-sm text-muted-foreground">Question 3 of 10</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="glass-button">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="glass-button">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex gap-1.5">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                    i < 3 ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6 flex-1">
            {/* Left Column: AI Avatar and Controls */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {/* AI Avatar */}
              <GlassCard className="text-center animate-scale-in flex-1 flex flex-col justify-center py-6 md:py-8">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full bg-primary/10 border-2 border-primary/30 animate-glow-pulse flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-card flex items-center justify-center border-2 border-primary/20">
                    <div className="text-3xl md:text-4xl">🤖</div>
                  </div>
                </div>
                
                <h2 className="text-lg md:text-xl font-bold mb-2">AI Interviewer</h2>
                <p className="text-xs md:text-sm text-muted-foreground px-4">Listening to your response...</p>
              </GlassCard>
              
              {/* Recording Controls */}
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
                  
                  {isRecording && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="flex justify-center gap-0.5 h-12">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-primary rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 40 + 10}px`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-primary">00:45</div>
                      <p className="text-xs md:text-sm text-muted-foreground">Recording...</p>
                    </div>
                  )}
                  
                  {!isRecording && (
                    <div className="space-y-2">
                      <p className="text-sm md:text-base font-semibold">Ready to answer</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Click the mic to start</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
            
            {/* Right Column: Question and Actions */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Question Card */}
              <GlassCard className="animate-fade-in-up flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-base md:text-xl font-semibold flex-1">{currentQuestion}</h3>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 shrink-0">
                    <Bookmark className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium">Behavioral</span>
                  <span className="px-2 md:px-3 py-1 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium">STAR Framework</span>
                </div>
                
                <div className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50 flex-1">
                  <p className="text-xs md:text-sm font-medium mb-2">💡 Tips for great answers:</p>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>Structure using STAR (Situation, Task, Action, Result)</li>
                    <li>Be specific with numbers and outcomes</li>
                    <li>Keep your response under 2 minutes</li>
                    <li>Speak clearly and maintain confidence</li>
                  </ul>
                </div>
              </GlassCard>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Button variant="outline" className="glass-button hover:shadow-md transition-shadow">
                  <FileText className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Type Answer</span>
                  <span className="sm:hidden">Type</span>
                </Button>
                <Link to="/feedback" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                    Next Question
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
