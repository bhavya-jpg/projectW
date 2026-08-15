"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Reveal } from "./reveal";

interface ProcessStep {
  id: number;
  number: string;
  tag: string;
  title: string;
  description: string;
  filename: string;
  codeLines: string[];
  status: string;
}

const steps: ProcessStep[] = [
  {
    id: 0,
    number: "I",
    tag: "01 / DISCOVERY",
    title: "Deep dive into your needs",
    description: "We start with a thorough understanding of your business, goals, and challenges to define the right AI-powered solution.",
    filename: "discovery.ts",
    codeLines: [
      "// Step 1: Discovery & System Analysis",
      "",
      "await deWork.discover({",
      "  business: 'your-company',",
      "  goals: ['automate-workflows', 'scale-capacity'],",
      "  timeline: '4-6 weeks'",
      "});",
      "",
      "// Tailored AI architecture defined"
    ],
    status: "System audit & requirements mapped cleanly."
  },
  {
    id: 1,
    number: "II",
    tag: "02 / PROTOTYPING",
    title: "Rapid prototyping",
    description: "We build fast, iterate based on your feedback, and refine the solution until it matches your vision perfectly.",
    filename: "prototype.ts",
    codeLines: [
      "// Step 2: Agile Prototyping & Benchmarks",
      "",
      "const mvp = await deWork.prototype({",
      "  approach: 'agile-sprints',",
      "  iterations: 'real-time-feedback',",
      "  evaluation: 'precision-benchmarks'",
      "});",
      "",
      "// Production MVP ready in weeks"
    ],
    status: "Benchmark complete. Accuracy score: 99.4%."
  },
  {
    id: 2,
    number: "III",
    tag: "03 / DEPLOYMENT",
    title: "Production-ready delivery",
    description: "We build the robust, scalable production solution and deploy it — with ongoing support to keep you ahead of the curve.",
    filename: "deploy.ts",
    codeLines: [
      "// Step 3: Enterprise Deployment & Scale",
      "",
      "await deWork.deploy({",
      "  target: 'production-edge-cluster',",
      "  monitoring: '24-7-automated',",
      "  scale: 'infinite-auto-scaling'",
      "});",
      "",
      "// Live in production & 24/7 supported"
    ],
    status: "Live in production. Edge cluster healthy."
  }
];

function SyntaxLine({ text }: { text: string }) {
  if (text.startsWith("//")) {
    return <span className="text-emerald-400/80 italic">{text}</span>;
  }

  const tokens = text.split(/('(?:\\'|[^'])*'|\b(?:await|const|deWork|discover|prototype|deploy)\b|[{}(),:;])/g);

  return (
    <span>
      {tokens.map((token, idx) => {
        if (!token) return null;
        if (token.startsWith("'") && token.endsWith("'")) {
          return <span key={idx} className="text-amber-300">{token}</span>;
        }
        if (["await", "const"].includes(token)) {
          return <span key={idx} className="text-pink-400 font-semibold">{token}</span>;
        }
        if (["deWork", "discover", "prototype", "deploy"].includes(token)) {
          return <span key={idx} className="text-sky-300 font-medium">{token}</span>;
        }
        if (["{", "}", "(", ")", ",", ":", ";"].includes(token)) {
          return <span key={idx} className="text-white/40">{token}</span>;
        }
        if (token.includes("business") || token.includes("goals") || token.includes("timeline") || token.includes("approach") || token.includes("iterations") || token.includes("evaluation") || token.includes("target") || token.includes("monitoring") || token.includes("scale")) {
          return <span key={idx} className="text-purple-300">{token}</span>;
        }
        return <span key={idx} className="text-gray-200">{token}</span>;
      })}
    </span>
  );
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentStep = steps[activeStep];
  const fullCodeText = currentStep.codeLines.join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCodeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 bg-background text-foreground font-sans overflow-hidden"
    >
      {/* Background Subtle Mesh Radial Accent */}
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/10 via-foreground/5 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching site theme */}
        <Reveal>
          <SectionHeader
            title={<span className="font-sans">Our development process.</span>}
            subtitle="From idea to launch."
            className="pb-6 lg:pb-10"
          />
        </Reveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Step Cards */}
          <div className="lg:col-span-5 space-y-4 font-sans">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
                Phase {activeStep + 1} of {steps.length}
              </span>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(index)}
                    className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                      isActive
                        ? "bg-card shadow-lg border-foreground/30 ring-1 ring-foreground/10"
                        : "bg-card/40 border-border/60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Roman Numeral Badge */}
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-sans font-bold text-sm transition-colors ${
                          isActive
                            ? "bg-foreground text-background shadow-sm"
                            : "bg-muted/70 text-muted-foreground"
                        }`}
                      >
                        {step.number}
                      </div>

                      <div className="flex-1 min-w-0 font-sans">
                        <div className="mb-1.5">
                          <span className="text-[11px] font-sans tracking-wider text-muted-foreground/80 uppercase">
                            {step.tag}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                          {step.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>

                        {/* Animated Progress Bar on Active Card */}
                        {isActive && (
                          <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 5,
                                ease: "linear",
                                repeat: Infinity,
                              }}
                              className="h-full bg-primary"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Unified Terminal Mockup Window */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-[#0b0f17] shadow-2xl overflow-hidden font-mono text-sm">
              
              {/* Terminal Window Header - Same frame for all 3 steps */}
              <div className="px-5 py-3.5 bg-[#121824] border-b border-white/10 flex items-center justify-between select-none">
                {/* Controls */}
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                </div>

                {/* File tab name */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0b0f17] border border-white/10 text-xs text-white/80">
                  <Terminal className="size-3.5 text-sky-400" />
                  <span>{currentStep.filename}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Content Container */}
              <div className="p-6 sm:p-8 min-h-[310px] text-xs sm:text-sm leading-relaxed overflow-x-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-1"
                  >
                    {currentStep.codeLines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex items-start gap-4 hover:bg-white/[0.03] rounded px-1 -mx-1 py-0.5">
                        <span className="w-6 shrink-0 text-right text-white/20 select-none text-xs">
                          {lineIdx + 1}
                        </span>
                        <div className="flex-1 font-mono">
                          <SyntaxLine text={line} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Terminal Console Footer / CLI Status */}
              <div className="px-5 py-3.5 bg-[#0e131d] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-white/80">{currentStep.status}</span>
                </div>
                <span className="text-white/30 font-mono text-[11px]">deWork CLI v2.4</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

