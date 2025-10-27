import React, { useState } from 'react';
import type { MentorResponse } from '../types';
import { AccordionSection } from './AccordionSection';

interface OutputPanelProps {
  response: MentorResponse | null;
  isLoading: boolean;
  error: string | null;
  question: string;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded-md w-1/2 mt-6"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
        </div>
         <div className="h-8 bg-gray-200 rounded-md w-1/2 mt-6"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/6"></div>
        </div>
    </div>
);

const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.259-1.035a3.375 3.375 0 00-2.456-2.456L13.75 16.5l-1.035.259a3.375 3.375 0 00-2.456 2.456L9.22 20.25l.259 1.035a3.375 3.375 0 002.456 2.456L13 24l1.035-.259a3.375 3.375 0 002.456-2.456l.259-1.035z" /></svg>;
const PlanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m-2-1.5V6.375c0-.621.504-1.125 1.125-1.125h4.25c.621 0 1.125.504 1.125 1.125v9.375m-10.5-9.375h10.5" /></svg>;
const ModelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
const FeedbackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
// Fix: Modified ChecklistIcon to accept a `className` prop to allow for flexible styling.
const ChecklistIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

export const OutputPanel: React.FC<OutputPanelProps> = ({ response, isLoading, error, question }) => {
  const [openSections, setOpenSections] = useState<string[]>(['breakdown']);
  const [isCopied, setIsCopied] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };
  
  const handleCopy = () => {
    if (response?.modelAnswer) {
        navigator.clipboard.writeText(response.modelAnswer);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };


  if (isLoading) {
    return (
      <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-serif font-semibold text-brand-text mb-4">Your mentorship is being prepared...</h3>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">An Error Occurred</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  if (!response) {
    return null;
  }
  
  const { questionBreakdown, answerPlan, modelAnswer, constructiveFeedback, selfEvaluationChecklist } = response;

  return (
    <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
        <h2 className="text-2xl font-serif font-bold text-brand-text pb-2 border-b border-gray-200">Your Personalised Mentorship</h2>
        <p className="text-md text-brand-text-secondary italic">For question: "{question}"</p>
      
        <AccordionSection title="Question Breakdown" icon={<LightbulbIcon />} id="breakdown" isOpen={openSections.includes('breakdown')} onToggle={toggleSection}>
           <div className="space-y-3 text-brand-text-secondary">
              <p><strong>Command Verb:</strong> <span className="font-semibold text-brand-text">{questionBreakdown.commandVerb}</span></p>
              <p><strong>In Simple Terms:</strong> {questionBreakdown.rephrasedQuestion}</p>
              <p><strong>What's Required:</strong> {questionBreakdown.answerRequirement}</p>
           </div>
        </AccordionSection>

        <AccordionSection title="Answer Plan & Structure" icon={<PlanIcon />} id="plan" isOpen={openSections.includes('plan')} onToggle={toggleSection}>
            <div className="space-y-4 text-brand-text-secondary">
                <div>
                    <h4 className="font-semibold text-brand-text">Introduction:</h4>
                    <p>{answerPlan.introduction}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-brand-text">Body Paragraphs:</h4>
                    <ul className="list-disc list-inside space-y-1 mt-1 pl-2">
                        {answerPlan.bodyPoints.map((point, index) => <li key={index}>{point}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-brand-text">Conclusion:</h4>
                    <p>{answerPlan.conclusion}</p>
                </div>
            </div>
        </AccordionSection>

        {constructiveFeedback && (
          <AccordionSection title="Constructive Feedback on Your Draft" icon={<FeedbackIcon />} id="feedback" isOpen={openSections.includes('feedback')} onToggle={toggleSection}>
              <div className="prose prose-sm max-w-none text-brand-text-secondary whitespace-pre-wrap">
                  {constructiveFeedback}
              </div>
          </AccordionSection>
        )}

        <AccordionSection title="Top-Student Model Answer" icon={<ModelIcon />} id="model" isOpen={openSections.includes('model')} onToggle={toggleSection}>
            <div className="space-y-4">
                <div className="flex justify-end">
                    <button onClick={handleCopy} className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${isCopied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                         {isCopied ? <CheckIcon /> : <ClipboardIcon />}
                         <span className="ml-2">{isCopied ? 'Copied!' : 'Copy Answer'}</span>
                    </button>
                </div>
                 <div className="prose prose-sm max-w-none text-brand-text-secondary whitespace-pre-wrap font-serif border-t border-gray-200 pt-4">
                      {modelAnswer}
                 </div>
            </div>
        </AccordionSection>

        <AccordionSection title="Self-Evaluation Checklist" icon={<ChecklistIcon />} id="checklist" isOpen={openSections.includes('checklist')} onToggle={toggleSection}>
            <ul className="space-y-2">
                {selfEvaluationChecklist.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <ChecklistIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-brand-text-secondary">{item.point}</span>
                    </li>
                ))}
            </ul>
        </AccordionSection>
    </div>
  );
};