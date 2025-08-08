
# Software Documentation for Copyright Registration

## 1. Title of the Work

**Title**: AddressChain

**Version**: 1.0

**Authors/Owners**: [Your Name(s)/Company Name Here]

**Date**: [Date of Submission]

---

## 2. Abstract

### a) Purpose of the Software
AddressChain is a revolutionary digital platform designed to solve critical, long-standing problems related to address fraud, last-mile delivery failures, and corporate equity management. It achieves this by transforming physical addresses and private company shares into verifiable, tradable, and secure digital assets on the blockchain. By leveraging Artificial Intelligence for validation and smart contracts for asset management, AddressChain provides a single source of truth for both physical locations and corporate ownership, creating a secure and efficient ecosystem for individuals, businesses, and investors.

### b) Technology Stack
The platform is built using a modern, robust technology stack:
*   **Frontend**: Next.js, React, TypeScript
*   **UI/Styling**: ShadCN UI Components, Tailwind CSS
*   **Artificial Intelligence**: Google's Gemini models via the Genkit framework for multimodal analysis, structured data extraction, and forensic analysis.
*   **Backend & Hosting**: The application is hosted on Firebase App Hosting, utilizing Firestore for the database and Firebase for backend services.
*   **Blockchain**: The system is designed to be blockchain-agnostic, running on any EVM-compatible blockchain. Address and Share assets are represented as ERC-721 or ERC-1155 compliant tokens.

### c) Platform
AddressChain is a cloud-based web application accessible through modern web browsers on both desktop and mobile devices.

---

## 3. Introduction

Traditional systems for managing physical addresses and private company equity are siloed, inefficient, and vulnerable to fraud. AddressChain addresses these challenges by creating a unified, tamper-proof digital representation of these real-world assets.

The two core components of the system are:
1.  **The Address NFT**: A unique digital token representing a single, AI-verified physical address.
2.  **The CryptoShare Token**: A digital token representing a specific class of equity in a verified company.

The software works through several key portals:
*   **User Application**: Allows individuals and companies to register their physical properties, manage their Address NFTs, grant access to others, and trade their assets on secure marketplaces.
*   **Company Portal**: A dedicated suite of tools for verified businesses to tokenize their corporate shares, manage their capitalization table, and distribute tokens to stakeholders.
*   **Administrator Portal**: A comprehensive back-office for managing the entire platform, from user and client onboarding to incident response and monetization settings.
*   **Public Resolver**: A mechanism for third parties to verify the authenticity of an Address NFT.

The following documentation provides a detailed, sequential overview of the software's key interfaces and functionalities.

---

## 4. Software Documentation

### a) Accessing the Application

Users access the application through a main landing page. From here, they can either log in to an existing account or sign up for a new one. The system uses a modern, password-based authentication flow.

**[SCREENSHOT: Main Landing Page showing the login/signup options]**

The administrator portal is accessed through a separate, secure login page.

**[SCREENSHOT: Administrator Portal Login Page]**

### b) Key Interfaces and Functionalities

#### i. User Dashboard

Upon logging in, the user is presented with their dashboard. This serves as the central hub for managing their primary digital address, viewing their wallet balance, and accessing all other platform features.

**[SCREENSHOT: User Dashboard, showing the primary address, wallet, and recent activity feed]**

#### ii. Address Registration

This is a core, innovative workflow of the application. The user is guided through a multi-step process to register a new property they own.

1.  **Select Registration Type**: The user chooses to register a personal property, a company property, a tenant, or a family member.
    **[SCREENSHOT: Registration Options Page]**

2.  **Submit Property Details**: The user provides the address name, physical address, and GPS coordinates. The system uses this data to generate a unique, "country-stamped" crypto wallet address for the property.
    **[SCREENSHOT: Register Form - Step 1 showing address and GPS input]**

3.  **AI-Powered Photo Validation**: The user must capture or upload a photo of the property's main entrance. The software then digitally stamps this photo with the crypto address and a timestamp. The system's AI cross-validates this "ground-truth" photo against satellite imagery corresponding to the provided GPS coordinates to check for inconsistencies.
    **[SCREENSHOT: Register Form - Step 2 showing the camera/upload interface with the signed photo preview]**

#### iii. Company Share Tokenization

Verified companies can access a secure portal to tokenize their equity.

1.  **Location Verification**: As a security measure, the user must first verify they are physically present at the company's registered headquarters.
    **[SCREENSHOT: Tokenize Shares page showing the location verification step]**

2.  **Define Share Classes**: The company defines one or more classes of shares (e.g., Founders, Series A, Employee Pool) and the number of shares in each class. They can choose from predefined classes or create custom ones.
    **[SCREENSHOT: Tokenize Shares page showing the form for adding share classes with a dropdown menu]**

3.  **Minting**: The company mints the defined shares, which creates the corresponding number of digital tokens in the company's treasury.
    **[SCREENSHOT: Tokenize Shares page showing a successfully minted share class]**

#### iv. Company Treasury & Distribution Dashboard

After minting, companies are directed to their Treasury dashboard, which provides a complete overview of their tokenized equity.

1.  **Capitalization Table**: A detailed table shows all minted share classes, the number of tokens in the treasury, the number distributed, and the estimated value.
    **[SCREENSHOT: Treasury Dashboard showing the full capitalization table]**

2.  **Visual Breakdown**: A pie chart visualizes the proportion of each share class relative to the total number of minted shares.
    **[SCREENSHOT: Treasury Dashboard showing the share class pie chart]**

#### v. CryptoShare Market

The platform includes a dedicated, secure marketplace for trading the tokenized shares of companies registered on AddressChain.

1.  **Market View**: Users can view a list of all tradable company shares, their current price, and recent performance.
    **[SCREENSHOT: CryptoShare Market page showing the list of tradable company stock tokens]**

2.  **Trading Interface**: For a selected company, users see a detailed chart, an order book, and forms to place buy or sell orders.
    **[SCREENSHOT: CryptoShare Market trading interface with chart, order book, and order forms]**

---

## 5. Source Code Sample

The following TypeScript code is a sample from one of the core intellectual property components of the application: the AI flow for validating a user's door photo against other data points. This demonstrates the unique logic of combining user-submitted evidence with AI analysis.

```typescript
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
```