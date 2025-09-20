import React, { useState } from 'react';
import { Play, Copy, Download, Sparkles, Code, FileText } from 'lucide-react';

const CommentGenerator: React.FC = () => {
  const [inputCode, setInputCode] = useState(`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        if not self.root:
            self.root = TreeNode(val)
        else:
            self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        if val < node.val:
            if node.left:
                self._insert_recursive(node.left, val)
            else:
                node.left = TreeNode(val)
        else:
            if node.right:
                self._insert_recursive(node.right, val)
            else:
                node.right = TreeNode(val)`);

  const [generatedComments, setGeneratedComments] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const generateComments = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis = {
      functions: ['fibonacci', 'insert', '_insert_recursive'],
      classes: ['BinarySearchTree'],
      complexity: 'O(n) for fibonacci, O(log n) for BST operations',
      patterns: ['Recursion', 'Tree Data Structure', 'Dynamic Programming opportunity']
    };
    
    const mockComments = `def fibonacci(n):
    """
    Calculate the nth Fibonacci number using recursive approach.
    
    Args:
        n (int): The position in the Fibonacci sequence (non-negative integer)
        
    Returns:
        int: The nth Fibonacci number
        
    Time Complexity: O(2^n) - exponential due to repeated calculations
    Space Complexity: O(n) - recursion stack depth
    
    Note: This implementation is inefficient for large n values.
    Consider using dynamic programming or iterative approach for better performance.
    """
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

class BinarySearchTree:
    """
    A Binary Search Tree implementation with basic insertion operations.
    
    Maintains the BST property: left child < parent < right child
    Provides O(log n) average case performance for insertions.
    """
    
    def __init__(self):
        """Initialize an empty binary search tree."""
        self.root = None
    
    def insert(self, val):
        """
        Insert a value into the binary search tree.
        
        Args:
            val: The value to insert (must be comparable)
            
        Time Complexity: O(log n) average, O(n) worst case
        Space Complexity: O(log n) average recursion depth
        """
        if not self.root:
            self.root = TreeNode(val)
        else:
            self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        """
        Private helper method for recursive insertion.
        
        Args:
            node (TreeNode): Current node in traversal
            val: Value to insert
            
        Maintains BST invariant during insertion process.
        """
        if val < node.val:
            if node.left:
                self._insert_recursive(node.left, val)
            else:
                node.left = TreeNode(val)
        else:
            if node.right:
                self._insert_recursive(node.right, val)
            else:
                node.right = TreeNode(val)`;
    
    setAnalysisResults(mockAnalysis);
    setGeneratedComments(mockComments);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">AI-Powered Comment Generation</h2>
        <p className="text-purple-300">Generate comprehensive docstrings and comments using advanced program analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Input Code</h3>
            </div>
            <button
              onClick={generateComments}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Comments</span>
                </>
              )}
            </button>
          </div>
          
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-96 bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Generated Comments</h3>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                <Copy className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="h-96 bg-gray-900 rounded-lg border border-gray-700 overflow-auto">
            {generatedComments ? (
              <pre className="text-gray-100 font-mono text-sm p-4 whitespace-pre-wrap">
                {generatedComments}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Generated comments will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-400" />
            <span>Program Analysis Results</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-2">Functions Detected</h4>
              <div className="space-y-1">
                {analysisResults.functions.map((func: string, index: number) => (
                  <div key={index} className="text-sm text-gray-300 font-mono bg-gray-800 px-2 py-1 rounded">
                    {func}()
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-500/10 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">Classes Detected</h4>
              <div className="space-y-1">
                {analysisResults.classes.map((cls: string, index: number) => (
                  <div key={index} className="text-sm text-gray-300 font-mono bg-gray-800 px-2 py-1 rounded">
                    {cls}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-purple-500/10 rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">Complexity Analysis</h4>
              <p className="text-sm text-gray-300">{analysisResults.complexity}</p>
            </div>
            
            <div className="bg-orange-500/10 rounded-lg p-4">
              <h4 className="font-medium text-orange-400 mb-2">Patterns Identified</h4>
              <div className="space-y-1">
                {analysisResults.patterns.map((pattern: string, index: number) => (
                  <div key={index} className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                    {pattern}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentGenerator;