"use client";

import { useEffect, useState, useRef } from "react";
import { HelpCircle, Clock, Users, Wrench, Rocket, HeadphonesIcon } from "lucide-react";

const faqItems = [
  {
    icon: HelpCircle,
    question: "What primary AI products and custom solutions does deWork Labs specialize in?",
    answer: "We build production-ready AI systems tailored to your workflows, including 24/7 AI Voice Agents (for automated lead qualification and booking), Drape AI (studio-quality virtual photoshoot pipelines for fashion brands), Smart CRM Suite (intelligent pipeline automation), and AI Brain (secure internal RAG knowledge bases).",
  },
  {
    icon: HeadphonesIcon,
    question: "How do your AI Voice Agents handle real customer calls and bookings?",
    answer: "Our conversational AI voice agents answer inbound calls 24/7 with under 2-second response latency. They naturally qualify leads, answer FAQs, handle objections, and integrate directly with your Cal.com, Google Calendar, or CRM to schedule appointments automatically.",
  },
  {
    icon: Wrench,
    question: "What is Drape AI and how does it reduce photoshoot costs?",
    answer: "Drape AI is our proprietary generative AI workflow for fashion and e-commerce brands. It transforms standard flat-lay garment or basic model photos into studio-grade imagery with customizable models and poses, cutting traditional photoshoot costs by up to 90%.",
  },
  {
    icon: Users,
    question: "How does the AI Brain work with our internal company data?",
    answer: "AI Brain is a private, secure Retrieval-Augmented Generation (RAG) system. We index your company documents, Slack archives, Notion pages, and Drive files into an internal AI assistant that provides instant, verified answers with source citations while keeping your data strictly confidential.",
  },
  {
    icon: Clock,
    question: "How quickly can we launch a custom AI MVP or integrate your solutions?",
    answer: "Rapid prototypes and custom AI MVPs are typically delivered within 4 to 6 weeks. Turnkey products like our AI Voice Agent or Smart CRM integration can be deployed even faster depending on your tech stack.",
  },
  {
    icon: Rocket,
    question: "Can you integrate AI models with our existing tech stack, CRM, and APIs?",
    answer: "Yes! We build secure middleware and API connectors so our AI Voice Agents, CRM tools, and AI Brain integrate directly with your existing databases, Salesforce, HubSpot, Stripe, or proprietary internal APIs without disrupting your current operations.",
  },
];

export function Faq() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              FAQ
            </span>
            <h2 className="text-4xl lg:text-6xl font-serif font-semibold leading-[1.08] tracking-tight text-balance text-foreground mb-8">
              Frequently asked
              <br />
              questions.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Everything you need to know about working with us. 
              Can&apos;t find what you&apos;re looking for? Book a call and we&apos;ll be happy to help.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {["AI Solutions", "Web Products", "Enterprise Ready", "24/7 Support", "Fast Delivery"].map((badge, index) => (
                <span
                  key={badge}
                  className={`px-4 py-2 border border-foreground/10 text-sm font-medium transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="grid gap-0">
            {faqItems.map((item, index) => (
              <div
                key={item.question}
                className={`border-b border-foreground/10 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left py-6 flex items-start gap-4 group"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {item.question}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openIndex === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xl text-muted-foreground mt-2 transition-transform duration-300">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
