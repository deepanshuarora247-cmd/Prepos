import React, { useState, useEffect, useMemo } from "react";
import { 
  ArrowLeft, BookOpen, Clock, Search, 
  ThumbsUp, Sparkles, ExternalLink, Bookmark, CheckCircle2,
  Copy, Check, Share2, X, ChevronRight, ChevronLeft,
  Flame, Award, Code2, Network, MessagesSquare, Lightbulb,
  Cpu, Zap, Filter, ArrowUpRight
} from "lucide-react";
import "./TutorialsView.css";

export const DEFAULT_TUTORIALS = [
  {
    id: "sliding-window-pattern",
    title: "The Ultimate 5-Step Sliding Window Pattern Guide",
    category: "Algorithms",
    readTime: "8 min read",
    type: "Article + Code",
    summary: "Learn how to solve variable and fixed-length sliding window problems in O(N) time with minimal auxiliary space.",
    tags: ["Sliding Window", "Two Pointers", "DSA", "LeetCode"],
    author: "PrepOS Staff",
    likes: 142,
    relatedAction: {
      type: "dsa",
      label: "Practice in DSA Sandbox",
      questionId: "longest-substring",
      category: "DSA"
    },
    sections: [
      {
        heading: "Intuition & The Sliding Window Invariant",
        content: `Many array and string interview problems ask for a contiguous subarray or substring satisfying certain constraints (e.g., maximum sum of size K, longest substring with at most K distinct characters, or smallest subarray with sum ≥ target).

The brute-force solution invariably checks all O(N²) contiguous subarrays, leading to Time Limit Exceeded (TLE) errors in FAANG technical interviews.

The Sliding Window technique optimizes this to O(N) time complexity by maintaining a window between two pointers [left, right]. As right expands, we accumulate state. When an invariant is violated, left contracts the window until the state is valid again. Because both left and right visit each array element at most once, the total number of operations is strictly 2N = O(N).`,
        callout: {
          type: "tip",
          title: "When to Recognize a Sliding Window Problem",
          text: "Look for keywords: 'contiguous subarray', 'longest substring', 'minimum window', or 'fixed window of size K'. If the elements are contiguous and monotonicity holds (adding an element only increases or preserves the property), Sliding Window is almost always the optimal approach."
        }
      },
      {
        heading: "The 5-Step Blueprint",
        content: `Mastering Sliding Window comes down to following this repeatable 5-step checklist in your technical interviews:`,
        steps: [
          {
            num: "1",
            title: "Initialize Window State & Pointers",
            desc: "Set left = 0, right = 0, along with a state tracker (hash map, frequency array, or running sum) and result accumulator."
          },
          {
            num: "2",
            title: "Expand the Window (Right Pointer)",
            desc: "Iterate right from 0 to N-1. In each iteration, absorb array[right] into your state tracker."
          },
          {
            num: "3",
            title: "Evaluate the Window Validity Invariant",
            desc: "Check if the current window state violates the required constraint (e.g., window size > K, distinct keys > K, duplicate character encountered)."
          },
          {
            num: "4",
            title: "Contract the Window (Left Pointer While Loop)",
            desc: "While the window remains invalid, remove array[left] from the state tracker and increment left."
          },
          {
            num: "5",
            title: "Update the Global Optimal Result",
            desc: "Once the window is valid, record the optimal answer using the current window length (right - left + 1) or running sum."
          }
        ]
      },
      {
        heading: "Production-Ready Implementation (JavaScript)",
        content: "Here is the canonical implementation for Longest Substring Without Repeating Characters demonstrating the 5-step framework:",
        code: `/**
 * Solves Longest Substring Without Repeating Characters
 * @param {string} s
 * @return {number}
 * Time Complexity: O(N)
 * Space Complexity: O(min(M, N)) where M is character set size
 */
function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const charMap = new Map(); // Tracks character -> last seen index

  // Step 2: Expand with right pointer
  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Step 3 & 4: If duplicate exists in current window, jump left pointer
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1; // Instant contract
    }

    // Update character's latest position
    charMap.set(char, right);

    // Step 5: Update global maximum length
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        language: "javascript"
      },
      {
        heading: "Complexity Analysis & Space Optimization",
        content: "Detailed complexity breakdown expected in top-tier technical evaluations:",
        table: {
          headers: ["Approach", "Time Complexity", "Auxiliary Space", "Trade-offs"],
          rows: [
            ["Brute Force (All Substrings)", "O(N³)", "O(min(N, M))", "Checks all N² pairs with O(N) set validation. Fails test cases."],
            ["Sliding Window (Hash Set)", "O(2N) = O(N)", "O(min(N, M))", "Contracts left pointer one step at a time."],
            ["Optimized Map (Index Jump)", "O(N)", "O(min(N, M))", "Jumps left pointer directly past duplicate. Optimal for ASCII/Unicode."]
          ]
        }
      },
      {
        heading: "Common Interview Pitfalls & FAANG Tips",
        content: `1. **Off-by-One Length**: The window length between indices left and right is always (right - left + 1), NOT (right - left).
2. **Negative Numbers**: If an array contains negative numbers, the running sum is non-monotonic! Standard sliding window will fail; you must use Prefix Sum + Hash Map instead.
3. **Empty String or Single Element**: Always test s = "" (should return 0) and s = "a" (should return 1) before declaring your code complete to the interviewer.`
      }
    ]
  },
  {
    id: "system-design-back-of-envelope",
    title: "Back of the Envelope Estimation Cheatsheet 2026",
    category: "System Design",
    readTime: "12 min read",
    type: "Cheatsheet",
    summary: "Quick reference for QPS calculations, latency numbers (L1 cache vs SSD vs Network), and storage estimations.",
    tags: ["Capacity Planning", "Architecture", "SLA", "System Design"],
    author: "PrepOS Staff",
    likes: 289,
    relatedAction: {
      type: "sysdesign",
      label: "Open System Design Studio",
      questionId: null,
      category: null
    },
    sections: [
      {
        heading: "Latency Numbers Every Programmer Must Know",
        content: `Dr. Jeff Dean (Google Fellow) famously published the fundamental hardware latency numbers. Understanding the vast orders-of-magnitude differences between CPU caches, RAM, SSDs, and cross-datacenter networks is essential for making defensible architectural trade-offs in System Design interviews.`,
        table: {
          headers: ["Operation", "Real-world Latency", "Normalized Human Scale (1ns = 1s)"],
          rows: [
            ["L1 Cache Reference", "0.5 ns", "0.5 seconds"],
            ["Branch Mispredict", "5 ns", "5 seconds"],
            ["L2 Cache Reference", "7 ns", "7 seconds"],
            ["Mutex Lock / Unlock", "25 ns", "25 seconds"],
            ["Main Memory (RAM) Reference", "100 ns", "1.7 minutes"],
            ["Compress 1KB with Zippy/Snappy", "3,000 ns (3 µs)", "50 minutes"],
            ["Send 2KB over 1 Gbps Network", "20,000 ns (20 µs)", "5.5 hours"],
            ["Read 1MB Sequentially from Memory", "250,000 ns (250 µs)", "3 days"],
            ["SSD Random Read (NVMe / Flash)", "16,000 - 100,000 ns (16-100 µs)", "1 - 2 days"],
            ["Read 1MB Sequentially from SSD", "1,000,000 ns (1 ms)", "11.6 days"],
            ["HDD Rotational Seek", "10,000,000 ns (10 ms)", "4 months"],
            ["Read 1MB Sequentially from HDD", "20,000,000 ns (20 ms)", "8 months"],
            ["Send Packet CA to Netherlands & back", "150,000,000 ns (150 ms)", "5 years"]
          ]
        },
        callout: {
          type: "tip",
          title: "Core Architectural Takeaway",
          text: "Memory (RAM) is ~1,000x faster than NVMe SSD, which is ~100x faster than spinning disks. A network round trip to another continent is 1.5 million times slower than reading from RAM. Always place caches close to compute and batch cross-region requests."
        }
      },
      {
        heading: "Powers of 2 & Data Sizing Equivalents",
        content: `In fast mental math, round 1 day to 100,000 seconds (actual is 86,400s) to perform calculations quickly on a whiteboard:
- **2^10 = 1,024** ≈ 1 Thousand = 1 Kilobyte (KB)
- **2^20 = 1,048,576** ≈ 1 Million = 1 Megabyte (MB)
- **2^30 = 1,073,741,824** ≈ 1 Billion = 1 Gigabyte (GB)
- **2^40 = 1,099,511,627,776** ≈ 1 Trillion = 1 Terabyte (TB)
- **2^50 ≈ 1 Petabyte (PB)**
- **Seconds in a Day**: 86,400 ≈ 10⁵ seconds.`
      },
      {
        heading: "Interactive Capacity & QPS Calculator",
        content: "Use this interactive calculator to practice back-of-the-envelope calculations dynamically:",
        interactiveWidget: "estimator"
      },
      {
        heading: "The 4-Step FAANG Sizing Framework",
        content: `When asked to size a system (e.g., 'Design Twitter' or 'Design WhatsApp'), follow this systematic order:
1. **Traffic Volume (QPS)**:
   - Queries Per Second (QPS) = (Daily Active Users × Requests/Day) / 86,400.
   - Peak QPS = Average QPS × 2 (or 3 for bursty platforms like e-commerce).
2. **Storage Capacity (Per Day / 5 Years)**:
   - Storage/Day = Daily Writes × Average Payload Size.
   - 5-Year Storage = Storage/Day × 365 × 5 × Replication Factor (typically 3x).
3. **Bandwidth / Throughput**:
   - Ingress Bandwidth = Write QPS × Payload Size.
   - Egress Bandwidth = Read QPS × Payload Size.
4. **Memory / Cache Sizing**:
   - Apply the 80/20 Pareto principle: 20% of content drives 80% of traffic.
   - Memory Cache (Redis) = 20% × Daily Read Volume.`
      }
    ]
  },
  {
    id: "star-method-behavioral",
    title: "Mastering the STAR Method for Behavioral Rounds",
    category: "Career & Mock",
    readTime: "10 min read",
    type: "Video & Framework",
    summary: "How to frame technical trade-offs, leadership conflict, and production outage stories with concrete metrics.",
    tags: ["STAR Method", "Behavioral", "FAANG", "Leadership"],
    author: "PrepOS Staff",
    likes: 98,
    relatedAction: {
      type: "behavioral",
      label: "Launch Behavioral AI Mock",
      questionId: null,
      category: null
    },
    sections: [
      {
        heading: "The 70/30 Rule: Why Most Engineers Fail Behavioral Rounds",
        content: `Most software engineers fail behavioral rounds not due to a lack of technical achievements, but because of poor narrative balance. Candidates frequently spend 80% of their 5 minutes describing background context (Situation & Task) and rush through what they actually did in 30 seconds.

Top tech companies (Google, Amazon, Meta, Netflix) evaluate you on the **Action** and **Result**. The golden ratio is:
- **Situation (10%)**: Brief background context (30 seconds).
- **Task (10%)**: The specific objective or complication assigned to you (30 seconds).
- **Action (60%)**: What YOU specifically planned, debugged, architected, and executed (3 minutes).
- **Result (20%)**: Quantifiable business/engineering metrics and retrospective lessons (1 minute).`,
        callout: {
          type: "tip",
          title: "The 'I' vs 'We' Balance",
          text: "Never say 'we built this' or 'the team decided'. Interviewers are hiring you, not your former team. Explicitly say: 'While the team handled the frontend, I designed the Redis cluster fallback and wrote the migration script.'"
        }
      },
      {
        heading: "Full Sample Story: Resolving a Sev-1 Outage Under High Traffic",
        content: `Here is a battle-tested behavioral script for: *"Tell me about a time you handled a critical technical failure or production outage."*

**Situation (30s):**
"During Black Friday peak traffic at my previous e-commerce platform, our payment processing service suddenly degraded, causing checkout timeouts for 15% of European users and threatening $250k in hourly lost revenue."

**Task (30s):**
"As the on-call tech lead for payments, I was responsible for triage, orchestrating cross-team mitigation within our 15-minute SLA, and ensuring zero double-charging of customer credit cards."

**Action (3m):**
"1. *Immediate Containment*: I first isolated telemetry in Datadog and identified that database connection pools were exhausted due to lock contention on our transactional ledger table.
2. *Circuit Breaking*: Rather than allowing requests to pile up, I triggered our circuit breaker to route non-critical verification to an asynchronous Kafka dead-letter queue.
3. *Hotfix & Traffic Sharding*: I coordinated with the database administrator to spin up a read-replica dedicated to read-only fraud checks, deployed an emergency configuration adjusting connection pool lease timeouts from 30s to 5s, and rate-limited upstream retry bots.
4. *Communication*: I maintained a live incident bridge with status updates every 7 minutes for executive stakeholders."

**Result (1m):**
"Within 11 minutes of detection, checkout error rates dropped back to 0.02%. We rescued an estimated $1.2M in sales that afternoon. Following the incident, I led the post-mortem and re-architected our transaction processor to use idempotent tokens, completely eliminating this class of lock contention."`
      },
      {
        heading: "Top 5 Behavioral Pitfalls",
        content: `1. **Missing Quantitative Metrics**: Saying 'it became faster' is weak. Saying 'p99 latency dropped from 420ms to 65ms' proves senior-level engineering rigor.
2. **Blaming Colleagues or Management**: Never frame a conflict as 'the other engineer was stubborn'. Instead say: 'We had competing architectural priorities regarding consistency versus availability'.
3. **No Retrospective / Reflection**: Always mention what you learned or what automated safeguards you put in place to prevent the issue from happening again.`
      }
    ]
  },
  {
    id: "dp-patterns-guide",
    title: "Dynamic Programming Decoded: Top 5 Patterns",
    category: "Algorithms",
    readTime: "15 min read",
    type: "Deep Dive",
    summary: "Master Knapsack, LCS, LIS, and Grid-based DP. Includes transition state formulations and optimization recipes.",
    tags: ["Dynamic Programming", "Memoization", "Tabulation", "DSA"],
    author: "PrepOS Staff",
    likes: 184,
    relatedAction: {
      type: "dsa",
      label: "Practice in DSA Sandbox",
      questionId: null,
      category: "DSA"
    },
    sections: [
      {
        heading: "The Anatomy of Dynamic Programming",
        content: `Dynamic Programming (DP) is simply **recursion without repeating redundant work**. A problem exhibits DP properties when it has:
1. **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions to its subproblems.
2. **Overlapping Subproblems**: The same recursive subproblems are solved repeatedly.

The transition from brute-force recursion O(2^N) to DP O(N) involves:
- **Top-Down (Memoization)**: Write natural recursion and cache answers in a map or table.
- **Bottom-Up (Tabulation)**: Build a table iteratively from base cases up to N.`
      },
      {
        heading: "The 5 Canonical DP Archetypes",
        content: `Over 90% of all interview DP problems fall into one of these 5 patterns:`,
        table: {
          headers: ["Pattern Archetype", "Core Problem Example", "Recurrence Formula", "Space Optimization"],
          rows: [
            ["0/1 Knapsack", "Subset Sum, Partition Equal Subset", "dp[w] = max(dp[w], dp[w - weight[i]] + val[i])", "2D table O(N*W) → 1D array O(W) (iterate backwards)"],
            ["Longest Common Subsequence (LCS)", "Edit Distance, Longest Palindromic Subseq", "if (s1[i]==s2[j]) 1 + dp[i-1][j-1] else max(dp[i-1][j], dp[i][j-1])", "O(M*N) → O(min(M, N)) with 2 rows"],
            ["Longest Increasing Subsequence (LIS)", "Russian Doll Envelopes, Longest Chain", "dp[i] = 1 + max(dp[j]) for j < i where arr[j] < arr[i]", "O(N²) DP or O(N log N) with Binary Search Patience Sort"],
            ["Matrix / Grid Traversal", "Unique Paths, Minimum Path Sum", "dp[r][c] = cost[r][c] + min(dp[r-1][c], dp[r][c-1])", "O(R*C) → O(C) 1D row"],
            ["Interval DP", "Burst Balloons, Matrix Chain Multiplication", "dp[i][j] = max(dp[i][k-1] + cost + dp[k+1][j])", "O(N³) time, O(N²) space (loop by interval length)"]
          ]
        }
      },
      {
        heading: "Space Optimization: The 1D Backward Iteration Trick",
        content: "In 0/1 Knapsack, you can eliminate the entire row dimension of a 2D table by iterating backwards across capacity:",
        code: `/**
 * 0/1 Knapsack Space-Optimized to O(W)
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 * @return {number}
 */
function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const w = weights[i];
    const v = values[i];

    // CRITICAL: Iterate BACKWARDS from capacity down to w
    // This ensures dp[c - w] represents the state from PREVIOUS items!
    for (let c = capacity; c >= w; c--) {
      dp[c] = Math.max(dp[c], dp[c - w] + v);
    }
  }

  return dp[capacity];
}`,
        language: "javascript"
      }
    ]
  },
  {
    id: "url-shortener-design",
    title: "System Design: Scaling a TinyURL Service to 10M DAU",
    category: "System Design",
    readTime: "14 min read",
    type: "Architecture Blueprint",
    summary: "Full blueprint on base62 encoding, custom hash generation collision avoidance, database partitioning, and Redis caching.",
    tags: ["System Design", "Scalability", "NoSQL", "Redis"],
    author: "PrepOS Staff",
    likes: 312,
    relatedAction: {
      type: "sysdesign",
      label: "Open System Design Studio",
      questionId: null,
      category: null
    },
    sections: [
      {
        heading: "System Requirements & Constraints",
        content: `**Functional Requirements:**
1. Given a long URL, generate a short, unique alias (e.g. \`https://prepos.io/8xK2q\`).
2. When users access the short link, redirect them to the original destination in < 30ms.
3. Allow users to optionally specify a custom alias (max 16 characters).
4. Links expire after 2 years by default unless renewed.

**Non-Functional Requirements:**
1. High Availability (99.99%): Service must not go down.
2. Ultra-Low Read Latency: Redirection must be lightning-fast.
3. Read-Heavy System: 100:1 read-to-write ratio.`
      },
      {
        heading: "Short Key Generation: Base62 vs Cryptographic Hashing",
        content: `A frequent debate in system design interviews:
- **Approach 1: MD5/SHA256 Hash Truncation**: Hash the original URL and take the first 7 characters.
  *Problem*: Hash collisions! If two URLs produce the same prefix, you must append an index and re-check the database, adding latency.
- **Approach 2 (Recommended): Distributed ID Generator + Base62 Encoding**:
  Generate an auto-incrementing 64-bit integer using Twitter Snowflake or a ZooKeeper Range Allocator, then convert that integer to Base62 (\`[0-9a-zA-Z]\`).
  *Math*: 62^7 = 3.52 Trillion unique URLs. With 100M URLs generated per month, this key space will last for **2,900 years** without collisions!`,
        code: `// Base62 Converter Example
const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function idToBase62(num) {
  let shortUrl = "";
  while (num > 0) {
    shortUrl = BASE62_CHARS[num % 62] + shortUrl;
    num = Math.floor(num / 62);
  }
  // Pad to 7 characters for consistency
  return shortUrl.padStart(7, "0");
}`
      },
      {
        heading: "End-to-End Architectural Flow",
        content: `1. **Write Flow**:
   User requests short URL → Cloudflare CDN / WAF → API Gateway Rate Limiter → URL Shortener Service → Fetch next ID from Distributed Range Token Allocator → Encode to Base62 → Write to primary NoSQL DB (DynamoDB/Cassandra) → Warm Redis cache → Return short URL.
2. **Read Flow**:
   User navigates to short link → Cloudflare Edge Cache → If miss, hit Redis Cache cluster (99% hit rate) → Return **HTTP 302 Found** redirect → If cache miss, read from database replica and populate Redis.`
      }
    ]
  },
  {
    id: "concurrency-cheatsheet",
    title: "Concurrency & Deadlocks: Thread Safety Guide",
    category: "Languages",
    readTime: "9 min read",
    type: "Cheatsheet",
    summary: "Common concurrency race conditions, mutex locking guidelines, and semaphore patterns in modern backend environments.",
    tags: ["Concurrency", "Multithreading", "Go", "Java", "Backend"],
    author: "PrepOS Staff",
    likes: 215,
    relatedAction: {
      type: "sysdesign",
      label: "Open System Design Studio",
      questionId: null,
      category: null
    },
    sections: [
      {
        heading: "The 3 Foundational Concurrency Hazards",
        content: `1. **Race Condition**: Multiple threads access and modify shared state simultaneously, producing nondeterministic results depending on thread scheduling.
2. **Deadlock**: Two or more threads are permanently blocked waiting for locks held by each other.
3. **Memory Visibility (Stale Reads)**: Modern CPUs maintain per-core L1/L2 caches. Without memory barriers or volatile/atomic markers, writes by Core 1 may not be visible to Core 2.`
      },
      {
        heading: "The 4 Coffman Conditions for Deadlocks",
        content: `A deadlock can occur **only if all four** of these conditions hold simultaneously:
1. **Mutual Exclusion**: At least one resource is held in a non-shareable mode.
2. **Hold and Wait**: A thread holding a resource is waiting to acquire additional resources held by other threads.
3. **No Preemption**: Resources cannot be forcibly revoked from a thread.
4. **Circular Wait**: Thread 1 waits for Thread 2, which waits for Thread 3, which waits for Thread 1.

*Deadlock Prevention*: Eliminating ANY ONE of the 4 conditions guarantees deadlocks cannot occur. The industry standard is **Lock Ordering Hierarchy** (always acquire Lock A before Lock B across all routines).`
      },
      {
        heading: "Synchronization Primitives Comparison",
        table: {
          headers: ["Primitive", "Mechanism", "Best Use Case", "Overhead"],
          rows: [
            ["Mutex / ReentrantLock", "Mutual exclusion; single owner", "Protecting shared critical sections", "Low to medium (kernel context switch on contention)"],
            ["Read-Write Lock (RWLock)", "Multiple concurrent readers, exclusive writer", "Read-heavy data structures (80%+ reads)", "Slightly higher bookkeeping overhead"],
            ["Counting Semaphore", "Maintains permits for resource pools", "Rate limiting, connection pooling", "Low"],
            ["Atomic (CAS / Compare-And-Swap)", "Lock-free hardware instruction", "Counters, non-blocking stacks/queues", "Extremely fast, zero context switching"]
          ]
        }
      }
    ]
  }
];

