'use server';

/**
 * @fileOverview An AI agent that generates a due diligence report for a digital address NFT.
 *
 * - generateAddressReport - A function that handles the report generation process.
 * - GenerateAddressReportInput - The input type for the generateAddressReport function.
 * - GenerateAddressReportOutput - The return type for the generateAddressReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAddressReportInputSchema = z.object({
  addressNftId: z.string().describe('The unique NFT identifier for the digital address.'),
  physicalAddress: z.string().describe('The full physical address being investigated.'),
});
export type GenerateAddressReportInput = z.infer<typeof GenerateAddressReportInputSchema>;

const GenerateAddressReportOutputSchema = z.object({
  listingSummary: z.string().describe('A summary of where this address NFT is currently or was previously listed for sale or rent.'),
  commercialUsage: z.array(z.string()).describe('A list of known commercial services (e.g., e-commerce, food delivery) associated with this address.'),
  verificationHistory: z.array(z.string()).describe('A timeline of key verification and validation events for this address.'),
  riskAssessment: z.object({
    level: z.enum(['Low', 'Medium', 'High']).describe('The overall risk level associated with this address.'),
    findings: z.array(z.string()).describe('A list of potential risks or red flags found during the investigation.'),
  }),
  overallAssessment: z.string().describe('A final, concise summary of the address\'s digital provenance and trustworthiness.'),
});
export type GenerateAddressReportOutput = z.infer<typeof GenerateAddressReportOutputSchema>;

export async function generateAddressReport(
  input: GenerateAddressReportInput
): Promise<GenerateAddressReportOutput> {
  // In a real application, this is where you would fetch data from various internal
  // and partner databases (e.g., transaction history, service usage logs, KYC flags).
  // For this prototype, we'll pass simulated context to the prompt.
  const simulatedContext = {
    marketplaceListings: 'Found listings on OpenSea (delisted), Rarible (active, 10 ETH), and internal exchange (active, 9.5 ETH).',
    servicePartners: 'Address registered with Amazon Prime, Uber Eats, and FedEx Delivery Manager since 2023.',
    kycHistory: 'Two KYC checks passed (Coinbase, 2023; Stripe, 2024). One failed KYC attempt on a non-partner exchange (2024-03-12).',
    ownershipHistory: 'Minted 2023-10-26. Transferred once on 2024-01-15.',
  };
  return generateAddressReportFlow({ ...input, ...simulatedContext });
}

const prompt = ai.definePrompt({
  name: 'generateAddressReportPrompt',
  input: {
    schema: GenerateAddressReportInputSchema.extend({
      marketplaceListings: z.string(),
      servicePartners: z.string(),
      kycHistory: z.string(),
      ownershipHistory: z.string(),
    }),
  },
  output: { schema: GenerateAddressReportOutputSchema },
  prompt: `You are a Digital Property Investigator. Your mission is to conduct a thorough due diligence check on a specific digital address NFT and its associated physical location. You must be objective, factual, and concise.

Your goal is to provide a comprehensive report that helps a potential buyer or service provider assess the trustworthiness and history of this address.

**Address for Investigation:**
- NFT ID: {{{addressNftId}}}
- Physical Address: {{{physicalAddress}}}

**Internal Data Sources (Simulated):**
- Ownership History: {{{ownershipHistory}}}
- Marketplace Listings: {{{marketplaceListings}}}
- Registered Service Partners: {{{servicePartners}}}
- KYC/Verification History: {{{kycHistory}}}

**Your Task:**
Based *only* on the provided data, generate a structured report.

1.  **Listing Summary:** Summarize the current and past marketplace activity.
2.  **Commercial Usage:** List the commercial services this address is registered with.
3.  **Verification History:** Create a chronological list of key events like minting, transfers, and KYC checks.
4.  **Risk Assessment:** Analyze the data for any potential red flags. A single failed KYC check should elevate the risk to at least 'Medium'. Multiple transfers in a short period could also be a flag. If no issues are found, the risk is 'Low'. Clearly list your findings.
5.  **Overall Assessment:** Provide a brief, final summary of the address's digital standing.

Present your findings clearly and professionally in the specified JSON format. Do not invent any information not present in the provided data sources.`,
});


const generateAddressReportFlow = ai.defineFlow(
  {
    name: 'generateAddressReportFlow',
    inputSchema: GenerateAddressReportInputSchema.extend({
        marketplaceListings: z.string(),
        servicePartners: z.string(),
        kycHistory: z.string(),
        ownershipHistory: z.string(),
    }),
    outputSchema: GenerateAddressReportOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) {
          throw new Error("AI failed to generate a report.");
      }
      return output;
    } catch (error) {
        console.error("Error in generateAddressReportFlow:", error);
        // Return a structured error-like response that matches the schema
        return {
            listingSummary: "Error generating report.",
            commercialUsage: [],
            verificationHistory: [],
            riskAssessment: {
                level: "High",
                findings: ["Failed to analyze address data due to an internal error."],
            },
            overallAssessment: "Could not complete the assessment. Please try again later.",
        };
    }
  }
);
