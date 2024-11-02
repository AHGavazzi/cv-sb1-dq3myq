import React from 'react';
import { BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import { MatchResult } from '../types';

interface ResultsSectionProps {
  results: MatchResult[];
}

export function ResultsSection({ results }: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
          Results
        </h2>
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{result.emoji}</span>
                    <span className="font-medium text-gray-900">{result.filename}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.score >= 80
                          ? 'bg-green-100 text-green-800'
                          : result.score >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.score}%
                    </span>
                    <span className="text-sm text-gray-500">{result.label}</span>
                  </div>
                </div>

                {/* AI Role Analysis */}
                <div className="mt-4 space-y-4">
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="text-sm font-medium text-gray-700">Interviewer Analysis:</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Recommended interview questions based on CV analysis
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="text-sm font-medium text-gray-700">Career Counselor Insights:</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Career path recommendations and skill development suggestions
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-sm font-medium text-gray-700">Recruiter Perspective:</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      CV improvement suggestions and potential role matches
                    </p>
                  </div>
                </div>

                {result.matchReasons.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Match Reasons:</h4>
                    <ul className="mt-1 space-y-1">
                      {result.matchReasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Object.entries(result.redFlags).some(([_, flags]) => flags.length > 0) && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Areas for Improvement:</h4>
                    {Object.entries(result.redFlags).map(([emoji, flags]) =>
                      flags.length > 0 ? (
                        <div key={emoji} className="flex items-center mt-1">
                          <span className="mr-2">{emoji}</span>
                          <span className="text-sm text-red-600">{flags.join(', ')}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                )}

                {result.website && (
                  <div className="mt-4">
                    <a
                      href={result.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      View Portfolio →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto" />
            <p className="mt-2 text-sm text-gray-500">No results available</p>
          </div>
        )}
      </div>
    </div>
  );
}