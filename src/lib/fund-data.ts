import { PlaceHolderImages } from './placeholder-images';

export type Fund = {
  id: string;
  name: string;
  recommendation: 'Buy' | 'Hold' | 'Sell';
  flextionScore: number;
  expectedRelativeReturns: number;
  benchmark: string;
  logoUrl: string;
};

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id)?.imageUrl ||
  'https://placehold.co/100x100';

export const fundsData: Fund[] = [
  {
    id: '1',
    name: 'Columbia Funds Series Trust I: Columbia Select Large Cap Growth Fund',
    recommendation: 'Buy',
    flextionScore: 93.07,
    expectedRelativeReturns: 5.2,
    benchmark: 'Russell 1000 Growth TR',
    logoUrl: getImage('columbia-funds-logo'),
  },
  {
    id: '2',
    name: 'Fidelity Advisor Series I: Fidelity Advisor Equity Growth Fund',
    recommendation: 'Buy',
    flextionScore: 96.38,
    expectedRelativeReturns: 5.37,
    benchmark: 'Russell 3000 Growth TR',
    logoUrl: getImage('fidelity-advisor-logo'),
  },
  {
    id: '3',
    name: 'Forum Funds: DF Dent MidCap Growth Fund',
    recommendation: 'Buy',
    flextionScore: 97.1,
    expectedRelativeReturns: 1.61,
    benchmark: 'Russell MidCap Growth TR',
    logoUrl: getImage('forum-funds-logo'),
  },
  {
    id: '4',
    name: 'MML Series Investment Fund: MML Mid Cap Growth Fund',
    recommendation: 'Buy',
    flextionScore: 96.0,
    expectedRelativeReturns: 1.72,
    benchmark: 'Russell MidCap Growth TR',
    logoUrl: getImage('mml-series-logo'),
  },
];
