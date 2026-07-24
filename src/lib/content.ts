// src/lib/content.ts
// Single source of truth for all copy on the site. Components should import
// from here and never hardcode strings. Keep this file free of JSX/markup —
// plain data only.

export interface Stat {
  n: string;
  l: string;
}

export const hero = {
  name: ["AARYAMAN", "KATTALI"] as const,
  role: "AIML ENGINEER — MUMBAI, INDIA",
  tagline:
    "Building agentic AI systems, computer-vision pipelines, and the occasional race-weekend prediction model — engineered for accuracy and shipped without dropped frames.",
  stats: [
    { n: "8.13", l: "CGPA · B.E. CSE(AIML)" },
    { n: "4", l: "SHIPPED PROJECTS" },
    { n: "96%", l: "TOP MODEL ACCURACY" },
    { n: "2×", l: "GENAI INTERNSHIPS" },
  ] satisfies Stat[],
};

export interface DriverCardRow {
  k: string;
  v: string;
  accent?: boolean;
}

export const about = {
  eyebrow: "01 / ABOUT",
  heading: ["Off the grid,", "into the build."],
  paragraphs: [
    "I graduated in May 2026 with a B.E. in Computer Science Engineering (Artificial Intelligence & Machine Learning) from APSIT, University of Mumbai. I like to vibe-code my way through problems — building projects that either solve something affecting me directly or push me to pick up a new AI concept along the way.",
    "Most recently, I've been diving into Agentic AI — figuring out how to get multiple specialized agents to hand off work cleanly to each other, through hands-on stints at CitiusTech and Wipro (ABB). Outside of the stack, I hold a 2nd Dan black belt in Karate, a Gandharva Level 3 certification in Hindustani classical music, and I'm a distance runner who enjoys long runs. I also dance, and performed at my college's annual fest.",
  ],
  driverCard: [
    { k: "Base", v: "Mumbai, IN" },
    { k: "Focus", v: "AI/ML" },
    { k: "Education", v: "B.E. CSE(AIML)" },
    { k: "Grad. Year", v: "2026" },
    { k: "Status", v: "OPEN TO ROLES", accent: true },
  ] satisfies DriverCardRow[],
};

export interface ExperienceEntry {
  role: string;
  org: string;
  meta: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Nexthink DEX Intern",
    org: "Wipro (ABB)",
    meta: "MAR – APR '26 / NAVI MUMBAI",
    bullets: [
      "Built proficiency in Nexthink architecture and Digital Employee Experience optimization using Nexthink Query Language to streamline L1 support.",
      "Analyzed core Nexthink modules within a compliance-driven environment, extracting actionable insight for IT operations.",
    ],
  },
  {
    role: "Agentic AI Intern",
    org: "CitiusTech",
    meta: "JUN – JUL '25 / NAVI MUMBAI",
    bullets: [
      "Focused on intelligent multi-agent systems and autonomous decision-making workflows.",
      "Built and iterated on LLM-orchestrated, agent-based applications that improved automation and response accuracy.",
    ],
  },
  {
    role: "Literature Head",
    org: "APSIT",
    meta: "JUL '23 – JUL '24 / THANE",
    bullets: [
      "Owned strategy, event planning, and execution for the college Literature Department's programs.",
      "Managed and mentored a volunteer team, coordinating partners to deliver publications and major fests on time.",
    ],
  },
  {
    role: "Social Media Head",
    org: "APSIT AIML Students Association",
    meta: "JUL '23 – JUL '24 / THANE",
    bullets: [
      "Directed the association's social presence, designing content strategy that increased engagement and visibility.",
      "Coordinated event promotion with the core team, boosting participation and outreach across the department.",
    ],
  },
];

export interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
  spec: Record<string, string>;
}

export const projects: Project[] = [
  {
    num: "01",
    title: "Patient Intake System Using Agentic AI",
    description:
      "Accessible intake system for individuals with autism — adaptive Q&A that lowers cognitive load during onboarding.",
    tags: ["LangChain", "Multi-Agent", "Orchestration"],
    spec: {
      Agents: "5 specialized + orchestrator",
      Routing: "Real-time, rule-driven",
      Origin: "CitiusTech internship",
      Goal: "Lower cognitive load",
    },
  },
  {
    num: "02",
    title: "Indian Sign Language Interpreter",
    description:
      "Real-time ISL recognition for accessible communication, from a dataset built entirely from scratch.",
    tags: ["Random Forest", "OpenCV", "Live Video"],
    spec: {
      Accuracy: "94%",
      Vocabulary: "26 letters + 6 words",
      Pipeline: "Detect → features → classify → EN",
      Dataset: "Self-collected",
    },
  },
  {
    num: "03",
    title: "F1 Race Predictor",
    description:
      "Live predictive platform for race weekends, unifying telemetry, weather, and historical form into one signal.",
    tags: ["FastF1 API", "XGBoost", "Ensemble"],
    spec: {
      Inputs: "Telemetry, weather, circuit, form",
      Model: "Custom XGBoost ensemble",
      Mode: "Live, race-weekend",
      Data: "FastF1 + custom scraping",
    },
  },
  {
    num: "04",
    title: "AgriGenius Plant Disease Detection Using RAG",
    description:
      "Plant disease detection paired with a retrieval-augmented chatbot for treatment guidance.",
    tags: ["ResNet CNN", "RAG", "FAISS"],
    spec: {
      Accuracy: "96%",
      Classes: "31 disease categories",
      Dataset: "80,000 images",
      Output: "Diagnosis + treatment plan",
    },
  },
];

