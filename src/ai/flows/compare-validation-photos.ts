
'use server';

/**
 * @fileOverview An AI agent that compares a user-submitted photo with a third-party validator's photo.
 *
 * - compareValidationPhotos - A function that handles the photo comparison process.
 * - CompareValidationPhotosInput - The input type for the compareValidationPhotos function.
 * - CompareValidationPhotosOutput - The return type for the compareValidationPhotos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareValidationPhotosInputSchema = z.object({
  originalPhotoDataUri: z
    .string()
    .describe(
      "The original door photo submitted by the user, as a data URI."
    ),
  validatorPhotoDataUri: z
    .string()
    .describe(
      "The new door photo submitted by the third-party validator, as a data URI."
    ),
  validatorGpsCoordinates: z
    .string()
    .describe('The GPS coordinates captured by the validator at the property (e.g., "34.0522,-118.2437")'),
});
export type CompareValidationPhotosInput = z.infer<typeof CompareValidationPhotosInputSchema>;

const CompareValidationPhotosOutputSchema = z.object({
  isMatch: z
    .boolean()
    .describe(
      'Whether the validator\'s photo is a convincing match for the original photo and location.'
    ),
  reasoning: z
    .string()
    .describe('A brief explanation for why the photos match or not, considering the environment, door details, and any discrepancies.'),
});
export type CompareValidationPhotosOutput = z.infer<typeof CompareValidationPhotosOutputSchema>;

export async function compareValidationPhotos(
  input: CompareValidationPhotosInput
): Promise<CompareValidationPhotosOutput> {
  return compareValidationPhotosFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareValidationPhotosPrompt',
  input: {schema: CompareValidationPhotosInputSchema},
  output: {schema: CompareValidationPhotosOutputSchema},
  prompt: `You are an AI expert in photo verification. Your task is to determine if a photo taken by a third-party validator matches the original photo submitted by a user for an address registration.

You will receive the original photo, the validator's photo, and the validator's GPS coordinates.

Analyze both images to determine if they are of the same door and property. Consider factors like:
- The appearance of the door (color, style, material, hardware).
- The immediate surroundings (door frame, walls, porch, any visible house numbers).
- The general environment (plants, path, lighting).

The photos might be taken at different times of day or from slightly different angles, so allow for minor variations. However, the core features of the door and its immediate surroundings must be consistent.

Based on your analysis, decide if the validator's photo is a convincing match for the original. Provide a brief, clear reasoning for your decision.

Original User Photo: {{media url=originalPhotoDataUri}}
Validator's Photo: {{media url=validatorPhotoDataUri}}
Validator's GPS Coordinates: {{{validatorGpsCoordinates}}}`,
});

const compareValidationPhotosFlow = ai.defineFlow(
  {
    name: 'compareValidationPhotosFlow',
    inputSchema: CompareValidationPhotosInputSchema,
    outputSchema: CompareValidationPhotosOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
