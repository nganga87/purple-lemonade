
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
  prompt: `You are an AI forensic photo analyst. Your critical mission is to confirm physical presence by comparing two photographs of the same location taken at different times. The goal is to determine if the second photo (from a validator) authentically represents the same physical entryway as the first photo (from the original user).

You will receive the original user's photo, a new photo from a validator, and the validator's GPS coordinates.

Your analysis must be meticulous. Scrutinize and compare high-fidelity details:
- **Door Specifics:** Match the style, material, color, paneling, and any unique features like windows, mail slots, or custom hardware (doorknob, lock, knocker).
- **Immediate Surroundings:** Verify the doorframe, trim, wall texture (brick, siding, stucco), porch/stoop materials, and any visible house numbers or doorbells.
- **Permanent Context:** Look for immovable objects like light fixtures, railings, or architectural elements. Be aware that plants, decorations, or lighting conditions (day/night, weather) may change, but the core structure must be identical.
- **Angle and Perspective:** The photos may be from slightly different angles. Your task is to determine if the differences are plausible for a person standing in the same spot, or if they suggest a completely different location or a fraudulent attempt to replicate the scene.

Based on your forensic analysis, decide if the validator's photo is a convincing, high-fidelity match for the original. Be skeptical of images that seem *too* perfect or are slightly misaligned in ways that suggest manipulation. Provide a concise, clear reasoning for your conclusion.

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
