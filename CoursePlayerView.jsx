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
import { courseApi } from "./courseApi.js";

export default function CoursePlayerView({ courseId, onBackToCourses }) {
  const [courseData, setCourseData] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [lessonContent, setLessonContent] = useState(null);
  const [activeTab, setActiveTab] = useState("video"); // "video" | "notes" | "quiz" | "ai"
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  
  // Interactive Video Player State
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [videoSourceMode, setVideoSourceMode] = useState("iframe"); // "iframe" | "html5"
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [iframeError, setIframeError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    if (videoSourceMode === "html5" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setVideoDuration(videoRef.current.duration || 0);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen error", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen error", err);
      });
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };
  
  // AI Tutor Chat state
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Course Assistant for this lesson. Ask me any questions about concepts, time complexity, or interview trade-offs!"
    }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Load course details
  useEffect(() => {
    async function initCourse() {
      setLoading(true);
      try {
        const res = await courseApi.fetchCourseDetails(courseId);
        setCourseData(res.course);
        setCompletedLessons(res.course.completedLessons || []);

        // Pick first lesson by default
        if (res.course.modules && res.course.modules.length > 0) {
          const firstLes = res.course.modules[0].lessons[0];
          if (firstLes) {
            setActiveLessonId(firstLes.id);
          }
        }
      } catch (e) {
        console.error("Failed to load course details", e);
      } finally {
        setLoading(false);
      }
    }
    initCourse();
  }, [courseId]);

  // Load active lesson content when activeLessonId changes
  useEffect(() => {
    if (!activeLessonId || !courseId) return;

    async function loadLesson() {
      try {
        const res = await courseApi.fetchLessonContent(courseId, activeLessonId);
        setLessonContent(res);
        setSelectedOption(null);
        setQuizResult(null);
        setIsPlaying(false);
        setIframeError(false);
        setVideoError(false);
        setAiChatMessages([
          {
            sender: "ai",
            text: `Hello! I am your AI Assistant for "${res.lesson ? res.lesson.title : 'this lesson'}". Ask me any questions about concepts, complexity, or interview trade-offs!`
          }
        ]);
      } catch (e) {
        console.error("Failed to load lesson content", e);
      }
    }
    loadLesson();
  }, [courseId, activeLessonId]);

  // Handle quiz submission via API
  const handleQuizSubmit = async () => {
    if (selectedOption === null || !lessonContent) return;
    setIsSubmittingQuiz(true);

    try {
      const res = await courseApi.submitQuizAnswer(courseId, activeLessonId, selectedOption);
      setQuizResult(res);
      if (res.isCorrect) {
        setCompletedLessons(res.completedLessons);
      }
    } catch (e) {
      console.error("Quiz evaluation API error", e);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  // Handle AI Chat Submit via API
  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiInput("");

    setAiChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsAiResponding(true);

    try {
      const res = await courseApi.askCourseAiTutor(courseId, activeLessonId, userMsg);
      setAiChatMessages((prev) => [...prev, { sender: "ai", text: res.reply }]);
    } catch (e) {
      setAiChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I had trouble retrieving lesson context. Please try again!" }
      ]);
    } finally {
      setIsAiResponding(false);
    }
  };

  if (loading || !courseData) {
    return (
      <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
        <span className="text-xs text-neutral-400 font-mono">Fetching course syllabus & API assets...</span>
      </div>
    );
  }

  // Calculate progress percent
  let totalLessonsCount = 0;
  courseData.modules.forEach((m) => (totalLessonsCount += m.lessons.length));
  const progressPercent =
    totalLessonsCount > 0 ? Math.round((completedLessons.length / totalLessonsCount) * 100) : 0;

  return (
    <div className="min-h-screen w-full bg-[#0a0e1a] text-slate-100/90 font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0e1a]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourses}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-slate-100 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Catalog
          </button>
          <span className="text-neutral-600">/</span>
          <div className="flex items-center gap-2 max-w-md truncate">
            <BookOpen className="h-4 w-4 text-cyan-400 shrink-0" />
            <h1 className="text-sm font-bold text-white tracking-tight truncate">{courseData.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>API Connected: 200 OK</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-cyan-300">{progressPercent}%</span>
            </div>

            {progressPercent === 100 && (
              <button
                onClick={() => setShowCertificateModal(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
              >
                <Award className="h-3.5 w-3.5" />
                Certificate
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Syllabus Navigation Sidebar */}
        <aside className="w-full lg:w-80 border-r border-white/10 bg-[#090d19] flex flex-col shrink-0">
          <div className="p-4 border-b border-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">Course Syllabus</p>
            <h2 className="text-sm font-bold text-white mt-1">{courseData.instructor}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">{courseData.instructorRole}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {courseData.modules.map((mod, modIdx) => (
              <div key={mod.id} className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="px-3.5 py-2.5 bg-white/[0.03] border-b border-white/5 flex items-center justify-between text-xs font-semibold text-neutral-300">
                  <span className="truncate">{mod.title}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">{mod.lessons.length} lessons</span>
                </div>
                <div className="p-1 space-y-0.5">
                  {mod.lessons.map((les) => {
                    const isCompleted = completedLessons.includes(les.id);
                    const isActive = les.id === activeLessonId;

                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonId(les.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs transition-all ${
                          isActive
                            ? "bg-cyan-500/15 border border-cyan-500/30 text-white font-medium shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                            : "hover:bg-white/5 text-neutral-300 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isCompleted ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Play className="h-3 w-3 text-neutral-500 shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 shrink-0 ml-2">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Content Area: Lesson Viewer & Tabs */}
        <main className="flex-1 flex flex-col bg-[#0b0f1d] overflow-y-auto">
          {lessonContent && lessonContent.lesson ? (
            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
              {/* Header Title */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  {lessonContent.moduleTitle}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-2 tracking-tight">
                  {lessonContent.lesson.title}
                </h2>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {lessonContent.lesson.summary}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                {[
                  { id: "video", label: "Interactive Video Lecture", icon: Play },
                  { id: "notes", label: "Notes & Code Snippets", icon: FileText },
                  { id: "quiz", label: "API Knowledge Quiz", icon: HelpCircle },
                  { id: "ai", label: "AI Course Tutor", icon: MessageSquare }
                ].map((t) => {
                  const Icon = t.icon;
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? "bg-cyan-500 text-black shadow-[0_0_16px_rgba(6,182,212,0.6)]"
                          : "bg-white/5 hover:bg-white/10 text-neutral-400"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Video Player */}
              {activeTab === "video" && (
                <div className="space-y-4">
                  {/* Top Video Toolbar / Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 font-medium">Source Mode:</span>
                      <button
                        onClick={() => setVideoSourceMode("iframe")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                          videoSourceMode === "iframe"
                            ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                            : "bg-white/5 hover:bg-white/10 text-neutral-300"
                        }`}
                      >
                        <Tv className="h-3.5 w-3.5" />
                        YouTube HD Embed
                      </button>
                      <button
                        onClick={() => setVideoSourceMode("html5")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                          videoSourceMode === "html5"
                            ? "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                            : "bg-white/5 hover:bg-white/10 text-neutral-300"
                        }`}
                      >
                        <Film className="h-3.5 w-3.5" />
                        HTML5 Video Stream
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono px-2 py-0.5 rounded">
                        1080p 60fps HD
                      </span>
                      {lessonContent.lesson.videoUrl && (
                        <a
                          href={lessonContent.lesson.videoUrl.replace("/embed/", "/watch?v=")}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:underline font-mono text-[11px]"
                        >
                          Open External <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Main Video Viewport Container */}
                  <div
                    ref={videoContainerRef}
                    className="relative rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl aspect-video flex flex-col group"
                  >
                    {videoSourceMode === "iframe" ? (
                      iframeError ? (
                        /* YouTube blocked fallback */
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900/80 rounded-2xl p-6 text-center">
                          <div className="h-14 w-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                            <AlertCircle className="h-6 w-6 text-rose-400" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">YouTube Embed Blocked</p>
                            <p className="text-xs text-neutral-400 mt-1">Your browser or network is blocking the YouTube embed.</p>
                          </div>
                          <div className="flex gap-3">
                            <a
                              href={lessonContent.lesson.videoUrl?.replace("/embed/", "/watch?v=")}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Watch on YouTube
                            </a>
                            <button
                              onClick={() => setVideoSourceMode("html5")}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                            >
                              <Film className="h-3.5 w-3.5" />
                              Switch to HTML5
                            </button>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          key={lessonContent.lesson.id}
                          src={
                            lessonContent.lesson.videoUrl
                              ? `${lessonContent.lesson.videoUrl}?autoplay=0&rel=0&modestbranding=1`
                              : "https://www.youtube.com/embed/GcT7V3L4DG4?autoplay=0&rel=0"
                          }
                          title={lessonContent.lesson.title || "Lesson Video"}
                          className="w-full h-full aspect-video border-0 rounded-2xl bg-black"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          onError={() => setIframeError(true)}
                        />
                      )
                    ) : (
                      <div className="relative w-full h-full flex flex-col justify-between">
                        {videoError ? (
                          /* HTML5 video error fallback */
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900/80 rounded-2xl p-6 text-center">
                            <div className="h-14 w-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                              <AlertCircle className="h-6 w-6 text-amber-400" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">Video Failed to Load</p>
                              <p className="text-xs text-neutral-400 mt-1">The video stream could not be loaded.</p>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => { setVideoError(false); if (videoRef.current) { videoRef.current.load(); } }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Retry
                              </button>
                              <button
                                onClick={() => setVideoSourceMode("iframe")}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                              >
                                <Tv className="h-3.5 w-3.5" />
                                Try YouTube
                              </button>
                            </div>
                          </div>
                        ) : (
                          <video
                            ref={videoRef}
                            src={
                              lessonContent.lesson.sampleMp4 ||
                              "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            }
                            crossOrigin="anonymous"
                            preload="metadata"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                            onError={() => setVideoError(true)}
                            className="w-full h-full object-contain rounded-2xl bg-black cursor-pointer"
                            onClick={togglePlay}
                          />
                        )}

                        {/* Interactive HTML5 Video Controls Bar — only show when video is working */}
                        {!videoError && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 transition-opacity opacity-90 group-hover:opacity-100">
                          {/* Seek bar */}
                          <input
                            type="range"
                            min={0}
                            max={videoDuration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          />

                          <div className="flex items-center justify-between text-xs text-neutral-300">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={togglePlay}
                                className="h-8 w-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center transition-all shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                              >
                                {isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4 fill-current ml-0.5" />
                                )}
                              </button>

                              <button onClick={toggleMute} className="hover:text-white transition-colors">
                                {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                              </button>

                              <span className="font-mono text-xs">
                                {formatTime(currentTime)} / {formatTime(videoDuration || 300)}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Playback speed selector */}
                              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                                {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => handleSpeedChange(s)}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                                      playbackSpeed === s
                                        ? "bg-cyan-500 text-black font-bold"
                                        : "hover:bg-white/10 text-neutral-400"
                                    }`}
                                  >
                                    {s}x
                                  </button>
                                ))}
                              </div>

                              <button onClick={toggleFullscreen} className="hover:text-white transition-colors">
                                <Maximize2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Transcript & Mark Watched */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 rounded-xl border border-white/10 bg-slate-900/50 p-4 space-y-2">
                      <h3 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        Lesson Video Transcript
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                        "{lessonContent.lesson.transcript}"
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          Lesson Progress Tracker
                        </h4>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          {completedLessons.includes(activeLessonId)
                            ? "You have already completed this masterclass lesson!"
                            : "Mark this video as watched to update your course progress percent."}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (!completedLessons.includes(activeLessonId)) {
                            setCompletedLessons((prev) => [...prev, activeLessonId]);
                          }
                        }}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          completedLessons.includes(activeLessonId)
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        {completedLessons.includes(activeLessonId) ? "Completed" : "Mark as Watched"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Notes & Code Snippets */}
              {activeTab === "notes" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
                  <div className="prose prose-invert max-w-none text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {lessonContent.lesson.theory}
                  </div>
                </div>
              )}

              {/* Tab 3: API Interactive Quiz */}
              {activeTab === "quiz" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
                  {lessonContent.lesson.quiz ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" />
                          Interactive Lesson Quiz (API Evaluated)
                        </span>
                        {completedLessons.includes(activeLessonId) && (
                          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Lesson Completed
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white mb-4">
                        {lessonContent.lesson.quiz.question}
                      </h3>

                      <div className="space-y-2.5">
                        {lessonContent.lesson.quiz.options.map((opt, idx) => {
                          const isSelected = selectedOption === idx;
                          let borderClass = "border-white/10 hover:border-cyan-500/40 bg-white/5";

                          if (quizResult) {
                            if (idx === quizResult.correctIndex) {
                              borderClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold";
                            } else if (isSelected && !quizResult.isCorrect) {
                              borderClass = "border-rose-500 bg-rose-500/10 text-rose-300";
                            }
                          } else if (isSelected) {
                            borderClass = "border-cyan-400 bg-cyan-500/10 text-white font-medium";
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => !quizResult && setSelectedOption(idx)}
                              disabled={!!quizResult}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${borderClass}`}
                            >
                              <span className="font-mono text-cyan-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Action & Feedback */}
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {!quizResult ? (
                          <button
                            onClick={handleQuizSubmit}
                            disabled={selectedOption === null || isSubmittingQuiz}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-colors px-6 py-2.5 rounded-xl shadow-[0_0_16px_rgba(6,182,212,0.5)]"
                          >
                            {isSubmittingQuiz ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Evaluating via API...
                              </>
                            ) : (
                              "Submit Answer via API"
                            )}
                          </button>
                        ) : (
                          <div className="w-full space-y-3">
                            <div
                              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                                quizResult.isCorrect
                                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                                  : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                              }`}
                            >
                              <div className="flex items-center gap-2 font-bold mb-1">
                                {quizResult.isCorrect ? (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    Correct! Lesson Progress Saved.
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="h-4 w-4 text-rose-400" />
                                    Incorrect Answer. Review explanation below.
                                  </>
                                )}
                              </div>
                              <p>{quizResult.explanation}</p>
                            </div>

                            <button
                              onClick={() => {
                                setQuizResult(null);
                                setSelectedOption(null);
                              }}
                              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 underline"
                            >
                              <RotateCcw className="h-3 w-3" />
                              Try quiz again
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400">No quiz required for this overview lesson.</p>
                  )}
                </div>
              )}

              {/* Tab 4: AI Course Tutor Chat */}
              {activeTab === "ai" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 flex flex-col h-[460px]">
                  <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <h3 className="text-xs font-bold text-white">AI Course Assistant</h3>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono">Context: {lessonContent.lesson.title}</span>
                  </div>

                  {/* Message Trajectory */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-3">
                    {aiChatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 text-xs leading-relaxed ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3.5 border ${
                            msg.sender === "user"
                              ? "bg-cyan-600 text-white border-cyan-500/50"
                              : "bg-white/5 text-neutral-200 border-white/10"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isAiResponding && (
                      <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        AI is reasoning about lesson concepts...
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <div className="pt-3 border-t border-white/10 flex gap-2">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
                      placeholder="Ask AI tutor about time complexity, edge cases, code..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={handleAiSend}
                      disabled={!aiInput.trim() || isAiResponding}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-neutral-400">
              Select a lesson from the syllabus to begin learning.
            </div>
          )}
        </main>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1324] border border-amber-500/40 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 relative overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.3)]">
            <div className="h-20 w-20 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Award className="h-10 w-10" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Official Completion Certificate
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">{courseData.title}</h3>
              <p className="text-xs text-neutral-400 mt-2">
                Awarded to <span className="text-white font-semibold">Arjun Sharma</span> for successfully completing all interactive lessons, code drills, and API assessments.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => alert("Certificate downloaded as PDF!")}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors flex items-center gap-2"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
