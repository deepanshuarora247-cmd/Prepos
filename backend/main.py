from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import httpx
import uvicorn

app = FastAPI(
    title="PrepOS Course Engine API",
    description="FastAPI Backend for Tech Masterclasses, Interactive Quizzes, AI Tutoring & Live GitHub/HN Integration",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Data Models
# ---------------------------------------------------------------------------

class QuizSubmission(BaseModel):
    selected_option: int

class AiTutorRequest(BaseModel):
    question: str

# ---------------------------------------------------------------------------
# In-Memory Course Database
# ---------------------------------------------------------------------------

COURSES_DATABASE = [
    {
        "id": "dsa-deep-dive",
        "title": "Data Structures & Algorithms Deep Dive",
        "instructor": "Ex-Google Staff Engineer",
        "instructorRole": "Former Lead Tech Interviewer @ Google",
        "level": "Intermediate to Advanced",
        "duration": "24 hours • 82 lessons",
        "rating": 4.9,
        "enrolled": "14.2k students",
        "category": "Algorithms",
        "description": "Master all core patterns required for Tier-1 coding interviews: Two Pointers, Sliding Window, Dynamic Programming, and Graph Traversals.",
        "topics": ["Arrays & HashMaps", "Trees & Graphs", "Dynamic Programming", "Bit Manipulation"],
        "modules": [
            {
                "id": "mod-1",
                "title": "Module 1: Sliding Window & Two Pointers",
                "lessons": [
                    {
                        "id": "les-1-1",
                        "title": "Fixed vs Dynamic Window Patterns",
                        "duration": "18 min",
                        "type": "video",
                        "summary": "Learn when to shrink or expand windows, handling subarray constraints with O(N) complexity.",
                        "videoUrl": "https://www.youtube.com/embed/GcT7V3L4DG4",
                        "sampleMp4": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        "transcript": "In this lesson, we breakdown the fundamental difference between fixed length sliding windows and dynamic sliding windows.",
                        "theory": "### Sliding Window Strategy\nUsed for subsegment processing over arrays.",
                        "quiz": {
                            "question": "What is the primary advantage of the Sliding Window technique over brute-force nested loops?",
                            "options": [
                                "It reduces space complexity to O(1) in all cases.",
                                "It reduces time complexity from O(N^2) to O(N) by reusing computation of overlapping subarrays.",
                                "It guarantees recursive call stack safety.",
                                "It works on unsorted string permutations only."
                            ],
                            "correctIndex": 1,
                            "explanation": "Sliding window avoids re-calculating overlapping subproblem sums by maintaining a running state."
                        }
                    },
                    {
                        "id": "les-1-2",
                        "title": "Fruit Into Baskets & At Most K Distinct",
                        "duration": "24 min",
                        "type": "video",
                        "summary": "Detailed walkthrough of two-pointer state contraction using hash maps.",
                        "videoUrl": "https://www.youtube.com/embed/EXzl7bLzCis",
                        "sampleMp4": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                        "transcript": "We analyze how to maintain at most K unique keys in a Map while moving the right pointer forward.",
                        "theory": "### At Most K Distinct Pattern\nUse a Map for key frequencies.",
                        "quiz": {
                            "question": "When should the left pointer be incremented in an 'At Most K Distinct' problem?",
                            "options": [
                                "Whenever the right pointer hits an even index.",
                                "When the total number of unique keys in the hash map exceeds K.",
                                "Only when the array is sorted in ascending order.",
                                "Never, because left pointer is stationary."
                            ],
                            "correctIndex": 1,
                            "explanation": "When map.size > K, the window is invalid, so left pointer advances."
                        }
                    }
                ]
            },
            {
                "id": "mod-2",
                "title": "Module 2: Graph Traversals & Topological Sort",
                "lessons": [
                    {
                        "id": "les-2-1",
                        "title": "BFS vs DFS: Cycle Detection in Directed Graphs",
                        "duration": "32 min",
                        "type": "video",
                        "summary": "Kahn's Algorithm vs recursion stack states for course schedule resolution.",
                        "videoUrl": "https://www.youtube.com/embed/mqqrf-bgkC8",
                        "sampleMp4": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                        "transcript": "Detecting cycles in directed graphs is crucial for build dependencies.",
                        "theory": "### Kahn's Algorithm\nTrack in-degrees to order DAG vertices.",
                        "quiz": {
                            "question": "In Kahn's Algorithm for Topological Sort, what condition signifies that a graph contains a cycle?",
                            "options": [
                                "The queue becomes empty before processing all graph vertices.",
                                "The in-degree of the starting node is greater than 0.",
                                "The adjacency list contains self-loops only.",
                                "The graph is undirected."
                            ],
                            "correctIndex": 0,
                            "explanation": "If processed nodes count is less than total vertices when queue empties, a cycle exists."
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "system-design-mastery",
        "title": "System Design for FAANG Tech Leads",
        "instructor": "Principal Architect @ Meta",
        "instructorRole": "Infrastructure Lead, Distributed Databases",
        "level": "Advanced",
        "duration": "18 hours • 54 lessons",
        "rating": 4.95,
        "enrolled": "9.8k students",
        "category": "System Design",
        "description": "Learn how to architect high-throughput distributed systems handling millions of QPS, database sharding, caching strategies, and event-driven queues.",
        "topics": ["Microservices", "Distributed Caching", "Database Sharding", "Event-Driven Queues"],
        "modules": [
            {
                "id": "sysmod-1",
                "title": "Module 1: Scalable Caching & Consistent Hashing",
                "lessons": [
                    {
                        "id": "sysles-1-1",
                        "title": "Consistent Hashing & Ring Rebalance",
                        "duration": "26 min",
                        "type": "video",
                        "summary": "Distribute workload without full cache keys re-hashing when servers scale out.",
                        "videoUrl": "https://www.youtube.com/embed/xHnA-5DpNvk",
                        "sampleMp4": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                        "transcript": "Consistent hashing maps keys and nodes to a hash ring, moving only K/N keys.",
                        "theory": "### Consistent Hashing Ring\nVirtual nodes prevent hot spots.",
                        "quiz": {
                            "question": "Why are virtual nodes added to a Consistent Hashing ring?",
                            "options": [
                                "To speed up SSL/TLS handshake latency.",
                                "To prevent hot spots and achieve uniform data distribution across physical servers.",
                                "To compress database index tables.",
                                "To automatically encrypt cache keys at rest."
                            ],
                            "correctIndex": 1,
                            "explanation": "Virtual nodes spread physical server positions, preventing key skew."
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "llm-ai-engineering",
        "title": "Fullstack AI & LLM Engineering 2026",
        "instructor": "AI Research Lead @ OpenAI",
        "instructorRole": "Foundational Models & RAG Architecture",
        "level": "All Levels",
        "duration": "16 hours • 48 lessons",
        "rating": 4.88,
        "enrolled": "18.5k students",
        "category": "AI & ML",
        "description": "Build autonomous AI agents, RAG pipelines, fine-tune models, and integrate vector databases into production web applications.",
        "topics": ["RAG Architecture", "Vector DBs (Pinecone/Milvus)", "LangChain & LlamaIndex", "AI Agents"],
        "modules": [
            {
                "id": "aimod-1",
                "title": "Module 1: Vector Embeddings & Hybrid Search",
                "lessons": [
                    {
                        "id": "ailes-1-1",
                        "title": "Cosine Similarity vs Dot Product in Vector DBs",
                        "duration": "20 min",
                        "type": "video",
                        "summary": "Understanding vector distance metrics for semantic document retrieval.",
                        "videoUrl": "https://www.youtube.com/embed/FSTrj-TuikE",
                        "sampleMp4": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                        "transcript": "Choosing distance metrics impacts vector index search latency.",
                        "theory": "### Distance Metrics in Vector Space",
                        "quiz": {
                            "question": "When are Dot Product and Cosine Similarity mathematical equivalents in vector search?",
                            "options": [
                                "When vector dimensions are less than 128.",
                                "When all vectors are L2-normalized (length of 1.0).",
                                "When using HNSW index without quantization.",
                                "Only when querying sparse keyword matrices."
                            ],
                            "correctIndex": 1,
                            "explanation": "When vectors are L2-normalized, dot product equals cosine similarity."
                        }
                    }
                ]
            }
        ]
    }
]

# ---------------------------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
def api_root():
    return {
        "status": "online",
        "framework": "FastAPI",
        "service": "PrepOS Tech Course API Engine",
        "endpoints": [
            "/api/courses",
            "/api/courses/{course_id}",
            "/api/courses/{course_id}/lessons/{lesson_id}",
            "/api/live/github-courses",
            "/api/live/hn-news"
        ]
    }

@app.get("/api/courses")
def get_courses(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    """Fetch courses list with category filter and search query."""
    result = COURSES_DATABASE

    if category and category != "All":
        result = [c for c in result if c["category"].lower() == category.lower()]

    if search and search.strip():
        q = search.lower()
        result = [
            c for c in result
            if q in c["title"].lower()
            or q in c["description"].lower()
            or q in c["instructor"].lower()
            or any(q in t.lower() for t in c["topics"])
        ]

    return {
        "status": 200,
        "source": "FastAPI Backend",
        "courses": result
    }

@app.get("/api/courses/{course_id}")
def get_course_details(course_id: str):
    """Fetch full syllabus tree for a course."""
    course = next((c for c in COURSES_DATABASE if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail=f"Course '{course_id}' not found.")
    return {
        "status": 200,
        "source": "FastAPI Backend",
        "course": course
    }

@app.get("/api/courses/{course_id}/lessons/{lesson_id}")
def get_lesson_content(course_id: str, lesson_id: str):
    """Fetch specific lesson content."""
    course = next((c for c in COURSES_DATABASE if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    for mod in course["modules"]:
        for les in mod["lessons"]:
            if les["id"] == lesson_id:
                return {
                    "status": 200,
                    "moduleTitle": mod["title"],
                    "lesson": les
                }
    raise HTTPException(status_code=404, detail="Lesson not found")

@app.post("/api/courses/{course_id}/lessons/{lesson_id}/quiz")
def evaluate_quiz(course_id: str, lesson_id: str, submission: QuizSubmission):
    """API Endpoint to evaluate quiz answers."""
    course = next((c for c in COURSES_DATABASE if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    for mod in course["modules"]:
        for les in mod["lessons"]:
            if les["id"] == lesson_id:
                quiz = les.get("quiz")
                if not quiz:
                    raise HTTPException(status_code=400, detail="Lesson has no quiz")
                
                is_correct = submission.selected_option == quiz["correctIndex"]
                return {
                    "status": 200,
                    "evaluator": "FastAPI Server",
                    "isCorrect": is_correct,
                    "correctIndex": quiz["correctIndex"],
                    "explanation": quiz["explanation"]
                }
    raise HTTPException(status_code=404, detail="Lesson not found")

@app.post("/api/courses/{course_id}/lessons/{lesson_id}/tutor")
def ask_ai_tutor(course_id: str, lesson_id: str, payload: AiTutorRequest):
    """FastAPI AI Tutor endpoint."""
    q_lower = payload.question.lower()
    reply = "FastAPI AI Assistant: "

    if "time complexity" in q_lower or "o(n)" in q_lower:
        reply += "Because each element enters the window once and leaves at most once, amortized time complexity is **O(N)**."
    elif "space" in q_lower or "memory" in q_lower:
        reply += "Space complexity is **O(K)** where K is the number of distinct keys in the sliding window hash map."
    elif "interview" in q_lower or "google" in q_lower:
        reply += "In Tier-1 interviews, explicitly state boundary edge cases before coding your pointer moves."
    else:
        reply += "Focus on maintaining your invariant state. Expand right pointer when valid, contract left pointer when invalid."

    return {
        "status": 200,
        "reply": reply,
        "server": "FastAPI Python"
    }

@app.get("/api/live/github-courses")
async def get_live_github_courses(query: str = "interview-prep"):
    """Proxy endpoint fetching live repositories from GitHub REST API."""
    url = f"https://api.github.com/search/repositories?q={query}+in:name,description&sort=stars&order=desc&per_page=6"
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, headers={"User-Agent": "PrepOS-FastAPI"})
            data = resp.json()
            items = []
            for r in data.get("items", []):
                items.append({
                    "id": f"gh-{r['id']}",
                    "title": r["name"].replace("-", " ").upper(),
                    "fullName": r["full_name"],
                    "instructor": f"@{r['owner']['login']}",
                    "description": r.get("description", "Open source course repo."),
                    "stars": r["stargazers_count"],
                    "forks": r["forks_count"],
                    "language": r.get("language") or "Code",
                    "url": r["html_url"],
                    "topics": r.get("topics", [])[:4]
                })
            return {"status": 200, "source": "FastAPI -> GitHub REST API", "repos": items}
        except Exception as e:
            return {"status": 500, "error": str(e), "repos": []}

@app.get("/api/live/hn-news")
async def get_live_hn_news():
    """Proxy endpoint fetching live tech news from HackerNews Firebase API."""
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get("https://hacker-news.firebaseio.com/v0/topstories.json")
            ids = resp.json()[:5]
            stories = []
            for sid in ids:
                s_resp = await client.get(f"https://hacker-news.firebaseio.com/v0/item/{sid}.json")
                s = s_resp.json()
                stories.append({
                    "id": s["id"],
                    "title": s.get("title"),
                    "url": s.get("url", f"https://news.ycombinator.com/item?id={s['id']}"),
                    "by": s.get("by"),
                    "score": s.get("score", 0),
                    "comments": s.get("descendants", 0)
                })
        except Exception as e:
            return {"status": 500, "error": str(e), "stories": []}

@app.get("/api/live/tutorials")
async def get_live_tutorials(
    query: str = Query("programming", description="Topic query"),
    api_key: Optional[str] = Query(None, description="Optional API key for authenticated API calls")
):
    """Proxy endpoint for fetching live tech tutorials from Dev.to / external APIs using optional API key."""
    headers = {"User-Agent": "PrepOS-FastAPI"}
    if api_key:
        headers["api-key"] = api_key
    
    url = f"https://dev.to/api/articles?tag={query}&per_page=9"
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                tutorials = []
                for item in data:
                    tutorials.append({
                        "id": f"devto-{item.get('id')}",
                        "title": item.get("title"),
                        "category": item.get("tag_list", ["Tutorial"])[0].upper() if item.get("tag_list") else "GUIDE",
                        "readTime": f"{item.get('reading_time_minutes', 5)} min read",
                        "type": "Live Article",
                        "summary": item.get("description") or "Developer tutorial and architectural guide.",
                        "tags": item.get("tag_list", [])[:4],
                        "url": item.get("url"),
                        "author": item.get("user", {}).get("name", "Tech Writer"),
                        "likes": item.get("public_reactions_count", 0),
                        "publishedAt": item.get("readable_publish_date", "Recent")
                    })
                source_label = "FastAPI -> Dev.to API (Authenticated)" if api_key else "FastAPI -> Dev.to API (Public)"
                return {"status": 200, "source": source_label, "tutorials": tutorials}
        except Exception as e:
            pass

    # Fallback response if external API is unreachable
    return {
        "status": 200,
        "source": "FastAPI Fallback Cache",
        "tutorials": [
            {
                "id": "sliding-window-pattern",
                "title": "The Ultimate 5-Step Sliding Window Pattern Guide",
                "category": "Algorithms",
                "readTime": "8 min read",
                "type": "Article + Code",
                "summary": "Learn how to solve variable and fixed-length sliding window problems in O(N) time with minimal auxiliary space.",
                "tags": ["Sliding Window", "Two Pointers", "DSA"],
                "url": "https://dev.to",
                "author": "PrepOS Staff",
                "likes": 142
            },
            {
                "id": "system-design-back-of-envelope",
                "title": "Back of the Envelope Estimation Cheatsheet 2026",
                "category": "System Design",
                "readTime": "12 min read",
                "type": "Cheatsheet",
                "summary": "Quick reference for QPS calculations, latency numbers (L1 cache vs SSD vs Network), and storage estimations.",
                "tags": ["Capacity Planning", "Architecture", "SLA"],
                "url": "https://dev.to",
                "author": "PrepOS Staff",
                "likes": 289
            },
            {
                "id": "star-method-behavioral",
                "title": "Mastering the STAR Method for Behavioral Rounds",
                "category": "Career & Mock",
                "readTime": "10 min read",
                "type": "Video Walkthrough",
                "summary": "How to frame technical trade-offs, leadership conflict, and production outage stories with concrete metrics.",
                "tags": ["STAR Method", "Behavioral", "FAANG"],
                "url": "https://dev.to",
                "author": "PrepOS Staff",
                "likes": 98
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

