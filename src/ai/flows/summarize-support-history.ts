'use server';

/**
 * @fileOverview Summarizes a user's support history to provide a quick understanding for support agents.
 *
 * - summarizeSupportHistory - A function that summarizes the support history.
 * - SummarizeSupportHistoryInput - The input type for the summarizeSupportHistory function.
 * - SummarizeSupportHistoryOutput - The return type for the summarizeSupportHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSupportHistoryInputSchema = z.object({
  queries: z.array(z.string()).describe('An array of user queries to summarize.'),
});
export type SummarizeSupportHistoryInput = z.infer<typeof SummarizeSupportHistoryInputSchema>;

const SummarizeSupportHistoryOutputSchema = z.object({
  summary: z.string().describe('A summary of the user support history.'),
});
export type SummarizeSupportHistoryOutput = z.infer<typeof SummarizeSupportHistoryOutputSchema>;

export async function summarizeSupportHistory(input: SummarizeSupportHistoryInput): Promise<SummarizeSupportHistoryOutput> {
  return summarizeSupportHistoryFlow(input);
}

const summarizeSupportHistoryPrompt = ai.definePrompt({
  name: 'summarizeSupportHistoryPrompt',
  input: {schema: SummarizeSupportHistoryInputSchema},
  output: {schema: SummarizeSupportHistoryOutputSchema},
  prompt: `You are a support agent summarizing the history of a user's questions.

  Summarize the following queries to provide a concise overview of the user's support history. Be as brief as possible.

  Queries:
  {{#each queries}}- {{{this}}}\n{{/each}}
  `,
});

const summarizeSupportHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeSupportHistoryFlow',
    inputSchema: SummarizeSupportHistoryInputSchema,
    outputSchema: SummarizeSupportHistoryOutputSchema,
  },
  async input => {
    const {output} = await summarizeSupportHistoryPrompt(input);
    return output!;
  }
);
