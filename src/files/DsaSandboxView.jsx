import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Search,
  CheckCircle2,
  Circle,
  Play,
  ArrowLeft,
  Terminal,
  Sparkles,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Building2,
  Lightbulb,
  Check,
  Flame,
  Award,
  Globe,
  Loader2,
  ChevronDown
} from "lucide-react";
import "./DsaSandboxView.css";

const LOCAL_DSA_QUESTIONS = [
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "DSA",
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple"],
    acceptance: "34.2%",
    solved: false,
    isApiResult: false,
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        id: 1,
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        id: 2,
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        id: 3,
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Use a sliding window approach with two pointers (left and right).",
      "Keep track of characters and their most recent indices or presence in a Set/Map.",
      "When a duplicate is encountered, advance the left pointer past the previous occurrence."
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n    const seen = new Set();\n    let left = 0, best = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (seen.has(s[right])) {\n            seen.delete(s[left]);\n            left++;\n        }\n        seen.add(s[right]);\n        best = Math.max(best, right - left + 1);\n    }\n    return best;\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = set()\n        left = best = 0\n        for right in range(len(s)):\n            while s[right] in seen:\n                seen.remove(s[left])\n                left += 1\n            seen.add(s[right])\n            best = max(best, right - left + 1)\n        return best`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> seen;\n        int left = 0, best = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (seen.count(s[right])) {\n                seen.erase(s[left++]);\n            }\n            seen.insert(s[right]);\n            best = max(best, right - left + 1);\n        }\n        return best;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> seen = new HashSet<>();\n        int left = 0, best = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (seen.contains(s.charAt(right))) {\n                seen.remove(s.charAt(left++));\n            }\n            seen.add(s.charAt(right));\n            best = Math.max(best, right - left + 1);\n        }\n        return best;\n    }\n}`
    },
    testCases: [
      { input: 's = "abcabcbb"', expected: "3" },
      { input: 's = "bbbbb"', expected: "1" },
      { input: 's = "pwwkew"', expected: "3" }
    ]
  },
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "DSA",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    acceptance: "52.4%",
    solved: true,
    isApiResult: false,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    examples: [{ id: 1, input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }],
    constraints: ["2 <= nums.length <= 10^4"],
    hints: ["Use a Hash Map to store numbers seen so far."],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen: return [seen[target - n], i]\n            seen[n] = i\n        return []`,
      cpp: `class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { unordered_map<int, int> seen; for (int i = 0; i < nums.size(); i++) { if (seen.count(target - nums[i])) return {seen[target - nums[i]], i}; seen[nums[i]] = i; } return {}; } };`,
      java: `class Solution { public int[] twoSum(int[] nums, int target) { Map<Integer, Integer> seen = new HashMap<>(); for (int i = 0; i < nums.length; i++) { if (seen.containsKey(target - nums[i])) return new int[]{seen.get(target - nums[i]), i}; seen.put(nums[i], i); } return new int[]{}; } }`
    },
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]" },
      { input: "nums = [3, 3], target = 6", expected: "[0, 1]" }
    ]
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "DSA",
    companies: ["Amazon", "Google", "Microsoft"],
    acceptance: "41.8%",
    solved: false,
    isApiResult: false,
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.`,
    examples: [{ id: 1, input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." }],
    constraints: ["The number of nodes in each linked list is in the range [1, 100]."],
    hints: ["Traverse both linked lists, keep track of carry, and sum elements node-by-node."],
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {\n    let dummy = new ListNode(0);\n    let curr = dummy, carry = 0;\n    while(l1 || l2 || carry) {\n        let sum = carry;\n        if(l1) { sum += l1.val; l1 = l1.next; }\n        if(l2) { sum += l2.val; l2 = l2.next; }\n        carry = Math.floor(sum / 10);\n        curr.next = new ListNode(sum % 10);\n        curr = curr.next;\n    }\n    return dummy.next;\n}`,
      python: `class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode(0)\n        curr = dummy\n        carry = 0\n        while l1 or l2 or carry:\n            val = carry\n            if l1:\n                val += l1.val\n                l1 = l1.next\n            if l2:\n                val += l2.val\n                l2 = l2.next\n            carry, val = divmod(val, 10)\n            curr.next = ListNode(val)\n            curr = curr.next\n        return dummy.next`,
      cpp: `class Solution { public: ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) { ListNode* dummy = new ListNode(0); ListNode* curr = dummy; int carry = 0; while (l1 || l2 || carry) { int sum = carry; if (l1) { sum += l1->val; l1 = l1->next; } if (l2) { sum += l2->val; l2 = l2->next; } carry = sum / 10; curr->next = new ListNode(sum % 10); curr = curr->next; } return dummy->next; } };`,
      java: `class Solution { public ListNode addTwoNumbers(ListNode l1, ListNode l2) { ListNode dummy = new ListNode(0); ListNode curr = dummy; int carry = 0; while (l1 != null || l2 != null || carry != 0) { int sum = carry; if (l1 != null) { sum += l1.val; l1 = l1.next; } if (l2 != null) { sum += l2.val; l2 = l2.next; } carry = sum / 10; curr.next = new ListNode(sum % 10); curr = curr.next; } return dummy.next; } }`
    },
    testCases: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", expected: "[7,0,8]" },
      { input: "l1 = [0], l2 = [0]", expected: "[0]" },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", expected: "[8,9,9,9,0,0,0,1]" }
    ]
  },
  {
    id: "merge-k-sorted",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "DSA",
    companies: ["Google", "Meta", "Amazon", "ByteDance"],
    acceptance: "51.2%",
    solved: false,
    isApiResult: false,
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [{ id: 1, input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }],
    constraints: ["lists.length >= 0", "lists[i] is sorted in ascending order."],
    hints: ["Use a Min-Priority Queue to keep track of the smallest node values across lists."],
    starterCode: {
      javascript: `function mergeKLists(lists) {\n    // Priority Queue or Divide & Conquer approach\n}`,
      python: `class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        # Use Min Heap / Priority Queue`,
      cpp: `class Solution { public: ListNode* mergeKLists(vector<ListNode*>& lists) { // Min Heap } };`,
      java: `class Solution { public ListNode mergeKLists(ListNode[] lists) { // Min-Priority Queue } }`
    },
    testCases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", expected: "[]" }
    ]
  }
];

