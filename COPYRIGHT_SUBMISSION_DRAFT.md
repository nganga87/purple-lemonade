# Software Documentation for Copyright Registration

## 1. Title of the Work

**Title**: AddressChain

**Version**: 1.0

**Authors/Owners**: [Your Name(s)/Company Name Here]

**Date**: [Date of Submission]

---

## 2. Abstract

### a) Purpose of the Software
AddressChain is a revolutionary digital platform designed to transform physical addresses into verifiable, tradable, and secure digital assets on the blockchain. By leveraging Artificial Intelligence for validation and smart contracts for management, AddressChain solves critical, long-standing problems related to address fraud, last-mile delivery failures, and proof of residence. The platform provides a single source of truth for physical locations, creating a secure, transparent, and efficient ecosystem for individuals, businesses, and governments.

### b) Technology Stack
The platform is built using a modern, robust technology stack:
*   **Frontend**: Next.js, React, TypeScript
*   **UI/Styling**: ShadCN UI Components, Tailwind CSS
*   **Artificial Intelligence**: Google's Gemini models via the Genkit framework for multimodal analysis, structured data extraction, and forensic analysis.
*   **Backend & Hosting**: The application is hosted on Firebase App Hosting, utilizing Firebase for backend services and authentication.
*   **Blockchain**: The system is designed to be blockchain-agnostic, running on any EVM-compatible blockchain, with Address NFTs being ERC-721 compliant tokens.

### c) Platform
AddressChain is a cloud-based web application accessible through modern web browsers on both desktop and mobile devices.

---

## 3. Introduction

Traditional address systems are fraught with inefficiencies and vulnerabilities, leading to significant financial losses and operational friction. Key problems include address fraud, failed deliveries, and the difficulty of verifying proof of residence. AddressChain addresses these challenges by creating a tamper-proof digital representation of physical addresses.

The core of the system is the **Address NFT**, a unique digital token representing a single, AI-verified physical address. This transforms a simple address into a manageable, secure, and valuable digital asset.

The software works through several key user-facing and administrative portals:
*   **User Application**: Allows individuals to register their physical properties, manage their Address NFTs, grant access to tenants or family, and trade their address assets on a secure marketplace.
*   **Administrator Portal**: A comprehensive back-office for managing the entire platform, from user and client onboarding to incident response and monetization settings.
*   **Public Resolver**: A mechanism for third parties to verify the authenticity of an Address NFT.

The following documentation provides a detailed, sequential overview of the software's key interfaces and functionalities.

---

## 4. Software Documentation

### a) Accessing the Application

Users access the application through a main landing page. From here, they can either log in to an existing account or sign up for a new one. The system uses a modern, passwordless authentication flow. A user enters their email, and the system determines whether to send a secure login link (for existing accounts) or direct them to the registration page (for new accounts).

**[SCREENSHOT: Main Landing Page showing the login/signup email form]**

The administrator portal is accessed through a separate, secure login page.

**[SCREENSHOT: Administrator Portal Login Page]**

### b) Key Interfaces and Functionalities

#### i. User Dashboard

Upon logging in, the user is presented with their dashboard. This serves as the central hub for managing their primary digital address, viewing recent activity (such as deliveries or verification checks), and accessing all other platform features.

**[SCREENSHOT: User Dashboard, showing the primary address, QR code, and recent activity feed]**

#### ii. Address Registration

This is a core, innovative workflow of the application. The user is guided through a multi-step process to register a new property they own.

1.  **Select Registration Type**: The user chooses to register a new property, add a tenant, or add a family member.
    **[SCREENSHOT: Registration Options Page]**

2.  **Submit Property Details**: The user provides the address name, physical address, and GPS coordinates. The system uses this data to generate a unique, "country-stamped" crypto wallet address for the property.
    **[SCREENSHOT: Register Form - Step 1 showing address and GPS input]**

3.  **AI-Powered Photo Validation**: The user must capture or upload a photo of the property's main entrance. The software then digitally stamps this photo with the crypto address and a timestamp. This "ground-truth" photo is a critical piece of evidence. The system's AI then cross-validates this photo against satellite imagery corresponding to the provided GPS coordinates to check for inconsistencies.
    **[SCREENSHOT: Register Form - Step 2 showing the camera/upload interface with the signed photo preview]**

