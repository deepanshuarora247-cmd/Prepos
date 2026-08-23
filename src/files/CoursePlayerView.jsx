import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  BookOpen,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  ChevronDown,
  FileText,
  HelpCircle,
  MessageSquare,
  Send,
  Loader2,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Share2,
  Download,
  AlertCircle,
  ExternalLink,
  Tv,
  Film,
  Sliders
} from "lucide-react";
import "./CoursePlayerView.css";

const STORAGE_KEY_PROGRESS = "prepos_course_progress_v1";

const FALLBACK_COURSES = [
  {
    id: "dsa-deep-dive",
    title: "Data Structures & Algorithms Deep Dive",
    instructor: "Ex-Google Staff Engineer",
    instructorRole: "Former Lead Tech Interviewer @ Google",
    level: "Intermediate to Advanced",
    duration: "24 hours • 82 lessons",
    rating: 4.9,
    enrolled: "14.2k students",
    category: "Algorithms",
    description: "Master all core patterns required for Tier-1 coding interviews: Two Pointers, Sliding Window, Dynamic Programming, and Graph Traversals.",
    topics: ["Arrays & HashMaps", "Trees & Graphs", "Dynamic Programming", "Bit Manipulation"],
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Sliding Window & Two Pointers",
        lessons: [
          {
            id: "les-1-1",
            title: "Fixed vs Dynamic Window Patterns",
            duration: "18 min",
            type: "video",
            summary: "Learn when to shrink or expand windows, handling subarray constraints with O(N) complexity.",
            videoUrl: "https://www.youtube.com/embed/GcT7V3L4DG4",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            transcript: "In this lesson, we breakdown the fundamental difference between fixed length sliding windows and dynamic sliding windows.",
            theory: `### Sliding Window Strategy
The Sliding Window pattern is used to perform required operations on a specific window size.

#### Key Principles:
1. **Right Pointer**: Expands the window by incorporating new elements.
2. **Left Pointer**: Shrinks the window when constraints are violated.

\`\`\`javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k];
    }
  }
  return maxSum;
}
\`\`\``,
            quiz: {
              question: "What is the primary advantage of the Sliding Window technique over brute-force nested loops?",
              options: [
                "It reduces space complexity to O(1) in all cases.",
                "It reduces time complexity from O(N^2) to O(N) by reusing computation of overlapping subarrays.",
                "It guarantees recursive call stack safety.",
                "It works on unsorted string permutations only."
              ],
              correctIndex: 1,
              explanation: "Sliding window avoids re-calculating overlapping subproblem sums by maintaining a running state."
            }
          },
          {
            id: "les-1-2",
            title: "Fruit Into Baskets & At Most K Distinct",
            duration: "24 min",
            type: "video",
            summary: "Detailed walkthrough of two-pointer state contraction using hash maps.",
            videoUrl: "https://www.youtube.com/embed/EXzl7bLzCis",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            transcript: "We analyze how to maintain at most K unique keys in a Map while moving the right pointer forward.",
            theory: "### At Most K Distinct Pattern\nUse a Map to track key frequencies.",
            quiz: {
              question: "When should the left pointer be incremented in an 'At Most K Distinct' problem?",
              options: [
                "When the number of unique elements exceeds K.",
                "Every time the right pointer moves.",
                "Only when the sum is even.",
                "Never, left pointer is static."
              ],
              correctIndex: 0,
              explanation: "You must contract the window (move left pointer) when unique elements in the map exceed the limit K."
            }
          }
        ]
      }
    ]
  },
  {
    id: "system-design-master",
    title: "System Design & Distributed Architectures",
    instructor: "Principal Architect @ AWS",
    instructorRole: "Systems Architecture Designer",
    level: "Advanced",
    duration: "18 hours • 54 lessons",
    rating: 4.8,
    enrolled: "9.8k students",
    category: "System Design",
    description: "Design massive systems with 99.999% uptime. Master load balancers, database scaling, consistent hashing, and Kafka queue pipelines.",
    topics: ["Scalability & SLAs", "Caches & Load Balancers", "NoSQL vs RDBMS Sharding", "Eventual Consistency"],
    modules: [
      {
        id: "mod-2",
        title: "Module 1: Load Balancers & Caching Layer",
        lessons: [
          {
            id: "les-2-1",
            title: "Nginx Load Balancing Algorithms",
            duration: "22 min",
            type: "video",
            summary: "Study Round Robin, Least Connections, and IP Hash algorithms under real traffic profiles.",
            videoUrl: "https://www.youtube.com/embed/aKMLgFVxZYk",
            sampleMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            theory: "### Load Balancer Algorithms\n- Round Robin\n- Least Connections\n- IP Hash"
          }
        ]
      }
    ]
  }
];