export interface Hackathon {
  name: string;
  desc: string;
  tag: string;
}

export const hackathons: Hackathon[] = [
  {
    name: "MumbaiHacks 2025",
    desc: "Agentic AI solution for HealthTech problems in emergency medical surge management.",
    tag: "EMERGENCY MEDTECH",
  },
  {
    name: "Hackscript 6.0",
    desc: "Financial fraud detection system built with AI-driven anomaly scoring.",
    tag: "FINANCIAL FRAUD AI",
  },
];

export const skills = {
  languages: ["Python", "Java", "JavaScript", "HTML", "CSS"],
  frameworks: [
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "OpenCV",
    "XGBoost",
    "LangChain",
    "FAISS",
    "HF Transformers",
    "Streamlit",
    "FastAPI",
  ],
  databases: ["SQL / SQLite", "MongoDB", "Google Cloud"],
  concepts: [
    "Generative AI",
    "NLP",
    "Computer Vision",
    "RAG",
    "Agentic AI",
    "Multi-Agent Systems",
    "CNN",
  ],
} as const;

export interface EducationEntry {
  school: string;
  score: string;
  sub: string;
}

export const education: EducationEntry[] = [
  {
    school: "University of Mumbai — APSIT",
    score: "CGPA 8.13",
    sub: "B.E. Computer Science Engineering (Artificial Intelligence & Machine Learning) · 2022 – 2026",
  },
  { school: "Senior Secondary (XII)", score: "85.00%", sub: "CBSE · 2022" },
  { school: "Secondary (X)", score: "94.60%", sub: "CISCE · 2020" },
];

export interface Certification {
  name: string;
  by: string;
}

export const certifications: Certification[] = [
  { name: "Generative AI with Diffusion Models", by: "NVIDIA" },
  { name: "Getting Started with Deep Learning", by: "NVIDIA" },
  { name: "AIML Virtual Internship", by: "Google" },
  { name: "Data Engineering Virtual Internship", by: "AWS" },
  { name: "AIML Virtual Internship", by: "AWS" },
  { name: "Supervised Machine Learning", by: "Coursera / Andrew Ng" },
  { name: "AIML for Geodata Analysis", by: "ISRO" },
  { name: "Nexthink NQL Practitioner", by: "Nexthink" },
];

export interface ContactLink {
  label: string;
  href: string;
}

export const contact = {
  eyebrow: "07 / PIT LANE",
  heading: ["Let's get you", "on the grid."],
  lead: "Open to AIML engineering roles, agentic AI work, and anything that mixes machine learning with a problem worth solving. Fastest way to reach me is email.",
  links: [
    { label: "aaryaman.jaydeep@gmail.com", href: "mailto:aaryaman.jaydeep@gmail.com" },
    { label: "+91 76780 69291", href: "tel:+917678069291" },
    { label: "LinkedIn", href: "https://linkedin.com/in/aaryaman-kattali/" },
    { label: "GitHub", href: "https://github.com/TheGr8Ak" },
  ] satisfies ContactLink[],
};

// Sector rail / nav — order and ids must match the section elements exactly.
export interface SectorEntry {
  id: string;
  index: string;
  label: string;
}

export const sectors: SectorEntry[] = [
  { id: "hero", index: "00", label: "START" },
  { id: "about", index: "01", label: "ABOUT" },
  { id: "experience", index: "02", label: "TRACK RECORD" },
  { id: "projects", index: "03", label: "GARAGE" },
  { id: "circuits", index: "04", label: "CIRCUITS" },
  { id: "telemetry", index: "05", label: "TELEMETRY" },
  { id: "grid", index: "06", label: "GRID" },
  { id: "contact", index: "07", label: "PIT LANE" },
];

export const brand = {
  mark: "Aaryaman Kattali",
  suffix: "",
  tag: " PORTFOLIO",
  footerName: "© 2026 AARYAMAN KATTALI",
  footerNote: "BUILT WITH PURPOSE IN MUMBAI",
};