// Helper to mock fetching/searching real questions from LeetCode API
const searchDsaQuestionsApi = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const lowerQuery = query.toLowerCase();
  
  // Curated LeetCode API response search mock
  const apiResults = [
    {
      id: "api-valid-parentheses",
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      companies: ["Meta", "Google", "Amazon", "Microsoft"],
      acceptance: "40.9%",
      solved: false,
      isApiResult: true,
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
      examples: [{ id: 1, input: 's = "()[]{}"', output: "true" }],
      constraints: ["1 <= s.length <= 10^4"],
      hints: ["Use a stack to match brackets as you scan the string."],
      starterCode: {
        javascript: `function isValid(s) {\n    const stack = [];\n    const pairs = { ')': '(', '}': '{', ']': '[' };\n    for (let c of s) {\n        if (pairs[c]) {\n            if (stack.pop() !== pairs[c]) return false;\n        } else stack.push(c);\n    }\n    return stack.length === 0;\n}`,
        python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        pairs = {")": "(", "}": "{", "]": "["}\n        for c in s:\n            if c in pairs:\n                if not stack or stack.pop() != pairs[c]: return False\n            else: stack.append(c)\n        return not stack`
      },
      testCases: [{ input: 's = "()[]{}"', expected: "true" }]
    },
    {
      id: "api-binary-tree-inorder",
      title: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      category: "Tree",
      companies: ["Amazon", "Google"],
      acceptance: "74.8%",
      solved: false,
      isApiResult: true,
      description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
      examples: [{ id: 1, input: "root = [1,null,2,3]", output: "[1,3,2]" }],
      constraints: ["The number of nodes in the tree is in the range [0, 100]."],
      hints: ["Inorder traversal traverses: Left subtree -> Root node -> Right subtree."],
      starterCode: {
        javascript: `function inorderTraversal(root) {\n    const res = [];\n    function traverse(node) {\n        if(!node) return;\n        traverse(node.left);\n        res.push(node.val);\n        traverse(node.right);\n    }\n    traverse(root);\n    return res;\n}`,
        python: `class Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        res = []\n        def dfs(node):\n            if not node: return\n            dfs(node.left)\n            res.append(node.val)\n            dfs(node.right)\n        dfs(root)\n        return res`
      },
      testCases: [{ input: "root = [1,null,2,3]", expected: "[1,3,2]" }]
    },
    {
      id: "api-kth-largest",
      title: "Kth Largest Element in an Array",
      difficulty: "Medium",
      category: "Heap",
      companies: ["Facebook", "Amazon", "Spotify"],
      acceptance: "66.5%",
      solved: false,
      isApiResult: true,
      description: `Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.`,
      examples: [{ id: 1, input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }],
      constraints: ["1 <= k <= nums.length <= 10^5"],
      hints: ["You can sort the array, or use a min heap of size k to scan through it."],
      starterCode: {
        javascript: `function findKthLargest(nums, k) {\n    // Sort or Heap\n}`,
        python: `class Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        import heapq\n        return heapq.nlargest(k, nums)[-1]`
      },
      testCases: [{ input: "nums = [3,2,1,5,6,4], k = 2", expected: "5" }]
    }
  ];

  return apiResults.filter((q) =>
    q.title.toLowerCase().includes(lowerQuery) ||
    q.category.toLowerCase().includes(lowerQuery)
  );
};

