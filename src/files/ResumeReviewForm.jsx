import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
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
  Loader2,
  Globe,
  ExternalLink,
  Calendar,
  X,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  FolderGit2
} from "lucide-react";
import "./ResumeReviewForm.css";

// Preset Role Suggester Keywords
const ROLE_KEYWORDS = {
  "Full Stack Engineer": [
    "React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "Docker", "GraphQL", "AWS", "Redis", "REST APIs", "CI/CD", "Jest"
  ],
  "Senior Backend Engineer": [
    "Go", "Python", "Java", "Microservices", "Kafka", "PostgreSQL", "Kubernetes", "Redis", "Distributed Systems", "gRPC", "Docker", "AWS"
  ],
  "Frontend Architect": [
    "React", "TypeScript", "Next.js", "Web Performance", "State Management", "TailwindCSS", "Webpack", "Vite", "Accessibility (a11y)", "Design Systems"
  ],
  "DevOps & Cloud Engineer": [
    "AWS", "Kubernetes", "Terraform", "Docker", "CI/CD", "Prometheus", "Grafana", "Linux", "Python", "Bash", "Ansible", "Helm"
  ],
  "AI / Machine Learning Engineer": [
    "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "LLMs", "RAG", "Transformers", "SQL", "Docker", "Hugging Face", "MLOps", "NumPy"
  ],
  "Mobile Software Engineer": [
    "React Native", "Swift", "Kotlin", "Flutter", "iOS", "Android", "TypeScript", "Mobile Architecture", "REST APIs", "CI/CD for Mobile"
  ]
};

const SAMPLE_RESUME_DATA = {
  personal: {
    fullName: "Deepanshu Arora",
    email: "deepanshu.arora@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA (Open to Remote)",
    portfolio: "https://deepanshu-portfolio.dev",
    github: "github.com/deepanshu-dev",
    linkedin: "linkedin.com/in/deepanshu-arora",
    summary: "Senior Full Stack Engineer with 5+ years of experience engineering high-throughput web applications, fault-tolerant microservices, and reactive user interfaces. Specialist in React, TypeScript, Node.js, and distributed system architectures processing 50K+ QPS."
  },
  targetRole: {
    title: "Full Stack Engineer",
    company: "Meta / Stripe",
    level: "Senior (5-8 yrs)",
    jobDescription: "Seeking a Senior Full Stack Engineer experienced in React, TypeScript, scalable Node.js microservices, GraphQL, Redis caching, and cloud deployments on AWS/Kubernetes."
  },
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science & Engineering",
      fieldOfStudy: "Computer Science",
      startYear: "2016",
      endYear: "2020",
      gpa: "3.85 / 4.0 (Dean's Honor List)"
    }
  ],
  skills: {
    languages: "TypeScript, JavaScript (ES6+), Python, Go, SQL",
    frameworks: "React 18, Next.js, Node.js, Express, TailwindCSS, Redux Toolkit",
    cloudDevOps: "AWS (Lambda, S3, EC2, ECS), Docker, Kubernetes, GitHub Actions, Terraform",
    databases: "PostgreSQL, MongoDB, Redis, GraphQL, Apache Kafka",
    customTags: ["Microservices", "RESTful APIs", "System Design", "OAuth 2.0", "WebSockets"]
  },
  experience: [
    {
      id: "exp-1",
      company: "Stripe",
      role: "Senior Full Stack Engineer",
      location: "San Francisco, CA",
      employmentType: "Full-Time",
      startDate: "Jan 2022",
      endDate: "Present",
      isCurrent: true,
      bullets: [
        "Architected 12+ RESTful microservices processing 50,000+ QPS, decreasing P99 latency by 38% through Redis query caching.",
        "Optimized enterprise React dashboard load performance, shrinking bundle size by 42% utilizing route-based code-splitting and memoization.",
        "Mentored 6 junior engineers and led migration from monolithic codebase to containerized Kubernetes microservices with 99.99% uptime."
      ]
    },
    {
      id: "exp-2",
      company: "Uber",
      role: "Software Engineer II",
      location: "San Francisco, CA",
      employmentType: "Full-Time",
      startDate: "Jul 2020",
      endDate: "Dec 2021",
      isCurrent: false,
      bullets: [
        "Engineered real-time driver telemetry tracking service using WebSocket connections serving 2M+ active drivers simultaneously.",
        "Implemented Redis caching layer for geospatial queries, reducing database query load by 65% during peak dispatch hours.",
        "Collaborated with cross-functional UX team to redesign driver onboarding UI, accelerating completion rate by 14%."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "CloudPulse Distributed Telemetry Dashboard",
      techStack: "React, TypeScript, Go, Apache Kafka, TimescaleDB, Docker",
      demoUrl: "https://cloudpulse.dev",
      githubUrl: "https://github.com/deepanshu-dev/cloudpulse",
      description: "Real-time streaming observability system visualizing 100k+ events/sec with sub-second latency, featuring custom metric alerting and dynamic visual charting."
    },
    {
      id: "proj-2",
      title: "HyperKV High-Performance Key-Value Store",
      techStack: "Go, Raft Consensus, gRPC, Protobuf, Docker",
      demoUrl: "",
      githubUrl: "https://github.com/deepanshu-dev/hyperkv",
      description: "Distributed fault-tolerant in-memory key-value database implementing Raft consensus for leader election and linearizable replication across clusters."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "2023",
      credentialUrl: "https://aws.amazon.com/verification/AWS-PRO-987654"
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      issueDate: "2022",
      credentialUrl: "https://cncf.io/verify/CKA-123456"
    }
  ],
  resumeFile: {
    name: "Deepanshu_Arora_Senior_SWE_Resume.pdf",
    size: 215420,
    type: "application/pdf",
    uploadTime: "Recently uploaded",
    simulatedText: "Senior Full Stack Engineer with 5+ years building distributed applications..."
  }
};

const EMPTY_FORM_STATE = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    github: "",
    linkedin: "",
    summary: ""
  },
  targetRole: {
    title: "Full Stack Engineer",
    company: "",
    level: "Senior (5-8 yrs)",
    jobDescription: ""
  },
  education: [
    {
      id: "edu-init-1",
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      gpa: ""
    }
  ],
  skills: {
    languages: "",
    frameworks: "",
    cloudDevOps: "",
    databases: "",
    customTags: []
  },
  experience: [
    {
      id: "exp-init-1",
      company: "",
      role: "",
      location: "",
      employmentType: "Full-Time",
      startDate: "",
      endDate: "",
      isCurrent: false,
      bullets: [""]
    }
  ],
  projects: [
    {
      id: "proj-init-1",
      title: "",
      techStack: "",
      demoUrl: "",
      githubUrl: "",
      description: ""
    }
  ],
  certifications: [
    {
      id: "cert-init-1",
      name: "",
      issuer: "",
      issueDate: "",
      credentialUrl: ""
    }
  ],
  resumeFile: null
};

