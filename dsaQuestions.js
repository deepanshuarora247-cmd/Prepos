export const LOCAL_DSA_QUESTIONS = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "DSA",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    acceptance: "52.4%",
    solved: true,
    isApiResult: false,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.`,
    examples: [{ id: 1, input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }],
    constraints: ["2 <= nums.length <= 10^4"],
    hints: ["Use a Hash Map to store numbers seen so far."],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen: return [seen[target - n], i]\n            seen[n] = i\n        return []`,
      cpp: `class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { unordered_map<int, int> seen; for (int i = 0; i < nums.size(); i++) { if (seen.count(target - nums[i])) return {seen[target - nums[i]], i}; seen[nums[i]] = i; } return {}; } };`,
      java: `class Solution { public int[] twoSum(int[] nums, int target) { Map<Integer, Integer> seen = new HashMap<>(); for (int i = 0; i < nums.length; i++) { if (seen.containsKey(target - nums[i])) return new int[]{seen.get(target - nums[i]), i}; seen.put(nums[i], i); } return new int[]{}; } }`
    },
    testCases: [{ input: "[2, 7, 11, 15], 9", expected: "[0, 1]" }]
  },
  {
    id: "data-science",
    title: "Cosine Similarity of Vector Embeddings",
    difficulty: "Medium",
    category: "Data Science",
    companies: ["OpenAI", "Google", "Meta"],
    acceptance: "68.5%",
    solved: false,
    isApiResult: false,
    description: `Compute the cosine similarity between two high-dimensional feature vectors A and B:
cos(θ) = (A · B) / (||A|| * ||B||).`,
    examples: [{ id: 1, input: "A = [1, 2, 3], B = [4, 5, 6]", output: "0.9746" }],
    constraints: ["A.length == B.length"],
    hints: ["Calculate dot product and vector magnitudes."],
    starterCode: {
      javascript: `function cosineSimilarity(a, b) {\n    let dot = 0, normA = 0, normB = 0;\n    for (let i = 0; i < a.length; i++) {\n        dot += a[i] * b[i];\n        normA += a[i] * a[i];\n        normB += b[i] * b[i];\n    }\n    return dot / (Math.sqrt(normA) * Math.sqrt(normB));\n}`,
      python: `import numpy as np\ndef cosine_similarity(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))`,
      cpp: `double cosineSimilarity(vector<double>& a, vector<double>& b) { return 0.9746; }`,
      java: `public double cosineSimilarity(double[] a, double[] b) { return 0.9746; }`
    },
    testCases: [{ input: "[1,2,3], [4,5,6]", expected: "0.9746" }]
  },
  {
    id: "ai-foundation",
    title: "Self-Attention Softmax Matrix Computation",
    difficulty: "Hard",
    category: "AI & Foundation",
    companies: ["OpenAI", "Anthropic", "Google DeepMind"],
    acceptance: "44.2%",
    solved: false,
    isApiResult: false,
    description: `Given Query Q, Key K, and Value V matrices, compute scaled dot-product attention:
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V.`,
    examples: [{ id: 1, input: "d_k = 64, Q=[1, 0], K=[1, 0], V=[0.5, 0.8]", output: "[0.5, 0.8]" }],
    constraints: ["Matrix dimensions must align."],
    hints: ["Scale by sqrt(d_k) before taking row-wise softmax."],
    starterCode: {
      javascript: `function scaledDotProductAttention(q, k, v, dk) {\n    // Attention computation\n    return v;\n}`,
      python: `import torch\ndef attention(q, k, v, dk):\n    scores = torch.matmul(q, k.transpose(-2, -1)) / (dk ** 0.5)\n    attn = torch.softmax(scores, dim=-1)\n    return torch.matmul(attn, v)`,
      cpp: `void attention() {}`,
      java: `public void attention() {}`
    },
    testCases: [{ input: "q, k, v, 64", expected: "[0.5, 0.8]" }]
  },
  {
    id: "devops",
    title: "Kubernetes Pod Health & Restart Log Parser",
    difficulty: "Medium",
    category: "DevOps",
    companies: ["Amazon AWS", "Datadog", "HashiCorp"],
    acceptance: "61.3%",
    solved: false,
    isApiResult: false,
    description: `Parse a stream of JSON logs from Kubernetes pods and identify pods exceeding 3 CrashLoopBackOff restarts in 5 minutes.`,
    examples: [{ id: 1, input: 'logs = [{"pod": "api-1", "status": "CrashLoopBackOff"}]', output: '["api-1"]' }],
    constraints: ["1 <= logs.length <= 10^5"],
    hints: ["Maintain a sliding window of log timestamps per pod ID."],
    starterCode: {
      javascript: `function parseFailingPods(logs) {\n    return ["api-1"];\n}`,
      python: `def parse_failing_pods(logs):\n    return ["api-1"]`,
      cpp: `vector<string> parseFailingPods() { return {"api-1"}; }`,
      java: `public String[] parseFailingPods() { return new String[]{"api-1"}; }`
    },
    testCases: [{ input: "logs", expected: '["api-1"]' }]
  },
  {
    id: "operating-systems",
    title: "LRU Cache Page Replacement Simulator",
    difficulty: "Medium",
    category: "Operating Systems",
    companies: ["Apple", "Microsoft", "Intel"],
    acceptance: "48.9%",
    solved: true,
    isApiResult: false,
    description: `Design a Least Recently Used (LRU) Cache data structure with O(1) get and put operations using a Hash Map and Doubly Linked List.`,
    examples: [{ id: 1, input: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2);', output: 'get(2) returns -1 (evicted)' }],
    constraints: ["Capacity 1 <= capacity <= 3000"],
    hints: ["Use Hash Map storing pointers to Doubly Linked List nodes."],
    starterCode: {
      javascript: `class LRUCache {\n  constructor(capacity) {\n    this.cap = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    else if (this.map.size >= this.cap) this.map.delete(this.map.keys().next().value);\n    this.map.set(key, value);\n  }\n}`,
      python: `from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cache = OrderedDict()\n        self.cap = capacity\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap: self.cache.popitem(last=False)`,
      cpp: `class LRUCache { public: LRUCache(int capacity) {} int get(int key) { return -1; } void put(int key, int value) {} };`,
      java: `class LRUCache { public LRUCache(int capacity) {} public int get(int key) { return -1; } public void put(int key, int value) {} }`
    },
    testCases: [{ input: "capacity = 2", expected: "-1" }]
  },
  {
    id: "databases",
    title: "N-th Highest Salary SQL Query",
    difficulty: "Medium",
    category: "Databases",
    companies: ["Oracle", "Snowflake", "MongoDB", "Amazon"],
    acceptance: "42.1%",
    solved: false,
    isApiResult: false,
    description: `Write a SQL query / function to find the N-th highest salary from an Employee table. Return NULL if N is greater than total distinct salaries.`,
    examples: [{ id: 1, input: 'Employee = [{id: 1, salary: 100}, {id: 2, salary: 200}], N = 2', output: '100' }],
    constraints: ["1 <= N <= 100"],
    hints: ["Use DENSE_RANK() OVER (ORDER BY salary DESC) or LIMIT 1 OFFSET N-1."],
    starterCode: {
      javascript: `function getNthHighestSalary(employees, n) {\n    const sorted = [...new Set(employees.map(e => e.salary))].sort((a,b) => b-a);\n    return sorted[n - 1] ?? null;\n}`,
      python: `def get_nth_highest_salary(df, n):\n    salaries = df['salary'].drop_duplicates().sort_values(ascending=False)\n    return salaries.iloc[n-1] if len(salaries) >= n else None`,
      cpp: `// SQL: SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET N-1;`,
      java: `// SQL query`
    },
    testCases: [{ input: "N = 2", expected: "100" }]
  }
];

export const DSA_QUESTIONS = LOCAL_DSA_QUESTIONS;

export async function searchDsaQuestionsApi(query) {
  if (!query || query.trim() === "") return LOCAL_DSA_QUESTIONS;
  const cleanQuery = query.trim().toLowerCase();
  return LOCAL_DSA_QUESTIONS.filter(q =>
    q.title.toLowerCase().includes(cleanQuery) ||
    q.category.toLowerCase().includes(cleanQuery) ||
    q.companies.some(c => c.toLowerCase().includes(cleanQuery))
  );
}
