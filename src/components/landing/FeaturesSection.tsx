import { GlassCard } from "@/components/ui/glass-card";
import { Mic, MessageSquare, TrendingUp, Shield, Target, Zap } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "AI-Driven Mock Interviews",
      description: "Simulate real interview scenarios tailored to your job role and industry.",
    },
    {
      icon: Mic,
      title: "Real-Time Voice Feedback",
      description: "AI listens, scores, and guides your responses instantly with actionable insights.",
    },
    {
      icon: TrendingUp,
      title: "Performance Dashboard",
      description: "Track your growth across communication, confidence, and domain expertise.",
    },
    {
      icon: MessageSquare,
      title: "STAR Framework Analysis",
      description: "Master behavioral interviews with structured response evaluation.",
    },
    {
      icon: Zap,
      title: "Instant AI Scoring",
      description: "Get detailed scores on every response with improvement suggestions.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your interview data is private and secure. We never share recordings.",
    },
  ];
  
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Everything You Need to
            <br />
            <span className="text-primary">Ace Your Interviews</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Powered by advanced AI to help you practice, improve, and succeed
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard 
              key={index} 
              hover 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
