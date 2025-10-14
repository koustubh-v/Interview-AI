import { GlassCard } from "@/components/ui/glass-card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: "SC",
      content: "InterviewAI helped me land my dream job! The AI feedback was incredibly detailed and helped me improve my communication skills.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Microsoft",
      avatar: "MR",
      content: "The mock interviews felt so real. I practiced 20+ interviews and felt completely prepared for the actual one.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Data Scientist at Amazon",
      avatar: "EW",
      content: "The performance dashboard showed me exactly where I needed to improve. Highly recommend to anyone preparing for interviews!",
      rating: 5,
    },
  ];
  
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(207_34%_36%/0.03),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Loved by
            <span className="text-primary"> Professionals</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Join thousands who transformed their interview skills
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlassCard 
              key={index} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
