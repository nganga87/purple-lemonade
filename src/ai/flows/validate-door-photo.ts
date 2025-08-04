
'use server';

/**
 * @fileOverview An AI agent that validates a user-submitted door photo against satellite imagery.
 *
 * - validateDoorPhoto - A function that handles the door photo validation process.
 * - ValidateDoorPhotoInput - The input type for the validateDoorPhoto function.
 * - ValidateDoorPhotoOutput - The return type for the validateDoorPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateDoorPhotoInputSchema = z.object({
  doorPhotoDataUri: z
    .string()
    .describe(
      "A photo of a door with a digital signature (crypto address and timestamp) embedded, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  gpsCoordinates: z
    .string()
    .describe('The GPS coordinates of the property (e.g., "34.0522,-118.2437")'),
  satelliteImageDataUri: z
    .string()
    .describe(
      "A satellite image of the property, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
   cryptoAddress: z
    .string()
    .describe('The crypto wallet address of the user submitting the request.'),
   countryCode: z
    .string()
    .describe('The two-letter ISO country code for the address (e.g., "US", "NG").'),
   physicalAddress: z
    .string()
    .describe('The full physical address provided by the user.'),
  idNumber: z.string().optional().describe('The government-issued ID number of the user (e.g., Passport, National ID).'),
  phoneNumber: z.string().optional().describe("The user's primary phone number."),
});
export type ValidateDoorPhotoInput = z.infer<typeof ValidateDoorPhotoInputSchema>;

const ValidateDoorPhotoOutputSchema = z.object({
  isValid: z
    .boolean()
    .describe(
      'Whether the door photo is validated against the satellite imagery.'
    ),
  validationDetails: z
    .string()
    .describe('Details of the validation process.'),
});
export type ValidateDoorPhotoOutput = z.infer<typeof ValidateDoorPhotoOutputSchema>;

export async function validateDoorPhoto(
  input: ValidateDoorPhotoInput
): Promise<ValidateDoorPhotoOutput> {
  return validateDoorPhotoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateDoorPhotoPrompt',
  input: {schema: ValidateDoorPhotoInputSchema},
  output: {schema: ValidateDoorPhotoOutputSchema},
  prompt: `You are a Physical-to-Digital Asset Verifier. Your primary function is to establish a trusted link between a digital asset (an address NFT) and a physical location. You will perform a tiered verification based on the provided identity documents.

You will receive:
1.  A door photo with an embedded digital signature (crypto address, timestamp, and physical address).
2.  The property's GPS coordinates.
3.  A satellite image of the property.
4.  The user's crypto wallet address.
5.  The two-letter country code for the address ('{{{countryCode}}}').
6.  The physical address text provided by the user.
7.  An optional ID Number: {{{idNumber}}}.
8.  An optional Phone Number: {{{phoneNumber}}}.

Your validation process must follow these steps strictly:

**Step 1: Determine Verification Tier**
-   **Level 1 (Highest Trust):** Both ID Number and Phone Number are provided.
-   **Level 2 (High Trust):** Only ID Number is provided.
-   **Level 3 (Standard Trust):** Only Phone Number is provided.
-   **Level 4 (Basic Trust):** Neither is provided.
State the determined verification level in your final validation details.

**Step 2: Signature & Authenticity Check**
-   Verify that the crypto address in the prompt ('{{{cryptoAddress}}}') EXACTLY matches the one visible in the door photo's digital signature.
-   Verify that the physical address in the prompt ('{{{physicalAddress}}}') is reasonably represented in the signature.
-   Analyze the door photo for any signs of digital manipulation. If tampering is suspected, the validation fails immediately.

**Step 3: Ground-Truth Correlation**
-   Analyze the satellite image to understand the context of the property (e.g., standalone house, apartment building). The visual style should be consistent with the architecture of the specified country ('{{{countryCode}}}').
-   Critically examine the door photo. Analyze the entryway's features: door style, color, surrounding materials, windows, etc.
-   Correlate the two images. Do the features in the door photo plausibly belong to the building seen in the satellite image? A major architectural inconsistency is a validation failure.

**Step 4: Final Decision**
-   Based on the successful completion of all prior steps, determine if the door photo is a valid and authentic representation of an entrance at the specified property.
-   Provide a concise summary of your findings in the validation details, explicitly mentioning the determined Verification Tier.

Door Photo: {{media url=doorPhotoDataUri}}
GPS Coordinates: {{{gpsCoordinates}}}
Satellite Image: {{media url=satelliteImageDataUri}}
User's Crypto Address: {{{cryptoAddress}}}
User's Physical Address: {{{physicalAddress}}}
Country Code: {{{countryCode}}}
ID Number: {{{idNumber}}}
Phone Number: {{{phoneNumber}}}`,
});

const validateDoorPhotoFlow = ai.defineFlow(
  {
    name: 'validateDoorPhotoFlow',
    inputSchema: ValidateDoorPhotoInputSchema,
    outputSchema: ValidateDoorPhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
