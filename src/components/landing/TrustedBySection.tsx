export const TrustedBySection = () => {
  const stats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "50,000+", label: "Interviews Practiced" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" },
  ];
  
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 animate-fade-in">
          <p className="text-muted-foreground text-sm mb-8">
            Trusted by professionals at top companies worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-scale-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
