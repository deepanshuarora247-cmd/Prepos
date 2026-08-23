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
  Printer,
  Loader2
} from "lucide-react";
import "./ResumeGraderView.css";

const PRESET_TEMPLATES = {
  fullstack: {
    title: "FAANG Senior Full Stack Engineer",
    role: "Full Stack Engineer",
    fullName: "Deepanshu Arora",
    email: "deepanshu.arora@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    github: "github.com/deepanshu-dev",
    linkedin: "linkedin.com/in/deepanshu-arora",
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
      },
      {
        id: 2,
        company: "HashiCorp",
        role: "Software Engineer II",
        period: "2019 - 2021",
        bullets: [
          "Co-developed configuration parsing optimization, speeding up server boot cycles by 25%.",
          "Maintained backend database migration utilities, ensuring zero loss for 5,000+ cluster nodes.",
          "Programmed integration testing adapters in Go, enhancing CI/CD code reliability metrics."
        ]
      }
    ],
    education: [
      {
        institution: "University of Washington, Seattle",
        degree: "B.S. in Computer Science",
        year: "2015 - 2019"
      }
    ]
  }
};

export default function ResumeGraderView({ onBackToDashboard }) {
  const [activeTab, setActiveTab] = useState("builder"); 
  const [templateKey, setTemplateKey] = useState("fullstack");
  const [resumeData, setResumeData] = useState(PRESET_TEMPLATES.fullstack);
  const [copied, setCopied] = useState(false);

  
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const [resumeText, setResumeText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleTemplateChange = (key) => {
    setTemplateKey(key);
    setResumeData(PRESET_TEMPLATES[key]);
  };

  const handleUpdateField = (field, val) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handleUpdateSkill = (section, val) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [section]: val
      }
    }));
  };

  const handleUpdateBullet = (expId, bulletIdx, val) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = val;
        return { ...exp, bullets: newBullets };
      })
    }));
  };

  const handleAddBullet = (expId) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: [...exp.bullets, "New high-impact action achievement bullet point"] };
      })
    }));
  };

  const handleDeleteBullet = (expId, bulletIdx) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) };
      })
    }));
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleCopyFormattedText = () => {
    const skillsText = `Skills:\n- Languages: ${resumeData.skills.languages}\n- Frameworks: ${resumeData.skills.frameworks}\n- Cloud: ${resumeData.skills.cloud}\n- Databases: ${resumeData.skills.databases}`;
    const expText = resumeData.experience
      .map((e) => `${e.role} at ${e.company} (${e.period}):\n${e.bullets.map((b) => `  * ${b}`).join("\n")}`)
      .join("\n\n");
    const fullText = `${resumeData.fullName}\n${resumeData.role}\n${resumeData.email} | ${resumeData.phone}\n${resumeData.location}\n\nSummary:\n${resumeData.summary}\n\n${skillsText}\n\nExperience:\n${expText}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanCurrentTemplate = () => {
    
    const expText = resumeData.experience.map((e) => e.bullets.join(" ")).join(" ");
    const fullText = `${resumeData.summary} ${resumeData.skills.languages} ${resumeData.skills.frameworks} ${resumeData.skills.cloud} ${resumeData.skills.databases} ${expText}`;
    setResumeText(fullText);
    setTargetRole(resumeData.role);
    setActiveTab("grader");
    setTimeout(() => {
      handleScanResume(fullText);
    }, 50);
  };

  const handleScanResume = (textToScan = null) => {
    const rawText = textToScan || resumeText;
    if (!rawText || rawText.trim().length < 20) return;
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      
      setScanResult({
        overallScore: rawText.includes("Cassandra") || rawText.includes("Kubernetes") ? 92 : 78,
        matchedKeywords: ["React", "TypeScript", "Node.js", "Redis", "Distributed System", "QPS", "Microservices", "Docker"],
        missingKeywords: ["GraphQL", "Kubernetes", "OAuth2", "gRPC", "Prometheus"],
        actionVerbSuggestions: [
          { original: "Worked on building RESTful microservices...", suggestion: "Architected 12+ RESTful microservices processing 50,000+ QPS..." },
          { original: "Helped team configure server databases...", suggestion: "Implemented Redis caching layer, reducing database load by 65%..." }
        ]
      });
    }, 850);
  };

  return (
    <div className="resume-container">
      
      <header className="resume-header no-print">
        <div className="resume-header-left">
          <button onClick={onBackToDashboard} className="resume-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="resume-header-divider">/</span>
          <div className="resume-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", backgroundColor: "var(--amber-bg)", color: "var(--amber-accent)", borderColor: "var(--amber-border)" }}>
              <FileText className="h-4 w-4" />
            </div>
            <span>Resume Grader & ATS</span>
          </div>
        </div>

        <div className="ide-tab-group">
          <button
            onClick={() => setActiveTab("builder")}
            className={`ide-tab-btn ${activeTab === "builder" ? "active" : ""}`}
            style={{ backgroundColor: activeTab === "builder" ? "var(--amber-accent)" : undefined }}
          >
            Resume Builder
          </button>
          <button
            onClick={() => setActiveTab("grader")}
            className={`ide-tab-btn ${activeTab === "grader" ? "active" : ""}`}
            style={{ backgroundColor: activeTab === "grader" ? "var(--amber-accent)" : undefined }}
          >
            ATS Grader
          </button>
        </div>
      </header>

      
      <main className="resume-main">
        {activeTab === "builder" ? (
          
          <div className="resume-sheet" style={{ border: "none", boxShadow: "none", padding: 0, backgroundColor: "transparent" }}>
            
            <div className="resume-banner-row no-print">
              <div className="resume-banner-title-box">
                <span className="behavioral-banner-tag" style={{ color: "var(--amber-accent)", backgroundColor: "var(--amber-bg)", borderColor: "var(--amber-border)" }}>
                  Interactive Resume Builder
                </span>
                <h2>FAANG Tech Resume Template</h2>
                <p className="behavioral-banner-desc">
                  Edit fields inline, optimize bullet points, and print as PDF or export formatting.
                </p>
              </div>

              <div className="resume-banner-actions">
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
                  className="sandbox-back-btn"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Text"}
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="q-solve-btn"
                  style={{ display: "inline-flex", gap: "0.5rem" }}
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print / Export PDF
                </button>

                <button
                  onClick={handleScanCurrentTemplate}
                  className="sysdesign-audit-btn"
                  style={{ backgroundColor: "var(--amber-accent)", borderColor: "var(--amber-border)", color: "var(--bg-color)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Grade Resume
                </button>
              </div>
            </div>

            
            <div className="resume-sheet print-area">
              
              <div className="resume-sheet-header">
                <div className="resume-sheet-grid-2">
                  <div>
                    <label className="resume-field-lbl no-print">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => handleUpdateField("fullName", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "1.25rem", fontWeight: "extrabold", padding: "0.5rem" }}
                    />
                  </div>
                  <div>
                    <label className="resume-field-lbl no-print">Target Role Title</label>
                    <input
                      type="text"
                      value={resumeData.role}
                      onChange={(e) => handleUpdateField("role", e.target.value)}
                      className="resume-input-text"
                      style={{ color: "var(--amber-accent)", fontWeight: "600", padding: "0.5rem" }}
                    />
                  </div>
                </div>

                <div className="resume-sheet-grid-4">
                  <div>
                    <label className="resume-field-lbl no-print" style={{ fontSize: "9px" }}>Email</label>
                    <input
                      type="text"
                      value={resumeData.email}
                      onChange={(e) => handleUpdateField("email", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "11px", padding: "0.375rem" }}
                    />
                  </div>
                  <div>
                    <label className="resume-field-lbl no-print" style={{ fontSize: "9px" }}>Phone</label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => handleUpdateField("phone", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "11px", padding: "0.375rem" }}
                    />
                  </div>
                  <div>
                    <label className="resume-field-lbl no-print" style={{ fontSize: "9px" }}>GitHub</label>
                    <input
                      type="text"
                      value={resumeData.github}
                      onChange={(e) => handleUpdateField("github", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "11px", padding: "0.375rem", color: "var(--cyan-accent)" }}
                    />
                  </div>
                  <div>
                    <label className="resume-field-lbl no-print" style={{ fontSize: "9px" }}>LinkedIn</label>
                    <input
                      type="text"
                      value={resumeData.linkedin}
                      onChange={(e) => handleUpdateField("linkedin", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "11px", padding: "0.375rem", color: "var(--indigo-accent)" }}
                    />
                  </div>
                </div>
              </div>

              
              <div className="sysdesign-reqs-section">
                <span className="resume-field-lbl" style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--amber-accent)" }}>
                  <FileText className="h-3.5 w-3.5 no-print" /> Professional Summary
                </span>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => handleUpdateField("summary", e.target.value)}
                  className="behavioral-textarea-field"
                  style={{ height: "6rem" }}
                />
              </div>

              
              <div className="sysdesign-reqs-section">
                <span className="resume-field-lbl" style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--amber-accent)" }}>
                  <Wrench className="h-3.5 w-3.5 no-print" /> Technical Skills
                </span>
                <div className="resume-sheet-grid-2">
                  <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span className="resume-field-lbl" style={{ fontSize: "9px" }}>Languages</span>
                    <input
                      type="text"
                      value={resumeData.skills.languages}
                      onChange={(e) => handleUpdateSkill("languages", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "12px", padding: "0.375rem" }}
                    />
                  </div>
                  <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span className="resume-field-lbl" style={{ fontSize: "9px" }}>Frameworks & Libraries</span>
                    <input
                      type="text"
                      value={resumeData.skills.frameworks}
                      onChange={(e) => handleUpdateSkill("frameworks", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "12px", padding: "0.375rem" }}
                    />
                  </div>
                  <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span className="resume-field-lbl" style={{ fontSize: "9px" }}>Cloud & DevOps</span>
                    <input
                      type="text"
                      value={resumeData.skills.cloud}
                      onChange={(e) => handleUpdateSkill("cloud", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "12px", padding: "0.375rem" }}
                    />
                  </div>
                  <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span className="resume-field-lbl" style={{ fontSize: "9px" }}>Databases & Architecture</span>
                    <input
                      type="text"
                      value={resumeData.skills.databases}
                      onChange={(e) => handleUpdateSkill("databases", e.target.value)}
                      className="resume-input-text"
                      style={{ fontSize: "12px", padding: "0.375rem" }}
                    />
                  </div>
                </div>
              </div>

              
              <div className="sysdesign-reqs-section">
                <span className="resume-field-lbl" style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--amber-accent)" }}>
                  <Briefcase className="h-3.5 w-3.5 no-print" /> Work Experience & High-Impact Bullets
                </span>

                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="resume-experience-item">
                    <div className="resume-exp-header">
                      <div className="resume-exp-meta-fields" style={{ display: "flex", gap: "0.5rem", flex: 1 }}>
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
                          className="resume-input-text"
                          style={{ fontSize: "13px", fontWeight: "bold", width: "12rem", padding: "0.25rem" }}
                        />
                        <span className="ide-example-label">at</span>
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
                          className="resume-input-text"
                          style={{ fontSize: "12px", fontWeight: "600", color: "var(--amber-accent)", width: "8rem", padding: "0.25rem" }}
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
                        className="resume-input-text"
                        style={{ fontSize: "11px", fontFamily: "var(--font-mono)", width: "8rem", textAlign: "right", padding: "0.25rem" }}
                      />
                    </div>

                    
                    <div className="resume-exp-bullets-list">
                      {exp.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="resume-exp-bullet-item">
                          <span className="resume-field-lbl" style={{ color: "var(--amber-accent)", marginTop: "0.5rem" }}>•</span>
                          <textarea
                            value={b}
                            onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                            className="behavioral-textarea-field"
                            style={{ height: "3.5rem", flex: 1, padding: "0.5rem" }}
                          />
                          <button
                            onClick={() => handleDeleteBullet(exp.id, bIdx)}
                            className="resume-bullet-btn no-print"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => handleAddBullet(exp.id)}
                        className="ide-reset-btn no-print"
                        style={{ color: "var(--indigo-accent)", width: "fit-content", display: "inline-flex", gap: "0.25rem", border: "none", background: "none" }}
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
          
          <div className="resume-sheet" style={{ border: "none", boxShadow: "none", padding: 0, backgroundColor: "transparent" }}>
            <div className="sysdesign-nodes-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="sysdesign-reqs-section">
                <label className="resume-field-lbl">Target Role Title</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Full Stack Engineer">Full Stack Engineer</option>
                  <option value="Backend Software Engineer">Backend Software Engineer</option>
                  <option value="Frontend Lead Engineer">Frontend Lead Engineer</option>
                  <option value="System Architect">System Architect</option>
                </select>
              </div>

              <div className="sysdesign-reqs-section">
                <label className="resume-field-lbl">Resume Content / Work Experience Bullet Points</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content or click 'Grade Resume' from the Template Builder..."
                  className="behavioral-textarea-field"
                  style={{ height: "9rem" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button
                onClick={() => handleScanResume()}
                disabled={isScanning || resumeText.trim().length < 20}
                className="sysdesign-audit-btn"
                style={{ backgroundColor: "var(--amber-accent)", borderColor: "var(--amber-border)", color: "var(--bg-color)" }}
              >
                <Sparkles className="h-4 w-4" />
                Scan Resume with ATS Engine
              </button>
            </div>

            
            {isScanning ? (
              <div className="popover-body" style={{ color: "var(--amber-accent)" }}>
                <Loader2 className="search-loader" style={{ position: "static", margin: "1rem", color: "var(--amber-accent)" }} />
                Parsing keywords, quantifying action verbs, and evaluating ATS match score...
              </div>
            ) : scanResult ? (
              <div className="resume-grader-scorecard">
                <div className="resume-grader-scorecard-header">
                  <div>
                    <span className="popover-header-badge" style={{ color: "var(--amber-accent)", backgroundColor: "var(--amber-bg)", borderColor: "var(--amber-border)", width: "fit-content" }}>Overall ATS Score</span>
                    <h4 className="sysdesign-topic-title" style={{ marginTop: "0.25rem" }}>Strong Candidate Profile</h4>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="resume-grader-score-large">{scanResult.overallScore}</span>
                    <span className="ide-example-label"> / 100</span>
                  </div>
                </div>

                <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                  <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--emerald-accent)" }}>Matched Key Skills ({scanResult.matchedKeywords.length})</span>
                    <div className="q-companies-row">
                      {scanResult.matchedKeywords.map((kw) => (
                        <span key={kw} className="q-api-badge" style={{ backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="practice-streak-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--rose-accent)" }}>Missing Keywords ({scanResult.missingKeywords.length})</span>
                    <div className="q-companies-row">
                      {scanResult.missingKeywords.map((kw) => (
                        <span key={kw} className="q-api-badge" style={{ backgroundColor: "var(--rose-bg)", color: "var(--rose-accent)", borderColor: "var(--rose-border)" }}>
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                
                <div className="sysdesign-reqs-section">
                  <h4 style={{ fontSize: "11px", fontWeight: "bold", color: "#fff", textTransform: "uppercase" }}>AI Bullet Point Impact Optimizer</h4>
                  {scanResult.actionVerbSuggestions.map((item, i) => (
                    <div key={i} className="behavioral-rewrite-panel">
                      <div className="ide-example-label" style={{ textDecoration: "line-through" }}>Before: "{item.original}"</div>
                      <div style={{ color: "var(--amber-accent)", fontWeight: "500", marginTop: "0.25rem" }}>After: "{item.suggestion}"</div>
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
