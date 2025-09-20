import React, { useState } from 'react';
import { BarChart3, Code, Zap, Target, TrendingUp } from 'lucide-react';

const CodeAnalyzer: React.FC = () => {
  const [analysisData] = useState({
    complexity: {
      cyclomatic: 8,
      cognitive: 12,
      maintainability: 74
    },
    metrics: {
      linesOfCode: 45,
      functions: 4,
      classes: 2,
      comments: 3
    },
    quality: {
      score: 82,
      issues: [
        { type: 'Performance', message: 'Fibonacci function has exponential time complexity', severity: 'high' },
        { type: 'Documentation', message: 'Missing docstrings for 3 functions', severity: 'medium' },
        { type: 'Style', message: 'Consider using type hints', severity: 'low' }
      ]
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Program Analysis Dashboard</h2>
        <p className="text-purple-300">Comprehensive code analysis with complexity metrics and quality insights</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-400">{analysisData.complexity.cyclomatic}</span>
          </div>
          <h3 className="font-semibold text-white mb-1">Cyclomatic Complexity</h3>
          <p className="text-blue-300 text-sm">Medium complexity level</p>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl border border-green-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500 p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-400">{analysisData.complexity.cognitive}</span>
          </div>
          <h3 className="font-semibold text-white mb-1">Cognitive Complexity</h3>
          <p className="text-green-300 text-sm">Good readability</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-purple-400">{analysisData.complexity.maintainability}</span>
          </div>
          <h3 className="font-semibold text-white mb-1">Maintainability Index</h3>
          <p className="text-purple-300 text-sm">Above average</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-xl border border-orange-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-orange-400">{analysisData.quality.score}</span>
          </div>
          <h3 className="font-semibold text-white mb-1">Quality Score</h3>
          <p className="text-orange-300 text-sm">Good quality code</p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Metrics */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Code className="h-5 w-5 text-blue-400" />
            <span>Code Metrics</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">Lines of Code</span>
              <span className="text-white font-semibold">{analysisData.metrics.linesOfCode}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">Functions</span>
              <span className="text-white font-semibold">{analysisData.metrics.functions}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">Classes</span>
              <span className="text-white font-semibold">{analysisData.metrics.classes}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">Comments</span>
              <span className="text-white font-semibold">{analysisData.metrics.comments}</span>
            </div>
          </div>
        </div>

        {/* Quality Issues */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Quality Issues</h3>
          
          <div className="space-y-3">
            {analysisData.quality.issues.map((issue, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                issue.severity === 'high' ? 'bg-red-500/10 border-red-500' :
                issue.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500' :
                'bg-blue-500/10 border-blue-500'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{issue.type}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    issue.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{issue.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complexity Visualization */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Complexity Distribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${analysisData.complexity.cyclomatic * 3.14} 251.2`} className="text-blue-500" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{analysisData.complexity.cyclomatic}</span>
              </div>
            </div>
            <p className="text-blue-400 font-medium">Cyclomatic</p>
            <p className="text-gray-400 text-sm">Decision Points</p>
          </div>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${analysisData.complexity.cognitive * 2.51} 251.2`} className="text-green-500" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{analysisData.complexity.cognitive}</span>
              </div>
            </div>
            <p className="text-green-400 font-medium">Cognitive</p>
            <p className="text-gray-400 text-sm">Mental Load</p>
          </div>

          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${analysisData.complexity.maintainability * 2.51} 251.2`} className="text-purple-500" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{analysisData.complexity.maintainability}</span>
              </div>
            </div>
            <p className="text-purple-400 font-medium">Maintainability</p>
            <p className="text-gray-400 text-sm">Index Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzer;