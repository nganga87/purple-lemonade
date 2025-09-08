

'use server';

import { validateDoorPhoto, type ValidateDoorPhotoInput, type ValidateDoorPhotoOutput } from '@/ai/flows/validate-door-photo';
// Use a local, wider type for registration addresses to avoid overly narrow literal unions
type RegistrationAddress = {
  name: string;
  address: string;
  nftId: string;
  gps: string;
  status: string;
  type: 'Individual' | 'Company';
  isPrimary: boolean;
  isHeadquarters: boolean;
  personalId: string;
};
import { ensureSchema, getDb } from '@/lib/db';
// JWT is handled on the client for this action by passing userId explicitly

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


type ActionResponse = ValidateDoorPhotoOutput & { error?: string, submitted?: boolean, newAddress?: RegistrationAddress };

export async function handleRegistration(formData: FormData): Promise<ActionResponse> {
  try {
    const doorPhoto = formData.get('doorPhoto') as File | null;
    const gpsCoordinates = formData.get('gpsCoordinates') as string | null;
    const cryptoAddress = formData.get('cryptoAddress') as string | null;
    const countryCode = formData.get('countryCode') as string | null;
    const physicalAddress = formData.get('physicalAddress') as string | null;
    const idNumber = formData.get('idNumber') as string | null;
    const addressName = formData.get('addressName') as string | null;
    const isCompany = formData.get('isCompany') === 'true';
    const isHeadquarters = formData.get('isHeadquarters') === 'true';
    const userIdFromForm = formData.get('userId') as string | null;

    if (!doorPhoto || doorPhoto.size === 0) {
      return { isValid: false, validationDetails: 'Door photo is missing or empty.', error: 'Door photo is missing or empty.', submitted: false };
    }
    if (!gpsCoordinates) {
      return { isValid: false, validationDetails: 'GPS coordinates are required.', error: 'GPS coordinates are required.', submitted: false };
    }
    if (!cryptoAddress) {
        return { isValid: false, validationDetails: 'Crypto wallet address is required.', error: 'Crypto wallet address is required.', submitted: false };
    }
    if (!countryCode) {
        return { isValid: false, validationDetails: 'Country code is required.', error: 'Country code is required.', submitted: false };
    }
    if (!physicalAddress) {
        return { isValid: false, validationDetails: 'Physical address is required.', error: 'Physical address is required.', submitted: false };
    }
    if (!addressName) {
        return { isValid: false, validationDetails: 'Address name is required.', error: 'Address name is required.', submitted: false };
    }


    const doorPhotoDataUri = await fileToDataUri(doorPhoto);
    
    const newAddress: RegistrationAddress = {
        name: addressName,
        address: physicalAddress,
        nftId: cryptoAddress,
        gps: gpsCoordinates,
        status: 'Pending',
        type: isCompany ? 'Company' : 'Individual',
        isPrimary: false,
        isHeadquarters: isHeadquarters,
        personalId: `did:dap:${[...Array(4)].map(() => Math.floor(Math.random() * 9000) + 1000).join('-')}`
    };
    
    // Persist to Postgres
    await ensureSchema();
    const client = await getDb().connect();
    try {
      const id = `addr_${Date.now()}`;
      const userId = userIdFromForm || null;
      await client.query(
        `INSERT INTO addresses (id, name, address, nft_id, gps, status, type, is_primary, is_headquarters, personal_id, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          id,
          newAddress.name,
          newAddress.address,
          newAddress.nftId,
          newAddress.gps,
          newAddress.status,
          newAddress.type,
          newAddress.isPrimary,
          newAddress.isHeadquarters,
          newAddress.personalId,
          userId,
        ]
      );
    } finally {
      client.release();
    }

    return {
      isValid: true,
      validationDetails:
        'Your address has been submitted and is now pending third-party validation. You can track its status on the "My Addresses" page.',
      submitted: true,
      newAddress: newAddress,
    };

  } catch (e) {
    console.error('[handleRegistration Error]', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred during validation.';
    return {
      isValid: false,
      validationDetails: `Submission failed due to a server error. Please try again.`,
      error: errorMessage,
      submitted: false,
    };
  }
}