export default function CoursePlayerView({ courseId, onBackToCourses }) {
  const [courseData, setCourseData] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeTab, setActiveTab] = useState("video"); // "video" | "notes" | "quiz" | "ai"

  // Video states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoSourceMode, setVideoSourceMode] = useState("html5"); // "html5" | "iframe"
  const [videoError, setVideoError] = useState(false);

  // Quiz states
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  // AI states
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I am your AI Masterclass Tutor. Ask me any conceptual or clarification questions about this lesson!" }
  ]);
  const [aiMessage, setAiMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Certificate Modal State
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load course progress and data
    const course = FALLBACK_COURSES.find((c) => c.id === courseId) || FALLBACK_COURSES[0];
    setCourseData(course);

    const firstLesson = course.modules[0]?.lessons[0]?.id || null;
    setActiveLessonId(firstLesson);

    const enrolledMap = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || "{}");
    let completed = enrolledMap[courseId] || [];
    if (!Array.isArray(completed)) {
      completed = [];
    }
    setCompletedLessons(completed);
  }, [courseId]);

  useEffect(() => {
    // Sync completed lessons to local storage
    if (!courseId || completedLessons.length === 0) return;
    const enrolledMap = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || "{}");
    enrolledMap[courseId] = completedLessons;
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(enrolledMap));
  }, [completedLessons, courseId]);

  // Active lesson content details (calculated directly on render)
  let lessonContent = null;
  if (courseData && activeLessonId) {
    for (let i = 0; i < courseData.modules.length; i++) {
      const mod = courseData.modules[i];
      let foundLesson = null;
      for (let j = 0; j < mod.lessons.length; j++) {
        if (mod.lessons[j].id === activeLessonId) {
          foundLesson = mod.lessons[j];
          break;
        }
      }
      if (foundLesson) {
        lessonContent = {
          moduleTitle: mod.title,
          lesson: foundLesson
        };
        break;
      }
    }
  }

  // Active lesson progress calculations (calculated directly on render)
  let progressPercent = 0;
  if (courseData) {
    let totalLessonsCount = 0;
    for (let i = 0; i < courseData.modules.length; i++) {
      totalLessonsCount = totalLessonsCount + courseData.modules[i].lessons.length;
    }
    if (totalLessonsCount > 0) {
      progressPercent = Math.round((completedLessons.length / totalLessonsCount) * 100);
    }
  }

  // Video Handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.error("Play failed:", e);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Reset quiz state when active lesson changes
  useEffect(() => {
    setSelectedOption(null);
    setQuizResult(null);
  }, [activeLessonId]);

  const handleEvaluateQuiz = () => {
    if (selectedOption === null || !lessonContent?.lesson?.quiz) return;
    const correct = selectedOption === lessonContent.lesson.quiz.correctIndex;
    setQuizResult({
      isCorrect: correct,
      correctIndex: lessonContent.lesson.quiz.correctIndex,
      explanation: lessonContent.lesson.quiz.explanation
    });

    if (correct && !completedLessons.includes(activeLessonId)) {
      setCompletedLessons((prev) => [...prev, activeLessonId]);
    }
  };

  const handleSendChatMessage = () => {
    if (!aiMessage.trim()) return;
    const updatedMsgs = [...chatMessages, { role: "user", content: aiMessage }];
    setChatMessages(updatedMsgs);
    setAiMessage("");
    setIsAiLoading(true);

    setTimeout(() => {
      setIsAiLoading(false);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Great question! In distributed web architectures, the caching layer acts as a buffer. For the concept you are querying, Nginx leverages hash algorithms to bind client IPs to specific servers, which maintains sticky sessions.` }
      ]);
    }, 900);
  };

  if (!courseData || !activeLessonId) {
    return (
      <div className="player-container" style={{ justifyContent: "center", alignItems: "center" }}>
        <Loader2 className="search-loader" style={{ position: "static", color: "var(--cyan-accent)" }} />
        Loading player...
      </div>
    );
  }

  return (
    <div className="player-container">
      {/* Navbar Header */}
      <header className="player-header">
        <div className="player-header-left">
          <button onClick={onBackToCourses} className="player-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Catalog
          </button>
          <span className="player-header-divider">/</span>
          <div className="player-header-title">
            <BookOpen className="h-4 w-4" style={{ color: "var(--cyan-accent)", flexShrink: 0 }} />
            <h1>{courseData.title}</h1>
          </div>
        </div>

        <div className="player-header-right">
          <div className="player-api-badge">
            <span className="player-api-badge-pulse" />
            <span>API Connected: 200 OK</span>
          </div>

          <div className="player-header-progress">
            <div className="player-progress-bar-slot">
              <div
                className="player-progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="player-progress-percent">{progressPercent}%</span>
          </div>

          {progressPercent === 100 && (
            <button
              onClick={() => setShowCertificateModal(true)}
              className="sysdesign-audit-btn"
              style={{ backgroundColor: "var(--amber-bg)", color: "var(--amber-accent)", borderColor: "var(--amber-border)" }}
            >
              <Award className="h-3.5 w-3.5" />
              Certificate
            </button>
          )}
        </div>
      </header>

      {/* Workspace */}
      <div className="player-workspace">
        {/* Syllabus Sidebar */}
        <aside className="player-sidebar">
          <div className="player-sidebar-header">
            <span className="courses-banner-tag" style={{ fontSize: "9px" }}>Course Syllabus</span>
            <h2>{courseData.instructor}</h2>
            <p>{courseData.instructorRole}</p>
          </div>

          <div className="player-syllabus-list">
            {courseData.modules.map((mod) => (
              <div key={mod.id} className="player-module-folder">
                <div className="player-module-folder-header">
                  <span>{mod.title}</span>
                  <span>{mod.lessons.length} lessons</span>
                </div>
                <div className="player-module-lessons-group">
                  {mod.lessons.map((les) => {
                    const isCompleted = completedLessons.includes(les.id);
                    const isActive = les.id === activeLessonId;

                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonId(les.id)}
                        className={`player-lesson-row-btn ${isActive ? "active" : ""}`}
                      >
                        <div className="player-lesson-row-left">
                          {isCompleted ? (
                            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--emerald-accent)" }} />
                          ) : (
                            <Play className="h-3 w-3" style={{ color: "var(--text-muted)" }} />
                          )}
                          <span>{les.title}</span>
                        </div>
                        <span className="player-lesson-duration-badge">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Lesson Viewer & Tabs */}
        <main className="player-viewer-panel">
          {lessonContent && lessonContent.lesson ? (
            <div className="player-viewer-inner">
              <div>
                <span className="popover-header-badge" style={{ color: "var(--cyan-accent)", backgroundColor: "var(--cyan-bg)", borderColor: "var(--cyan-border)" }}>
                  {lessonContent.moduleTitle}
                </span>
                <h2 className="player-viewer-title">{lessonContent.lesson.title}</h2>
                <p className="player-viewer-desc">{lessonContent.lesson.summary}</p>
              </div>

              {/* Tab Selector */}
              <div className="categories-nav" style={{ gap: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "0.5rem" }}>
                {[
                  { id: "video", label: "Interactive Video Lecture", icon: Play },
                  { id: "notes", label: "Notes & Code Snippets", icon: FileText },
                  { id: "quiz", label: "API Knowledge Quiz", icon: HelpCircle },
                  { id: "ai", label: "AI Course Tutor", icon: MessageSquare }
                ].map((t) => {
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`category-tab ${active ? "active" : ""}`}
                      style={{ fontSize: "11px", paddingBottom: "0.25rem" }}
                    >
                      {t.label}
                      {active && <div className="category-indicator" />}
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Video Player */}
              {activeTab === "video" && (
                <div className="player-tab-body">
                  <div className="resume-banner-row no-print" style={{ padding: "0.50rem 1rem", border: "1px solid var(--panel-border)", background: "rgba(255, 255, 255, 0.02)", flexDirection: "row", justifyContent: "space-between", borderRadius: "0.75rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", fontSize: "11px", color: "var(--text-secondary)" }}>
                      <span>Source Mode:</span>
                      <button
                        onClick={() => setVideoSourceMode("iframe")}
                        className="category-tab"
                        style={{ border: "none", fontSize: "11px", color: videoSourceMode === "iframe" ? "var(--cyan-accent)" : "var(--text-muted)", paddingBottom: 0 }}
                      >
                        YouTube (Embed)
                      </button>
                      <button
                        onClick={() => setVideoSourceMode("html5")}
                        className="category-tab"
                        style={{ border: "none", fontSize: "11px", color: videoSourceMode === "html5" ? "var(--cyan-accent)" : "var(--text-muted)", paddingBottom: 0 }}
                      >
                        HTML5 Player
                      </button>
                    </div>
                  </div>

                  <div className="player-video-box-container" ref={containerRef}>
                    {videoSourceMode === "iframe" ? (
                      <iframe
                        src={lessonContent.lesson.videoUrl || "https://www.youtube.com/embed/GcT7V3L4DG4"}
                        title={lessonContent.lesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="player-iframe-media"
                      />
                    ) : (
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        {videoError ? (
                          <div className="popover-body" style={{ color: "var(--rose-accent)", height: "100%", justifyContent: "center" }}>
                            <AlertCircle className="h-8 w-8 mb-2" />
                            <span>Failed to load local sample MP4 source.</span>
                          </div>
                        ) : (
                          <video
                            ref={videoRef}
                            src={lessonContent.lesson.sampleMp4 || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                            crossOrigin="anonymous"
                            preload="metadata"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                            onError={() => setVideoError(true)}
                            className="player-html5-media"
                            onClick={togglePlay}
                          />
                        )}

                        {!videoError && (
                          <div className="player-video-controls-overlay">
                            <div className="player-video-controls-left">
                              <button onClick={togglePlay} className="player-ctrl-btn">
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </button>
                              <button onClick={toggleMute} className="player-ctrl-btn">
                                {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                              </button>
                              <span style={{ fontSize: "11px" }}>
                                {formatTime(currentTime)} / {formatTime(videoDuration || 300)}
                              </span>
                            </div>

                            <div className="player-video-controls-left">
                              <div style={{ display: "flex", gap: "0.25rem" }}>
                                {[1, 1.25, 1.5, 2].map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => handleSpeedChange(s)}
                                    className="popover-header-badge"
                                    style={{ padding: "0.125rem 0.25rem", cursor: "pointer", color: playbackSpeed === s ? "var(--cyan-accent)" : undefined }}
                                  >
                                    {s}x
                                  </button>
                                ))}
                              </div>
                              <button onClick={toggleFullscreen} className="player-ctrl-btn">
                                <Maximize2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="sysdesign-nodes-grid" style={{ gap: "1rem" }}>
                    <div className="practice-streak-card" style={{ padding: "1rem" }}>
                      <h3 className="behavioral-rewrite-header" style={{ color: "var(--cyan-accent)" }}>
                        <FileText className="h-4 w-4" /> Lesson Transcript
                      </h3>
                      <p className="ide-desc-text" style={{ fontSize: "11px", fontFamily: "var(--font-mono)", marginTop: "0.5rem" }}>
                        "{lessonContent.lesson.transcript}"
                      </p>
                    </div>

                    <div className="practice-streak-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h4 className="behavioral-rewrite-header" style={{ color: "var(--emerald-accent)" }}>
                          <CheckCircle2 className="h-4 w-4" /> Progress Tracker
                        </h4>
                        <p className="ide-example-explanation" style={{ border: "none", padding: 0, marginTop: "0.25rem" }}>
                          Mark this lesson as watched to update your masterclass progress statistics.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (!completedLessons.includes(activeLessonId)) {
                            setCompletedLessons((prev) => [...prev, activeLessonId]);
                          }
                        }}
                        className="course-card-enroll-btn enrolled"
                        style={{ marginTop: "1rem" }}
                      >
                        <Check className="h-3.5 w-3.5" />
                        {completedLessons.includes(activeLessonId) ? "Completed" : "Mark as Watched"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Notes & Code */}
              {activeTab === "notes" && (
                <div className="player-tab-body">
                  <div className="player-notes-sheet">
                    {lessonContent.lesson.theory}
                  </div>
                </div>
              )}

              {/* Tab 3: Quiz */}
              {activeTab === "quiz" && (
                <div className="player-tab-body">
                  <div className="player-quiz-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="popover-header-badge" style={{ color: "var(--amber-accent)", backgroundColor: "var(--amber-bg)", borderColor: "var(--amber-border)" }}>Knowledge Quiz</span>
                      {completedLessons.includes(activeLessonId) && (
                        <span className="q-api-badge" style={{ backgroundColor: "var(--emerald-bg)", color: "var(--emerald-accent)", borderColor: "var(--emerald-border)" }}>Completed</span>
                      )}
                    </div>

                    <h3 className="player-quiz-question">{lessonContent.lesson.quiz?.question}</h3>

                    <div className="player-quiz-options-list">
                      {lessonContent.lesson.quiz?.options.map((opt, idx) => {
                        const isSelected = selectedOption === idx;
                        let optionClass = "";

                        if (quizResult) {
                          if (idx === quizResult.correctIndex) {
                            optionClass = "correct";
                          } else if (isSelected && !quizResult.isCorrect) {
                            optionClass = "wrong";
                          }
                        } else if (isSelected) {
                          optionClass = "correct"; // uses same accent highlighting before validation
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => !quizResult && setSelectedOption(idx)}
                            disabled={!!quizResult}
                            className={`player-quiz-option-row ${optionClass}`}
                          >
                            <span style={{ color: "var(--cyan-accent)", marginRight: "0.5rem" }}>{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {!quizResult ? (
                      <button
                        onClick={handleEvaluateQuiz}
                        disabled={selectedOption === null}
                        className="sysdesign-audit-btn"
                        style={{ marginTop: "1rem", alignSelf: "flex-end" }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="player-quiz-feedback" style={{
                        borderColor: quizResult.isCorrect ? "var(--emerald-border)" : "var(--rose-border)",
                        backgroundColor: quizResult.isCorrect ? "var(--emerald-bg)" : "var(--rose-bg)",
                        color: quizResult.isCorrect ? "#a7f3d0" : "#fecdd3"
                      }}>
                        <HelpCircle className="h-4 w-4 shrink-0" />
                        <div>
                          <p style={{ fontWeight: "bold" }}>{quizResult.isCorrect ? "Correct!" : "Incorrect"}</p>
                          <p style={{ marginTop: "0.25rem" }}>{quizResult.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: AI Tutor */}
              {activeTab === "ai" && (
                <div className="player-tab-body">
                  <div className="player-ai-chat-window">
                    <div className="player-ai-chat-body">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`player-ai-chat-bubble ${msg.role}`}>
                          {msg.content}
                        </div>
                      ))}
                      {isAiLoading && (
                        <div className="player-ai-chat-bubble assistant">
                          <Loader2 className="search-loader" style={{ position: "static", color: "var(--text-secondary)" }} />
                          Thinking...
                        </div>
                      )}
                    </div>

                    <div className="player-ai-chat-input-row">
                      <input
                        type="text"
                        value={aiMessage}
                        onChange={(e) => setAiMessage(e.target.value)}
                        placeholder="Ask the AI Masterclass Tutor..."
                        className="player-ai-chat-field"
                        onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                      />
                      <button onClick={handleSendChatMessage} className="player-ai-chat-send-btn">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="popover-body" style={{ color: "var(--text-secondary)" }}>
              Select a lesson from the syllabus sidebar to begin learning.
            </div>
          )}
        </main>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="player-cert-modal-backdrop" onClick={() => setShowCertificateModal(false)}>
          <div className="player-cert-card" onClick={(e) => e.stopPropagation()}>
            <div className="player-cert-seal">
              <Award className="h-8 w-8" />
            </div>

            <div className="player-cert-body">
              <h2>Certificate of Completion</h2>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "0.5rem" }}>This certifies that</p>
              <div className="player-cert-recipient">Arjun Sharma</div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>has successfully mastered the curriculum requirements for the course</p>
              <h3 style={{ fontSize: "1.25rem", color: "#fff", marginTop: "0.5rem", fontWeight: "bold" }}>{courseData.title}</h3>
            </div>

            <button
              onClick={() => setShowCertificateModal(false)}
              className="sandbox-back-btn"
              style={{ marginTop: "1rem" }}
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
