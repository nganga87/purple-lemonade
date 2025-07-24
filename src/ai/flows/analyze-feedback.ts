
'use server';

/**
 * @fileOverview An AI agent that analyzes user feedback to categorize, prioritize, and suggest actions.
 *
 * - analyzeFeedback - A function that handles the feedback analysis.
 * - AnalyzeFeedbackInput - The input type for the analyzeFeedback function.
 * - AnalyzeFeedbackOutput - The return type for the analyzeFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeFeedbackInputSchema = z.object({
  category: z.string().describe("The user-selected category for their feedback."),
  subject: z.string().describe("The subject line of the feedback submission."),
  message: z.string().describe("The full text of the user's feedback message."),
  userContext: z.object({
      name: z.string(),
      email: z.string(),
      accountTier: z.enum(['Free', 'Standard', 'Pro', 'Enterprise']),
  }).describe("Context about the user submitting the feedback."),
});
export type AnalyzeFeedbackInput = z.infer<typeof AnalyzeFeedbackInputSchema>;

const AnalyzeFeedbackOutputSchema = z.object({
  summary: z.string().describe("A concise, one-sentence summary of the user's issue."),
  autoCategory: z.enum(['Bug Report', 'Feature Request', 'Account Issue', 'Billing', 'General Inquiry', 'Validation Problem']).describe("The AI's refined categorization of the issue based on the message content."),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).describe("The suggested priority level for this ticket."),
  suggestedAction: z.string().describe("A concrete, actionable next step for the admin team to take."),
});
export type AnalyzeFeedbackOutput = z.infer<typeof AnalyzeFeedbackOutputSchema>;


export async function analyzeFeedback(
  input: AnalyzeFeedbackInput
): Promise<AnalyzeFeedbackOutput> {
  return analyzeFeedbackFlow(input);
}


const prompt = ai.definePrompt({
  name: 'analyzeFeedbackPrompt',
  input: { schema: AnalyzeFeedbackInputSchema },
  output: { schema: AnalyzeFeedbackOutputSchema },
  prompt: `You are an AI Support Ticket Analyst for a high-tech digital identity and address verification platform. Your job is to process incoming user feedback, triage it, and provide a clear, actionable summary for the human support team.

You will receive a piece of user feedback, including the user's own category choice, their message, and some context about their account.

Your analysis must be sharp and action-oriented. Follow these steps:

1.  **Summarize the Core Issue:** Read the user's message and distill it into a single, clear sentence.
2.  **Refine the Category:** The user's category is a starting point, but you must use the message content to determine the most accurate category from the available options. For example, if a user selects "General Feedback" but describes something broken, you should re-categorize it as "Bug Report".
3.  **Assess Priority:** Determine the urgency.
    -   **Critical:** Platform-wide outage, security vulnerability, user cannot access their account at all.
    -   **High:** Major feature is broken, payment/billing issues, validation is failing for a paying customer.
    -   **Medium:** Minor feature issue, UI bug, single user experiencing a non-critical problem.
    -   **Low:** General feedback, feature request, cosmetic issue.
    Consider the user's account tier. Issues from 'Pro' or 'Enterprise' users should generally have a higher priority.
4.  **Suggest a Next Action:** Provide a clear, direct instruction for the support team. Examples: "Escalate to engineering team with bug reproduction steps.", "Forward to billing department to investigate transaction ID.", "Add this idea to the feature request board for consideration.", "Send the user the 'How to Reset Your Password' guide."

**User Information:**
- Name: {{{userContext.name}}}
- Email: {{{userContext.email}}}
- Account Tier: {{{userContext.accountTier}}}

**Feedback Details:**
- User's Category: {{{category}}}
- Subject: {{{subject}}}
- Message:
---
{{{message}}}
---

Now, provide your analysis in the specified JSON format.`,
});

const analyzeFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeFeedbackFlow',
    inputSchema: AnalyzeFeedbackInputSchema,
    outputSchema: AnalyzeFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
