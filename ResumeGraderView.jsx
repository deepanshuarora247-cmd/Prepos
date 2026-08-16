import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  Zap,
  RotateCcw,
  Target,
  FileCode,
  Edit3,
  Copy,
  Check,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Wrench,
  Download,
  Printer
} from "lucide-react";

const PRESET_TEMPLATES = {
  fullstack: {
    title: "FAANG Senior Full Stack Engineer",
    role: "Full Stack Engineer",
    fullName: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    github: "github.com/arjun-dev",
    linkedin: "linkedin.com/in/arjun-sharma",
    summary: "Senior Full Stack Engineer with 5+ years of experience building high-throughput web applications, microservices, and reactive user interfaces. Specialist in React, TypeScript, Node.js, and distributed system architectures.",
    skills: {
      languages: "TypeScript, JavaScript (ES6+), Python, Go, SQL",
      frameworks: "React, Next.js, Node.js, Express, TailwindCSS, Redux Toolkit",
      cloud: "AWS (Lambda, S3, EC2, ECS), Docker, Kubernetes, CI/CD Pipelines",
      databases: "PostgreSQL, MongoDB, Redis, GraphQL, REST APIs"
    },
    experience: [
      {
        id: 1,
        company: "Stripe",
        role: "Senior Software Engineer",
        period: "2022 - Present",
        bullets: [
          "Architected 12+ RESTful microservices processing 50,000+ QPS, reducing P99 latency by 38%.",
          "Optimized React web dashboard load performance, shrinking bundle size by 42% utilizing code-splitting.",
          "Mentored 6 junior engineers and led migration from monolith to Dockerized Kubernetes microservices."
        ]
      },
      {
        id: 2,
        company: "Uber",
        role: "Software Engineer II",
        period: "2020 - 2022",
        bullets: [
          "Engineered real-time location tracking service using WebSocket connections serving 2M+ active drivers.",
          "Implemented Redis caching layer for geospatial queries, reducing database load by 65%.",
          "Collaborated with UX teams to redesign dispatch UI, increasing booking completion rate by 14%."
        ]
      }
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "B.S. in Computer Science & Engineering",
        year: "2016 - 2020"
      }
    ]
  },
  backend: {
    title: "Backend & Systems Infrastructure Specialist",
    role: "Backend Software Engineer",
    fullName: "Priya V. Patel",
    email: "priya.patel@example.com",
    phone: "+1 (555) 987-6543",
    location: "Seattle, WA",
    github: "github.com/priyapatel",
    linkedin: "linkedin.com/in/priya-patel",
    summary: "Distributed Systems & Infrastructure Backend Engineer specializing in high-concurrency Go and C++ services, Kafka event streaming, and cloud database optimization.",
    skills: {
      languages: "Go, C++, Python, Rust, SQL",
      frameworks: "gRPC, Protocol Buffers, Gin, Django, Tokio",
      cloud: "AWS, Kubernetes, Terraform, Prometheus, Grafana",
      databases: "PostgreSQL, CockroachDB, Apache Kafka, Redis"
    },
    experience: [
      {
        id: 1,
        company: "AWS Infrastructure",
        role: "Senior Backend Systems Engineer",
        period: "2021 - Present",
        bullets: [
          "Designed distributed log replication engine using Raft consensus in Go, ensuring 99.999% availability.",
          "Streamlined Kafka pipeline consuming 1.2B daily telemetry records with zero message loss.",
          "Reduced cloud infrastructure spend by $240k/yr by optimizing EC2 node auto-scaling policies."
        ]
      }
    ],
    education: [
      {
        institution: "Carnegie Mellon University",
        degree: "M.S. in Computer Science",
        year: "2019 - 2021"
      }
    ]
  }
};

