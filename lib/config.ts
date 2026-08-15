export const BOOKING_URL = "https://cal.com/dework-labs-hocfmt/30min";

export const COMPANY_LOGOS = [
  "Google",
  "Zomato",
  "Swiggy",
  "Snapbit",
  "Rapido",
  "Snitch",
  "Devon",
  "Drape AI"
];

export const SERVICES = [
  {
    title: "AI Voice Agents",
    slug: "ai-voice-agents",
    tag: "Voice AI",
    description: "Voice agents that handle customer conversations, qualify leads, book appointments, and route calls - around the clock.",
    image: "/services/voice-agents.webp",
    problem: "Inbound call volume was overwhelming the support staff, leading to long hold times, missed opportunities, and a poor customer experience outside of business hours.",
    solution: "We deployed a conversational AI voice agent capable of handling concurrent calls. It naturally answers FAQs, qualifies leads based on criteria, and schedules appointments directly into the calendar.",
    impact: "Achieved 24/7 coverage, handled 10,000+ monthly calls autonomously, and freed up human agents to focus on high-value escalations.",
    industryContext: "Voice AI is transitioning from basic IVR systems to truly conversational agents, fundamentally changing the cost structure of customer support and inbound sales."
  },
  {
    title: "Drape AI",
    slug: "drape-ai",
    tag: "Fashion AI",
    description: "An AI-powered fashion workflow that generates studio-quality model imagery without a traditional photoshoot.",
    image: "/services/drape-ai.webp",
    problem: "Traditional fashion model photoshoots are highly expensive, time-consuming, and logistically complex to organize.",
    solution: "We built a Fashion AI studio that takes standard model and clothing photos, allowing you to generate studio-quality, ultra-realistic fashion shoots with fully customizable poses.",
    impact: "Replaced highly expensive photoshoots, cutting content production costs by over 90% while accelerating time-to-market for new clothing collections.",
    industryContext: "AI is revolutionizing the fashion and e-commerce industries by digitizing content creation and reducing reliance on physical shoots."
  },
  {
    title: "Smart CRM Suite",
    slug: "smart-crm-suite",
    tag: "CRM & Sales",
    description: "An intelligent sales system that manages leads, deals, follow-ups, and customer context in one place.",
    image: "/services/smart-crm.webp",
    problem: "Sales teams were struggling with low CRM adoption due to clunky interfaces, leading to poor pipeline visibility and missed follow-ups. Reps spent too much time on manual data entry instead of selling.",
    solution: "We built a streamlined, AI-enhanced CRM that automates data capture and follow-ups. The dashboard surfaces intelligent next steps for each lead, minimizing manual work and keeping the pipeline moving.",
    impact: "Increased CRM adoption by 85%, reduced manual data entry by 15 hours per rep per week, and boosted lead-to-close rate by 22%.",
    industryContext: "In an increasingly competitive sales environment, minimizing friction in tooling is critical to keeping top performers focused on revenue-generating activities."
  },
  {
    title: "AI Brain",
    slug: "ai-brain",
    tag: "Knowledge Base",
    description: "A private intelligence layer that turns documents, policies, and internal data into an AI that your team can actually work with.",
    image: "/services/ai-brain.webp",
    problem: "Critical company knowledge was scattered across Google Drive, Slack, and email. Employees spent an average of 2 hours a day just searching for information or asking repetitive questions.",
    solution: "We developed a secure, internal RAG (Retrieval-Augmented Generation) system. By indexing all company documents, the 'AI Brain' acts as an instant expert, answering complex queries with citations.",
    impact: "Reduced time-to-information by 90% and cut repetitive internal support tickets in half within the first month of deployment.",
    industryContext: "As organizations scale, tribal knowledge becomes a bottleneck. Centralizing information via an AI layer ensures that every team member can make informed decisions quickly."
  }
];

