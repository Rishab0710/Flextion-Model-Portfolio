'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating answers to user queries.
 *
 * It includes the following:
 * - generateAnswerFromQuery: An async function that takes a user query as input and returns an AI-generated answer.
 * - GenerateAnswerFromQueryInput: The input type for the generateAnswerFromQuery function (a string query).
 * - GenerateAnswerFromQueryOutput: The output type for the generateAnswerFromQuery function (a string answer).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnswerFromQueryInputSchema = z.string().describe('The user query string.');
export type GenerateAnswerFromQueryInput = z.infer<typeof GenerateAnswerFromQueryInputSchema>;

const GenerateAnswerFromQueryOutputSchema = z.string().describe('The AI-generated answer to the query.');
export type GenerateAnswerFromQueryOutput = z.infer<typeof GenerateAnswerFromQueryOutputSchema>;

export async function generateAnswerFromQuery(query: GenerateAnswerFromQueryInput): Promise<GenerateAnswerFromQueryOutput> {
  return generateAnswerFromQueryFlow(query);
}

const generateAnswerFromQueryPrompt = ai.definePrompt({
  name: 'generateAnswerFromQueryPrompt',
  input: {schema: GenerateAnswerFromQueryInputSchema},
  output: {schema: GenerateAnswerFromQueryOutputSchema},
  prompt: `You are a helpful AI assistant providing support to users.
  Answer the following question to the best of your ability, or guide the user to relevant resources if you cannot answer the question directly.

  Question: {{{$input}}}`,
});

const generateAnswerFromQueryFlow = ai.defineFlow(
  {
    name: 'generateAnswerFromQueryFlow',
    inputSchema: GenerateAnswerFromQueryInputSchema,
    outputSchema: GenerateAnswerFromQueryOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      prompt: generateAnswerFromQueryPrompt,
      input,
    });
    return text!;
  }
);