export default function TutorialsView({ 
  onBackToDashboard,
  initialTutorialId = null,
  onNavigateToDsa,
  onNavigateToSysDesign,
  onNavigateToBehavioral
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  // Modal active tutorial reader state
  const [selectedTutorial, setSelectedTutorial] = useState(() => {
    if (initialTutorialId) {
      return DEFAULT_TUTORIALS.find((t) => t.id === initialTutorialId) || null;
    }
    return null;
  });

  // Local storage bookmarks & likes & read status
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("prepos_bookmarked_tutorials");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("prepos_liked_tutorials");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("prepos_completed_tutorials");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Interactive Estimator Widget State (for back of the envelope)
  const [estimatorDau, setEstimatorDau] = useState(10); // Millions
  const [estimatorReqPerUser, setEstimatorReqPerUser] = useState(20);
  const [estimatorPayloadKb, setEstimatorPayloadKb] = useState(2);

  // Sync initialTutorialId if it changes from props (navigation)
  useEffect(() => {
    if (initialTutorialId) {
      const found = DEFAULT_TUTORIALS.find((t) => t.id === initialTutorialId);
      if (found) {
        setSelectedTutorial(found);
      }
    }
  }, [initialTutorialId]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem("prepos_bookmarked_tutorials", JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  // Persist likes
  useEffect(() => {
    try {
      localStorage.setItem("prepos_liked_tutorials", JSON.stringify(likedIds));
    } catch {}
  }, [likedIds]);

  // Persist completed
  useEffect(() => {
    try {
      localStorage.setItem("prepos_completed_tutorials", JSON.stringify(completedIds));
    } catch {}
  }, [completedIds]);

  // Keyboard escape listener to close reader modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedTutorial) {
        setSelectedTutorial(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTutorial]);

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id, e) => {
    if (e) e.stopPropagation();
    setCompletedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2200);
  };

  // Filter & Sort
  const categories = ["All", "Algorithms", "System Design", "Career & Mock", "Languages", "Bookmarked"];

  const filteredTutorials = useMemo(() => {
    return DEFAULT_TUTORIALS.filter((tut) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        tut.title.toLowerCase().includes(query) ||
        tut.summary.toLowerCase().includes(query) ||
        (tut.tags && tut.tags.some((t) => t.toLowerCase().includes(query)));

      let matchesCategory = true;
      if (selectedCategory === "Bookmarked") {
        matchesCategory = bookmarkedIds.includes(tut.id);
      } else if (selectedCategory !== "All") {
        matchesCategory = tut.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      const likesA = a.likes + (likedIds.includes(a.id) ? 1 : 0);
      const likesB = b.likes + (likedIds.includes(b.id) ? 1 : 0);
      if (sortBy === "popular") return likesB - likesA;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy, bookmarkedIds, likedIds]);

  // Navigation between tutorials in reader modal
  const currentTutorialIndex = selectedTutorial 
    ? DEFAULT_TUTORIALS.findIndex((t) => t.id === selectedTutorial.id) 
    : -1;

  const handlePrevTutorial = () => {
    if (currentTutorialIndex > 0) {
      setSelectedTutorial(DEFAULT_TUTORIALS[currentTutorialIndex - 1]);
    }
  };

  const handleNextTutorial = () => {
    if (currentTutorialIndex < DEFAULT_TUTORIALS.length - 1) {
      setSelectedTutorial(DEFAULT_TUTORIALS[currentTutorialIndex + 1]);
    }
  };

  const handleExecuteRelatedAction = (action) => {
    if (!action) return;
    if (action.type === "dsa" && onNavigateToDsa) {
      onNavigateToDsa(action.questionId || null, action.category || "All");
    } else if (action.type === "sysdesign" && onNavigateToSysDesign) {
      onNavigateToSysDesign();
    } else if (action.type === "behavioral" && onNavigateToBehavioral) {
      onNavigateToBehavioral();
    }
  };

  // Live Calculations for Interactive Estimator
  const totalDailyRequests = estimatorDau * 1000000 * estimatorReqPerUser;
  const avgQps = Math.round(totalDailyRequests / 86400);
  const peakQps = avgQps * 2;
  const dailyStorageGb = ((totalDailyRequests * estimatorPayloadKb) / (1024 * 1024)).toFixed(1);
  const threeYearStorageTb = ((dailyStorageGb * 365 * 3 * 3) / 1024).toFixed(1); // 3x replication

  return (
    <div className="tutorials-container">
      {/* Header */}
      <header className="tutorials-header">
        <div className="tutorials-header-left">
          <button onClick={onBackToDashboard} className="tutorials-back-btn">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <span className="tutorials-header-divider">/</span>
          <div className="tutorials-header-title">
            <div className="tutorials-icon-badge">
              <BookOpen className="h-4 w-4" />
            </div>
            <span>Developer Blueprints & Guides</span>
          </div>
        </div>

        <div className="tutorials-header-right">
          <span className="tutorials-count-badge">
            <Sparkles className="h-3 w-3" /> {DEFAULT_TUTORIALS.length} Technical Blueprints
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="tutorials-main">
        {/* Hero Banner Strip */}
        <div className="tutorials-hero-banner">
          <div className="tutorials-hero-left">
            <div className="tutorials-content-title-area">
              <h2>Developer Tutorials & Blueprints</h2>
              <span className="tutorials-live-tag">
                Interactive Engineering Knowledge
              </span>
            </div>
            <p className="tutorials-content-subtitle">
              Deep dives into algorithm templates, distributed system calculations, STAR behavioral scripts, and concurrency.
            </p>
          </div>

          <div className="tutorials-hero-stats">
            <div className="tutorials-stat-pill">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span><strong>{completedIds.length}</strong> Completed</span>
            </div>
            <div className="tutorials-stat-pill">
              <Bookmark className="h-3.5 w-3.5 text-amber-400" />
              <span><strong>{bookmarkedIds.length}</strong> Bookmarked</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="tutorials-filter-bar">
          {/* Category Filter Pills */}
          <div className="tutorials-category-pills">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              let count = DEFAULT_TUTORIALS.length;
              if (cat === "Bookmarked") count = bookmarkedIds.length;
              else if (cat !== "All") {
                count = DEFAULT_TUTORIALS.filter((t) => t.category === cat).length;
              }

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`tutorials-cat-pill ${isActive ? "active" : ""}`}
                >
                  {cat === "Bookmarked" && <Bookmark className="h-3 w-3 inline mr-1" />}
                  <span>{cat}</span>
                  <span className="tutorials-pill-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="tutorials-actions-bar">
            <div className="search-input-wrapper">
              <Search className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials, patterns or tags..."
                className="search-input-field"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="tutorials-sort-select"
            >
              <option value="popular">Most Popular (Likes)</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length === 0 ? (
          <div className="tutorials-empty-state">
            <BookOpen className="h-10 w-10 mb-3 text-slate-500" />
            <h3>No tutorials found</h3>
            <p>Try clearing your search query or choosing another category tab.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="tutorials-reset-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="tutorials-grid-3">
            {filteredTutorials.map((tut) => {
              const isBookmarked = bookmarkedIds.includes(tut.id);
              const isLiked = likedIds.includes(tut.id);
              const isCompleted = completedIds.includes(tut.id);
              const totalLikes = tut.likes + (isLiked ? 1 : 0);

              let badgeColor = "var(--indigo-bg)";
              let badgeBorder = "var(--indigo-border)";
              let badgeText = "var(--indigo-accent)";
              if (tut.category === "System Design") {
                badgeColor = "var(--purple-bg)";
                badgeBorder = "var(--purple-border)";
                badgeText = "var(--purple-accent)";
              } else if (tut.category === "Career & Mock") {
                badgeColor = "var(--emerald-bg)";
                badgeBorder = "var(--emerald-border)";
                badgeText = "var(--emerald-accent)";
              } else if (tut.category === "Languages") {
                badgeColor = "var(--cyan-bg)";
                badgeBorder = "var(--cyan-border)";
                badgeText = "var(--cyan-accent)";
              }

              return (
                <div 
                  key={tut.id} 
                  className={`tutorial-card ${isCompleted ? "is-completed" : ""}`}
                  onClick={() => setSelectedTutorial(tut)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedTutorial(tut);
                    }
                  }}
                >
                  <div className="tutorial-card-top-content">
                    {/* Header Row */}
                    <div className="tutorial-card-header">
                      <span 
                        className="tutorial-card-badge"
                        style={{ backgroundColor: badgeColor, borderColor: badgeBorder, color: badgeText }}
                      >
                        {tut.category}
                      </span>
                      
                      <div className="tutorial-card-header-actions">
                        <span className="tutorial-card-readtime">
                          <Clock className="h-3 w-3" /> {tut.readTime}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(tut.id, e)}
                          className={`tutorial-icon-btn ${isBookmarked ? "active-bookmark" : ""}`}
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark Guide"}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Completion Pill if Done */}
                    {isCompleted && (
                      <div className="tutorial-completed-ribbon">
                        <CheckCircle2 className="h-3 w-3" /> Completed
                      </div>
                    )}

                    <h3 className="tutorial-card-title">{tut.title}</h3>
                    <p className="tutorial-card-desc">{tut.summary}</p>

                    {/* Tags */}
                    <div className="tutorial-card-tags-list">
                      {tut.tags && tut.tags.map((tg) => (
                        <span 
                          key={tg} 
                          className="tutorial-card-tag-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tg);
                          }}
                        >
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="tutorial-card-bottom-content">
                    {/* Author & Likes */}
                    <div className="tutorial-card-footer">
                      <span>By <strong>{tut.author}</strong></span>
                      <button
                        type="button"
                        onClick={(e) => toggleLike(tut.id, e)}
                        className={`tutorial-like-btn ${isLiked ? "liked" : ""}`}
                        title="Like this tutorial"
                      >
                        <ThumbsUp className="h-3 w-3" /> {totalLikes}
                      </button>
                    </div>

                    {/* Interactive Clickable Read Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTutorial(tut);
                      }}
                      className="tutorial-card-read-btn"
                    >
                      <span>Read Blueprint</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* TUTORIAL READER MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedTutorial && (
        <div 
          className="tutorial-modal-overlay"
          onClick={() => setSelectedTutorial(null)}
        >
          <div 
            className="tutorial-reader-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="tutorial-reader-header">
              <div className="tutorial-reader-header-left">
                <button
                  type="button"
                  onClick={() => setSelectedTutorial(null)}
                  className="tutorial-reader-back-btn"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Tutorials</span>
                </button>
                <div className="tutorial-reader-breadcrumbs">
                  <span>Tutorials</span>
                  <span>/</span>
                  <span className="active-cat">{selectedTutorial.category}</span>
                </div>
              </div>

              <div className="tutorial-reader-header-right">
                {/* Like Button */}
                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedTutorial.id, e)}
                  className={`tutorial-modal-btn ${likedIds.includes(selectedTutorial.id) ? "active" : ""}`}
                  title="Like Tutorial"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{selectedTutorial.likes + (likedIds.includes(selectedTutorial.id) ? 1 : 0)}</span>
                </button>

                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedTutorial.id, e)}
                  className={`tutorial-modal-btn ${bookmarkedIds.includes(selectedTutorial.id) ? "active" : ""}`}
                  title="Bookmark Tutorial"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>{bookmarkedIds.includes(selectedTutorial.id) ? "Saved" : "Save"}</span>
                </button>

                {/* Completed Toggle */}
                <button
                  type="button"
                  onClick={(e) => toggleCompleted(selectedTutorial.id, e)}
                  className={`tutorial-modal-btn ${completedIds.includes(selectedTutorial.id) ? "completed" : ""}`}
                  title="Toggle Read / Unread Status"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{completedIds.includes(selectedTutorial.id) ? "Completed" : "Mark as Read"}</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedTutorial(null)}
                  className="tutorial-reader-close-btn"
                  title="Close Reader (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="tutorial-reader-body">
              {/* Meta Ribbon */}
              <div className="tutorial-reader-meta-ribbon">
                <span className="tutorial-reader-badge">{selectedTutorial.category}</span>
                <span className="tutorial-reader-type-pill">{selectedTutorial.type}</span>
                <span className="tutorial-reader-time">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> {selectedTutorial.readTime}
                </span>
                <span className="tutorial-reader-author">
                  By {selectedTutorial.author}
                </span>
              </div>

              {/* Title & Summary */}
              <h1 className="tutorial-reader-title">{selectedTutorial.title}</h1>
              <p className="tutorial-reader-summary">{selectedTutorial.summary}</p>

              {/* Tags Strip */}
              <div className="tutorial-reader-tags">
                {selectedTutorial.tags && selectedTutorial.tags.map((tg) => (
                  <span key={tg} className="tutorial-reader-tag">#{tg}</span>
                ))}
              </div>

              <div className="tutorial-reader-divider" />

              {/* Structured Sections */}
              <div className="tutorial-reader-sections-container">
                {selectedTutorial.sections && selectedTutorial.sections.map((sec, idx) => (
                  <section key={idx} className="tutorial-content-section">
                    <h2 className="tutorial-section-heading">
                      <span className="tutorial-section-index">{idx + 1}</span>
                      {sec.heading}
                    </h2>

                    {sec.content && (
                      <div className="tutorial-section-text">
                        {sec.content.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}

                    {/* Step Cards if provided */}
                    {sec.steps && (
                      <div className="tutorial-steps-grid">
                        {sec.steps.map((st) => (
                          <div key={st.num} className="tutorial-step-card">
                            <div className="tutorial-step-num">{st.num}</div>
                            <div className="tutorial-step-content">
                              <h4>{st.title}</h4>
                              <p>{st.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Callout Box */}
                    {sec.callout && (
                      <div className={`tutorial-callout-box ${sec.callout.type || "tip"}`}>
                        <div className="tutorial-callout-header">
                          <Lightbulb className="h-4 w-4 text-amber-400" />
                          <span>{sec.callout.title}</span>
                        </div>
                        <p>{sec.callout.text}</p>
                      </div>
                    )}

                    {/* Interactive Estimator Widget */}
                    {sec.interactiveWidget === "estimator" && (
                      <div className="tutorial-estimator-widget">
                        <div className="tutorial-estimator-header">
                          <Zap className="h-4 w-4 text-indigo-400" />
                          <h3>Live Capacity Estimator Calculator</h3>
                        </div>
                        
                        <div className="tutorial-estimator-inputs">
                          <div className="estimator-field">
                            <label>Daily Active Users (DAU)</label>
                            <div className="estimator-input-row">
                              <input 
                                type="range" 
                                min="1" 
                                max="100" 
                                value={estimatorDau} 
                                onChange={(e) => setEstimatorDau(Number(e.target.value))} 
                              />
                              <span className="estimator-val">{estimatorDau} Million</span>
                            </div>
                          </div>

                          <div className="estimator-field">
                            <label>Requests per User / Day</label>
                            <div className="estimator-input-row">
                              <input 
                                type="range" 
                                min="5" 
                                max="100" 
                                step="5"
                                value={estimatorReqPerUser} 
                                onChange={(e) => setEstimatorReqPerUser(Number(e.target.value))} 
                              />
                              <span className="estimator-val">{estimatorReqPerUser} req/day</span>
                            </div>
                          </div>

                          <div className="estimator-field">
                            <label>Average Payload Size (KB)</label>
                            <div className="estimator-input-row">
                              <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={estimatorPayloadKb} 
                                onChange={(e) => setEstimatorPayloadKb(Number(e.target.value))} 
                              />
                              <span className="estimator-val">{estimatorPayloadKb} KB</span>
                            </div>
                          </div>
                        </div>

                        {/* Calculated Results */}
                        <div className="tutorial-estimator-results">
                          <div className="estimator-result-card">
                            <span className="lbl">Average QPS</span>
                            <span className="val">{avgQps.toLocaleString()} req/s</span>
                          </div>
                          <div className="estimator-result-card">
                            <span className="lbl">Peak QPS (2x)</span>
                            <span className="val text-purple-400">{peakQps.toLocaleString()} req/s</span>
                          </div>
                          <div className="estimator-result-card">
                            <span className="lbl">Daily Ingestion</span>
                            <span className="val text-cyan-400">{dailyStorageGb} GB/day</span>
                          </div>
                          <div className="estimator-result-card">
                            <span className="lbl">3-Year Storage (3x Repl)</span>
                            <span className="val text-amber-400">{threeYearStorageTb} TB</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Code Snippet Box */}
                    {sec.code && (
                      <div className="tutorial-code-box">
                        <div className="tutorial-code-header">
                          <span className="tutorial-code-lang">{sec.language || "code"}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(sec.code, idx)}
                            className="tutorial-copy-btn"
                          >
                            {copiedCodeIdx === idx ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="tutorial-code-pre">
                          <code>{sec.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Table if provided */}
                    {sec.table && (
                      <div className="tutorial-table-wrapper">
                        <table className="tutorial-table">
                          <thead>
                            <tr>
                              {sec.table.headers.map((h, hIdx) => (
                                <th key={hIdx}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sec.table.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={cIdx === 0 ? "font-bold text-white" : ""}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Action Banner to Related Module */}
              {selectedTutorial.relatedAction && (
                <div className="tutorial-action-banner">
                  <div className="tutorial-action-banner-text">
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                    <div>
                      <h4>Put This Blueprint Into Action</h4>
                      <p>Test your understanding with real interactive problems and live code sandboxes.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleExecuteRelatedAction(selectedTutorial.relatedAction);
                    }}
                    className="tutorial-action-banner-btn"
                  >
                    <span>{selectedTutorial.relatedAction.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer with Prev/Next Navigation */}
            <div className="tutorial-reader-footer">
              <button
                type="button"
                onClick={handlePrevTutorial}
                disabled={currentTutorialIndex <= 0}
                className="tutorial-nav-arrow-btn"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Tutorial</span>
              </button>

              <div className="tutorial-footer-counter">
                Guide {currentTutorialIndex + 1} of {DEFAULT_TUTORIALS.length}
              </div>

              <button
                type="button"
                onClick={handleNextTutorial}
                disabled={currentTutorialIndex >= DEFAULT_TUTORIALS.length - 1}
                className="tutorial-nav-arrow-btn"
              >
                <span>Next Tutorial</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
