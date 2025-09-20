import React, { useState } from 'react';
import { Database, Search, Filter, Download, Eye } from 'lucide-react';

const DatasetViewer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [filter, setFilter] = useState('all');

  const datasetExamples = [
    {
      id: 1,
      category: 'algorithms',
      complexity: 'high',
      language: 'python',
      function: `def quicksort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_index = partition(arr, low, high)
        quicksort(arr, low, pivot_index - 1)
        quicksort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      groundTruth: `def quicksort(arr, low=0, high=None):
    """
    Sort an array using the quicksort algorithm.
    
    Args:
        arr (list): The array to be sorted
        low (int): Starting index (default: 0)
        high (int): Ending index (default: len(arr)-1)
    
    Returns:
        list: The sorted array
        
    Time Complexity: O(n log n) average, O(n²) worst case
    Space Complexity: O(log n) due to recursion stack
    """`,
      generated: `def quicksort(arr, low=0, high=None):
    """
    Implements the quicksort algorithm for efficient array sorting.
    
    This function uses divide-and-conquer approach with in-place partitioning
    to sort the array. The pivot selection uses the last element strategy.
    
    Parameters:
        arr (list): List of comparable elements to sort
        low (int, optional): Starting index for sorting range. Defaults to 0.
        high (int, optional): Ending index for sorting range. Defaults to len(arr)-1.
    
    Returns:
        list: The input array sorted in ascending order
        
    Performance:
        - Best/Average Case: O(n log n)
        - Worst Case: O(n²) when pivot is always min/max
        - Space: O(log n) recursive call stack
        
    Note: Modifies the original array in-place.
    """`,
      metrics: { bleu: 0.89, rouge: 0.92, quality: 4.6 }
    },
    {
      id: 2,
      category: 'data_structures',
      complexity: 'medium',
      language: 'python',
      function: `class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []
    
    def get(self, key):
        if key in self.cache:
            self.order.remove(key)
            self.order.append(key)
            return self.cache[key]
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
        
        self.cache[key] = value
        self.order.append(key)`,
      groundTruth: `class LRUCache:
    """
    Least Recently Used (LRU) Cache implementation.
    
    Args:
        capacity (int): Maximum number of items to store
    """`,
      generated: `class LRUCache:
    """
    A Least Recently Used (LRU) cache implementation with O(1) operations.
    
    The cache automatically evicts the least recently used item when capacity
    is exceeded. Uses a combination of dictionary and list for efficient
    access and ordering.
    
    Attributes:
        capacity (int): Maximum number of key-value pairs to store
        cache (dict): Storage for key-value pairs
        order (list): Maintains access order for LRU policy
        
    Time Complexity:
        - get(): O(n) due to list operations
        - put(): O(n) due to list operations
        
    Note: This implementation can be optimized using doubly-linked list
    and hash map for O(1) operations.
    """`,
      metrics: { bleu: 0.76, rouge: 0.81, quality: 4.2 }
    },
    {
      id: 3,
      category: 'utilities',
      complexity: 'low',
      language: 'python',
      function: `def validate_email(email):
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))`,
      groundTruth: `def validate_email(email):
    """
    Validate email address format using regex.
    
    Args:
        email (str): Email address to validate
        
    Returns:
        bool: True if valid email format, False otherwise
    """`,
      generated: `def validate_email(email):
    """
    Validates an email address using regular expression pattern matching.
    
    Checks for standard email format: username@domain.extension
    Supports common characters and multiple subdomains.
    
    Args:
        email (str): The email address string to validate
        
    Returns:
        bool: True if email matches valid format, False otherwise
        
    Example:
        >>> validate_email("user@example.com")
        True
        >>> validate_email("invalid.email")
        False
        
    Note: This performs format validation only, not deliverability checking.
    """`,
      metrics: { bleu: 0.84, rouge: 0.87, quality: 4.4 }
    }
  ];

  const filteredExamples = filter === 'all' 
    ? datasetExamples 
    : datasetExamples.filter(ex => ex.complexity === filter);

  const stats = {
    total: 12847,
    algorithms: 3421,
    dataStructures: 2156,
    utilities: 4234,
    webDev: 1876,
    machineLearning: 1160
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Training Dataset Explorer</h2>
        <p className="text-purple-300">High-quality code-comment pairs for training and evaluation</p>
      </div>

      {/* Dataset Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-purple-500/20 backdrop-blur-md rounded-lg border border-purple-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.total.toLocaleString()}</div>
          <div className="text-purple-300 text-sm">Total Examples</div>
        </div>
        <div className="bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.algorithms.toLocaleString()}</div>
          <div className="text-blue-300 text-sm">Algorithms</div>
        </div>
        <div className="bg-green-500/20 backdrop-blur-md rounded-lg border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.dataStructures.toLocaleString()}</div>
          <div className="text-green-300 text-sm">Data Structures</div>
        </div>
        <div className="bg-orange-500/20 backdrop-blur-md rounded-lg border border-orange-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">{stats.utilities.toLocaleString()}</div>
          <div className="text-orange-300 text-sm">Utilities</div>
        </div>
        <div className="bg-pink-500/20 backdrop-blur-md rounded-lg border border-pink-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-pink-400">{stats.webDev.toLocaleString()}</div>
          <div className="text-pink-300 text-sm">Web Dev</div>
        </div>
        <div className="bg-cyan-500/20 backdrop-blur-md rounded-lg border border-cyan-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{stats.machineLearning.toLocaleString()}</div>
          <div className="text-cyan-300 text-sm">ML/AI</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Complexity</option>
            <option value="low">Low Complexity</option>
            <option value="medium">Medium Complexity</option>
            <option value="high">High Complexity</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Dataset</span>
          </button>
        </div>
      </div>

      {/* Example Selector */}
      <div className="flex flex-wrap gap-2">
        {filteredExamples.map((example, index) => (
          <button
            key={example.id}
            onClick={() => setSelectedExample(index)}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              selectedExample === index
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Example {index + 1} ({example.complexity})
          </button>
        ))}
      </div>

      {/* Dataset Example */}
      {filteredExamples[selectedExample] && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Code */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-400" />
                <span>Original Code</span>
              </h3>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                  {filteredExamples[selectedExample].language}
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                  {filteredExamples[selectedExample].category}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  filteredExamples[selectedExample].complexity === 'high' 
                    ? 'bg-red-500/20 text-red-400'
                    : filteredExamples[selectedExample].complexity === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {filteredExamples[selectedExample].complexity}
                </span>
              </div>
            </div>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
              <code className="text-gray-100">{filteredExamples[selectedExample].function}</code>
            </pre>
          </div>

          {/* Generated vs Ground Truth */}
          <div className="space-y-6">
            {/* Ground Truth */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-green-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Eye className="h-5 w-5 text-green-400" />
                <span>Ground Truth</span>
              </h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-100">{filteredExamples[selectedExample].groundTruth}</code>
              </pre>
            </div>

            {/* AI Generated */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Database className="h-5 w-5 text-purple-400" />
                <span>AI Generated</span>
              </h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-gray-100">{filteredExamples[selectedExample].generated}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Quality Metrics */}
      {filteredExamples[selectedExample] && (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quality Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {(filteredExamples[selectedExample].metrics.bleu * 100).toFixed(1)}%
              </div>
              <div className="text-gray-300 text-sm mb-2">BLEU-4 Score</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${filteredExamples[selectedExample].metrics.bleu * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {(filteredExamples[selectedExample].metrics.rouge * 100).toFixed(1)}%
              </div>
              <div className="text-gray-300 text-sm mb-2">ROUGE-L Score</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${filteredExamples[selectedExample].metrics.rouge * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {filteredExamples[selectedExample].metrics.quality.toFixed(1)}/5
              </div>
              <div className="text-gray-300 text-sm mb-2">Human Quality</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${(filteredExamples[selectedExample].metrics.quality / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetViewer;