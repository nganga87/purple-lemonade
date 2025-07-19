'use server';

import { validateDoorPhoto, type ValidateDoorPhotoInput, type ValidateDoorPhotoOutput } from '@/ai/flows/validate-door-photo';

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

type ActionResponse = ValidateDoorPhotoOutput & { error?: string };

export async function handleRegistration(formData: FormData): Promise<ActionResponse> {
  try {
    const doorPhoto = formData.get('doorPhoto') as File | null;
    const satelliteImage = formData.get('satelliteImage') as File | null;
    const gpsCoordinates = formData.get('gpsCoordinates') as string | null;

    if (!doorPhoto || doorPhoto.size === 0) {
      return { isValid: false, validationDetails: 'Door photo is missing or empty.', error: 'Door photo is missing or empty.' };
    }
    if (!satelliteImage || satelliteImage.size === 0) {
      return { isValid: false, validationDetails: 'Satellite image is missing or empty.', error: 'Satellite image is missing or empty.' };
    }
    if (!gpsCoordinates) {
      return { isValid: false, validationDetails: 'GPS coordinates are required.', error: 'GPS coordinates are required.' };
    }

    const [doorPhotoDataUri, satelliteImageDataUri] = await Promise.all([
      fileToDataUri(doorPhoto),
      fileToDataUri(satelliteImage),
    ]);

    const input: ValidateDoorPhotoInput = {
      doorPhotoDataUri,
      satelliteImageDataUri,
      gpsCoordinates,
    };

    const result = await validateDoorPhoto(input);
    return result;
  } catch (e) {
    console.error('[handleRegistration Error]', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred during validation.';
    return {
      isValid: false,
      validationDetails: `Validation failed due to a server error: ${errorMessage}`,
      error: errorMessage,
    };
  }
}
