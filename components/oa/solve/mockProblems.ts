export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTags: string[];
  topicTags: string[];
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  testCases: TestCase[];
}

export const MOCK_PROBLEMS: Record<string, Problem> = {
  'maximum-subarray': {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    companyTags: ['Amazon', 'Microsoft', 'Meta'],
    topicTags: ['Arrays', 'Dynamic Programming', 'Divide and Conquer'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    constraints: [
      '`1 <= nums.length <= 10^5`',
      '`-10^4 <= nums[i] <= 10^4`'
    ],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'The subarray [1] has the largest sum 1.',
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23',
        explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.',
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // Write your code here
};`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your code here
        pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
    }
};`
    },
    testCases: [
      { id: '1', input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { id: '2', input: '[1]', expectedOutput: '1' },
      { id: '3', input: '[5,4,-1,7,8]', expectedOutput: '23' },
      { id: '4', input: '[-1]', expectedOutput: '-1', isHidden: true },
    ]
  },
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    companyTags: ['Amazon', 'Google', 'Apple'],
    topicTags: ['Arrays', 'Hash Table'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.
You can return the answer in any order.`,
    constraints: [
      '`2 <= nums.length <= 10^4`',
      '`-10^9 <= nums[i] <= 10^9`',
      '`-10^9 <= target <= 10^9`',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`
    },
    testCases: [
      { id: '1', input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { id: '2', input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { id: '3', input: '[3,3]\n6', expectedOutput: '[0,1]' },
    ]
  },
  'number-of-islands': {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    topicTags: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    constraints: [
      '`m == grid.length`',
      '`n == grid[i].length`',
      '`1 <= m, n <= 300`',
      '`grid[i][j]` is \`\'0\'\` or \`\'1\'\`.'
    ],
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: '1'
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: '3'
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    
};`,
      python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        pass`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        
    }
}`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        
    }
};`
    },
    testCases: [
      { id: '1', input: `[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`, expectedOutput: '1' },
      { id: '2', input: `[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`, expectedOutput: '3' }
    ]
  }
};
