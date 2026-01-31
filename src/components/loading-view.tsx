'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from "@/components/ui/progress";

const loadingTexts = [
  "Analyzing your query...",
  "Consulting market data...",
  "Evaluating fund strategies...",
  "Compiling portfolio analysis...",
  "Generating insights...",
];

export function LoadingView() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2.5));
    }, 100);

    const textTimer = setInterval(() => {
      setLoadingText((prevText) => {
        const currentIndex = loadingTexts.indexOf(prevText);
        if (currentIndex < loadingTexts.length - 1) {
          return loadingTexts[currentIndex + 1];
        }
        return prevText;
      });
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md gap-8">
      <Image
        src="https://webapp.flextion.ai/assets/img/logo-ani-svg.svg"
        alt="FLEXTION Logo"
        width={200}
        height={42}
        className="filter-none"
      />
      <div className="w-full space-y-4 text-center">
        <p className="text-lg text-muted-foreground">{loadingText}</p>
        <Progress value={progress} className="w-full h-2 bg-[hsl(0,3%,21%)]" />
      </div>
    </div>
  );
}
