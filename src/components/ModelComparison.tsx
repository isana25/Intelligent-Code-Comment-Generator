import React, { useState } from 'react';
import { GitCompare, Trophy, Zap, Target, Clock } from 'lucide-react';

const ModelComparison: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const models = [
    {
      name: 'Our Model (GPT-4 + Analysis)',
      accuracy: 94.2,
      speed: 1.8,
      coverage: 96.7,
      quality: 92.1,
      color: 'purple'
    },
    {
      name: 'CodeT5',
      accuracy: 87.3,
      speed: 2.1,
      coverage: 84.2,
      quality: 83.6,
      color: 'blue'
    },
    {
      name: 'CodeBERT',
      accuracy: 82.1,
      speed: 1.4,
      coverage: 78.9,
      quality: 79.3,
      color: 'green'
    },
    {
      name: 'GraphCodeBERT',
      accuracy: 89.7,
      speed: 2.8,
      coverage: 88.1,
      quality: 85.4,
      color: 'orange'
    }
  ];

  const metrics = [
    { key: 'accuracy', label: 'Accuracy (%)', icon: Target },
    { key: 'speed', label: 'Generation Speed (s)', icon: Clock, invert: true },
    { key: 'coverage', label: 'Code Coverage (%)', icon: GitCompare },
    { key: 'quality', label: 'Comment Quality (%)', icon: Trophy }
  ];

  const getBarWidth = (value: number, metric: string) => {
    const maxValue = Math.max(...models.map(m => m[metric as keyof typeof m] as number));
    return (value / maxValue) * 100;
  };

  const getColorClass = (color: string) => {
    const colors = {
      purple: 'bg-purple-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Model Performance Comparison</h2>
        <p className="text-purple-300">Comprehensive evaluation against state-of-the-art code comment generation models</p>
      </div>

      {/* Metric Selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {metrics.map(metric => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                selectedMetric === metric.key
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{metric.label}</span>
            </button>
          );
        })}
      </div>

      {/* Comparison Chart */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
        <div className="space-y-6">
          {models.map((model, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${getColorClass(model.color)}`}></div>
                  <span className="text-white font-medium">{model.name}</span>
                  {index === 0 && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                      Best Performance
                    </span>
                  )}
                </div>
                <span className="text-white font-bold">
                  {model[selectedMetric as keyof typeof model]}
                  {selectedMetric === 'speed' ? 's' : '%'}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getColorClass(model.color)}`}
                  style={{ width: `${getBarWidth(model[selectedMetric as keyof typeof model] as number, selectedMetric)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(metric => {
          const Icon = metric.icon;
          const bestModel = models.reduce((best, current) => {
            const bestValue = best[metric.key as keyof typeof best] as number;
            const currentValue = current[metric.key as keyof typeof current] as number;
            return (metric.invert ? currentValue < bestValue : currentValue > bestValue) ? current : best;
          });
          
          return (
            <div key={metric.key} className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">{metric.label}</h3>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {bestModel[metric.key as keyof typeof bestModel]}
                    {metric.key === 'speed' ? 's' : '%'}
                  </div>
                  <div className="text-sm text-gray-400">Best Score</div>
                </div>
                <div className="text-center text-sm text-gray-300">
                  <span className={`font-medium ${getColorClass(bestModel.color).replace('bg-', 'text-')}`}>
                    {bestModel.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evaluation Details */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Evaluation Methodology</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-purple-400 mb-3">Dataset</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• 10,000+ Python functions from GitHub repositories</li>
              <li>• 5,000+ manually annotated high-quality docstrings</li>
              <li>• Diverse domains: web dev, ML, algorithms, data processing</li>
              <li>• Complexity range: simple utilities to complex algorithms</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-purple-400 mb-3">Evaluation Metrics</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Accuracy:</strong> BLEU-4 score against reference comments</li>
              <li>• <strong>Speed:</strong> Average generation time per function</li>
              <li>• <strong>Coverage:</strong> Percentage of code elements documented</li>
              <li>• <strong>Quality:</strong> Human evaluation of comment usefulness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;