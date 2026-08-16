export const LOCAL_DSA_QUESTIONS = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    acceptance: "52.4%",
    solved: true,
    isApiResult: false,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        id: 1,
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        id: 2,
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers O(N^2).",
      "Use a Hash Map to store numbers we have already seen to reach O(N) time complexity."
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i
        return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (seen.count(diff)) return {seen[diff], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (seen.containsKey(diff)) return new int[] { seen.get(diff), i };
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    testCases: [
      { input: "[2, 7, 11, 15], 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], 6", expected: "[1, 2]" }
    ]
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    companies: ["Meta", "Amazon", "Google", "Microsoft"],
    acceptance: "34.2%",
    solved: false,
    isApiResult: false,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      {
        id: 1,
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    hints: ["Use a sliding window with two pointers left and right."],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
    let maxLen = 0, left = 0;
    const charMap = new Map();
    for (let right = 0; right < s.length; right++) {
        if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
            left = charMap.get(s[right]) + 1;
        }
        charMap.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map, left, max_len = {}, 0, 0
        for right, char in enumerate(s):
            if char in char_map and char_map[char] >= left:
                left = char_map[char] + 1
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> dict(256, -1);
        int maxLen = 0, start = -1;
        for (int i = 0; i < s.length(); i++) {
            if (dict[s[i]] > start) start = dict[s[i]];
            dict[s[i]] = i;
            maxLen = max(maxLen, i - start);
        }
        return maxLen;
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) left = map.get(c) + 1;
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    testCases: [{ input: '"abcabcbb"', expected: "3" }]
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    companies: ["Google", "Meta", "Amazon"],
    acceptance: "54.1%",
    solved: false,
    isApiResult: false,
    description: `Given \`n\` vertical lines, find two lines that together with x-axis form a container storing the most water.`,
    examples: [{ id: 1, input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }],
    constraints: ["2 <= n <= 10^5"],
    hints: ["Start with two pointers at the ends of the array."],
    starterCode: {
      javascript: `function maxArea(height) {
    let left = 0, right = height.length - 1, maxWater = 0;
    while (left < right) {
        maxWater = Math.max(maxWater, Math.min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r, res = 0, len(height) - 1, 0
        while l < r:
            res = max(res, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]: l += 1
            else: r -= 1
        return res`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1, maxW = 0;
        while (l < r) {
            maxW = max(maxW, min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++; else r--;
        }
        return maxW;
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1, maxW = 0;
        while (l < r) {
            maxW = Math.max(maxW, Math.min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++; else r--;
        }
        return maxW;
    }
}`
    },
    testCases: [{ input: "[1,8,6,2,5,4,8,3,7]", expected: "49" }]
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Meta", "Google"],
    acceptance: "42.8%",
    solved: false,
    isApiResult: false,
    description: `Return the fewest number of coins needed to make up the given amount.`,
    examples: [{ id: 1, input: "coins = [1,2,5], amount = 11", output: "3" }],
    constraints: ["0 <= amount <= 10^4"],
    hints: ["Use Bottom-up DP: dp[i] = min(dp[i], 1 + dp[i - coin])"],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0: dp[i] = min(dp[i], 1 + dp[i - c])
        return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = min(dp[i], 1 + dp[i - c]);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    testCases: [{ input: "[1,2,5], 11", expected: "3" }]
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List & Heap",
    companies: ["Meta", "Google", "Amazon"],
    acceptance: "51.3%",
    solved: false,
    isApiResult: false,
    description: `Merge k sorted linked-lists into one sorted linked-list and return it.`,
    examples: [{ id: 1, input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }],
    constraints: ["0 <= k <= 10^4"],
    hints: ["Use a Min-Heap / Priority Queue or Divide & Conquer."],
    starterCode: {
      javascript: `function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;
    return lists[0];
}`,
      python: `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        pass`,
      cpp: `class Solution { public: ListNode* mergeKLists(vector<ListNode*>& lists) { return nullptr; } };`,
      java: `class Solution { public ListNode mergeKLists(ListNode[] lists) { return null; } }`
    },
    testCases: [{ input: "[[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" }]
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    companies: ["Meta", "Amazon", "Google"],
    acceptance: "47.1%",
    solved: true,
    isApiResult: false,
    description: `Return true if you can finish all courses given prerequisite dependencies.`,
    examples: [{ id: 1, input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" }],
    constraints: ["1 <= numCourses <= 2000"],
    hints: ["Detect cycle in directed graph using Topological Sort / Kahn's algorithm."],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) { return true; }`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        return True`,
      cpp: `class Solution { public: bool canFinish(int numCourses, vector<vector<int>>& prerequisites) { return true; } };`,
      java: `class Solution { public boolean canFinish(int numCourses, int[][] prerequisites) { return true; } }`
    },
    testCases: [{ input: "2, [[1,0]]", expected: "true" }]
  }
];

export const DSA_QUESTIONS = LOCAL_DSA_QUESTIONS;

/**
 * Fetch DSA Questions dynamically from public API on search query
 */
export async function searchDsaQuestionsApi(query) {
  if (!query || query.trim() === "") {
    return LOCAL_DSA_QUESTIONS;
  }

  const cleanQuery = query.trim().toLowerCase();

  try {
    // Call public LeetCode API endpoint
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/problems?limit=30`);
    if (!response.ok) throw new Error("API response error");

    const data = await response.json();
    const problemList = data.problemsetQuestionList || data.questions || [];

    if (problemList.length === 0) throw new Error("Empty problem list");

    // Filter by title or topic slug
    const matchingProblems = problemList.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(cleanQuery);
      const slugMatch = item.titleSlug?.toLowerCase().includes(cleanQuery);
      const categoryMatch = item.topicTags?.some((t) => t.name?.toLowerCase().includes(cleanQuery));
      return titleMatch || slugMatch || categoryMatch;
    });

    if (matchingProblems.length === 0) {
      // Fallback filter over local dataset
      return LOCAL_DSA_QUESTIONS.filter(q =>
        q.title.toLowerCase().includes(cleanQuery) ||
        q.category.toLowerCase().includes(cleanQuery) ||
        q.companies.some(c => c.toLowerCase().includes(cleanQuery))
      );
    }

    // Map API items into standard schema
    const formattedApiQuestions = matchingProblems.slice(0, 10).map((item) => {
      const slug = item.titleSlug || item.title.toLowerCase().replace(/\s+/g, "-");
      const categoryName = item.topicTags && item.topicTags.length > 0 ? item.topicTags[0].name : "Algorithms";
      const companiesList = ["Meta", "Google", "Amazon", "Uber", "Apple", "Microsoft"].slice(0, Math.floor(Math.random() * 3) + 1);
      const camelCaseName = item.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, "");

      return {
        id: slug,
        title: item.title,
        difficulty: item.difficulty || "Medium",
        category: categoryName,
        companies: companiesList,
        acceptance: `${(item.acRate || Math.random() * 40 + 35).toFixed(1)}%`,
        solved: false,
        isApiResult: true,
        description: `Given the constraints of **${item.title}**, solve the problem efficiently using optimal time and space complexity.
        
This question was dynamically retrieved via live **LeetCode API** query.`,
        examples: [
          {
            id: 1,
            input: `Example input for ${item.title}`,
            output: "Expected output",
            explanation: `Standard test scenario for ${item.title}.`
          }
        ],
        constraints: [
          "1 <= N <= 10^5",
          "Optimal Time Complexity: O(N) or O(N log N)",
          "Space Complexity: O(1) or O(N)"
        ],
        hints: [
          `Analyze key data structures relevant to ${categoryName}.`,
          "Think about boundary conditions and edge cases."
        ],
        starterCode: {
          javascript: `/**\n * Dynamic API Problem: ${item.title}\n */\nfunction ${camelCaseName || "solve"}(input) {\n    // Write your solution here\n    return input;\n}`,
          python: `class Solution:\n    def ${camelCaseName || "solve"}(self, input):\n        # Write your solution here\n        pass`,
          cpp: `class Solution {\npublic:\n    void ${camelCaseName || "solve"}() {\n        // Write your solution here\n    }\n};`,
          java: `class Solution {\n    public void ${camelCaseName || "solve"}() {\n        // Write your solution here\n    }\n}`
        },
        testCases: [
          { input: "Sample Input 1", expected: "Sample Output 1" },
          { input: "Sample Input 2", expected: "Sample Output 2" }
        ]
      };
    });

    return formattedApiQuestions;
  } catch (err) {
    console.warn("LeetCode API search fallback to local search:", err);
    // Offline / fallback filter over local dataset
    return LOCAL_DSA_QUESTIONS.filter(q =>
      q.title.toLowerCase().includes(cleanQuery) ||
      q.category.toLowerCase().includes(cleanQuery) ||
      q.companies.some(c => c.toLowerCase().includes(cleanQuery))
    );
  }
}
