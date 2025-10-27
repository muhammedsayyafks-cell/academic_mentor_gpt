import React, { ReactNode } from 'react';

interface AccordionSectionProps {
  title: string;
  icon: ReactNode;
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ title, icon, id, isOpen, onToggle, children }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            <span className="text-brand-secondary">{icon}</span>
            <span className="ml-3 font-semibold text-brand-text text-left">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4 border-t border-gray-200 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};