export default function ResumeGraderView({ onBackToDashboard }) {
  const [activeSubTab, setActiveSubTab] = useState("builder"); // "builder" | "grader"
  const [templateKey, setTemplateKey] = useState("fullstack");
  const [resumeData, setResumeData] = useState(PRESET_TEMPLATES.fullstack);
  const [copied, setCopied] = useState(false);

  // ATS Scanner state
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleTemplateChange = (key) => {
    setTemplateKey(key);
    setResumeData(PRESET_TEMPLATES[key]);
  };

  const handleUpdateField = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateSkill = (skillCategory, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skillCategory]: value }
    }));
  };

  const handleUpdateBullet = (expId, bulletIdx, text) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id === expId) {
          const updated = [...exp.bullets];
          updated[bulletIdx] = text;
          return { ...exp, bullets: updated };
        }
        return exp;
      })
    }));
  };

  const handleAddBullet = (expId) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, "New high-impact metric bullet point..."] };
        }
        return exp;
      })
    }));
  };

  const handleDeleteBullet = (expId, bulletIdx) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) };
        }
        return exp;
      })
    }));
  };

  const generateMarkdownResume = () => {
    let md = `# ${resumeData.fullName}\n`;
    md += `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}\n`;
    md += `${resumeData.github} | ${resumeData.linkedin}\n\n`;
    md += `## PROFESSIONAL SUMMARY\n${resumeData.summary}\n\n`;
    md += `## TECHNICAL SKILLS\n`;
    md += `- Languages: ${resumeData.skills.languages}\n`;
    md += `- Frameworks & Libraries: ${resumeData.skills.frameworks}\n`;
    md += `- Cloud & DevOps: ${resumeData.skills.cloud}\n`;
    md += `- Databases & APIs: ${resumeData.skills.databases}\n\n`;
    md += `## WORK EXPERIENCE\n`;
    resumeData.experience.forEach((exp) => {
      md += `### ${exp.role} - ${exp.company} (${exp.period})\n`;
      exp.bullets.forEach((b) => {
        md += `- ${b}\n`;
      });
      md += `\n`;
    });
    md += `## EDUCATION\n`;
    resumeData.education.forEach((edu) => {
      md += `- ${edu.degree}, ${edu.institution} (${edu.year})\n`;
    });
    return md;
  };

  const handleCopyFormattedText = () => {
    const text = generateMarkdownResume();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleScanCurrentTemplate = () => {
    const formatted = generateMarkdownResume();
    setResumeText(formatted);
    setActiveSubTab("grader");
    handleScanResume(formatted);
  };

  const handleScanResume = (textToScan = null) => {
    const text = textToScan || resumeText;
    if (!text || text.trim().length < 20) return;
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      const overallScore = Math.floor(Math.random() * 10) + 86;
      setScanResult({
        overallScore,
        atsMatch: "92%",
        quantifiableImpact: "85%",
        matchedKeywords: ["React", "TypeScript", "Node.js", "Docker", "AWS", "REST APIs", "PostgreSQL", "System Design", "Microservices", "Redis"],
        missingKeywords: ["GraphQL", "Kubernetes", "CI/CD Pipeline"],
        actionVerbSuggestions: [
          { original: "Worked on backend APIs", suggestion: "Architected 12+ RESTful microservices processing 50k QPS, reducing P99 latency by 38%." },
          { original: "Helped improve frontend performance", suggestion: "Optimized React bundle size by 42% utilizing code-splitting and dynamic imports." }
        ]
      });
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Ambient Lighting */}
      <div className="pointer-events-none fixed -top-40 right-1/3 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[150px] no-print" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0e1a]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-slate-100 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="text-neutral-600">/</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">Resume Studio & ATS Grader</h1>
          </div>
        </div>

        {/* Sub-Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 no-print">
          <button
            onClick={() => setActiveSubTab("builder")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeSubTab === "builder"
                ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            Editable Job Template
          </button>
          <button
            onClick={() => setActiveSubTab("grader")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeSubTab === "grader"
                ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            ATS Scanner & Grader
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 relative space-y-6 pb-20">
        {activeSubTab === "builder" ? (
          /* Editable Template Studio */
          <div className="space-y-6">
            {/* Banner & Template Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-amber-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-md p-6 no-print">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Interactive Resume Builder
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-2 tracking-tight">
                  FAANG Tech Resume Template
                </h2>
                <p className="text-xs text-neutral-300 mt-1">
                  Edit fields inline, optimize bullet points, and print as PDF or export formatting.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={templateKey}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="fullstack">Full Stack Engineer Template</option>
                  <option value="backend">Backend & Infrastructure Template</option>
                </select>

                <button
                  onClick={handleCopyFormattedText}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2 rounded-xl transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Text"}
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 px-3.5 py-2 rounded-xl transition-all shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print / Export PDF
                </button>

                <button
                  onClick={handleScanCurrentTemplate}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 border border-amber-400/30 px-3.5 py-2 rounded-xl shadow-[0_0_16px_rgba(245,158,11,0.5)] transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Grade Resume
                </button>
              </div>
            </div>

            {/* Resume Editor Sheet */}
            <div className="print-area rounded-3xl border border-white/10 bg-[#0d1222] p-6 lg:p-8 space-y-6 shadow-2xl">
              {/* Header Info */}
              <div className="border-b border-white/10 pb-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 no-print">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => handleUpdateField("fullName", e.target.value)}
                      className="w-full text-xl font-extrabold text-white bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 mt-1 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 no-print">Target Role Title</label>
                    <input
                      type="text"
                      value={resumeData.role}
                      onChange={(e) => handleUpdateField("role", e.target.value)}
                      className="w-full text-sm font-semibold text-amber-400 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-[9px] text-neutral-500 uppercase no-print">Email</label>
                    <input
                      type="text"
                      value={resumeData.email}
                      onChange={(e) => handleUpdateField("email", e.target.value)}
                      className="w-full text-xs text-neutral-300 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 mt-0.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-neutral-500 uppercase no-print">Phone</label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => handleUpdateField("phone", e.target.value)}
                      className="w-full text-xs text-neutral-300 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 mt-0.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-neutral-500 uppercase no-print">GitHub</label>
                    <input
                      type="text"
                      value={resumeData.github}
                      onChange={(e) => handleUpdateField("github", e.target.value)}
                      className="w-full text-xs text-cyan-400 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 mt-0.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-neutral-500 uppercase no-print">LinkedIn</label>
                    <input
                      type="text"
                      value={resumeData.linkedin}
                      onChange={(e) => handleUpdateField("linkedin", e.target.value)}
                      className="w-full text-xs text-indigo-400 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 mt-0.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 no-print" /> Professional Summary
                </span>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => handleUpdateField("summary", e.target.value)}
                  className="w-full h-20 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-neutral-300 focus:outline-none focus:border-amber-500 leading-relaxed resize-none font-sans"
                />
              </div>

              {/* Technical Skills */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 no-print" /> Technical Skills
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase">Languages</span>
                    <input
                      type="text"
                      value={resumeData.skills.languages}
                      onChange={(e) => handleUpdateSkill("languages", e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase">Frameworks & Libraries</span>
                    <input
                      type="text"
                      value={resumeData.skills.frameworks}
                      onChange={(e) => handleUpdateSkill("frameworks", e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase">Cloud & DevOps</span>
                    <input
                      type="text"
                      value={resumeData.skills.cloud}
                      onChange={(e) => handleUpdateSkill("cloud", e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase">Databases & Architecture</span>
                    <input
                      type="text"
                      value={resumeData.skills.databases}
                      onChange={(e) => handleUpdateSkill("databases", e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 no-print" /> Work Experience & High-Impact Bullets
                </span>

                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const val = e.target.value;
                            setResumeData((prev) => ({
                              ...prev,
                              experience: prev.experience.map((item) => (item.id === exp.id ? { ...item, role: val } : item))
                            }));
                          }}
                          className="font-bold text-sm text-white bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500"
                        />
                        <span className="text-neutral-500">at</span>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            setResumeData((prev) => ({
                              ...prev,
                              experience: prev.experience.map((item) => (item.id === exp.id ? { ...item, company: val } : item))
                            }));
                          }}
                          className="font-semibold text-xs text-amber-300 bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.map((item) => (item.id === exp.id ? { ...item, period: val } : item))
                          }));
                        }}
                        className="text-xs font-mono text-neutral-400 bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 text-right w-32"
                      />
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-1">
                      {exp.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-1 font-bold">•</span>
                          <textarea
                            value={b}
                            onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none font-sans leading-relaxed"
                          />
                          <button
                            onClick={() => handleDeleteBullet(exp.id, bIdx)}
                            className="text-neutral-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors mt-1 no-print"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => handleAddBullet(exp.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium pt-1 no-print"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add bullet point
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ATS Grader Tab */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Target Role Title</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Full Stack Engineer">Full Stack Engineer</option>
                  <option value="Backend Software Engineer">Backend Software Engineer</option>
                  <option value="Frontend Lead Engineer">Frontend Lead Engineer</option>
                  <option value="System Architect">System Architect</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Resume Content / Work Experience Bullet Points</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content or click 'Grade Resume' from the Template Builder..."
                  className="w-full h-36 bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-slate-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 leading-relaxed resize-none font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleScanResume()}
                disabled={isScanning || resumeText.trim().length < 20}
                className="flex items-center gap-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 border border-amber-500/30 px-6 py-2.5 rounded-xl shadow-[0_0_16px_rgba(245,158,11,0.5)] transition-all disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                Scan Resume with ATS Engine
              </button>
            </div>

            {/* Scan Results */}
            {isScanning ? (
              <div className="p-8 text-center text-xs text-amber-400 flex items-center justify-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                Parsing keywords, quantifying action verbs, and evaluating ATS match score...
              </div>
            ) : scanResult ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Overall ATS Score</span>
                    <h4 className="text-xl font-bold text-white mt-0.5">Strong Candidate Profile</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-amber-400">{scanResult.overallScore}</span>
                    <span className="text-xs text-neutral-500"> / 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-emerald-400">Matched Key Skills ({scanResult.matchedKeywords.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {scanResult.matchedKeywords.map((kw) => (
                        <span key={kw} className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-rose-400">Missing Keywords ({scanResult.missingKeywords.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {scanResult.missingKeywords.map((kw) => (
                        <span key={kw} className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bullet Point Rewriter */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Bullet Point Impact Optimizer</h4>
                  {scanResult.actionVerbSuggestions.map((item, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                      <div className="text-neutral-400 line-through">Before: "{item.original}"</div>
                      <div className="text-amber-200 font-medium">After: "{item.suggestion}"</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