4.  **Submission & Verification**: Once submitted, the registration is marked as "Pending" and may be sent to a decentralized network of third-party validators for final physical confirmation.
    **[SCREENSHOT: Successful submission confirmation screen]**

#### iii. Address Management (`/my-addresses`)

Users can view and manage all their owned Address NFTs on this page. They can select an address to view its details, set a primary address, edit its name, or view its shareable QR code which links to the public resolver.

**[SCREENSHOT: My Addresses page showing a list of addresses and the details of a selected address]**

#### iv. Access Request Management (`/access-requests`)

Property owners can review and approve or reject requests from other users (e.g., tenants, family) who wish to be associated with their verified address.

**[SCREENSHOT: Access Requests page showing a table of pending, approved, and rejected requests]**

#### v. Address Marketplace (`/exchange`)

The platform includes a P2P marketplace for buying and selling verified Address NFTs. A key feature here is the **AI Due Diligence Report**. Before purchasing, a user can generate an AI-powered report that analyzes the address's on-chain history, commercial usage, and potential risk factors.

**[SCREENSHOT: Address Marketplace page showing a list of properties for sale]**

**[SCREENSHOT: AI Due Diligence Report dialog showing the structured analysis]**

#### vi. Administrator Portal: User Feedback Analysis

Admins can view all user-submitted feedback. A crucial feature is the AI analysis tool. With one click, an admin can trigger a Genkit AI flow that reads the user's message and returns a structured analysis, including a summary, a refined category, a priority level, and a suggested next action.

**[SCREENSHOT: Admin Feedback page showing the list of tickets and the AI analysis dialog]**

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
  prompt: `You are a Physical-to-Digital Asset Verifier. Your primary function is to establish a trusted link between a digital asset (an address NFT) and a physical location within a specific national jurisdiction. The user's door photo is the critical "ground truth" evidence.

You will receive:
1.  A door photo with an embedded digital signature (crypto address, timestamp, and physical address).
2.  The property's GPS coordinates.
3.  A satellite image of the property.
4.  The user's crypto wallet address.
5.  The two-letter country code for the address ('{{{countryCode}}}').
6.  The physical address text provided by the user.

Your validation process must follow these steps strictly:

**Step 1: Signature & Authenticity Check**
-   Verify that the crypto address in the prompt ('{{{cryptoAddress}}}') EXACTLY matches the one visible in the door photo's digital signature.
-   Verify that the physical address in the prompt ('{{{physicalAddress}}}') is reasonably represented in the signature.
-   Analyze the door photo for any signs of digital manipulation (e.g., edited text, doctored backgrounds, inconsistent lighting on the signature). If tampering is suspected, the validation fails.
-   Confirm that the crypto address appears to be correctly formatted and plausibly linked to the provided country code and GPS coordinates.

**Step 2: Ground-Truth Correlation**
-   Analyze the satellite image to understand the context of the property (e.g., is it a standalone house, an apartment building, a commercial storefront?). The visual style should be consistent with the architecture of the specified country ('{{{countryCode}}}').
-   Critically examine the door photo. Analyze the entryway's features: door style (wood, metal, glass), color, surrounding wall materials (brick, siding, concrete), presence of windows, a porch, stairs, etc.
-   Correlate the two images. Do the features in the door photo plausibly belong to the building seen in the satellite image? For example, a residential-style door photo should correspond to a house or apartment building in the satellite view, not a large warehouse. The validation fails if there is a major architectural inconsistency.

**Step 3: Final Decision**
-   Based on the successful completion of all prior steps, determine if the door photo is a valid and authentic representation of an entrance at the specified property and country.
-   Provide a concise summary of your findings in the validation details.

Door Photo: {{media url=doorPhotoDataUri}}
GPS Coordinates: {{{gpsCoordinates}}}
Satellite Image: {{media url=satelliteImageDataUri}}
User's Crypto Address: {{{cryptoAddress}}}
User's Physical Address: {{{physicalAddress}}}
Country Code: {{{countryCode}}}`,
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
