import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-text mt-12">
      <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Academic Mentor GPT. All rights reserved.</p>
        <p className="mt-1">
          This tool is for educational purposes only. Always consult your course materials and instructors.
        </p>
      </div>
    </footer>
  );
};