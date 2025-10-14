import { Navigation } from "@/components/Navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
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
            Update your profile information to get personalized interview experiences
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <GlassCard className="animate-fade-in">
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-border/50">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="glass-button">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
              
              {/* Basic Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    className="glass-button"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="glass-button"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="glass-button"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobRole" className="text-sm">Current/Target Job Role</Label>
                <Input 
                  id="jobRole" 
                  placeholder="Software Engineer" 
                  className="glass-button"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm">Current/Target Company</Label>
                <Input 
                  id="company" 
                  placeholder="Google" 
                  className="glass-button"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm">Years of Experience</Label>
                <Input 
                  id="experience" 
                  type="number" 
                  placeholder="3" 
                  className="glass-button"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm">Bio / About You</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself, your skills, and your career goals..." 
                  className="glass-button min-h-[100px]"
                />
              </div>
              
              {/* Resume Upload */}
              <div className="space-y-2 pt-4 border-t border-border/50">
                <Label className="text-sm">Resume</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="glass-button flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resume (PDF)
                  </Button>
                  <span className="text-xs text-muted-foreground self-center">
                    No file uploaded
                  </span>
                </div>
              </div>
              
              {/* Save Button */}
              <div className="flex justify-end gap-3 pt-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="glass-button">
                    Cancel
                  </Button>
                </Link>
                <Button className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
