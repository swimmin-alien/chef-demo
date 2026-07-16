import React from 'react';
import { TutorialStep } from '../types';

interface TutorialGuideProps {
  currentStep: TutorialStep;
}

const steps: { id: TutorialStep; label: string }[] = [
  { id: 'ingredients', label: '装入食材' },
  { id: 'preferences', label: '设置偏好' },
  { id: 'results', label: '查看案例' },
];

const TutorialGuide: React.FC<TutorialGuideProps> = ({ currentStep }) => {
  const currentIndex = Math.max(0, steps.findIndex(step => step.id === currentStep));

  return (
    <section className="mb-6 rounded-2xl bg-gray-900 px-5 py-4 text-white shadow-ios-lg" aria-label="首次使用教学进度">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-wider text-gray-300">首次使用教学</p>
        <p className="text-[11px] font-medium text-gray-400">步骤 {currentIndex + 1} / 3</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {steps.map((step, index) => {
          const active = index === currentIndex;
          const complete = index < currentIndex;
          return (
            <div key={step.id} className="min-w-0">
              <div className={`mb-2 h-1 rounded-full ${complete || active ? 'bg-white' : 'bg-white/20'}`} />
              <p className={`truncate text-[11px] font-semibold ${active ? 'text-white' : complete ? 'text-gray-300' : 'text-gray-500'}`}>
                {complete ? '✓ ' : ''}{step.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TutorialGuide;
