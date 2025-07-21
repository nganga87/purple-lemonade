
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
  prompt: `You are a Physical-to-Digital Asset Verifier. Your primary function is to establish a trusted link between a digital asset (an address NFT) and a physical location. The user's door photo is the critical "ground truth" evidence.

You will receive:
1.  A door photo with an embedded digital signature (crypto address and timestamp).
2.  The property's GPS coordinates.
3.  A satellite image of the property.
4.  The user's crypto wallet address.

Your validation process must follow these steps strictly:

**Step 1: Signature & Authenticity Check**
-   Verify that the crypto address in the prompt ('{{{cryptoAddress}}}') EXACTLY matches the one visible in the door photo's digital signature. If they do not match, the validation fails instantly.
-   Analyze the door photo for any signs of digital manipulation (e.g., edited text, doctored backgrounds, inconsistent lighting on the signature). If tampering is suspected, the validation fails.

**Step 2: Ground-Truth Correlation**
-   Analyze the satellite image to understand the context of the property (e.g., is it a standalone house, an apartment building, a commercial storefront?).
-   Critically examine the door photo. Analyze the entryway's features: door style (wood, metal, glass), color, surrounding wall materials (brick, siding, concrete), presence of windows, a porch, stairs, etc.
-   Correlate the two images. Do the features in the door photo plausibly belong to the building seen in the satellite image? For example, a residential-style door photo should correspond to a house or apartment building in the satellite view, not a large warehouse. The validation fails if there is a major architectural inconsistency.

**Step 3: Final Decision**
-   Based on the successful completion of all prior steps, determine if the door photo is a valid and authentic representation of an entrance at the specified property.
-   Provide a concise summary of your findings in the validation details.

Door Photo: {{media url=doorPhotoDataUri}}
GPS Coordinates: {{{gpsCoordinates}}}
Satellite Image: {{media url=satelliteImageDataUri}}
User's Crypto Address: {{{cryptoAddress}}}`,
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