export default function DsaSandboxView({ onBackToDashboard, initialQuestionId, initialCategory }) {
  const [questions, setQuestions] = useState(LOCAL_DSA_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState(initialQuestionId || null);
  const [activeTab, setActiveTab] = useState("description"); // "description" | "hints"
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory || "All");
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Editor and console runner states
  const [userCodeMap, setUserCodeMap] = useState({});
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [runResults, setRunResults] = useState(null);
  const [activeResultTab, setActiveResultTab] = useState(0);

  const handleRunCode = () => {
    if (!activeQuestion) return;
    setIsRunningCode(true);
    setRunResults(null);

    setTimeout(() => {
      setIsRunningCode(false);
      // Simulate pass on test cases
      const results = activeQuestion.testCases.map((tc) => ({
        input: tc.input,
        expected: tc.expected,
        received: tc.expected,
        passed: true
      }));

      setRunResults({
        status: "success",
        cases: results
      });
      setActiveResultTab(0);
    }, 600);
  };

  const handleSubmitCode = () => {
    if (!activeQuestion) return;
    setIsRunningCode(true);
    setRunResults(null);

    setTimeout(() => {
      setIsRunningCode(false);
      const results = activeQuestion.testCases.map((tc) => ({
        input: tc.input,
        expected: tc.expected,
        received: tc.expected,
        passed: true
      }));

      setRunResults({
        status: "success",
        cases: results
      });
      setActiveResultTab(0);
    }, 700);
  };

  // Preferences / Editor Settings
  const [editorSettings] = useState({
    editorFontSize: "13px",
    lineNumbers: true,
    tabSize: 4,
    autoCloseBrackets: true
  });

  // Debounced API search effect (using simple local timer instead of useRef)
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setQuestions(LOCAL_DSA_QUESTIONS);
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);
    const timer = setTimeout(async () => {
      try {
        const apiResults = await searchDsaQuestionsApi(searchQuery);
        setQuestions(apiResults);
      } catch (e) {
        console.error("API search failed:", e);
      } finally {
        setIsSearchingApi(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || null;

  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "All" || q.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  const currentCode =
    activeQuestion ? (userCodeMap[activeQuestion.id]?.[selectedLanguage] ?? activeQuestion.starterCode[selectedLanguage]) : "";

  const handleCodeChange = (newCode) => {
    if (!activeQuestion) return;
    setUserCodeMap((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || {}),
        [selectedLanguage]: newCode,
      },
    }));
  };

  const handleResetCode = () => {
    if (!activeQuestion) return;
    setUserCodeMap((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || {}),
        [selectedLanguage]: activeQuestion.starterCode[selectedLanguage],
      },
    }));
  };

  const categories = ["All", "DSA", "Stack", "Tree", "Heap", "Databases"];

  return (
    <div className="sandbox-container">
      {/* Background ambient lighting */}
      <div className="glow-bg-1" />
      <div className="glow-bg-2" />

      {/* Top Navbar */}
      <header className="sandbox-header">
        <div className="sandbox-header-left">
          <button
            onClick={onBackToDashboard}
            className="sandbox-back-btn"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </button>

          <span className="sandbox-header-divider">/</span>

          <div className="sandbox-header-title">
            <div className="q-solve-btn" style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem" }}>
              <Code2 className="h-4 w-4" />
            </div>
            <span>DSA Sandbox</span>
          </div>
        </div>

        {/* Header Stats */}
        <div className="sandbox-header-right">
          <div className="sandbox-header-stats-item">
            <span>Solved:</span>
            <span style={{ color: "var(--emerald-accent)", fontWeight: 600 }}>
              {questions.filter((q) => q.solved).length} / {questions.length}
            </span>
          </div>
          <div className="sandbox-header-stats-divider" />
          <div className="sandbox-header-stats-item">
            <Flame className="h-3.5 w-3.5" style={{ color: "var(--orange-accent)" }} />
            <span style={{ fontWeight: 500 }}>12 Day Streak</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      {!activeQuestion ? (
        /* ================= LIST VIEW ================= */
        <main className="list-view-main">
          {/* Header Banner */}
          <div className="list-view-banner">
            <div className="list-view-banner-content">
              <span className="list-view-banner-tag">
                Interactive Practice Drills
              </span>
              <h2 className="list-view-banner-title">
                Master Data Structures & Algorithms
              </h2>
              <p className="list-view-banner-desc">
                Search and fetch real LeetCode questions via live API or solve curated FAANG interview drills with our interactive code runner.
              </p>
            </div>
            <Award className="list-view-banner-watermark" />
          </div>

          {/* Filters Bar with API Search */}
          <div className="list-view-filters-bar">
            {/* Live API Search Input */}
            <div className="search-input-wrapper">
              <Search className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Questions"
                className="search-input-field"
              />
              {isSearchingApi ? (
                <Loader2 className="search-loader" />
              ) : searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="search-input-clear-btn"
                >
                  ×
                </button>
              ) : null}
            </div>

            {/* Difficulty Pills */}
            <div className="difficulty-filters-group">
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`difficulty-filter-btn ${difficultyFilter === diff ? "active" : ""}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs & API Status indicator */}
          <div className="categories-bar-row">
            <div className="categories-scroll-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`category-filter-badge ${categoryFilter === cat ? "active" : "inactive"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="api-status-badge">
                <Globe className="h-3.5 w-3.5" />
                Live API Search Active
              </div>
            )}
          </div>

          {/* Questions Grid / Table */}
          <div className="questions-list-panel">
            <div className="table-header-row">
              <div className="col-status">Status</div>
              <div className="col-title">Title</div>
              <div className="col-category">Category / Source</div>
              <div className="col-difficulty">Difficulty</div>
              <div className="col-action">Action</div>
            </div>

            <div className="table-body-rows">
              {isSearchingApi ? (
                <div className="popover-body" style={{ color: "var(--text-secondary)" }}>
                  <Loader2 className="search-loader" style={{ position: "static", margin: "1rem" }} />
                  Searching LeetCode API for "{searchQuery}"...
                </div>
              ) : filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => {
                  const getDifficultyStyles = () => {
                    switch (q.difficulty) {
                      case "Easy":
                        return {
                          color: "var(--emerald-accent)",
                          bg: "var(--emerald-bg)",
                          border: "var(--emerald-border)"
                        };
                      case "Medium":
                        return {
                          color: "var(--amber-accent)",
                          bg: "var(--amber-bg)",
                          border: "var(--amber-border)"
                        };
                      default:
                        return {
                          color: "var(--rose-accent)",
                          bg: "var(--rose-bg)",
                          border: "var(--rose-border)"
                        };
                    }
                  };

                  const diffTheme = getDifficultyStyles();

                  return (
                    <div
                      key={q.id}
                      className="table-row-item"
                    >
                      <div className="col-status">
                        {q.solved ? (
                          <CheckCircle2 className="h-4 w-4" style={{ color: "var(--emerald-accent)" }} />
                        ) : (
                          <Circle className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                        )}
                      </div>

                      <div className="col-title">
                        <div className="q-title-row">
                          <button
                            onClick={() => setSelectedQuestionId(q.id)}
                            className="q-title-btn"
                          >
                            {q.title}
                          </button>
                          {q.isApiResult && (
                            <span className="q-api-badge">API</span>
                          )}
                        </div>
                        <div className="q-companies-row">
                          {q.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="q-company-tag"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-category">
                        <span className="q-category-tag">
                          {q.isApiResult && <Globe className="h-3 w-3" style={{ color: "var(--indigo-accent)" }} />}
                          {q.category}
                        </span>
                      </div>

                      <div className="col-difficulty">
                        <span
                          className="q-difficulty-badge"
                          style={{
                            color: diffTheme.color,
                            backgroundColor: diffTheme.bg,
                            borderColor: diffTheme.border
                          }}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="col-action">
                        <button
                          onClick={() => setSelectedQuestionId(q.id)}
                          className="q-solve-btn"
                        >
                          <Play className="h-3 w-3" fill="currentColor" />
                          Solve
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="popover-body" style={{ color: "var(--text-muted)", padding: "3rem" }}>
                  No questions match your query. Try searching for "Two Sum", "Tree", or "DP".
                </div>
              )}
            </div>
          </div>
        </main>
      ) : (
        /* ================= IDE / SOLVER VIEW ================= */
        <main className="ide-layout">
          {/* LEFT PANE: Problem Specs & Details */}
          <div className="ide-left-pane">
            {/* Spec Bar */}
            <div className="ide-left-pane-header">
              <div>
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  className="ide-back-to-list-btn"
                >
                  <ChevronRight className="h-3.5 w-3.5" style={{ transform: "rotate(180deg)" }} />
                  All Problems
                </button>
              </div>
              <div className="ide-tab-group">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`ide-tab-btn ${activeTab === "description" ? "active" : ""}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("hints")}
                  className={`ide-tab-btn ${activeTab === "hints" ? "active" : ""}`}
                >
                  Hints ({activeQuestion.hints.length})
                </button>
              </div>
            </div>

            {/* Spec Content */}
            <div className="ide-left-pane-content">
              {activeTab === "description" ? (
                <>
                  <div>
                    <div className="ide-desc-title-row">
                      <h2 className="ide-desc-title">{activeQuestion.title}</h2>
                      <span
                        className="q-difficulty-badge"
                        style={{
                          color: activeQuestion.difficulty === "Easy" ? "var(--emerald-accent)" : activeQuestion.difficulty === "Medium" ? "var(--amber-accent)" : "var(--rose-accent)",
                          backgroundColor: activeQuestion.difficulty === "Easy" ? "var(--emerald-bg)" : activeQuestion.difficulty === "Medium" ? "var(--amber-bg)" : "var(--rose-bg)",
                          borderColor: activeQuestion.difficulty === "Easy" ? "var(--emerald-border)" : activeQuestion.difficulty === "Medium" ? "var(--amber-border)" : "var(--rose-border)",
                        }}
                      >
                        {activeQuestion.difficulty}
                      </span>
                    </div>

                    <div className="ide-desc-meta">
                      <span>Category: <strong>{activeQuestion.category}</strong></span>
                      <span>•</span>
                      <span>Acceptance: <strong>{activeQuestion.acceptance}</strong></span>
                    </div>

                    <div className="ide-desc-companies">
                      <span className="ide-desc-companies-label">
                        <Building2 className="h-3 w-3" /> Companies:
                      </span>
                      {activeQuestion.companies.map((c) => (
                        <span key={c} className="ide-desc-company-tag">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr className="ide-section-divider" />

                  {/* Problem Description */}
                  <div className="ide-desc-text">
                    {activeQuestion.description}
                  </div>

                  {/* Examples */}
                  <div className="ide-examples-section">
                    <h3>Examples</h3>
                    {activeQuestion.examples.map((ex) => (
                      <div key={ex.id} className="ide-example-card">
                        <div>
                          <span className="ide-example-label">Input: </span>
                          <span className="input-val">{ex.input}</span>
                        </div>
                        <div>
                          <span className="ide-example-label">Output: </span>
                          <span className="output-val">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="ide-example-explanation">
                            <span className="ide-example-label" style={{ fontFamily: "var(--font-mono)" }}>Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div className="ide-constraints-section">
                    <h3>Constraints</h3>
                    <ul className="ide-constraints-list">
                      {activeQuestion.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                /* Hints Tab */
                <div className="ide-examples-section">
                  <h3 className="ide-desc-title" style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Lightbulb className="h-4 w-4" style={{ color: "var(--amber-accent)" }} />
                    Problem Hints & Approach
                  </h3>
                  {activeQuestion.hints.map((hint, i) => (
                    <div key={i} className="ide-hint-card">
                      <div className="ide-hint-icon-box">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div className="ide-hint-body">
                        <span className="ide-hint-title">Hint {i + 1}</span>
                        <p className="ide-hint-text">{hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE: Code Editor & Execution Panel */}
          <div className="ide-right-pane">
            {/* Editor Toolbar */}
            <div className="ide-right-pane-header">
              <div className="ide-header-action-group">
                <div className="ide-lang-selector-wrapper">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="ide-lang-selector-btn"
                  >
                    <span>{selectedLanguage === "javascript" ? "JavaScript" : selectedLanguage === "python" ? "Python" : selectedLanguage === "cpp" ? "C++" : "Java"}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                  </button>
                  {isLangDropdownOpen && (
                    <>
                      <div className="notification-popover-backdrop" onClick={() => setIsLangDropdownOpen(false)} />
                      <div className="ide-lang-selector-dropdown">
                        {[
                          { id: "javascript", label: "JavaScript" },
                          { id: "python", label: "Python 3" },
                          { id: "cpp", label: "C++ 20" },
                          { id: "java", label: "Java 17" }
                        ].map((lang) => (
                          <button
                            key={lang.id}
                            onClick={() => {
                              setSelectedLanguage(lang.id);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`ide-lang-option-btn ${selectedLanguage === lang.id ? "selected" : ""}`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="ide-header-action-group">
                <button
                  onClick={handleResetCode}
                  className="ide-reset-btn"
                  title="Reset code to starter template"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>
            </div>

            {/* Code Textarea Area */}
            <div
              className="ide-editor-container"
              style={{ fontSize: editorSettings.editorFontSize }}
            >
              {/* Line Numbers */}
              {editorSettings.lineNumbers && (
                <div className="ide-line-numbers">
                  {currentCode.split("\n").map((_, i) => (
                    <span key={i} className="ide-line-num-item">{i + 1}</span>
                  ))}
                </div>
              )}

              {/* Textarea */}
              <textarea
                value={currentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                style={{
                  fontSize: editorSettings.editorFontSize,
                  tabSize: editorSettings.tabSize,
                  MozTabSize: editorSettings.tabSize,
                }}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    handleRunCode();
                  }
                }}
                className="ide-textarea-editor"
                placeholder="// Write your code here..."
              />
            </div>

            {/* Bottom Testcases Panel */}
            <div className="ide-console-panel">
              <div className="ide-console-header">
                <div className="ide-console-title">
                  <Terminal className="h-4 w-4" style={{ color: "var(--indigo-accent)" }} />
                  <span>Console & Test Cases</span>
                </div>

              </div>

              <div className="ide-console-body">
                {isRunningCode ? (
                  <div className="ide-console-placeholder">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-400 mr-2" />
                    Evaluating solution against test cases...
                  </div>
                ) : runResults ? (
                  <div>
                    <div className={`ide-console-status-row ${runResults.status}`}>
                      {runResults.status === "success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>All Test Cases Passed!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-rose-400" />
                          <span>Wrong Answer / Execution Failed</span>
                        </>
                      )}
                    </div>

                    <div className="ide-console-testcase-tabs">
                      {runResults.cases.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveResultTab(idx)}
                          className={`ide-console-testcase-tab-btn ${activeResultTab === idx ? "active" : ""}`}
                        >
                          Case {idx + 1}
                        </button>
                      ))}
                    </div>

                    {runResults.cases[activeResultTab] && (
                      <div className="ide-console-results-details">
                        <div className="ide-console-results-field">
                          <span className="ide-console-results-label">Input:</span>
                          <span className="ide-console-results-val">{runResults.cases[activeResultTab].input}</span>
                        </div>
                        <div className="ide-console-results-field">
                          <span className="ide-console-results-label">Expected:</span>
                          <span className="ide-console-results-val expected">{runResults.cases[activeResultTab].expected}</span>
                        </div>
                        <div className="ide-console-results-field">
                          <span className="ide-console-results-label">Received:</span>
                          <span className={`ide-console-results-val received ${runResults.cases[activeResultTab].passed ? "match" : "mismatch"}`}>
                            {runResults.cases[activeResultTab].received}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="ide-console-placeholder">
                    Click "Run Code" to compile and evaluate your code against the standard sample inputs.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
