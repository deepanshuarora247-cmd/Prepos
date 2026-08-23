import React, { useState } from "react";
import {
  ArrowLeft,
  Network,
  Server,
  Database,
  Cpu,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  HardDrive,
  Globe,
  Radio,
  FileCode,
  Award,
  ChevronDown
} from "lucide-react";
import "./SystemDesignView.css";

const SYSTEM_DESIGN_TOPICS = [
  {
    id: "url-shortener",
    title: "Design TinyURL / Bit.ly",
    difficulty: "Medium",
    category: "Distributed Web",
    dau: "100M DAU",
    qps: "10,000 QPS",
    description: "Design a high-throughput, low-latency URL shortening service that generates short aliases for long URLs with analytics tracking and custom expiration.",
    functionalReqs: [
      "Given a long URL, service generates a short 7-character URL alias.",
      "Redirect short URL to original long URL with P99 < 20ms.",
      "Custom aliases supported (optional).",
      "Analytics on click counts and geographic region."
    ],
    nonFunctionalReqs: [
      "High availability (99.99% uptime).",
      "Low latency redirection (<20ms).",
      "URLs should not be predictable or guessable.",
      "100:1 Read to Write ratio."
    ],
    defaultComponents: [
      { id: "lb", name: "Nginx Load Balancer", type: "lb", icon: Shield, status: "ok" },
      { id: "api", name: "App Servers (Stateless Node/Go)", type: "server", icon: Server, status: "ok" },
      { id: "cache", name: "Redis Cache (LRU Eviction)", type: "cache", icon: Zap, status: "ok text-amber-400" },
      { id: "db", name: "NoSQL DB (Cassandra / DynamoDB)", type: "db", icon: Database, status: "ok text-cyan-400" },
      { id: "keygen", name: "Base62 Key Gen Service (KGS)", type: "service", icon: Cpu, status: "ok text-purple-400" }
    ]
  },
  {
    id: "news-feed",
    title: "Design X / Twitter News Feed",
    difficulty: "Hard",
    category: "Social Media",
    dau: "300M DAU",
    qps: "50,000 QPS",
    description: "Design a scalable social media news feed system supporting posts, media uploads, timeline generation for high-fanout celebrities, and real-time updates.",
    functionalReqs: [
      "Publish posts (text, image, video).",
      "Generate home timeline of posts from accounts user follows.",
      "Support celebrity posts (Fanout on Read vs Fanout on Write)."
    ],
    nonFunctionalReqs: [
      "Timeline generation latency < 200ms.",
      "Eventual consistency for timeline feed.",
      "Handle high fanout (celebrities with 50M+ followers)."
    ],
    defaultComponents: [
      { id: "lb", name: "API Gateway", type: "lb", icon: Shield, status: "ok" },
      { id: "post-service", name: "Post Service", type: "server", icon: Server, status: "ok" },
      { id: "fanout", name: "Fanout Service (Kafka Workers)", type: "service", icon: Radio, status: "ok text-purple-400" },
      { id: "feed-cache", name: "Timeline Redis Cache", type: "cache", icon: Zap, status: "ok text-amber-400" },
      { id: "media-s3", name: "Object Storage (S3 + CDN)", type: "storage", icon: HardDrive, status: "ok text-emerald-400" }
    ]
  },
  {
    id: "rate-limiter",
    title: "Design Distributed Rate Limiter",
    difficulty: "Medium",
    category: "Infrastructure",
    dau: "500M Requests/Day",
    qps: "100,000 QPS",
    description: "Design an API Rate Limiter to prevent DOS attacks, control API usage costs, and enforce client quotas using Token Bucket or Sliding Window Counter.",
    functionalReqs: [
      "Limit requests per IP or User API Key.",
      "Return HTTP 429 Too Many Requests when quota exceeded.",
      "Informative rate limit headers (X-RateLimit-Remaining)."
    ],
    nonFunctionalReqs: [
      "Minimal latency overhead (< 2ms).",
      "Low memory footprint across distributed nodes.",
      "Graceful degradation during cache outages."
    ],
    defaultComponents: [
      { id: "gw", name: "API Gateway Filter", type: "lb", icon: Shield, status: "ok" },
      { id: "limiter", name: "Rate Limiter Middleware", type: "server", icon: Cpu, status: "ok" },
      { id: "redis-cluster", name: "Distributed Redis Cluster", type: "cache", icon: Zap, status: "ok text-amber-400" }
    ]
  }
];

