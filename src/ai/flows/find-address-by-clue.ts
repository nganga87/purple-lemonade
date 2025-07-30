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


const searchAddresses = ai.defineTool(
  {
    name: 'searchAddresses',
    description: 'Searches the database for addresses matching a given clue.',
    inputSchema: FindAddressByClueInputSchema,
    outputSchema: FindAddressByClueOutputSchema,
  },
  async ({ clue }) => {
    console.log(`Searching database for clue: ${clue}`);
    // In a real application, this would query a Firestore database.
    // For this prototype, we simulate the database search.
    const simulatedDatabase = [
      { nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B', ownerName: 'John Doe', physicalAddress: '123 Main Street, Anytown, USA 12345', status: 'Verified' as const, otherData: 'john.doe@example.com, +1-555-123-4567, D1234567, T-111' },
      { nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B', ownerName: 'Jane Doe', physicalAddress: '123 Main Street, Anytown, USA 12345', status: 'Verified' as const, otherData: 'jane.doe@example.com, +1-555-987-6543, D7654321' },
      { nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C', ownerName: 'Alice Johnson', physicalAddress: '789 Pine Lane, Lakeside, USA 54321', status: 'Pending' as const, otherData: 'alice.j@example.com, +44-20-7946-0958, AJ-998877' },
      { nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C', ownerName: 'Charlie Brown', physicalAddress: '456 Oak Avenue, Springfield, USA 67890', status: 'Verified' as const, otherData: 'charlie.b@example.com, +1-217-555-0198, CB-45678' },
      { nftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D', ownerName: 'Nicholas C.', physicalAddress: '101 Industrial Way, Floodzone, USA 98765', status: 'Compromised' as const, otherData: 'nicholas@digitaladdress.com, +1-ADMIN-PHONE, NC-001, T-222' },
    ];
    
    const lowerCaseClue = clue.toLowerCase();
    const foundAddresses = simulatedDatabase.filter(record => 
        Object.values(record).some(value => 
            String(value).toLowerCase().includes(lowerCaseClue)
        )
    ).map(({ otherData, ...rest }) => rest); // Exclude 'otherData' from the final result.

    return { foundAddresses };
  }
);


export async function findAddressByClue(
  input: FindAddressByClueInput
): Promise<FindAddressByClueOutput> {
  return findAddressByClueFlow(input);
}


const prompt = ai.definePrompt({
  name: 'findAddressByCluePrompt',
  input: { schema: FindAddressByClueInputSchema },
  output: { schema: FindAddressByClueOutputSchema },
  tools: [searchAddresses],
  prompt: `You are an AI Forensic Data Analyst. Your mission is to locate a user's Digital Address NFT based on a single piece of identifying information (a "clue"). This is often used in emergency situations.

Use the 'searchAddresses' tool to find all records from the database that match the provided clue: {{{clue}}}.

Return the results from the tool directly. Do not add any extra commentary or analysis.`,
});

const findAddressByClueFlow = ai.defineFlow(
  {
    name: 'findAddressByClueFlow',
    inputSchema: FindAddressByClueInputSchema,
    outputSchema: FindAddressByClueOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
