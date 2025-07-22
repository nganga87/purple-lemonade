
'use server';

/**
 * @fileOverview An AI agent that finds a digital address based on various user-provided clues.
 *
 * - findAddressByClue - A function that handles the address search process.
 * - FindAddressByClueInput - The input type for the findAddressByClue function.
 * - FindAddressByClueOutput - The return type for the findAddressByClue function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FindAddressByClueInputSchema = z.object({
  clue: z.string().describe('A piece of information about the user or address, such as a name, email, phone number, physical address fragment, ID number, or title deed number.'),
});
export type FindAddressByClueInput = z.infer<typeof FindAddressByClueInputSchema>;

const FoundAddressSchema = z.object({
    nftId: z.string().describe("The user's Digital Address NFT ID."),
    ownerName: z.string().describe("The full name of the address owner."),
    physicalAddress: z.string().describe("The full physical address."),
    status: z.enum(['Verified', 'Pending', 'Compromised']).describe("The current status of the address."),
});

const FindAddressByClueOutputSchema = z.object({
    foundAddresses: z.array(FoundAddressSchema).describe('A list of addresses that match the clue. Returns an empty array if no matches are found.'),
});
export type FindAddressByClueOutput = z.infer<typeof FindAddressByClueOutputSchema>;


export async function findAddressByClue(
  input: FindAddressByClueInput
): Promise<FindAddressByClueOutput> {
  // In a real application, you might perform a preliminary database search here
  // and pass the results as context to the AI.
  // For this prototype, we'll pass a simulated block of data directly to the prompt.
  const simulatedDatabase = `
    - User: John Doe, Email: john.doe@example.com, Phone: +1-555-123-4567, ID: D1234567, Address NFT: 0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B, Physical Address: 123 Main Street, Anytown, USA 12345, Status: Verified, Title Deed: T-111
    - User: Jane Doe, Email: jane.doe@example.com, Phone: +1-555-987-6543, ID: D7654321, Address NFT: 0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B, Status: Verified (Family Member)
    - User: Alice Johnson, Email: alice.j@example.com, Phone: +44-20-7946-0958, ID: AJ-998877, Address NFT: 0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C, Physical Address: 789 Pine Lane, Lakeside, USA 54321, Status: Pending
    - User: Charlie Brown, Email: charlie.b@example.com, Phone: +1-217-555-0198, ID: CB-45678, Address NFT: 0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C, Physical Address: 456 Oak Avenue, Springfield, USA 67890, Status: Verified
    - User: Nicholas C., Email: nicholas@digitaladdress.com, Phone: +1-ADMIN-PHONE, ID: NC-001, Address NFT: 0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D, Physical Address: 101 Industrial Way, Floodzone, USA 98765, Status: Compromised, Title Deed: T-222
  `;
  return findAddressByClueFlow({ ...input, simulatedDatabase });
}


const prompt = ai.definePrompt({
  name: 'findAddressByCluePrompt',
  input: {
    schema: FindAddressByClueInputSchema.extend({
      simulatedDatabase: z.string(),
    }),
  },
  output: { schema: FindAddressByClueOutputSchema },
  prompt: `You are an AI Forensic Data Analyst for the Digital Address system. Your mission is to locate a user's Digital Address NFT based on a single piece of identifying information (a "clue"). This is often used in emergency situations.

You will be given a clue and a raw text block representing the system's user and address database. Your task is to intelligently search this data and find all matching records.

The clue could be:
- A full or partial name (e.g., "John", "Doe", "nicholas@digitaladdress.com")
- A phone number
- An ID or Passport number (e.g., "D1234567")
- A Title Deed number (e.g., "T-222")
- A physical address fragment (e.g., "123 Main", "Springfield")
- An NFT Address

Analyze the clue: {{{clue}}}

Search through this data block:
---
{{{simulatedDatabase}}}
---

Based on your analysis, return a list of all matching addresses in the specified JSON format. If a user is a family member without their own physical address, return the primary address they are associated with. If no records match, return an empty array.`,
});

const findAddressByClueFlow = ai.defineFlow(
  {
    name: 'findAddressByClueFlow',
    inputSchema: FindAddressByClueInputSchema.extend({
        simulatedDatabase: z.string(),
    }),
    outputSchema: FindAddressByClueOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