export default function SystemDesignView({ onBackToDashboard }) {
  const [selectedTopicId, setSelectedTopicId] = useState(SYSTEM_DESIGN_TOPICS[0].id);
  const [addedComponents, setAddedComponents] = useState(SYSTEM_DESIGN_TOPICS[0].defaultComponents);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

  const activeTopic = SYSTEM_DESIGN_TOPICS.find((t) => t.id === selectedTopicId) || SYSTEM_DESIGN_TOPICS[0];

  const handleTopicChange = (topicId) => {
    setSelectedTopicId(topicId);
    const targetTopic = SYSTEM_DESIGN_TOPICS.find((t) => t.id === topicId);
    setAddedComponents(targetTopic ? targetTopic.defaultComponents : []);
    setReviewResult(null);
    setIsTopicDropdownOpen(false);
  };

  const handleAddComponent = (type) => {
    const newId = `custom-${type}-${Date.now()}`;
    let newComp = { id: newId, status: "ok" };

    if (type === "cache") {
      newComp = { ...newComp, name: "Redis Replica Node", type: "cache", icon: Zap };
    } else if (type === "db") {
      newComp = { ...newComp, name: "Database Read Replica", type: "db", icon: Database };
    } else {
      newComp = { ...newComp, name: "Kafka Message Queue Broker", type: "service", icon: Radio };
    }

    setAddedComponents((prev) => [...prev, newComp]);
  };

  const handleRemoveComponent = (id) => {
    setAddedComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEvaluateDesign = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      
      setReviewResult({
        score: addedComponents.length > 5 ? 88 : addedComponents.length >= 3 ? 74 : 45,
        tier: addedComponents.length > 5 ? "Production Resilient (High Availability)" : "Minimal Viable (SLA Gaps)",
        strengths: [
          "Stateless application servers scale horizontally.",
          "Redis layer minimizes database query congestion.",
          addedComponents.some((c) => c.type === "service")
            ? "Kafka decouples write fanout bursts asynchronously."
            : "Direct load routing via entry load balancer/gateway works."
        ],
        improvements: [
          "Add Multi-AZ database clustering for write fault tolerance.",
          "Introduce a rate limiter middleware to mitigate crawler request spikes."
        ]
      });
    }, 1200);
  };

  return (
    <div className="sysdesign-container">
      
      <header className="sysdesign-header">
        <div className="sysdesign-header-left">
          <button onClick={onBackToDashboard} className="sysdesign-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="sysdesign-header-divider">/</span>
          <div className="sysdesign-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem" }}>
              <Network className="h-4 w-4" />
            </div>
            <span>System Design Studio</span>
          </div>
        </div>
      </header>

      
      <main className="sysdesign-layout">
        
        <div className="sysdesign-left-pane">
          <div className="sysdesign-left-pane-header">
            <div className="sysdesign-topic-selector-wrapper">
              <button
                onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                className="sysdesign-topic-selector-btn"
              >
                <span>{activeTopic.title}</span>
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              </button>

              {isTopicDropdownOpen && (
                <>
                  <div className="notification-popover-backdrop" onClick={() => setIsTopicDropdownOpen(false)} />
                  <div className="sysdesign-topic-dropdown">
                    {SYSTEM_DESIGN_TOPICS.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicChange(topic.id)}
                        className={`sysdesign-topic-option ${selectedTopicId === topic.id ? "selected" : ""}`}
                      >
                        {topic.title} ({topic.difficulty})
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="sysdesign-left-pane-content">
            <div>
              <h2 className="sysdesign-topic-title">{activeTopic.title}</h2>
              <div className="sysdesign-topic-stats">
                <span className="sysdesign-stat-pill cyan">{activeTopic.dau}</span>
                <span className="sysdesign-stat-pill purple">{activeTopic.qps}</span>
              </div>
            </div>

            <hr className="sysdesign-section-divider" />

            
            <div className="ide-desc-text">
              {activeTopic.description}
            </div>

            
            <div className="sysdesign-reqs-section">
              <h3 className="sysdesign-reqs-title functional">
                <CheckCircle2 className="h-3.5 w-3.5" /> Functional Requirements
              </h3>
              <ul className="sysdesign-reqs-list">
                {activeTopic.functionalReqs.map((req, i) => (
                  <li key={i} className="sysdesign-reqs-item">
                    <span className="sysdesign-reqs-bullet functional">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            
            <div className="sysdesign-reqs-section">
              <h3 className="sysdesign-reqs-title nonfunctional">
                <Zap className="h-3.5 w-3.5" /> Non-Functional & SLA Requirements
              </h3>
              <ul className="sysdesign-reqs-list">
                {activeTopic.nonFunctionalReqs.map((req, i) => (
                  <li key={i} className="sysdesign-reqs-item">
                    <span className="sysdesign-reqs-bullet nonfunctional">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        
        <div className="sysdesign-right-pane">
          
          <div className="sysdesign-canvas-header">
            <div className="sysdesign-add-nodes-group">
              <span className="sysdesign-add-nodes-label">Add Component:</span>
              <button
                onClick={() => handleAddComponent("cache")}
                className="sysdesign-add-node-btn cache"
              >
                <Plus className="h-3 w-3" /> Redis Cache
              </button>
              <button
                onClick={() => handleAddComponent("db")}
                className="sysdesign-add-node-btn db"
              >
                <Plus className="h-3 w-3" /> DB Replica
              </button>
              <button
                onClick={() => handleAddComponent("mq")}
                className="sysdesign-add-node-btn mq"
              >
                <Plus className="h-3 w-3" /> Kafka Queue
              </button>
            </div>

            <button
              onClick={handleEvaluateDesign}
              disabled={isEvaluating}
              className="sysdesign-audit-btn"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Audit Architecture
            </button>
          </div>

          
          <div className="sysdesign-canvas-body">
            <h3 className="sysdesign-canvas-title">
              Active Architecture Nodes ({addedComponents.length})
            </h3>

            <div className="sysdesign-nodes-grid">
              {addedComponents.map((comp) => {
                const Icon = comp.icon;
                const statusColor = comp.status.includes("text-amber-400") ? "var(--amber-accent)" : comp.status.includes("text-cyan-400") ? "var(--cyan-accent)" : comp.status.includes("text-purple-400") ? "var(--purple-accent)" : comp.status.includes("text-emerald-400") ? "var(--emerald-accent)" : "var(--text-primary)";
                return (
                  <div
                    key={comp.id}
                    className="sysdesign-node-card"
                  >
                    <div className="sysdesign-node-card-left">
                      <div className="sysdesign-node-icon-box">
                        <Icon className="h-5 w-5" style={{ color: statusColor }} />
                      </div>
                      <div>
                        <p className="sysdesign-node-card-name">{comp.name}</p>
                        <span className="sysdesign-node-card-type">{comp.type}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveComponent(comp.id)}
                      className="sysdesign-node-delete-btn"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            
            {isEvaluating ? (
              <div className="popover-body" style={{ color: "var(--purple-accent)" }}>
                <Loader2 className="search-loader" style={{ position: "static", margin: "1rem", color: "var(--purple-accent)" }} />
                Running AI System Audit against FAANG SLA benchmarks...
              </div>
            ) : reviewResult ? (
              <div className="practice-streak-widget" style={{ borderColor: "var(--emerald-border)", background: "rgba(16, 185, 129, 0.05)", marginTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span className="popover-header-badge" style={{ color: "var(--emerald-accent)", backgroundColor: "var(--emerald-bg)", borderColor: "var(--emerald-border)" }}>AI Audit Result</span>
                    <h4 className="sysdesign-topic-title" style={{ marginTop: "0.25rem" }}>{reviewResult.tier}</h4>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--emerald-accent)" }}>{reviewResult.score}</span>
                    <span className="ide-example-label"> / 100</span>
                  </div>
                </div>

                <div className="sysdesign-reqs-section" style={{ marginTop: "1rem" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "var(--emerald-accent)" }}>Key Architectural Strengths:</p>
                  <ul className="ide-constraints-list" style={{ listStyleType: "disc" }}>
                    {reviewResult.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="sysdesign-reqs-section" style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "var(--amber-accent)" }}>Recommended Enhancements:</p>
                  <ul className="ide-constraints-list" style={{ listStyleType: "disc" }}>
                    {reviewResult.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