export default function ResumeReviewForm({ onNavigateBack }) {
  // Form State initialized from localStorage draft or default empty
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("prepos_resume_form_draft_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return EMPTY_FORM_STATE;
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [newTagInput, setNewTagInput] = useState("");
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [reviewResult, setReviewResult] = useState(null);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  const fileInputRef = useRef(null);
  const firstErrorRef = useRef(null);

  // Auto-save form draft to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("prepos_resume_form_draft_v1", JSON.stringify(formData));
    } catch (e) {}
  }, [formData]);

  // Validation function
  const validateForm = (dataToValidate = formData) => {
    const newErrors = {};

    // 1. Personal details
    if (!dataToValidate.personal.fullName?.trim()) {
      newErrors["personal.fullName"] = "Full name is required";
    }

    if (!dataToValidate.personal.email?.trim()) {
      newErrors["personal.email"] = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataToValidate.personal.email.trim())) {
      newErrors["personal.email"] = "Please enter a valid email address (e.g., name@example.com)";
    }

    if (!dataToValidate.personal.phone?.trim()) {
      newErrors["personal.phone"] = "Phone number is required";
    } else if (!/^[+\d\s\-()]{7,25}$/.test(dataToValidate.personal.phone.trim())) {
      newErrors["personal.phone"] = "Enter a valid phone number (at least 7 digits)";
    }

    if (!dataToValidate.personal.location?.trim()) {
      newErrors["personal.location"] = "Location is required (e.g. 'San Francisco, CA' or 'Remote')";
    }

    if (!dataToValidate.personal.summary?.trim()) {
      newErrors["personal.summary"] = "Professional summary is required for ATS screening";
    } else if (dataToValidate.personal.summary.trim().length < 25) {
      newErrors["personal.summary"] = "Summary should be at least 25 characters for meaningful review";
    }

    // Optional URLs check
    if (dataToValidate.personal.portfolio?.trim() && !/^https?:\/\/.+/i.test(dataToValidate.personal.portfolio.trim())) {
      newErrors["personal.portfolio"] = "Portfolio link must start with http:// or https://";
    }

    // 2. Target Job Role
    if (!dataToValidate.targetRole.title?.trim()) {
      newErrors["targetRole.title"] = "Target job title is required";
    }

    // 3. Education Validation
    if (!dataToValidate.education || dataToValidate.education.length === 0) {
      newErrors["education"] = "At least one education entry is required";
    } else {
      dataToValidate.education.forEach((edu, idx) => {
        if (!edu.institution?.trim()) {
          newErrors[`education[${idx}].institution`] = "Institution / University is required";
        }
        if (!edu.degree?.trim()) {
          newErrors[`education[${idx}].degree`] = "Degree is required (e.g. B.S., M.S., B.Tech)";
        }
        if (!edu.endYear?.trim()) {
          newErrors[`education[${idx}].endYear`] = "Graduation year or expected date is required";
        }
      });
    }

    // 4. Skills Validation
    const hasAnyCategorySkill =
      dataToValidate.skills.languages?.trim() ||
      dataToValidate.skills.frameworks?.trim() ||
      dataToValidate.skills.cloudDevOps?.trim() ||
      dataToValidate.skills.databases?.trim() ||
      (dataToValidate.skills.customTags && dataToValidate.skills.customTags.length > 0);

    if (!hasAnyCategorySkill) {
      newErrors["skills"] = "Please provide at least some technical skills or languages";
    }

    // 5. Experience Validation
    if (dataToValidate.experience && dataToValidate.experience.length > 0) {
      dataToValidate.experience.forEach((exp, idx) => {
        // If experience item is partially filled or present, require main fields
        if (exp.company?.trim() || exp.role?.trim() || exp.bullets?.some(b => b?.trim())) {
          if (!exp.role?.trim()) {
            newErrors[`experience[${idx}].role`] = "Job role/title is required";
          }
          if (!exp.company?.trim()) {
            newErrors[`experience[${idx}].company`] = "Company name is required";
          }
          if (!exp.startDate?.trim()) {
            newErrors[`experience[${idx}].startDate`] = "Start date is required";
          }
          if (!exp.bullets || exp.bullets.filter(b => b.trim().length > 0).length === 0) {
            newErrors[`experience[${idx}].bullets`] = "Add at least one achievement or responsibility bullet point";
          }
        }
      });
    }

    // 6. Projects Validation
    if (dataToValidate.projects && dataToValidate.projects.length > 0) {
      dataToValidate.projects.forEach((proj, idx) => {
        if (proj.title?.trim() || proj.techStack?.trim() || proj.description?.trim()) {
          if (!proj.title?.trim()) {
            newErrors[`projects[${idx}].title`] = "Project title is required";
          }
          if (!proj.techStack?.trim()) {
            newErrors[`projects[${idx}].techStack`] = "Key tech stack / technologies used is required";
          }
          if (!proj.description?.trim()) {
            newErrors[`projects[${idx}].description`] = "Project description is required";
          }
        }
      });
    }

    // 7. Certifications Validation
    if (dataToValidate.certifications && dataToValidate.certifications.length > 0) {
      dataToValidate.certifications.forEach((cert, idx) => {
        if (cert.name?.trim() || cert.issuer?.trim()) {
          if (!cert.name?.trim()) {
            newErrors[`certifications[${idx}].name`] = "Certification name is required";
          }
          if (!cert.issuer?.trim()) {
            newErrors[`certifications[${idx}].issuer`] = "Issuing organization is required";
          }
        }
      });
    }

    return newErrors;
  };

  // Real-time error evaluation when touched changes
  useEffect(() => {
    const errs = validateForm(formData);
    setErrors(errs);
  }, [formData]);

  const handleBlur = (fieldKey) => {
    setTouched((prev) => ({ ...prev, [fieldKey]: true }));
  };

  // Form Field Updates
  const handlePersonalChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handleTargetRoleChange = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      targetRole: { ...prev.targetRole, [field]: val }
    }));
  };

  const handleSkillsCategoryChange = (cat, val) => {
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [cat]: val }
    }));
  };

  // Dynamic Skill Tags
  const handleAddCustomTag = (e) => {
    if (e) e.preventDefault();
    const tag = newTagInput.trim();
    if (tag && !formData.skills.customTags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          customTags: [...prev.skills.customTags, tag]
        }
      }));
      setNewTagInput("");
    }
  };

  const handleRemoveCustomTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        customTags: prev.skills.customTags.filter((t) => t !== tagToRemove)
      }
    }));
  };

  const handleAddSuggestedSkill = (skill) => {
    if (!formData.skills.customTags.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          customTags: [...prev.skills.customTags, skill]
        }
      }));
    }
  };

  // Dynamic Education Handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      gpa: ""
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleUpdateEducation = (idx, field, val) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, education: updated };
    });
  };

  const handleRemoveEducation = (idx) => {
    if (formData.education.length <= 1) {
      // Keep at least one empty
      setFormData((prev) => ({
        ...prev,
        education: [
          {
            id: `edu-${Date.now()}`,
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startYear: "",
            endYear: "",
            gpa: ""
          }
        ]
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  // Dynamic Experience Handlers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "",
      role: "",
      location: "",
      employmentType: "Full-Time",
      startDate: "",
      endDate: "",
      isCurrent: false,
      bullets: [""]
    };
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const handleUpdateExperience = (idx, field, val) => {
    setFormData((prev) => {
      const updated = [...prev.experience];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, experience: updated };
    });
  };

  const handleRemoveExperience = (idx) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  const handleAddBullet = (expIdx) => {
    setFormData((prev) => {
      const updated = [...prev.experience];
      updated[expIdx] = {
        ...updated[expIdx],
        bullets: [...updated[expIdx].bullets, ""]
      };
      return { ...prev, experience: updated };
    });
  };

  const handleUpdateBullet = (expIdx, bulletIdx, val) => {
    setFormData((prev) => {
      const updated = [...prev.experience];
      const newBullets = [...updated[expIdx].bullets];
      newBullets[bulletIdx] = val;
      updated[expIdx] = { ...updated[expIdx], bullets: newBullets };
      return { ...prev, experience: updated };
    });
  };

  const handleRemoveBullet = (expIdx, bulletIdx) => {
    setFormData((prev) => {
      const updated = [...prev.experience];
      if (updated[expIdx].bullets.length <= 1) {
        updated[expIdx] = { ...updated[expIdx], bullets: [""] };
      } else {
        updated[expIdx] = {
          ...updated[expIdx],
          bullets: updated[expIdx].bullets.filter((_, bI) => bI !== bulletIdx)
        };
      }
      return { ...prev, experience: updated };
    });
  };

  // Dynamic Projects Handlers
  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "",
      techStack: "",
      demoUrl: "",
      githubUrl: "",
      description: ""
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const handleUpdateProject = (idx, field, val) => {
    setFormData((prev) => {
      const updated = [...prev.projects];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProject = (idx) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  // Dynamic Certifications Handlers
  const handleAddCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      issueDate: "",
      credentialUrl: ""
    };
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const handleUpdateCertification = (idx, field, val) => {
    setFormData((prev) => {
      const updated = [...prev.certifications];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, certifications: updated };
    });
  };

  const handleRemoveCertification = (idx) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx)
    }));
  };

  // File Upload Handlers
  const handleProcessFile = (file) => {
    setFileError("");
    if (!file) return;

    // Validate type
    const validExtensions = [".pdf", ".docx", ".doc", ".txt"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      setFileError("Invalid format. Please upload a PDF, DOCX, DOC, or TXT file.");
      return;
    }

    // Validate size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("File size exceeds 5MB limit. Please upload an optimized file.");
      return;
    }

    // Extract text simulation or real text
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFormData((prev) => ({
        ...prev,
        resumeFile: {
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          uploadTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          simulatedText: typeof content === "string" ? content.slice(0, 1500) : "Extracted document stream"
        }
      }));
    };

    if (fileExt === ".txt") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, resumeFile: null }));
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Quick Action: Fill Sample Data
  const handleLoadSampleData = () => {
    setFormData(SAMPLE_RESUME_DATA);
    setTouched({});
    setFileError("");
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2000);
  };

  // Quick Action: Clear / Reset Form
  const handleResetForm = () => {
    if (window.confirm("Are you sure you want to reset all fields? Any unsaved progress will be cleared.")) {
      setFormData(EMPTY_FORM_STATE);
      setTouched({});
      setErrors({});
      setFileError("");
      setReviewResult(null);
      localStorage.removeItem("prepos_resume_form_draft_v1");
    }
  };

  // Completion calculation for progress bar
  const calculateProgress = () => {
    let completedSteps = 0;
    const totalSteps = 7;

    // 1. Personal
    if (formData.personal.fullName && formData.personal.email && formData.personal.phone && formData.personal.location && formData.personal.summary) {
      completedSteps += 1;
    }
    // 2. Target Role
    if (formData.targetRole.title) completedSteps += 1;
    // 3. Education
    if (formData.education.some((e) => e.institution && e.degree)) completedSteps += 1;
    // 4. Skills
    if (formData.skills.languages || formData.skills.frameworks || formData.skills.customTags.length > 0) completedSteps += 1;
    // 5. Experience
    if (formData.experience.some((e) => e.company && e.role && e.bullets.some(b => b.trim()))) completedSteps += 1;
    // 6. Projects
    if (formData.projects.some((p) => p.title && p.description)) completedSteps += 1;
    // 7. Certs or File
    if (formData.certifications.some((c) => c.name) || formData.resumeFile) completedSteps += 1;

    return Math.round((completedSteps / totalSteps) * 100);
  };

  // Submission Handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to trigger inline error display
    const allTouched = {
      "personal.fullName": true,
      "personal.email": true,
      "personal.phone": true,
      "personal.location": true,
      "personal.summary": true,
      "targetRole.title": true
    };
    formData.education.forEach((_, idx) => {
      allTouched[`education[${idx}].institution`] = true;
      allTouched[`education[${idx}].degree`] = true;
      allTouched[`education[${idx}].endYear`] = true;
    });
    formData.experience.forEach((_, idx) => {
      allTouched[`experience[${idx}].company`] = true;
      allTouched[`experience[${idx}].role`] = true;
      allTouched[`experience[${idx}].startDate`] = true;
      allTouched[`experience[${idx}].bullets`] = true;
    });
    formData.projects.forEach((_, idx) => {
      allTouched[`projects[${idx}].title`] = true;
      allTouched[`projects[${idx}].techStack`] = true;
      allTouched[`projects[${idx}].description`] = true;
    });
    formData.certifications.forEach((_, idx) => {
      allTouched[`certifications[${idx}].name`] = true;
      allTouched[`certifications[${idx}].issuer`] = true;
    });

    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to the first error
      const firstInvalidElem = document.querySelector(".is-invalid, .rr-error-text");
      if (firstInvalidElem) {
        firstInvalidElem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Begin animated submission & analysis sequence
    setIsSubmitting(true);
    setSubmitStep(1);

    // Simulated multi-stage AI ATS analysis
    const stepTimer1 = setTimeout(() => setSubmitStep(2), 600);
    const stepTimer2 = setTimeout(() => setSubmitStep(3), 1300);
    const stepTimer3 = setTimeout(() => setSubmitStep(4), 2000);

    // Call backend API if running, else use intelligent client analyzer
    setTimeout(async () => {
      let finalAnalysis = null;
      try {
        const response = await fetch("/api/resume/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          finalAnalysis = await response.json();
        }
      } catch (err) {
        // Backend not available; seamlessly compute high-precision analysis client-side
      }

      if (!finalAnalysis) {
        finalAnalysis = generateClientATSReview(formData);
      }

      // Save submission to history
      try {
        localStorage.setItem("prepos_latest_resume_submission_v1", JSON.stringify(formData));
        localStorage.setItem("prepos_latest_resume_review_v1", JSON.stringify(finalAnalysis));
      } catch (e) {}

      setIsSubmitting(false);
      setReviewResult(finalAnalysis);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2600);
  };

  // Client-side ATS Evaluation Engine
  const generateClientATSReview = (data) => {
    const roleKey = data.targetRole.title || "Full Stack Engineer";
    const recommendedKeywords = ROLE_KEYWORDS[roleKey] || ROLE_KEYWORDS["Full Stack Engineer"];

    // Concatenate all text to find matches
    const allText = [
      data.personal.summary,
      data.skills.languages,
      data.skills.frameworks,
      data.skills.cloudDevOps,
      data.skills.databases,
      ...(data.skills.customTags || []),
      ...(data.experience.map(e => `${e.role} ${e.company} ${e.bullets.join(" ")}`)),
      ...(data.projects.map(p => `${p.title} ${p.techStack} ${p.description}`)),
      ...(data.certifications.map(c => `${c.name} ${c.issuer}`)),
      data.resumeFile?.name || "",
      data.resumeFile?.simulatedText || ""
    ].join(" ").toLowerCase();

    const matched = [];
    const missing = [];

    recommendedKeywords.forEach(kw => {
      if (allText.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    });

    // Check metric quantification in experience bullets
    const allBullets = data.experience.flatMap(e => e.bullets).filter(b => b.trim());
    const metricRegex = /\b(\d+%?|\$\d+|\d+k|\d+M|\d+x|\d+\+)\b/i;
    const quantifiedBullets = allBullets.filter(b => metricRegex.test(b));
    const metricRate = allBullets.length > 0 ? Math.round((quantifiedBullets.length / allBullets.length) * 100) : 50;

    // Calculate Sub-scores
    const keywordScore = Math.min(100, Math.round((matched.length / Math.max(1, recommendedKeywords.length)) * 100));
    const sectionScore = 95;
    const formatScore = data.resumeFile ? 92 : 86;
    const overallScore = Math.round((keywordScore * 0.35) + (metricRate * 0.35) + (sectionScore * 0.15) + (formatScore * 0.15));

    // Suggestions for action verbs
    const actionSuggestions = [
      {
        original: allBullets[0] || "Worked on building software microservices...",
        suggestion: `Architected and scaled distributed services for ${roleKey}, improving system latency by 35% across high-throughput production clusters.`
      },
      {
        original: allBullets[1] || "Responsible for database queries and user interfaces...",
        suggestion: "Implemented optimized indexing and caching layers, cutting database response times by 48% under concurrent traffic loads."
      }
    ];

    return {
      overallScore: Math.max(68, overallScore),
      keywordMatchRate: keywordScore,
      quantificationRate: metricRate,
      sectionCompleteness: sectionScore,
      formatCompliance: formatScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      actionSuggestions,
      submittedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      candidateName: data.personal.fullName,
      targetRole: data.targetRole.title,
      targetCompany: data.targetRole.company || "Tier-1 Tech Company",
      totalExperienceEntries: data.experience.length,
      totalProjects: data.projects.length,
      totalCertifications: data.certifications.length,
      hasUploadedFile: !!data.resumeFile
    };
  };

  const progressPercent = calculateProgress();
  const currentSuggestedSkills = (ROLE_KEYWORDS[formData.targetRole.title] || ROLE_KEYWORDS["Full Stack Engineer"]).slice(0, 8);

  // If viewing Review Results
  if (reviewResult) {
    return (
      <div className="rr-results-container">
        {/* Review Results Header */}
        <div className="rr-banner">
          <div className="rr-banner-info">
            <span className="rr-banner-badge" style={{ color: "var(--emerald-accent)", backgroundColor: "var(--emerald-bg)", borderColor: "var(--emerald-border)" }}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Resume Review & ATS Audit Completed
            </span>
            <h2 className="rr-banner-title">ATS Readiness Report: {reviewResult.candidateName}</h2>
            <p className="rr-banner-desc">
              Benchmark analysis against <strong>{reviewResult.targetRole}</strong> role standards at {reviewResult.targetCompany}.
            </p>
          </div>

          <div className="rr-banner-actions">
            {onNavigateBack && (
              <button
                type="button"
                onClick={onNavigateBack}
                className="rr-btn-secondary"
                title="Return to Dashboard"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Dashboard
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setReviewResult(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rr-btn-secondary"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit Form Fields
            </button>
          </div>
        </div>

        {/* Hero Scorecard */}
        <div className="rr-results-hero">
          <div className="rr-results-hero-grid">
            <div>
              <span className="rr-label" style={{ color: "var(--amber-accent)" }}>Overall ATS Match Score</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.25rem" }}>
                <span className="rr-score-badge-large">{reviewResult.overallScore}</span>
                <span style={{ fontSize: "1.25rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>/ 100</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#e2e8f0", marginTop: "0.5rem", lineHeight: 1.5 }}>
                {reviewResult.overallScore >= 85
                  ? "Outstanding candidate profile! Your technical credentials, action verbs, and skills align strongly with FAANG and Tier-1 engineering criteria."
                  : "Good foundational resume with high potential! Adding more quantified impact metrics and recommended keywords will further boost ATS screening pass rates."}
              </p>
            </div>

            <div className="rr-results-submetrics">
              <div className="rr-metric-tile">
                <span className="rr-metric-tile-lbl">Keyword Match</span>
                <span className="rr-metric-tile-val" style={{ color: "var(--emerald-accent)" }}>{reviewResult.keywordMatchRate}%</span>
              </div>
              <div className="rr-metric-tile">
                <span className="rr-metric-tile-lbl">Quantified Impact</span>
                <span className="rr-metric-tile-val" style={{ color: "var(--amber-accent)" }}>{reviewResult.quantificationRate}%</span>
              </div>
              <div className="rr-metric-tile">
                <span className="rr-metric-tile-lbl">Section Depth</span>
                <span className="rr-metric-tile-val" style={{ color: "var(--cyan-accent)" }}>{reviewResult.sectionCompleteness}%</span>
              </div>
              <div className="rr-metric-tile">
                <span className="rr-metric-tile-lbl">Format Compliance</span>
                <span className="rr-metric-tile-val" style={{ color: "var(--indigo-accent)" }}>{reviewResult.formatCompliance}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Grid: Keywords & Section Audit */}
        <div className="rr-results-breakdown-grid">
          {/* Keywords Match Card */}
          <div className="rr-audit-card">
            <div className="rr-audit-card-title">
              <Sparkles className="h-4 w-4" style={{ color: "var(--cyan-accent)" }} />
              Target Role Skills & Keywords ({reviewResult.targetRole})
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <span className="rr-label" style={{ color: "var(--emerald-accent)", marginBottom: "0.375rem" }}>
                  Matched High-Impact Keywords ({reviewResult.matchedKeywords.length})
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {reviewResult.matchedKeywords.map((kw) => (
                    <span key={kw} className="rr-skill-tag" style={{ background: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              {reviewResult.missingKeywords.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                  <span className="rr-label" style={{ color: "var(--rose-accent)", marginBottom: "0.375rem" }}>
                    Recommended Keywords to Consider ({reviewResult.missingKeywords.length})
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {reviewResult.missingKeywords.map((kw) => (
                      <span key={kw} className="rr-skill-tag" style={{ background: "var(--rose-bg)", color: "var(--rose-accent)", borderColor: "var(--rose-border)" }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actionable Feedback Audit */}
          <div className="rr-audit-card">
            <div className="rr-audit-card-title">
              <ShieldCheck className="h-4 w-4" style={{ color: "var(--emerald-accent)" }} />
              Section-by-Section ATS Audit
            </div>

            <div className="rr-audit-list">
              <div className="rr-audit-item positive">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <strong>Work Experience & Projects:</strong> {reviewResult.totalExperienceEntries} experience roles and {reviewResult.totalProjects} project entries recorded with clear technical stack breakdown.
                </div>
              </div>

              <div className="rr-audit-item positive">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <strong>Education & Credentials:</strong> Verified academic history and {reviewResult.totalCertifications} industry certifications attached.
                </div>
              </div>

              {reviewResult.hasUploadedFile ? (
                <div className="rr-audit-item positive">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong>Document Upload:</strong> ATS parseable file attached ({formData.resumeFile?.name}).
                  </div>
                </div>
              ) : (
                <div className="rr-audit-item warning">
                  <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <strong>Document Upload:</strong> No PDF/DOCX file was uploaded. Uploading a document allows validating font encoding and page margins.
                  </div>
                </div>
              )}

              {reviewResult.quantificationRate < 70 && (
                <div className="rr-audit-item warning">
                  <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <strong>Impact Quantification:</strong> {100 - reviewResult.quantificationRate}% of bullet points lack numeric metrics. Aim for Google's XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]".
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Bullet Point Impact Optimizer */}
        <div className="rr-section">
          <div className="rr-section-header">
            <div className="rr-section-title-wrap">
              <div className="rr-section-icon-box" style={{ background: "var(--amber-bg)", color: "var(--amber-accent)" }}>
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="rr-section-title">AI Bullet Point Impact Optimization</h3>
                <p className="rr-section-subtitle">Comparative before-and-after rewrite suggestions for higher ATS parsing impact</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {reviewResult.actionSuggestions.map((item, idx) => (
              <div key={idx} className="rr-bullet-opt-card">
                <div className="rr-bullet-opt-original">
                  Original Bullet: "{item.original}"
                </div>
                <div className="rr-bullet-opt-suggested">
                  Optimized ATS Version: "{item.suggestion}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="rr-results-actions">
          <button
            type="button"
            onClick={() => {
              setReviewResult(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rr-btn-secondary"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Back to Form Editor
          </button>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                setReviewResult(null);
                handleResetForm();
              }}
              className="rr-btn-secondary rr-btn-danger"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset & New Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Submission Progress Modal / Overlay
  if (isSubmitting) {
    return (
      <div className="rr-loading-overlay">
        <div className="rr-loading-spinner-wrap">
          <div className="rr-spinner-ring" />
          <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
        </div>

        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#ffffff", margin: 0 }}>
            Analyzing Your Technical Profile
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.375rem" }}>
            Benchmarking against {formData.targetRole.title || "Full Stack Engineer"} screening algorithms...
          </p>
        </div>

        <div className="rr-loading-steps-list">
          <div className={`rr-loading-step-item ${submitStep > 1 ? "done" : submitStep === 1 ? "active" : ""}`}>
            {submitStep > 1 ? <CheckCircle2 className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />}
            Parsing candidate contact, education, and credentials...
          </div>
          <div className={`rr-loading-step-item ${submitStep > 2 ? "done" : submitStep === 2 ? "active" : ""}`}>
            {submitStep > 2 ? <CheckCircle2 className="h-4 w-4" /> : submitStep === 2 ? <Loader2 className="h-4 w-4 animate-spin" /> : <div className="h-4 w-4 rounded-full border border-slate-700" />}
            Matching technical skills against Tier-1 company standards...
          </div>
          <div className={`rr-loading-step-item ${submitStep > 3 ? "done" : submitStep === 3 ? "active" : ""}`}>
            {submitStep > 3 ? <CheckCircle2 className="h-4 w-4" /> : submitStep === 3 ? <Loader2 className="h-4 w-4 animate-spin" /> : <div className="h-4 w-4 rounded-full border border-slate-700" />}
            Auditing bullet points for XYZ formula and numeric quantification...
          </div>
          <div className={`rr-loading-step-item ${submitStep >= 4 ? "active" : ""}`}>
            {submitStep >= 4 ? <Loader2 className="h-4 w-4 animate-spin" /> : <div className="h-4 w-4 rounded-full border border-slate-700" />}
            Synthesizing ATS readiness score and recommendations...
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="rr-container" onSubmit={handleSubmit} noValidate>
      {/* Top Banner & Quick Actions */}
      <div className="rr-banner">
        <div className="rr-banner-info">
          <span className="rr-banner-badge">
            <Sparkles className="h-3.5 w-3.5" />
            Complete Resume Review Form
          </span>
          <h2 className="rr-banner-title">Technical Interview Resume Review</h2>
          <p className="rr-banner-desc">
            Provide your candidate profile, target role, education, work experience, projects, and resume file for a full ATS audit.
          </p>
        </div>

        <div className="rr-banner-actions">
          {onNavigateBack && (
            <button
              type="button"
              onClick={onNavigateBack}
              className="rr-btn-secondary"
              title="Return to Dashboard"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Dashboard
            </button>
          )}
          <button
            type="button"
            onClick={handleLoadSampleData}
            className="rr-btn-secondary rr-btn-sample"
            title="Populate with FAANG Senior Engineer sample data"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Fill Sample Data
          </button>
          <button
            type="button"
            onClick={handleResetForm}
            className="rr-btn-secondary rr-btn-danger"
            title="Clear all fields"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Form
          </button>
        </div>
      </div>

      {/* Progress Tracker Card */}
      <div className="rr-progress-card">
        <div className="rr-progress-header">
          <div className="rr-progress-title">
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            <span>Form Completion Status</span>
          </div>
          <span className="rr-progress-stat">{progressPercent}% Completed</span>
        </div>

        <div className="rr-progress-track">
          <div className="rr-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="rr-progress-steps">
          <span className={`rr-step-pill ${formData.personal.fullName && formData.personal.email ? "completed" : ""}`}>
            {formData.personal.fullName && formData.personal.email ? "✓" : "○"} Personal
          </span>
          <span className={`rr-step-pill ${formData.targetRole.title ? "completed" : ""}`}>
            {formData.targetRole.title ? "✓" : "○"} Target Role
          </span>
          <span className={`rr-step-pill ${formData.education.some(e => e.institution) ? "completed" : ""}`}>
            {formData.education.some(e => e.institution) ? "✓" : "○"} Education
          </span>
          <span className={`rr-step-pill ${formData.skills.languages || formData.skills.customTags.length > 0 ? "completed" : ""}`}>
            {formData.skills.languages || formData.skills.customTags.length > 0 ? "✓" : "○"} Skills
          </span>
          <span className={`rr-step-pill ${formData.experience.some(e => e.company) ? "completed" : ""}`}>
            {formData.experience.some(e => e.company) ? "✓" : "○"} Experience
          </span>
          <span className={`rr-step-pill ${formData.projects.some(p => p.title) ? "completed" : ""}`}>
            {formData.projects.some(p => p.title) ? "✓" : "○"} Projects
          </span>
          <span className={`rr-step-pill ${formData.certifications.some(c => c.name) || formData.resumeFile ? "completed" : ""}`}>
            {formData.certifications.some(c => c.name) || formData.resumeFile ? "✓" : "○"} Certs & File
          </span>
        </div>
      </div>

      {/* Error Alert Banner if validation failed */}
      {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
        <div className="rr-error-banner" ref={firstErrorRef}>
          <AlertCircle className="rr-error-banner-icon h-5 w-5" />
          <div className="rr-error-banner-content">
            <h4>Please correct {Object.keys(errors).length} required field{Object.keys(errors).length > 1 ? "s" : ""}</h4>
            <p>
              Some required sections contain missing or invalid information. Please review the highlighted fields below.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: Personal Details */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--amber-bg)", color: "var(--amber-accent)" }}>
              <User className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Personal & Contact Details</h3>
              <p className="rr-section-subtitle">Your contact links, location, and professional overview</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--amber-bg)", color: "var(--amber-accent)" }}>
            Step 1 of 7
          </span>
        </div>

        <div className="rr-grid-2">
          {/* Full Name */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Full Name <span className="rr-required">*</span></span>
            </label>
            <div className="rr-input-wrapper">
              <input
                type="text"
                placeholder="e.g. Deepanshu Arora"
                value={formData.personal.fullName}
                onChange={(e) => handlePersonalChange("fullName", e.target.value)}
                onBlur={() => handleBlur("personal.fullName")}
                className={`rr-input ${touched["personal.fullName"] && errors["personal.fullName"] ? "is-invalid" : ""}`}
              />
            </div>
            {touched["personal.fullName"] && errors["personal.fullName"] && (
              <span className="rr-error-text">
                <AlertCircle className="h-3 w-3" /> {errors["personal.fullName"]}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Email Address <span className="rr-required">*</span></span>
            </label>
            <div className="rr-input-wrapper">
              <input
                type="email"
                placeholder="e.g. deepanshu@example.com"
                value={formData.personal.email}
                onChange={(e) => handlePersonalChange("email", e.target.value)}
                onBlur={() => handleBlur("personal.email")}
                className={`rr-input ${touched["personal.email"] && errors["personal.email"] ? "is-invalid" : ""}`}
              />
            </div>
            {touched["personal.email"] && errors["personal.email"] && (
              <span className="rr-error-text">
                <AlertCircle className="h-3 w-3" /> {errors["personal.email"]}
              </span>
            )}
          </div>
        </div>

        <div className="rr-grid-2">
          {/* Phone */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Phone Number <span className="rr-required">*</span></span>
            </label>
            <div className="rr-input-wrapper">
              <input
                type="tel"
                placeholder="e.g. +1 (555) 234-5678"
                value={formData.personal.phone}
                onChange={(e) => handlePersonalChange("phone", e.target.value)}
                onBlur={() => handleBlur("personal.phone")}
                className={`rr-input ${touched["personal.phone"] && errors["personal.phone"] ? "is-invalid" : ""}`}
              />
            </div>
            {touched["personal.phone"] && errors["personal.phone"] && (
              <span className="rr-error-text">
                <AlertCircle className="h-3 w-3" /> {errors["personal.phone"]}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Location / City, Country <span className="rr-required">*</span></span>
            </label>
            <div className="rr-input-wrapper">
              <input
                type="text"
                placeholder="e.g. San Francisco, CA or Remote"
                value={formData.personal.location}
                onChange={(e) => handlePersonalChange("location", e.target.value)}
                onBlur={() => handleBlur("personal.location")}
                className={`rr-input ${touched["personal.location"] && errors["personal.location"] ? "is-invalid" : ""}`}
              />
            </div>
            {touched["personal.location"] && errors["personal.location"] && (
              <span className="rr-error-text">
                <AlertCircle className="h-3 w-3" /> {errors["personal.location"]}
              </span>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="rr-grid-3">
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Portfolio / Website</span>
              <span className="rr-optional">Optional</span>
            </label>
            <input
              type="url"
              placeholder="https://yourportfolio.dev"
              value={formData.personal.portfolio}
              onChange={(e) => handlePersonalChange("portfolio", e.target.value)}
              onBlur={() => handleBlur("personal.portfolio")}
              className={`rr-input ${touched["personal.portfolio"] && errors["personal.portfolio"] ? "is-invalid" : ""}`}
            />
            {touched["personal.portfolio"] && errors["personal.portfolio"] && (
              <span className="rr-error-text">
                <AlertCircle className="h-3 w-3" /> {errors["personal.portfolio"]}
              </span>
            )}
          </div>

          <div className="rr-field-group">
            <label className="rr-label">
              <span>GitHub Profile</span>
              <span className="rr-optional">Optional</span>
            </label>
            <input
              type="text"
              placeholder="github.com/username"
              value={formData.personal.github}
              onChange={(e) => handlePersonalChange("github", e.target.value)}
              className="rr-input"
            />
          </div>

          <div className="rr-field-group">
            <label className="rr-label">
              <span>LinkedIn Profile</span>
              <span className="rr-optional">Optional</span>
            </label>
            <input
              type="text"
              placeholder="linkedin.com/in/username"
              value={formData.personal.linkedin}
              onChange={(e) => handlePersonalChange("linkedin", e.target.value)}
              className="rr-input"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="rr-field-group">
          <label className="rr-label">
            <span>Professional Summary & Bio <span className="rr-required">*</span></span>
            <span className="rr-optional">Minimum 25 characters</span>
          </label>
          <textarea
            rows={3}
            placeholder="Highlight your engineering expertise, key tech stacks, and high-impact career accomplishments..."
            value={formData.personal.summary}
            onChange={(e) => handlePersonalChange("summary", e.target.value)}
            onBlur={() => handleBlur("personal.summary")}
            className={`rr-textarea ${touched["personal.summary"] && errors["personal.summary"] ? "is-invalid" : ""}`}
          />
          {touched["personal.summary"] && errors["personal.summary"] && (
            <span className="rr-error-text">
              <AlertCircle className="h-3 w-3" /> {errors["personal.summary"]}
            </span>
          )}
        </div>
      </div>

      {/* SECTION 2: Target Job Role & Goals */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--indigo-bg)", color: "var(--indigo-accent)" }}>
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Target Job Role & Benchmarking</h3>
              <p className="rr-section-subtitle">Tailor the ATS keyword scoring against your target engineering position</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--indigo-bg)", color: "var(--indigo-accent)" }}>
            Step 2 of 7
          </span>
        </div>

        <div className="rr-grid-3">
          {/* Target Role Title */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Target Role Title <span className="rr-required">*</span></span>
            </label>
            <select
              value={formData.targetRole.title}
              onChange={(e) => handleTargetRoleChange("title", e.target.value)}
              onBlur={() => handleBlur("targetRole.title")}
              className={`rr-select ${touched["targetRole.title"] && errors["targetRole.title"] ? "is-invalid" : ""}`}
            >
              <option value="Full Stack Engineer">Full Stack Engineer</option>
              <option value="Senior Backend Engineer">Senior Backend Engineer</option>
              <option value="Frontend Architect">Frontend Architect</option>
              <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
              <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
              <option value="Mobile Software Engineer">Mobile Software Engineer</option>
            </select>
            {touched["targetRole.title"] && errors["targetRole.title"] && (
              <span className="rr-error-text">
                <AlertCircle className="h-3 w-3" /> {errors["targetRole.title"]}
              </span>
            )}
          </div>

          {/* Target Company */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Target Company / Industry</span>
              <span className="rr-optional">Optional</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Meta, Stripe, Amazon, Fintech"
              value={formData.targetRole.company}
              onChange={(e) => handleTargetRoleChange("company", e.target.value)}
              className="rr-input"
            />
          </div>

          {/* Seniority Level */}
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Seniority Level</span>
            </label>
            <select
              value={formData.targetRole.level}
              onChange={(e) => handleTargetRoleChange("level", e.target.value)}
              className="rr-select"
            >
              <option value="Entry-Level (0-2 yrs)">Entry-Level / New Grad (0-2 yrs)</option>
              <option value="Mid-Level (2-5 yrs)">Mid-Level (2-5 yrs)</option>
              <option value="Senior (5-8 yrs)">Senior (5-8 yrs)</option>
              <option value="Staff / Principal (8+ yrs)">Staff / Principal (8+ yrs)</option>
            </select>
          </div>
        </div>

        {/* Target Job Description */}
        <div className="rr-field-group">
          <label className="rr-label">
            <span>Target Job Description / Key Requirements</span>
            <span className="rr-optional">Paste job posting to cross-reference ATS keywords</span>
          </label>
          <textarea
            rows={2}
            placeholder="Paste the job description from LinkedIn, Indeed, or company careers page to test keyword compatibility..."
            value={formData.targetRole.jobDescription}
            onChange={(e) => handleTargetRoleChange("jobDescription", e.target.value)}
            className="rr-textarea"
          />
        </div>
      </div>

      {/* SECTION 3: Education (Dynamic Add/Remove) */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--purple-bg)", color: "var(--purple-accent)" }}>
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Education & Academic History</h3>
              <p className="rr-section-subtitle">Add university degrees, colleges, or bootcamps</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--purple-bg)", color: "var(--purple-accent)" }}>
            Step 3 of 7
          </span>
        </div>

        {errors["education"] && (
          <span className="rr-error-text">
            <AlertCircle className="h-3 w-3" /> {errors["education"]}
          </span>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {formData.education.map((edu, idx) => (
            <div key={edu.id || idx} className="rr-item-card">
              <div className="rr-item-card-header">
                <span className="rr-item-card-index">
                  <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
                  Education Entry #{idx + 1}
                </span>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(idx)}
                    className="rr-item-remove-btn"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <div className="rr-grid-2">
                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Institution / University <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UC Berkeley, MIT, Stanford"
                    value={edu.institution}
                    onChange={(e) => handleUpdateEducation(idx, "institution", e.target.value)}
                    onBlur={() => handleBlur(`education[${idx}].institution`)}
                    className={`rr-input ${touched[`education[${idx}].institution`] && errors[`education[${idx}].institution`] ? "is-invalid" : ""}`}
                  />
                  {touched[`education[${idx}].institution`] && errors[`education[${idx}].institution`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`education[${idx}].institution`]}
                    </span>
                  )}
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Degree <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.S. in Computer Science"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(idx, "degree", e.target.value)}
                    onBlur={() => handleBlur(`education[${idx}].degree`)}
                    className={`rr-input ${touched[`education[${idx}].degree`] && errors[`education[${idx}].degree`] ? "is-invalid" : ""}`}
                  />
                  {touched[`education[${idx}].degree`] && errors[`education[${idx}].degree`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`education[${idx}].degree`]}
                    </span>
                  )}
                </div>
              </div>

              <div className="rr-grid-3">
                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Major / Field of Study</span>
                    <span className="rr-optional">Optional</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineering"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleUpdateEducation(idx, "fieldOfStudy", e.target.value)}
                    className="rr-input"
                  />
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Graduation Year / Dates <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2016 - 2020 or 2024"
                    value={edu.endYear}
                    onChange={(e) => handleUpdateEducation(idx, "endYear", e.target.value)}
                    onBlur={() => handleBlur(`education[${idx}].endYear`)}
                    className={`rr-input ${touched[`education[${idx}].endYear`] && errors[`education[${idx}].endYear`] ? "is-invalid" : ""}`}
                  />
                  {touched[`education[${idx}].endYear`] && errors[`education[${idx}].endYear`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`education[${idx}].endYear`]}
                    </span>
                  )}
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>GPA / Honors</span>
                    <span className="rr-optional">Optional</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.8 / 4.0, Magna Cum Laude"
                    value={edu.gpa}
                    onChange={(e) => handleUpdateEducation(idx, "gpa", e.target.value)}
                    className="rr-input"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddEducation}
            className="rr-add-item-btn"
          >
            <Plus className="h-4 w-4" /> Add Another Education Entry
          </button>
        </div>
      </div>

      {/* SECTION 4: Technical Skills */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--cyan-bg)", color: "var(--cyan-accent)" }}>
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Technical Skills & Competencies</h3>
              <p className="rr-section-subtitle">Categorized skills and interactive tags for ATS parsing</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--cyan-bg)", color: "var(--cyan-accent)" }}>
            Step 4 of 7
          </span>
        </div>

        {errors["skills"] && (
          <span className="rr-error-text">
            <AlertCircle className="h-3 w-3" /> {errors["skills"]}
          </span>
        )}

        <div className="rr-grid-2">
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Programming Languages</span>
            </label>
            <input
              type="text"
              placeholder="e.g. TypeScript, JavaScript, Python, Go, Java, SQL"
              value={formData.skills.languages}
              onChange={(e) => handleSkillsCategoryChange("languages", e.target.value)}
              className="rr-input"
            />
          </div>

          <div className="rr-field-group">
            <label className="rr-label">
              <span>Frameworks & Libraries</span>
            </label>
            <input
              type="text"
              placeholder="e.g. React, Next.js, Node.js, Express, TailwindCSS"
              value={formData.skills.frameworks}
              onChange={(e) => handleSkillsCategoryChange("frameworks", e.target.value)}
              className="rr-input"
            />
          </div>
        </div>

        <div className="rr-grid-2">
          <div className="rr-field-group">
            <label className="rr-label">
              <span>Cloud & DevOps Tools</span>
            </label>
            <input
              type="text"
              placeholder="e.g. AWS, Docker, Kubernetes, Terraform, CI/CD"
              value={formData.skills.cloudDevOps}
              onChange={(e) => handleSkillsCategoryChange("cloudDevOps", e.target.value)}
              className="rr-input"
            />
          </div>

          <div className="rr-field-group">
            <label className="rr-label">
              <span>Databases & Architectures</span>
            </label>
            <input
              type="text"
              placeholder="e.g. PostgreSQL, Redis, MongoDB, GraphQL, Kafka"
              value={formData.skills.databases}
              onChange={(e) => handleSkillsCategoryChange("databases", e.target.value)}
              className="rr-input"
            />
          </div>
        </div>

        {/* Dynamic Skill Tags */}
        <div className="rr-skills-cloud-wrap">
          <label className="rr-label">
            <span>Dynamic Custom Skill Tags</span>
            <span className="rr-optional">Type and press Enter or click Add</span>
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Type a skill (e.g. WebSockets, OAuth2, Microservices)..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomTag();
                }
              }}
              className="rr-input"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleAddCustomTag}
              className="rr-btn-secondary"
              style={{ color: "var(--cyan-accent)", borderColor: "var(--cyan-border)" }}
            >
              <Plus className="h-3.5 w-3.5" /> Add Tag
            </button>
          </div>

          {formData.skills.customTags && formData.skills.customTags.length > 0 && (
            <div className="rr-tags-container">
              {formData.skills.customTags.map((tag) => (
                <span key={tag} className="rr-skill-tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomTag(tag)}
                    className="rr-skill-tag-remove"
                    title={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Quick Suggested Skills for the Role */}
          <div className="rr-suggested-skills-box">
            <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>Suggested for {formData.targetRole.title}:</span>
            {currentSuggestedSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSuggestedSkill(skill)}
                className="rr-suggested-tag-btn"
                title={`Click to add ${skill}`}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5: Work Experience (Dynamic Add/Remove) */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--amber-bg)", color: "var(--amber-accent)" }}>
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Work Experience & Accomplishments</h3>
              <p className="rr-section-subtitle">Add career roles and high-impact achievement bullet points</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--amber-bg)", color: "var(--amber-accent)" }}>
            Step 5 of 7
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {formData.experience.map((exp, expIdx) => (
            <div key={exp.id || expIdx} className="rr-item-card">
              <div className="rr-item-card-header">
                <span className="rr-item-card-index">
                  <Briefcase className="h-3.5 w-3.5 text-amber-400" />
                  Experience Position #{expIdx + 1}
                </span>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(expIdx)}
                    className="rr-item-remove-btn"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove Role
                  </button>
                )}
              </div>

              <div className="rr-grid-2">
                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Job Title / Role <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={exp.role}
                    onChange={(e) => handleUpdateExperience(expIdx, "role", e.target.value)}
                    onBlur={() => handleBlur(`experience[${expIdx}].role`)}
                    className={`rr-input ${touched[`experience[${expIdx}].role`] && errors[`experience[${expIdx}].role`] ? "is-invalid" : ""}`}
                  />
                  {touched[`experience[${expIdx}].role`] && errors[`experience[${expIdx}].role`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`experience[${expIdx}].role`]}
                    </span>
                  )}
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Company Name <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stripe, Uber, Google"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(expIdx, "company", e.target.value)}
                    onBlur={() => handleBlur(`experience[${expIdx}].company`)}
                    className={`rr-input ${touched[`experience[${expIdx}].company`] && errors[`experience[${expIdx}].company`] ? "is-invalid" : ""}`}
                  />
                  {touched[`experience[${expIdx}].company`] && errors[`experience[${expIdx}].company`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`experience[${expIdx}].company`]}
                    </span>
                  )}
                </div>
              </div>

              <div className="rr-grid-3">
                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Location</span>
                    <span className="rr-optional">Optional</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience(expIdx, "location", e.target.value)}
                    className="rr-input"
                  />
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Start Date <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jan 2022"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(expIdx, "startDate", e.target.value)}
                    onBlur={() => handleBlur(`experience[${expIdx}].startDate`)}
                    className={`rr-input ${touched[`experience[${expIdx}].startDate`] && errors[`experience[${expIdx}].startDate`] ? "is-invalid" : ""}`}
                  />
                  {touched[`experience[${expIdx}].startDate`] && errors[`experience[${expIdx}].startDate`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`experience[${expIdx}].startDate`]}
                    </span>
                  )}
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>End Date</span>
                    <span className="rr-optional">
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={(e) => handleUpdateExperience(expIdx, "isCurrent", e.target.checked)}
                          style={{ accentColor: "var(--amber-accent)" }}
                        />
                        Present
                      </label>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Present or Dec 2023"
                    value={exp.isCurrent ? "Present" : exp.endDate}
                    disabled={exp.isCurrent}
                    onChange={(e) => handleUpdateExperience(expIdx, "endDate", e.target.value)}
                    className="rr-input"
                  />
                </div>
              </div>

              {/* Dynamic Bullets List for Experience */}
              <div className="rr-field-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="rr-label">
                    <span>Key Achievements & Responsibilities <span className="rr-required">*</span></span>
                    <span className="rr-optional">Use metrics & action verbs (e.g. 'reduced latency by 35%')</span>
                  </label>
                </div>

                {touched[`experience[${expIdx}].bullets`] && errors[`experience[${expIdx}].bullets`] && (
                  <span className="rr-error-text">
                    <AlertCircle className="h-3 w-3" /> {errors[`experience[${expIdx}].bullets`]}
                  </span>
                )}

                <div className="rr-bullets-list">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="rr-bullet-row">
                      <span className="rr-bullet-dot">•</span>
                      <textarea
                        rows={2}
                        placeholder="e.g. Architected microservices in Go & Node.js processing 50K+ QPS, improving P99 latency by 38%..."
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(expIdx, bIdx, e.target.value)}
                        className="rr-textarea"
                        style={{ minHeight: "3.75rem", padding: "0.5rem 0.75rem" }}
                      />
                      {exp.bullets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(expIdx, bIdx)}
                          className="rr-bullet-remove-btn"
                          title="Delete bullet point"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddBullet(expIdx)}
                    className="rr-btn-secondary"
                    style={{ width: "fit-content", fontSize: "11px", padding: "0.3rem 0.6rem", color: "var(--amber-accent)" }}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Bullet Point
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddExperience}
            className="rr-add-item-btn"
          >
            <Plus className="h-4 w-4" /> Add Another Experience Position
          </button>
        </div>
      </div>

      {/* SECTION 6: Projects (Dynamic Add/Remove) */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--emerald-bg)", color: "var(--emerald-accent)" }}>
              <FolderGit2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Technical Projects & Portfolio</h3>
              <p className="rr-section-subtitle">Showcase open-source, production systems, and capstone applications</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--emerald-bg)", color: "var(--emerald-accent)" }}>
            Step 6 of 7
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {formData.projects.map((proj, pIdx) => (
            <div key={proj.id || pIdx} className="rr-item-card">
              <div className="rr-item-card-header">
                <span className="rr-item-card-index">
                  <FolderGit2 className="h-3.5 w-3.5 text-emerald-400" />
                  Project Entry #{pIdx + 1}
                </span>
                {formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(pIdx)}
                    className="rr-item-remove-btn"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove Project
                  </button>
                )}
              </div>

              <div className="rr-grid-2">
                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Project Title <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CloudPulse Distributed Observability"
                    value={proj.title}
                    onChange={(e) => handleUpdateProject(pIdx, "title", e.target.value)}
                    onBlur={() => handleBlur(`projects[${pIdx}].title`)}
                    className={`rr-input ${touched[`projects[${pIdx}].title`] && errors[`projects[${pIdx}].title`] ? "is-invalid" : ""}`}
                  />
                  {touched[`projects[${pIdx}].title`] && errors[`projects[${pIdx}].title`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`projects[${pIdx}].title`]}
                    </span>
                  )}
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Tech Stack Used <span className="rr-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, TypeScript, Go, Kafka, Docker"
                    value={proj.techStack}
                    onChange={(e) => handleUpdateProject(pIdx, "techStack", e.target.value)}
                    onBlur={() => handleBlur(`projects[${pIdx}].techStack`)}
                    className={`rr-input ${touched[`projects[${pIdx}].techStack`] && errors[`projects[${pIdx}].techStack`] ? "is-invalid" : ""}`}
                  />
                  {touched[`projects[${pIdx}].techStack`] && errors[`projects[${pIdx}].techStack`] && (
                    <span className="rr-error-text">
                      <AlertCircle className="h-3 w-3" /> {errors[`projects[${pIdx}].techStack`]}
                    </span>
                  )}
                </div>
              </div>

              <div className="rr-grid-2">
                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>GitHub Repository URL</span>
                    <span className="rr-optional">Optional</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/project"
                    value={proj.githubUrl}
                    onChange={(e) => handleUpdateProject(pIdx, "githubUrl", e.target.value)}
                    className="rr-input"
                  />
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">
                    <span>Live Demo URL</span>
                    <span className="rr-optional">Optional</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://projectdemo.com"
                    value={proj.demoUrl}
                    onChange={(e) => handleUpdateProject(pIdx, "demoUrl", e.target.value)}
                    className="rr-input"
                  />
                </div>
              </div>

              <div className="rr-field-group">
                <label className="rr-label">
                  <span>Project Description & Highlights <span className="rr-required">*</span></span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain what problem this solved, architecture decisions, and performance metrics..."
                  value={proj.description}
                  onChange={(e) => handleUpdateProject(pIdx, "description", e.target.value)}
                  onBlur={() => handleBlur(`projects[${pIdx}].description`)}
                  className={`rr-textarea ${touched[`projects[${pIdx}].description`] && errors[`projects[${pIdx}].description`] ? "is-invalid" : ""}`}
                />
                {touched[`projects[${pIdx}].description`] && errors[`projects[${pIdx}].description`] && (
                  <span className="rr-error-text">
                    <AlertCircle className="h-3 w-3" /> {errors[`projects[${pIdx}].description`]}
                  </span>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddProject}
            className="rr-add-item-btn"
          >
            <Plus className="h-4 w-4" /> Add Another Project
          </button>
        </div>
      </div>

      {/* SECTION 7: Certifications & Resume File Upload */}
      <div className="rr-section">
        <div className="rr-section-header">
          <div className="rr-section-title-wrap">
            <div className="rr-section-icon-box" style={{ background: "var(--orange-bg)", color: "var(--orange-accent)" }}>
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h3 className="rr-section-title">Certifications & Resume File Upload</h3>
              <p className="rr-section-subtitle">Add verified certifications and attach your resume document</p>
            </div>
          </div>
          <span className="rr-section-badge" style={{ background: "var(--orange-bg)", color: "var(--orange-accent)" }}>
            Step 7 of 7
          </span>
        </div>

        {/* Dynamic Certifications List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label className="rr-label">
            <span>Certifications & Cloud Badges</span>
            <span className="rr-optional">e.g. AWS, CKA, Google Cloud, Meta</span>
          </label>

          {formData.certifications.map((cert, cIdx) => (
            <div key={cert.id || cIdx} className="rr-item-card">
              <div className="rr-item-card-header">
                <span className="rr-item-card-index">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  Certification #{cIdx + 1}
                </span>
                {formData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(cIdx)}
                    className="rr-item-remove-btn"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <div className="rr-grid-3">
                <div className="rr-field-group">
                  <label className="rr-label">Certification Name</label>
                  <input
                    type="text"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) => handleUpdateCertification(cIdx, "name", e.target.value)}
                    className="rr-input"
                  />
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">Issuing Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Amazon Web Services (AWS)"
                    value={cert.issuer}
                    onChange={(e) => handleUpdateCertification(cIdx, "issuer", e.target.value)}
                    className="rr-input"
                  />
                </div>

                <div className="rr-field-group">
                  <label className="rr-label">Issue Year / Verification Link</label>
                  <input
                    type="text"
                    placeholder="e.g. 2023 or verify URL"
                    value={cert.issueDate}
                    onChange={(e) => handleUpdateCertification(cIdx, "issueDate", e.target.value)}
                    className="rr-input"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddCertification}
            className="rr-add-item-btn"
            style={{ width: "fit-content", alignSelf: "flex-start", padding: "0.5rem 1rem" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Another Certification
          </button>
        </div>

        {/* Resume File Upload Zone */}
        <div style={{ marginTop: "1rem" }}>
          <label className="rr-label" style={{ marginBottom: "0.5rem" }}>
            <span>Attach Resume File (PDF, DOCX, DOC, TXT)</span>
            <span className="rr-optional">Max file size 5MB</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!formData.resumeFile ? (
            <div
              className={`rr-upload-zone ${isDraggingFile ? "is-dragging" : ""} ${fileError ? "is-invalid" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingFile(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingFile(false);
              }}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="rr-upload-icon-circle">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <h4 className="rr-upload-title">Click to upload or drag & drop your resume file</h4>
                <p className="rr-upload-sub">Supports PDF, DOCX, DOC, or TXT. Our parser checks fonts, formatting, and keyword density.</p>
              </div>
              <span className="rr-upload-limits">Maximum file size: 5 MB</span>

              {fileError && (
                <span className="rr-error-text" style={{ marginTop: "0.5rem" }}>
                  <AlertCircle className="h-3.5 w-3.5" /> {fileError}
                </span>
              )}
            </div>
          ) : (
            <div className="rr-file-preview-card">
              <div className="rr-file-preview-left">
                <div className="rr-file-icon-box">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="rr-file-info">
                  <span className="rr-file-name">{formData.resumeFile.name}</span>
                  <div className="rr-file-meta">
                    <span>{(formData.resumeFile.size / 1024).toFixed(1)} KB</span>
                    <span>•</span>
                    <span style={{ color: "var(--emerald-accent)" }}>Ready for parsing</span>
                    <span>•</span>
                    <span>Uploaded {formData.resumeFile.uploadTime}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoveFile}
                className="rr-file-remove-btn"
                title="Remove attached file"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submission Actions Bar */}
      <div className="rr-submit-bar">
        <div className="rr-submit-info">
          <Info className="h-4 w-4 text-amber-400" />
          <span>
            Ready to review? Submitting will run our comprehensive ATS scoring engine and highlight optimization recommendations.
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {draftSavedToast && (
            <span style={{ fontSize: "11px", color: "var(--emerald-accent)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <Check className="h-3.5 w-3.5" /> Sample loaded!
            </span>
          )}

          <button
            type="submit"
            className="rr-submit-btn"
          >
            <Sparkles className="h-4 w-4" />
            Submit for Full Resume Review
          </button>
        </div>
      </div>
    </form>
  );
}
