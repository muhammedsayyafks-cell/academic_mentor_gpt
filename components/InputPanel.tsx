import React, { useState } from 'react';
import type { UserInput } from '../types';
import { Discipline, WordCount } from '../types';

interface InputPanelProps {
  onGenerate: (userInput: UserInput) => void;
  isLoading: boolean;
}

const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 012.82 5.182A11.95 11.95 0 0012 14.5a11.95 11.95 0 00-9.8 2.26A12.083 12.083 0 015.84 10.578L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-8a9 9 0 0118 0v8M3 21h18" />
    </svg>
);


export const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading }) => {
  const [question, setQuestion] = useState('');
  const [discipline, setDiscipline] = useState<string>(Discipline.GENERAL);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [wordCount, setWordCount] = useState<string>(WordCount.STANDARD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onGenerate({ question, discipline, studentAnswer, wordCount });
  };

  return (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <GraduationCapIcon />
        <h2 className="text-2xl font-serif font-bold text-brand-text">Your Academic Question</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-brand-text-secondary mb-1">Question</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., 'Discuss the impact of globalization on developing economies.'"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="discipline" className="block text-sm font-medium text-brand-text-secondary mb-1">Discipline</label>
          <select
            id="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out bg-white"
          >
            {Object.values(Discipline).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wordCount" className="block text-sm font-medium text-brand-text-secondary mb-1">Answer Length</label>
          <select
            id="wordCount"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out bg-white"
          >
            {Object.values(WordCount).map((wc) => (
              <option key={wc} value={wc}>{wc}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="studentAnswer" className="block text-sm font-medium text-brand-text-secondary mb-1">Your Draft Answer (Optional)</label>
          <textarea
            id="studentAnswer"
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Paste your draft here for constructive feedback..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
            rows={6}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="w-full flex items-center justify-center bg-brand-text hover:bg-brand-primary text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mentoring...
              </>
            ) : (
              'Get Mentorship'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
