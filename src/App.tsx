import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { UploadSection } from './components/UploadSection';
import { ResultsSection } from './components/ResultsSection';
import { MatchResult } from './types';
import { analyzeResume } from './services/aiService';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState<File[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'results'>('upload');

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumes(Array.from(e.target.files));
    }
  };

  const processResumes = async () => {
    setIsProcessing(true);
    try {
      const results = await Promise.all(
        resumes.map(async (resume) => {
          const text = await resume.text();
          return await analyzeResume(text, jobDescription);
        })
      );
      setResults(results);
      setActiveTab('results');
    } catch (error) {
      console.error('Error processing resumes:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' ? (
          <UploadSection
            jobDescription={jobDescription}
            resumes={resumes}
            isProcessing={isProcessing}
            onJobDescriptionChange={handleJobDescriptionChange}
            onResumeUpload={handleResumeUpload}
            onProcess={processResumes}
          />
        ) : (
          <ResultsSection results={results} />
        )}
      </main>
    </div>
  );
}

export default App;