// src/pages/Profile.tsx
import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect, FormEvent } from "react";
import { userAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Profile = () => {
  const { user, refreshUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load user data into form when auth is ready
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setTargetRole(user.target_role || "");
      setExperienceLevel(user.experience_level || "");
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await userAPI.updateMe({
        name: name,
        target_role: targetRole,
        experience_level: experienceLevel,
      });
      await refreshUser(); // Refresh user data in the auth context
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Could not update your profile.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  
  if (authLoading) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground mt-4">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navigation showProfile={true} />
      
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32">
        <div className="mb-6 md:mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Edit Profile
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Update your profile to get personalized interview experiences.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <GlassCard className="animate-fade-in">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Profile Picture (Non-functional) */}
                <div className="flex flex-col items-center gap-4 pb-6 border-b border-border/50">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="glass-button" disabled>
                    Upload Photo (Soon)
                  </Button>
                </div>
                
                {/* Basic Details */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="glass-button"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="glass-button"
                    value={user?.email || ""}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobRole" className="text-sm">Current/Target Job Role</Label>
                  <Input 
                    id="jobRole" 
                    placeholder="e.g., Software Engineer" 
                    className="glass-button"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm">Experience Level</Label>
                   <Select
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    <SelectTrigger className="w-full glass-button" id="experience">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry-level">Entry-level / Fresher</SelectItem>
                      <SelectItem value="Mid-level">Mid-level (2-5 years)</SelectItem>
                      <SelectItem value="Senior-level">Senior-level (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Save Button */}
                <div className="flex justify-end gap-3 pt-4">
                  <Link to="/dashboard">
                    <Button type="button" variant="outline" className="glass-button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;