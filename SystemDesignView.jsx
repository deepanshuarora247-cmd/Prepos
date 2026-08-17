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
  Award
} from "lucide-react";

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
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [addedComponents, setAddedComponents] = useState([]);
  const [reviewResult, setReviewResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const activeTopic = SYSTEM_DESIGN_TOPICS.find((t) => t.id === selectedTopicId) || null;

  const handleSelectTopic = (topic) => {
    setSelectedTopicId(topic.id);
    setAddedComponents(topic.defaultComponents);
    setReviewResult(null);
  };

  const handleAddComponent = (componentType) => {
    const newId = `comp-${Date.now()}`;
    const compMap = {
      cache: { name: "Memcached / Redis Node", icon: Zap, type: "cache" },
      db: { name: "Read Replica Database", icon: Database, type: "db" },
      mq: { name: "Apache Kafka Queue", icon: Radio, type: "mq" },
      cdn: { name: "Cloudflare CDN Edge", icon: Globe, type: "cdn" },
    };
    const comp = compMap[componentType] || { name: "Custom Microservice", icon: Server, type: "server" };
    setAddedComponents((prev) => [...prev, { id: newId, ...comp, status: "ok" }]);
  };

  const handleRemoveComponent = (id) => {
    setAddedComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEvaluateDesign = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const score = Math.floor(Math.random() * 12) + 86;
      setReviewResult({
        score,
        tier: "FAANG System Architect Ready",
        strengths: [
          "Stateless application tier allows horizontal autoscaling.",
          "Redis caching layer effectively mitigates database read bottleneck.",
          "Decoupled asynchronous worker queue prevents request blocking."
        ],
        improvements: [
          "Consider adding Multi-Region DB replication for disaster recovery.",
          "Implement Circuit Breaker pattern to prevent cascading failures."
        ]
      });
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased relative">
      {/* Ambient Lighting */}
      <div className="pointer-events-none fixed -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[150px]" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0e1a]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Network className="h-4 w-4" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">System Design Studio</h1>
          </div>
        </div>
      </header>

      {/* Main Body */}
      {!activeTopic ? (
        /* Topic List Selection */
        <main className="max-w-7xl mx-auto px-6 py-8 relative">
          <div className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/30 via-slate-900/50 to-indigo-900/30 backdrop-blur-md p-8 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Interactive Architecture Workbench
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
                System Design Mock Studio
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                Practice high-scale system design architecture, design components, define SLA requirements, and run AI architecture audits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SYSTEM_DESIGN_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border bg-purple-500/10 text-purple-300 border-purple-500/20">
                      {topic.category}
                    </span>
                    <span className="text-xs text-amber-400 font-mono font-medium">{topic.difficulty}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{topic.description}</p>

                  <div className="flex items-center gap-3 mt-4 text-xs font-mono text-cyan-300">
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">{topic.dau}</span>
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">{topic.qps}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectTopic(topic)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors py-2.5 rounded-xl shadow-[0_0_16px_rgba(168,85,247,0.5)]"
                >
                  <Play className="h-3.5 w-3.5" fill="currentColor" />
                  Start Design Session
                </button>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* Architecture Studio View */
        <main className="h-[calc(100vh-61px)] w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#070a14]">
          {/* Left Column: Requirements & Capacity Planning */}
          <div className="lg:col-span-4 border-r border-white/10 flex flex-col h-full bg-[#0b0f1d] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedTopicId(null)}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/10"
              >
                <ArrowLeft className="h-3 w-3" /> All Systems
              </button>
              <span className="text-xs text-purple-400 font-mono">{activeTopic.category}</span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{activeTopic.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-cyan-300">
                <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{activeTopic.dau}</span>
                <span className="bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{activeTopic.qps}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Functional Requirements
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {activeTopic.functionalReqs.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Non-Functional & SLA Requirements
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {activeTopic.nonFunctionalReqs.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Architecture Canvas & AI Evaluator */}
          <div className="lg:col-span-8 flex flex-col h-full bg-[#050811] overflow-hidden">
            {/* Canvas Control Bar */}
            <div className="px-6 py-3 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">Add Component:</span>
                <button
                  onClick={() => handleAddComponent("cache")}
                  className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg hover:bg-amber-500/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> Redis Cache
                </button>
                <button
                  onClick={() => handleAddComponent("db")}
                  className="text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> DB Replica
                </button>
                <button
                  onClick={() => handleAddComponent("mq")}
                  className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg hover:bg-purple-500/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> Kafka Queue
                </button>
              </div>

              <button
                onClick={handleEvaluateDesign}
                disabled={isEvaluating}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 border border-purple-500/30 px-4 py-1.5 rounded-lg shadow-[0_0_16px_rgba(168,85,247,0.5)] transition-all disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Audit Architecture
              </button>
            </div>

            {/* Component Canvas */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Active Architecture Nodes ({addedComponents.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addedComponents.map((comp) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      key={comp.id}
                      className="rounded-xl border border-white/10 bg-slate-900/80 p-4 flex items-center justify-between group hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon className={`h-5 w-5 ${comp.status}`} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{comp.name}</p>
                          <span className="text-[10px] text-neutral-500 uppercase">{comp.type}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveComponent(comp.id)}
                        className="text-neutral-600 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* AI Architecture Review Section */}
              {isEvaluating ? (
                <div className="mt-6 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 text-center text-xs text-purple-300 flex items-center justify-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                  Running AI System Audit against FAANG SLA benchmarks...
                </div>
              ) : reviewResult ? (
                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">AI Audit Result</span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{reviewResult.tier}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-emerald-400">{reviewResult.score}</span>
                      <span className="text-xs text-neutral-500"> / 100</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-emerald-300">Key Architectural Strengths:</p>
                    <ul className="space-y-1 text-xs text-neutral-300 list-disc list-inside">
                      {reviewResult.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <p className="text-xs font-semibold text-amber-300">Recommended Enhancements:</p>
                    <ul className="space-y-1 text-xs text-neutral-300 list-disc list-inside">
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
      )}
    </div>
  );
}
