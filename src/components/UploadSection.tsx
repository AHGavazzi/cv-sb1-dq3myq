import React, { useRef } from 'react';
import { Upload, Briefcase } from 'lucide-react';

interface UploadSectionProps {
  jobDescription: string;
  resumes: File[];
  isProcessing: boolean;
  onJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProcess: () => void;
}

export function UploadSection({
  jobDescription,
  resumes,
  isProcessing,
  onJobDescriptionChange,
  onResumeUpload,
  onProcess
}: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    if (files.length && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach(file => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
      onResumeUpload({ target: { files: dataTransfer.files } } as any);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
          Job Description
        </h2>
        <textarea
          value={jobDescription}
          onChange={onJobDescriptionChange}
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paste your job description here..."
        />
      </div>

      <div
        className="bg-white rounded-lg shadow-sm p-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Upload className="h-5 w-5 mr-2 text-indigo-600" />
          Upload Resumes
        </h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onResumeUpload}
            multiple
            accept=".pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-primary"
          >
            Select Files
          </button>
          <p className="mt-2 text-sm text-gray-500">or drag and drop PDF files here</p>
          {resumes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">{resumes.length} files selected</p>
              <ul className="mt-2 divide-y divide-gray-200">
                {resumes.map((file, index) => (
                  <li key={index} className="py-2 text-sm text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onProcess}
          disabled={!jobDescription || resumes.length === 0 || isProcessing}
          className="btn btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Process Resumes'}
        </button>
      </div>
    </div>
  );
}