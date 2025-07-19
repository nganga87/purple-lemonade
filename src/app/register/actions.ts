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

// This is a mock function. In a real application, you would use a mapping API
// like Google Maps Static API to get a satellite image.
const getSatelliteImageForGps = async (gpsCoordinates: string): Promise<string> => {
  console.log(`Fetching satellite image for ${gpsCoordinates}...`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, you would fetch an image from a service and return a data URI.
  // For this demo, we use a placeholder.
  const placeholderUrl = "https://placehold.co/600x400.png";
  const response = await fetch(placeholderUrl);
  const buffer = await response.arrayBuffer();
  return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
};


type ActionResponse = ValidateDoorPhotoOutput & { error?: string };

export async function handleRegistration(formData: FormData): Promise<ActionResponse> {
  try {
    const doorPhoto = formData.get('doorPhoto') as File | null;
    const gpsCoordinates = formData.get('gpsCoordinates') as string | null;
    const cryptoAddress = formData.get('cryptoAddress') as string | null;

    if (!doorPhoto || doorPhoto.size === 0) {
      return { isValid: false, validationDetails: 'Door photo is missing or empty.', error: 'Door photo is missing or empty.' };
    }
    if (!gpsCoordinates) {
      return { isValid: false, validationDetails: 'GPS coordinates are required.', error: 'GPS coordinates are required.' };
    }
    if (!cryptoAddress) {
        return { isValid: false, validationDetails: 'Crypto wallet address is required.', error: 'Crypto wallet address is required.' };
    }

    // Fetch satellite image based on GPS
    const satelliteImageDataUri = await getSatelliteImageForGps(gpsCoordinates);

    const doorPhotoDataUri = await fileToDataUri(doorPhoto);

    const input: ValidateDoorPhotoInput = {
      doorPhotoDataUri,
      satelliteImageDataUri,
      gpsCoordinates,
      cryptoAddress,
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
