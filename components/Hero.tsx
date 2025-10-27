import React, { ReactNode } from 'react';

const DecodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const StructureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>;
const ToneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;

const FeatureCard: React.FC<{ icon: ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-primary text-white shadow-md">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
      <p className="mt-1 text-brand-text-secondary">{description}</p>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  return (
    <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-brand-text">Unlock Your Academic Potential</h2>
        <p className="mt-4 text-lg text-brand-text-secondary">
          Receive expert guidance on how to think, structure, and write exceptional academic answers.
        </p>
      </div>
      <div className="mt-12 space-y-10">
        <FeatureCard 
            icon={<DecodeIcon />}
            title="Decode Questions" 
            description="Understand the core requirements of any academic question by breaking down command verbs and key concepts." 
        />
        <FeatureCard 
            icon={<StructureIcon />}
            title="Master Structure" 
            description="Learn to build perfectly structured answers with clear introductions, logical arguments, and impactful conclusions." 
        />
        <FeatureCard 
            icon={<ToneIcon />}
            title="Refine Your Tone" 
            description="Develop a confident, formal, and authentic academic writing voice that impresses examiners." 
        />
      </div>
       <div className="mt-10 pt-8 border-t border-gray-200 text-center">
        <p className="text-md text-gray-500">
          Ready to elevate your writing? Fill out the form on the left to begin.
        </p>
      </div>
    </div>
  );
};