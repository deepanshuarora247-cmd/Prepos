export const DSA_QUESTIONS = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    companies: ["Meta", "Google", "Amazon", "Apple"],
    acceptance: "52.4%",
    solved: true,
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
      },
      {
        id: 3,
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be O(N^2).",
      "Can we use a Hash Map to store numbers we have already seen to reach O(N) time complexity?"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
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
            if (seen.count(diff)) {
                return {seen[diff], i};
            }
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
            if (seen.containsKey(diff)) {
                return new int[] { seen.get(diff), i };
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    testCases: [
      { input: "[2, 7, 11, 15], 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], 6", expected: "[1, 2]" },
      { input: "[3, 3], 6", expected: "[0, 1]" }
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
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
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
      "`s` consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Use a sliding window with two pointers left and right.",
      "Store the last seen index of each character in a hash map to jump left pointer efficiently."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    let maxLen = 0;
    let left = 0;
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
        char_map = {}
        left = max_len = 0
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
            if (dict[s[i]] > start)
                start = dict[s[i]];
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
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    testCases: [
      { input: '"abcabcbb"', expected: "3" },
      { input: '"bbbbb"', expected: "1" },
      { input: '"pwwkew"', expected: "3" }
    ]
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    companies: ["Google", "Meta", "Amazon"],
    acceptance: "54.1%",
    solved: false,
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.`,
    examples: [
      {
        id: 1,
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
      },
      {
        id: 2,
        input: "height = [1,1]",
        output: "1",
        explanation: "The max area is 1."
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    hints: [
      "Start with two pointers at the extreme ends of the array.",
      "The area is limited by the shorter line. Move the shorter line inward to potentially find a larger area."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const currentWater = Math.min(height[left], height[right]) * (right - left);
        maxWater = Math.max(maxWater, currentWater);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        res = 0
        while l < r:
            res = max(res, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return res`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int maxWater = 0;
        while (l < r) {
            maxWater = max(maxWater, min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxWater;
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1;
        int maxWater = 0;
        while (l < r) {
            maxWater = Math.max(maxWater, Math.min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxWater;
    }
}`
    },
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { input: "[1,1]", expected: "1" }
    ]
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Meta", "Google", "Uber"],
    acceptance: "42.8%",
    solved: false,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        id: 1,
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1"
      },
      {
        id: 2,
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "Amount 3 cannot be made with only coin denomination 2."
      },
      {
        id: 3,
        input: "coins = [1], amount = 0",
        output: "0",
        explanation: "0 coins needed for amount 0."
      }
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    hints: [
      "Think bottom-up DP. Let dp[i] be the minimum coins needed for amount i.",
      "dp[i] = min(dp[i], 1 + dp[i - coin]) for every coin in coins."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
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
                if i - c >= 0:
                    dp[i] = min(dp[i], 1 + dp[i - c])
        return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) {
                    dp[i] = min(dp[i], 1 + dp[i - c]);
                }
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
                if (i - c >= 0) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    testCases: [
      { input: "[1,2,5], 11", expected: "3" },
      { input: "[2], 3", expected: "-1" },
      { input: "[1], 0", expected: "0" }
    ]
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List & Heap",
    companies: ["Meta", "Google", "Amazon", "Microsoft", "ByteDance"],
    acceptance: "51.3%",
    solved: false,
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*`,
    examples: [
      {
        id: 1,
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6"
      },
      {
        id: 2,
        input: "lists = []",
        output: "[]",
        explanation: "Empty array of lists."
      }
    ],
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4"
    ],
    hints: [
      "Consider using a Min-Heap (Priority Queue) or Divide & Conquer to merge pairs of lists iteratively."
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;
    
    while (lists.length > 1) {
        const mergedLists = [];
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        lists = mergedLists;
    }
    
    return lists[0];
}

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
}`,
      python: `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists or len(lists) == 0:
            return None
        import heapq
        heap = []
        for i, l in enumerate(lists):
            if l:
                heapq.heappush(heap, (l.val, i, l))
        dummy = ListNode(0)
        curr = dummy
        while heap:
            val, i, node = heapq.heappop(heap)
            curr.next = node
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
        for (auto l : lists) {
            if (l) pq.push(l);
        }
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();
            tail->next = node;
            tail = tail->next;
            if (node->next) pq.push(node->next);
        }
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode node : lists) {
            if (node != null) pq.add(node);
        }
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            curr.next = node;
            curr = curr.next;
            if (node.next != null) pq.add(node.next);
        }
        return dummy.next;
    }
}`
    },
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
      { input: "[]", expected: "[]" }
    ]
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    companies: ["Meta", "Amazon", "Google", "Uber"],
    acceptance: "47.1%",
    solved: true,
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates that you **must** take course \`b\` first if you want to take course \`a\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      {
        id: 1,
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "To take course 1 you should have finished course 0. So it is possible."
      },
      {
        id: 2,
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible (cycle detected)."
      }
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= a, b < numCourses"
    ],
    hints: [
      "Model this problem as a Directed Graph.",
      "Check if there is a cycle in the graph using DFS or Topological Sort (Kahn's Algorithm)."
    ],
    starterCode: {
      javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    let count = 0;
    while (queue.length > 0) {
        const curr = queue.shift();
        count++;
        for (const next of adj[curr]) {
            inDegree[next]--;
            if (inDegree[next] === 0) queue.push(next);
        }
    }
    
    return count === numCourses;
}`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        for course, prereq in prerequisites:
            adj[prereq].append(course)
            in_degree[course] += 1
        queue = [i for i in range(numCourses) if in_degree[i] == 0]
        count = 0
        while queue:
            curr = queue.pop(0)
            count += 1
            for nxt in adj[curr]:
                in_degree[nxt] -= 1
                if in_degree[nxt] == 0:
                    queue.append(nxt)
        return count == numCourses`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        int count = 0;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            count++;
            for (int nxt : adj[curr]) {
                if (--inDegree[nxt] == 0) q.push(nxt);
            }
        }
        return count == numCourses;
    }
};`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.add(i);
        }
        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int nxt : adj.get(curr)) {
                if (--inDegree[nxt] == 0) q.add(nxt);
            }
        }
        return count == numCourses;
    }
}`
    },
    testCases: [
      { input: "2, [[1,0]]", expected: "true" },
      { input: "2, [[1,0],[0,1]]", expected: "false" }
    ]
  }
];
