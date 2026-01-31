'use client';

import { useState, useEffect } from 'react';

function Typewriter({ text, speed = 10, onComplete }: { text: string; speed?: number; onComplete?: () => void; }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
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
    <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
      {sections.map((section, index) => {
        if (index > typingIndex) {
          return null;
        }

        return (
          <div key={index}>
            <h3 className="font-semibold text-white mb-1">{section.title}</h3>
            <p>
              {index < typingIndex ? section.content : (
                <Typewriter
                  text={section.content}
                  onComplete={handleComplete}
                />
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
