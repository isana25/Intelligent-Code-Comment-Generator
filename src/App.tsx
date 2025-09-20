import React, { useState } from 'react';
import { FileCode, Sparkles, GitCompare, Download, Upload, Play } from 'lucide-react';
import CodeAnalyzer from './components/CodeAnalyzer';
import CommentGenerator from './components/CommentGenerator';
import ModelComparison from './components/ModelComparison';
import DatasetViewer from './components/DatasetViewer';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  const tabs = [
    { id: 'generator', label: 'Code Comment Generator', icon: Sparkles },
    { id: 'analyzer', label: 'Program Analysis', icon: FileCode },
    { id: 'comparison', label: 'Model Comparison', icon: GitCompare },
    { id: 'dataset', label: 'Dataset Explorer', icon: Upload }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <FileCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Intelligent Code Comment Generator</h1>
                <p className="text-purple-300 text-sm">AI-Powered Docstring & Comment Generation with Program Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Live Demo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-sm border-b border-purple-500/10">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10'
                      : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'generator' && <CommentGenerator />}
          {activeTab === 'analyzer' && <CodeAnalyzer />}
          {activeTab === 'comparison' && <ModelComparison />}
          {activeTab === 'dataset' && <DatasetViewer />}
        </div>
      </main>
    </div>
  );
}

export default App;