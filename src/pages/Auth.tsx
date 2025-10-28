// src/pages/Auth.tsx
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/use-auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth(); // <-- 2. Get auth functions
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For registration
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // useAuth handles login, errors, and navigation
        await login(email, password);
      } else {
        // useAuth handles registration and errors
        await register(email, password);
        // After successful registration, switch to login view
        setIsLogin(true);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // Errors are handled by the toast in useAuth, but we stop loading
      console.error("Auth failed:", error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 md:p-6">
      {/* ... (background effects are fine) ... */}
      <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          <span className="text-xl md:text-2xl font-bold text-primary">InterviewAI</span>
        </Link>
        
        <GlassCard className="p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {isLogin 
                ? "Sign in to continue your interview practice" 
                : "Start your journey to interview success"}
            </p>
          </div>
          
          {/* ... (Social login buttons are fine) ... */}
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
            </div>
          </div>
          
          {/* 3. Wire up the form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="glass-card border-primary/20 focus:border-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                className="glass-card border-primary/20 focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="glass-card border-primary/20 focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* ... (Forgot password link is fine) ... */}
            
            <Button 
              type="submit" // 4. Change to type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 md:py-6 shadow-lg shadow-primary/30 transition-all"
              disabled={isLoading} // 5. Disable when loading
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isLogin 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <span className="text-primary font-semibold">
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Auth;