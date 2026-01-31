'use client';

import Image from 'next/image';
import {
  BarChart,
  Bookmark,
  Expand,
  GitMerge,
  Target,
  TrendingUp,
} from 'lucide-react';

import { Fund } from '@/lib/fund-data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FlextionXLogo } from './flextion-x-logo';

interface FundCardProps {
  fund: Fund;
}

export function FundCard({ fund }: FundCardProps) {
  return (
    <Card className="bg-[#303030] border-0 text-white rounded-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium leading-tight pr-4">
            {fund.name}
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            <FlextionXLogo className="h-5 w-5" />
            <Bookmark className="h-5 w-5 text-gray-400" />
            <Expand className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-[#393939] p-3 rounded-md">
          <p className="text-xs text-gray-400 mb-2 font-light">
            Strategy Summary:
          </p>
          <div className="flex gap-4 items-center">
            <Image
              src={fund.logoUrl}
              alt={`${fund.name} logo`}
              width={64}
              height={64}
              className="rounded-md h-16 w-16 object-cover"
              data-ai-hint="logo"
            />
            <div className="flex-1 space-y-1.5 text-xs min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <BarChart className="h-4 w-4" />
                  <span>Recommendation:</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-3 text-xs bg-gray-600 border-gray-500 hover:bg-gray-500 text-white flex-shrink-0"
                >
                  {fund.recommendation}
                </Button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Target className="h-4 w-4" />
                  <span>Flextion Score:</span>
                </div>
                <span className="font-semibold text-white bg-gray-700/50 px-2 py-0.5 rounded">
                  {fund.flextionScore.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <TrendingUp className="h-4 w-4" />
                  <span>Expected Relative Returns:</span>
                </div>
                <span className="font-semibold">{fund.expectedRelativeReturns.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <GitMerge className="h-4 w-4" />
                  <span>Benchmark:</span>
                </div>
                <span className="font-semibold truncate text-right">
                  {fund.benchmark}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
