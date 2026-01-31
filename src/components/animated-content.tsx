'use client';

import { useState, useEffect } from 'react';

function Typewriter({ text, speed = 5, onComplete }: { text: string; speed?: number; onComplete?: () => void; }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return <>{displayedText}</>;
}

export interface AnimatedSection {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
}

interface AnimatedContentProps {
  sections: AnimatedSection[];
}

export function AnimatedContent({ sections }: AnimatedContentProps) {
  const [typingIndex, setTypingIndex] = useState(0);

  const handleComplete = () => {
    if (typingIndex < sections.length - 1) {
      setTypingIndex(typingIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        if (index > typingIndex) {
          return null;
        }
        const Icon = section.icon;

        return (
          <div key={index} className="flex gap-4 items-start">
            <div className="bg-white/10 text-accent p-2 rounded-lg mt-1 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{section.title}</h3>
              <div className="text-gray-300 text-xs leading-relaxed">
                {index < typingIndex ? section.content : (
                  <Typewriter
                    text={section.content}
                    onComplete={handleComplete}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
