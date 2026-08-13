export const BOOKING_URL = "https://cal.com/[agency-name]";

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
    description: "Never miss a customer call again. Our voice agents answer, qualify, and route calls around the clock — handling FAQs, booking appointments, and capturing leads in a natural, human-like voice, so your team spends time closing deals instead of picking up the phone.",
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
    description: "Generate fashion studio-level model shoots instantly.",
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
    description: "A CRM your sales team will actually use. Manage leads, deals, and customer relationships from one clean dashboard — with automated follow-ups, pipeline visibility, and reporting built in, so nothing slips through the cracks and every rep knows exactly what to do next.",
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
    description: "Give your business its own intelligent knowledge layer. AI Brain ingests your documents, policies, and data to become an instant expert on your company — answering employee questions, powering support, and surfacing insights on demand, so knowledge is never locked away in someone's inbox.",
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
    question: "What kind of AI solutions do you build?",
    answer: "We build everything from custom AI-powered web applications and internal workflow automations to integrating LLMs and computer vision into existing platforms."
  },
  {
    question: "How long does a typical project take?",
    answer: "Most of our rapid prototypes and MVPs are delivered within 4-6 weeks. Larger enterprise integrations may take 2-3 months depending on complexity."
  },
  {
    question: "Do you work with early-stage startups or only enterprises?",
    answer: "We work with both! We help startups launch their first AI features quickly, and assist enterprises in safely deploying scalable AI infrastructure."
  },
  {
    question: "What's your development process?",
    answer: "We start with a deep dive into your business needs, followed by rapid prototyping. We iterate based on your feedback and then build out the robust, production-ready solution."
  },
  {
    question: "How do we get started?",
    answer: "Book a call with us using any of the buttons on this page. We'll discuss your idea, assess feasibility, and propose a timeline and budget."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes, we offer retainer agreements for ongoing maintenance, model fine-tuning, and feature additions to ensure your AI solution stays ahead of the curve."
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
