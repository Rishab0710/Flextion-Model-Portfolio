
"use server";

import { generateAnswerFromQuery } from "@/ai/flows/generate-answer-from-query";
import { summarizeSupportHistory } from "@/ai/flows/summarize-support-history";
import { z } from "zod";

export async function generateAnswer(query: string) {
  const validatedQuery = z.string().min(1).parse(query);
  try {
    const answer = await generateAnswerFromQuery(validatedQuery);
    return answer;
  } catch (error) {
    console.error("Error generating answer:", error);
    throw new Error("Failed to generate answer.");
  }
}

export async function summarizeHistory(queries: string[]) {
  const validatedQueries = z.array(z.string()).min(1).parse(queries);
  try {
    const summary = await summarizeSupportHistory({ queries: validatedQueries });
    return summary;
  } catch (error) {
    console.error("Error summarizing history:", error);
    throw new Error("Failed to summarize history.");
  }
}
