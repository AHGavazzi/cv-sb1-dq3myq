import React from 'react';
import { FileText } from 'lucide-react';

interface NavbarProps {
  activeTab: 'upload' | 'results';
  onTabChange: (tab: 'upload' | 'results') => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">AI Resume Matcher</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onTabChange('upload')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'upload'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload
            </button>
            <button
              onClick={() => onTabChange('results')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'results'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Results
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}