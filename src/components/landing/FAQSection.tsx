import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Is this a real interview?",
      answer: "No, these are AI-powered mock interviews designed to simulate real interview scenarios. They help you practice in a safe environment before your actual interviews.",
    },
    {
      question: "How is feedback generated?",
      answer: "Our advanced AI analyzes your responses in real-time, evaluating factors like clarity, structure, confidence, domain knowledge, and adherence to frameworks like STAR. You receive instant, actionable feedback.",
    },
    {
      question: "Can I upload my own resume?",
      answer: "Yes! You can upload your resume to get personalized interview questions tailored to your experience and the roles you're targeting.",
    },
    {
      question: "What languages are supported?",
      answer: "Currently, InterviewAI supports English. We're working on adding support for more languages including Spanish, French, German, and Mandarin.",
    },
    {
      question: "How many interviews can I practice?",
      answer: "Free users get 3 practice interviews. Pro users get unlimited interviews with advanced analytics and custom scenarios.",
    },
  ];
  
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Frequently Asked
            <span className="text-primary"> Questions</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Everything you need to know about InterviewAI
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="glass-card px-5 border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            >
              <AccordionTrigger className="text-left text-sm font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