export const PROJECTS = [
  {
    label: "/work/project-one",
    headline: "Automated Customer Support Agent",
    stats: ["3x faster processing", "50K+ users"],
    link: BOOKING_URL,
    image: "/placeholder-1.webp" 
  },
  {
    label: "/work/project-two",
    headline: "AI-Powered Knowledge Base",
    stats: ["90% accuracy", "100K+ docs"],
    link: BOOKING_URL,
    image: "/placeholder-2.webp"
  },
  {
    label: "/work/project-three",
    headline: "Internal Operations Copilot",
    stats: ["40h saved/week", "100% adoption"],
    link: BOOKING_URL,
    image: "/placeholder-3.webp"
  }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "Zomato",
    quote: "The AI integration they delivered completely transformed how we handle customer requests. Incredibly fast turnaround.",
    avatar: "/avatars/a1.png"
  },
  {
    name: "Mark T.",
    role: "CTO",
    company: "Swiggy",
    quote: "True professionals who understand both the bleeding-edge AI models and how to build scalable web architecture.",
    avatar: "/avatars/a2.png"
  },
  {
    name: "Elena Rodriguez",
    role: "Founder",
    company: "Snapbit",
    quote: "We went from a rough concept to a working MVP in less than a month. Highly recommended team.",
    avatar: "/avatars/a3.png"
  },
  {
    name: "David Kim",
    role: "Head of Engineering",
    company: "Rapido",
    quote: "Their automated workflow pipeline saved us hundreds of hours of manual operations work.",
    avatar: "/avatars/a4.png"
  },
  {
    name: "Amanda Chen",
    role: "VP Operations",
    company: "Snitch",
    quote: "Outstanding partner for our AI initiatives. They don't just write code, they help shape the product strategy.",
    avatar: "/avatars/a5.png"
  },
  {
    name: "James Wilson",
    role: "CEO",
    company: "Devon",
    quote: "They delivered exactly what we needed to secure our next round of funding. Exceptional quality.",
    avatar: "/avatars/a6.png"
  }
];

export const FAQS = [
  {
    question: "What primary AI products and custom solutions does deWork Labs specialize in?",
    answer: "We build production-ready AI systems tailored to your workflows, including 24/7 AI Voice Agents (for automated lead qualification and booking), Drape AI (studio-quality virtual photoshoot pipelines for fashion brands), Smart CRM Suite (intelligent pipeline automation), and AI Brain (secure internal RAG knowledge bases)."
  },
  {
    question: "How do your AI Voice Agents handle real customer calls and bookings?",
    answer: "Our conversational AI voice agents answer inbound calls 24/7 with under 2-second response latency. They naturally qualify leads, answer FAQs, handle objections, and integrate directly with your Cal.com, Google Calendar, or CRM to schedule appointments automatically."
  },
  {
    question: "What is Drape AI and how does it reduce photoshoot costs?",
    answer: "Drape AI is our proprietary generative AI workflow for fashion and e-commerce brands. It transforms standard flat-lay garment or basic model photos into studio-grade imagery with customizable models and poses, cutting traditional photoshoot costs by up to 90%."
  },
  {
    question: "How does the AI Brain work with our internal company data?",
    answer: "AI Brain is a private, secure Retrieval-Augmented Generation (RAG) system. We index your company documents, Slack archives, Notion pages, and Drive files into an internal AI assistant that provides instant, verified answers with source citations while keeping your data strictly confidential."
  },
  {
    question: "How quickly can we launch a custom AI MVP or integrate your solutions?",
    answer: "Rapid prototypes and custom AI MVPs are typically delivered within 4 to 6 weeks. Turnkey products like our AI Voice Agent or Smart CRM integration can be deployed even faster depending on your tech stack."
  },
  {
    question: "Can you integrate AI models with our existing tech stack, CRM, and APIs?",
    answer: "Yes! We build secure middleware and API connectors so our AI Voice Agents, CRM tools, and AI Brain integrate directly with your existing databases, Salesforce, HubSpot, Stripe, or proprietary internal APIs without disrupting your current operations."
  }
];

export const FOOTER_LINKS = [
  {
    title: "Product/Solutions",
    links: [
      { label: "What We Do", href: "#what-we-do" },
      { label: "Our Work", href: "#solutions" },
      { label: "Case Studies", href: "#solutions" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: BOOKING_URL },
      { label: "Careers", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" }
    ]
  }
];
