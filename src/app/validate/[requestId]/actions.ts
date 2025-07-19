
'use server';

import { compareValidationPhotos, type CompareValidationPhotosInput, type CompareValidationPhotosOutput } from '@/ai/flows/compare-validation-photos';

// Helper function to convert File to Data URI
const fileToDataUri = async (file: File): Promise<string> => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    return `data:${file.type};base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error('Error converting file to data URI:', error);
    throw new Error('Could not process file.');
  }
};

// This is a mock function. In a real application, you would fetch the original
// user's photo from your database based on the requestId.
const getOriginalUserPhoto = async (requestId: string): Promise<string> => {
  console.log(`Fetching original photo for request ${requestId}...`);
  // Simulate DB call
  await new Promise(resolve => setTimeout(resolve, 500));
  // For this demo, we use a placeholder.
  const placeholderUrl = "https://placehold.co/600x400.png";
  const response = await fetch(placeholderUrl);
  const buffer = await response.arrayBuffer();
  return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
};

type ActionResponse = CompareValidationPhotosOutput & { error?: string };

export async function handleValidation(formData: FormData): Promise<ActionResponse> {
  try {
    const requestId = formData.get('requestId') as string | null;
    const validatorDoorPhoto = formData.get('validatorDoorPhoto') as File | null;
    const validatorGpsCoordinates = formData.get('validatorGpsCoordinates') as string | null;

    if (!requestId) {
        return { isMatch: false, reasoning: 'Request ID is missing.', error: 'Request ID is missing.' };
    }
    if (!validatorDoorPhoto || validatorDoorPhoto.size === 0) {
      return { isMatch: false, reasoning: 'Validator door photo is missing or empty.', error: 'Validator door photo is missing or empty.' };
    }
    if (!validatorGpsCoordinates) {
      return { isMatch: false, reasoning: 'Validator GPS coordinates are required.', error: 'Validator GPS coordinates are required.' };
    }

    // Fetch original user's photo
    const originalPhotoDataUri = await getOriginalUserPhoto(requestId);

    const validatorPhotoDataUri = await fileToDataUri(validatorDoorPhoto);

    const input: CompareValidationPhotosInput = {
      originalPhotoDataUri,
      validatorPhotoDataUri,
      validatorGpsCoordinates,
    };

    const result = await compareValidationPhotos(input);
    
    // Here you would typically store the result in your database, associating it with the requestId
    console.log(`Validation result for ${requestId}:`, result);

    return result;
  } catch (e) {
    console.error('[handleValidation Error]', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred during validation.';
    return {
      isMatch: false,
      reasoning: `Validation failed due to a server error: ${errorMessage}`,
      error: errorMessage,
    };
  }
}
