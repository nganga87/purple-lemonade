
'use server';

type VerificationResponse = {
  success: boolean;
  message: string;
};

// This is a mock verification function.
// In a real application, you would query a database or blockchain to verify the NFT ID.
const validNftIds = [
    '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B', // From my-addresses page
    '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C', // From my-addresses page
    '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C', // From my-addresses page
    '0x7A182c3D4e5F6a7B8c9d1F245b4C5d6E7f8A9B' // A slight variation for testing
];

export async function verifyNftId(nftId: string): Promise<VerificationResponse> {
  console.log('Verifying NFT ID:', nftId);

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (validNftIds.includes(nftId)) {
    return {
      success: true,
      message: 'NFT ID is valid and verified.',
    };
  } else {
    return {
      success: false,
      message: 'Digital Address NFT ID is invalid or not found.',
    };
  }
}
