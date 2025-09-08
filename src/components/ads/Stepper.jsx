import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800" aria-current="step">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                </div>
                <div className="absolute top-10 w-max text-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                </div>
                 <div className="absolute top-10 w-max text-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
