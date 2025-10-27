import React from 'react';

const HeaderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.056 0l1.255.571a1 1 0 001.056 0l4.318-1.963a1 1 0 000-1.84l-7-3zM3 9.363l3.25 1.477a1 1 0 001.056 0L10 9.24l5.694 2.588a1 1 0 001.056 0L20 9.363V13a1 1 0 01-1 1h-2v-2a1 1 0 00-1-1H4a1 1 0 00-1 1v2H1a1 1 0 01-1-1V9.363zM14 14v2h2v-2h-2z" />
        <path d="M4 14v2h2v-2H4z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
                <HeaderIcon />
                <h1 className="ml-3 text-2xl font-serif font-bold text-brand-text">
                    Academic Mentor GPT
                </h1>
            </div>
             <a 
                href="https://ai.google.dev/gemini-api/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-text-secondary hover:text-brand-text transition-colors"
            >
                Powered by Gemini API
            </a>
        </div>
      </div>
    </header>
  );
};