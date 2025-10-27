
import React, { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { MentorResponse, UserInput } from './types';
import { getMentorship } from './services/geminiService';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  const [mentorResponse, setMentorResponse] = useState<MentorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const handleGenerate = async (userInput: UserInput) => {
    setIsLoading(true);
    setError(null);
    setMentorResponse(null);
    setCurrentQuestion(userInput.question);

    try {
      const response = await getMentorship(userInput);
      setMentorResponse(response);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-text">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky top-8">
            <InputPanel onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="transition-all duration-500">
            {isLoading || error || mentorResponse ? (
               <OutputPanel 
                response={mentorResponse} 
                isLoading={isLoading} 
                error={error} 
                question={currentQuestion}
              />
            ) : (
              <Hero />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
