# AddressChain Source Code Bundle

This document contains a bundled version of the source code for the AddressChain application, intended for copyright registration purposes.

---

## File: `apphosting.yaml`

```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1

```

---

## File: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---

## File: `lucide-react.d.ts`

```ts

declare module 'lucide-react' {
  import { SVGProps } from 'react';

  export type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

  export const ArrowRight: Icon;
  export const KeyRound: Icon;
  export const Mail: Icon;
  export const Lock: Icon;
  export const LayoutDashboard: Icon;
  export const MapPin: Icon;
  export const PlusCircle: Icon;
  export const Settings: Icon;
  export const Bell: Icon;
  export const UserCircle: Icon;
  export const LogOut: Icon;
  export const Wallet: Icon;
  export const Activity: Icon;
  export const QrCode: Icon;
  export const Copy: Icon;
  export const Users: Icon;
  export const CheckCircle2: Icon;
  export const MoreVertical: Icon;
  export const ChevronRight: Icon;
  export const UserCheck: Icon;
  export const UserX: Icon;
  export const Home: Icon;
  export const Building: Icon;
  export const UploadCloud: Icon;
  export const CheckCircle: Icon;
  export const ArrowLeft: Icon;
  export const User: Icon;
  export const XCircle: Icon;
  export const Camera: Icon;
  export const LocateFixed: Icon;
  export const AlertTriangle: Icon;
  export const RefreshCw: Icon;
  export const Eye: Icon;
  export const UserPlus: Icon;
  export const CandlestickChart: Icon;
  export const ArrowLeftRight: Icon;
  export const TrendingUp: Icon;
  export const TrendingDown: Icon;
  export const PanelLeft: Icon;
  export const Circle: Icon;
  export const Check: Icon;
  export const ChevronUp: Icon;
  export const X: Icon;
  export const Globe: Icon;
  export const Save: Icon;
  export const FileText: Icon;
  export const History: Icon;
  export const ShoppingCart: Icon;
  export const ShieldAlert: Icon;
  export const Loader2: Icon;
  export const Briefcase: Icon;
  export const ShieldCheck: Icon;
  export const DollarSign: Icon;
  export const ArrowUpRight: Icon;
  export const Phone: Icon;
  export const Calendar: Icon;
  export const Fingerprint: Icon;
  export const ArchiveRestore: Icon;
  export const ChevronDown: Icon;
  export const MoreHorizontal: Icon;
  export const Edit: Icon;
  export const Trash2: Icon;
  export const Search: Icon;
  export const Link: Icon;
}

```

---

## File: `next.config.ts`

```ts

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

```

---

## File: `package.json`

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.14.1",
    "@genkit-ai/next": "^1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---

## File: `src/ai/dev.ts`

```ts
import { config } from 'dotenv';
config();

import '@/ai/flows/validate-door-photo.ts';
import '@/ai/flows/compare-validation-photos.ts';
import '@/ai/flows/generate-address-report.ts';
import '@/ai/flows/find-address-by-clue.ts';
import '@/ai/flows/analyze-feedback.ts';

```

---

## File: `src/ai/flows/analyze-feedback.ts`

```ts
'use server';

/**
 * @fileOverview An AI agent that analyzes user feedback to categorize, prioritize, and suggest actions.
 *
 * - analyzeFeedback - A function that handles the feedback analysis.
 * - AnalyzeFeedbackInput - The input type for the analyzeFeedback function.
 * - AnalyzeFeedbackOutput - The return type for the analyzeFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeFeedbackInputSchema = z.object({
  category: z.string().describe("The user-selected category for their feedback."),
  subject: z.string().describe("The subject line of the feedback submission."),
  message: z.string().describe("The full text of the user's feedback message."),
  userContext: z.object({
      name: z.string(),
      email: z.string(),
      accountTier: z.enum(['Free', 'Standard', 'Pro', 'Enterprise']),
  }).describe("Context about the user submitting the feedback."),
});
export type AnalyzeFeedbackInput = z.infer<typeof AnalyzeFeedbackInputSchema>;

const AnalyzeFeedbackOutputSchema = z.object({
  summary: z.string().describe("A concise, one-sentence summary of the user's issue."),
  autoCategory: z.enum(['Bug Report', 'Feature Request', 'Account Issue', 'Billing', 'General Inquiry', 'Validation Problem']).describe("The AI's refined categorization of the issue based on the message content."),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).describe("The suggested priority level for this ticket."),
  suggestedAction: z.string().describe("A concrete, actionable next step for the admin team to take."),
});
export type AnalyzeFeedbackOutput = z.infer<typeof AnalyzeFeedbackOutputSchema>;


export async function analyzeFeedback(
  input: AnalyzeFeedbackInput
): Promise<AnalyzeFeedbackOutput> {
  return analyzeFeedbackFlow(input);
}


const prompt = ai.definePrompt({
  name: 'analyzeFeedbackPrompt',
  input: { schema: AnalyzeFeedbackInputSchema },
  output: { schema: AnalyzeFeedbackOutputSchema },
  prompt: `You are an AI Support Ticket Analyst for a high-tech digital identity and address verification platform. Your job is to process incoming user feedback, triage it, and provide a clear, actionable summary for the human support team.

You will receive a piece of user feedback, including the user's own category choice, their message, and some context about their account.

Your analysis must be sharp and action-oriented. Follow these steps:

1.  **Summarize the Core Issue:** Read the user's message and distill it into a single, clear sentence.
2.  **Refine the Category:** The user's category is a starting point, but you must use the message content to determine the most accurate category from the available options. For example, if a user selects "General Feedback" but describes something broken, you should re-categorize it as "Bug Report".
3.  **Assess Priority:** Determine the urgency.
    -   **Critical:** Platform-wide outage, security vulnerability, user cannot access their account at all.
    -   **High:** Major feature is broken, payment/billing issues, validation is failing for a paying customer.
    -   **Medium:** Minor feature issue, UI bug, single user experiencing a non-critical problem.
    -   **Low:** General feedback, feature request, cosmetic issue.
    Consider the user's account tier. Issues from 'Pro' or 'Enterprise' users should generally have a higher priority.
4.  **Suggest a Next Action:** Provide a clear, direct instruction for the support team. Examples: "Escalate to engineering team with bug reproduction steps.", "Forward to billing department to investigate transaction ID.", "Add this idea to the feature request board for consideration.", "Send the user the 'How to Reset Your Password' guide."

**User Information:**
- Name: {{{userContext.name}}}
- Email: {{{userContext.email}}}
- Account Tier: {{{userContext.accountTier}}}

**Feedback Details:**
- User's Category: {{{category}}}
- Subject: {{{subject}}}
- Message:
---
{{{message}}}
---

Now, provide your analysis in the specified JSON format.`,
});

const analyzeFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeFeedbackFlow',
    inputSchema: AnalyzeFeedbackInputSchema,
    outputSchema: AnalyzeFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
```

---

## File: `src/ai/flows/compare-validation-photos.ts`

```ts
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
```

---

## File: `src/ai/flows/find-address-by-clue.ts`

```ts
'use server';

/**
 * @fileOverview An AI agent that finds a digital address based on various user-provided clues.
 *
 * - findAddressByClue - A function that handles the address search process.
 * - FindAddressByClueInput - The input type for the findAddressByClue function.
 * - FindAddressByClueOutput - The return type for the findAddressByClue function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FindAddressByClueInputSchema = z.object({
  clue: z.string().describe('A piece of information about the user or address, such as a name, email, phone number, physical address fragment, ID number, or title deed number.'),
});
export type FindAddressByClueInput = z.infer<typeof FindAddressByClueInputSchema>;

const FoundAddressSchema = z.object({
    nftId: z.string().describe("The user's Digital Address NFT ID."),
    ownerName: z.string().describe("The full name of the address owner."),
    physicalAddress: z.string().describe("The full physical address."),
    status: z.enum(['Verified', 'Pending', 'Compromised']).describe("The current status of the address."),
});

const FindAddressByClueOutputSchema = z.object({
    foundAddresses: z.array(FoundAddressSchema).describe('A list of addresses that match the clue. Returns an empty array if no matches are found.'),
});
export type FindAddressByClueOutput = z.infer<typeof FindAddressByClueOutputSchema>;


export async function findAddressByClue(
  input: FindAddressByClueInput
): Promise<FindAddressByClueOutput> {
  // In a real application, you might perform a preliminary database search here
  // and pass the results as context to the AI.
  // For this prototype, we'll pass a simulated block of data directly to the prompt.
  const simulatedDatabase = `
    - User: John Doe, Email: john.doe@example.com, Phone: +1-555-123-4567, ID: D1234567, Address NFT: 0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B, Physical Address: 123 Main Street, Anytown, USA 12345, Status: Verified, Title Deed: T-111
    - User: Jane Doe, Email: jane.doe@example.com, Phone: +1-555-987-6543, ID: D7654321, Address NFT: 0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B, Status: Verified (Family Member)
    - User: Alice Johnson, Email: alice.j@example.com, Phone: +44-20-7946-0958, ID: AJ-998877, Address NFT: 0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C, Physical Address: 789 Pine Lane, Lakeside, USA 54321, Status: Pending
    - User: Charlie Brown, Email: charlie.b@example.com, Phone: +1-217-555-0198, ID: CB-45678, Address NFT: 0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C, Physical Address: 456 Oak Avenue, Springfield, USA 67890, Status: Verified
    - User: Nicholas C., Email: nicholas@digitaladdress.com, Phone: +1-ADMIN-PHONE, ID: NC-001, Address NFT: 0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D, Physical Address: 101 Industrial Way, Floodzone, USA 98765, Status: Compromised, Title Deed: T-222
  `;
  return findAddressByClueFlow({ ...input, simulatedDatabase });
}


const prompt = ai.definePrompt({
  name: 'findAddressByCluePrompt',
  input: {
    schema: FindAddressByClueInputSchema.extend({
      simulatedDatabase: z.string(),
    }),
  },
  output: { schema: FindAddressByClueOutputSchema },
  prompt: `You are an AI Forensic Data Analyst for the Digital Address system. Your mission is to locate a user's Digital Address NFT based on a single piece of identifying information (a "clue"). This is often used in emergency situations.

You will be given a clue and a raw text block representing the system's user and address database. Your task is to intelligently search this data and find all matching records.

The clue could be:
- A full or partial name (e.g., "John", "Doe", "nicholas@digitaladdress.com")
- A phone number
- An ID or Passport number (e.g., "D1234567")
- A Title Deed number (e.g., "T-222")
- A physical address fragment (e.g., "123 Main", "Springfield")
- An NFT Address

Analyze the clue: {{{clue}}}

Search through this data block:
---
{{{simulatedDatabase}}}
---

Based on your analysis, return a list of all matching addresses in the specified JSON format. If a user is a family member without their own physical address, return the primary address they are associated with. If no records match, return an empty array.`,
});

const findAddressByClueFlow = ai.defineFlow(
  {
    name: 'findAddressByClueFlow',
    inputSchema: FindAddressByClueInputSchema.extend({
        simulatedDatabase: z.string(),
    }),
    outputSchema: FindAddressByClueOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
```

---

## File: `src/ai/flows/generate-address-report.ts`

```ts
'use server';

/**
 * @fileOverview An AI agent that generates a due diligence report for a digital address NFT.
 *
 * - generateAddressReport - A function that handles the report generation process.
 * - GenerateAddressReportInput - The input type for the generateAddressReport function.
 * - GenerateAddressReportOutput - The return type for the generateAddressReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAddressReportInputSchema = z.object({
  addressNftId: z.string().describe('The unique NFT identifier for the digital address.'),
  physicalAddress: z.string().describe('The full physical address being investigated.'),
});
export type GenerateAddressReportInput = z.infer<typeof GenerateAddressReportInputSchema>;

const GenerateAddressReportOutputSchema = z.object({
  listingSummary: z.string().describe('A summary of where this address NFT is currently or was previously listed for sale or rent.'),
  commercialUsage: z.array(z.string()).describe('A list of known commercial services (e.g., e-commerce, food delivery) associated with this address.'),
  verificationHistory: z.array(z.string()).describe('A timeline of key verification and validation events for this address.'),
  riskAssessment: z.object({
    level: z.enum(['Low', 'Medium', 'High']).describe('The overall risk level associated with this address.'),
    findings: z.array(z.string()).describe('A list of potential risks or red flags found during the investigation.'),
  }),
  overallAssessment: z.string().describe('A final, concise summary of the address\'s digital provenance and trustworthiness.'),
});
export type GenerateAddressReportOutput = z.infer<typeof GenerateAddressReportOutputSchema>;

export async function generateAddressReport(
  input: GenerateAddressReportInput
): Promise<GenerateAddressReportOutput> {
  // In a real application, this is where you would fetch data from various internal
  // and partner databases (e.g., transaction history, service usage logs, KYC flags).
  // For this prototype, we'll pass simulated context to the prompt.
  const simulatedContext = {
    marketplaceListings: 'Found listings on OpenSea (delisted), Rarible (active, 10 ETH), and internal exchange (active, 9.5 ETH).',
    servicePartners: 'Address registered with Amazon Prime, Uber Eats, and FedEx Delivery Manager since 2023.',
    kycHistory: 'Two KYC checks passed (Coinbase, 2023; Stripe, 2024). One failed KYC attempt on a non-partner exchange (2024-03-12).',
    ownershipHistory: 'Minted 2023-10-26. Transferred once on 2024-01-15.',
  };
  return generateAddressReportFlow({ ...input, ...simulatedContext });
}

const prompt = ai.definePrompt({
  name: 'generateAddressReportPrompt',
  input: {
    schema: GenerateAddressReportInputSchema.extend({
      marketplaceListings: z.string(),
      servicePartners: z.string(),
      kycHistory: z.string(),
      ownershipHistory: z.string(),
    }),
  },
  output: { schema: GenerateAddressReportOutputSchema },
  prompt: `You are a Digital Property Investigator. Your mission is to conduct a thorough due diligence check on a specific digital address NFT and its associated physical location. You must be objective, factual, and concise.

Your goal is to provide a comprehensive report that helps a potential buyer or service provider assess the trustworthiness and history of this address.

**Address for Investigation:**
- NFT ID: {{{addressNftId}}}
- Physical Address: {{{physicalAddress}}}

**Internal Data Sources (Simulated):**
- Ownership History: {{{ownershipHistory}}}
- Marketplace Listings: {{{marketplaceListings}}}
- Registered Service Partners: {{{servicePartners}}}
- KYC/Verification History: {{{kycHistory}}}

**Your Task:**
Based *only* on the provided data, generate a structured report.

1.  **Listing Summary:** Summarize the current and past marketplace activity.
2.  **Commercial Usage:** List the commercial services this address is registered with.
3.  **Verification History:** Create a chronological list of key events like minting, transfers, and KYC checks.
4.  **Risk Assessment:** Analyze the data for any potential red flags. A single failed KYC check should elevate the risk to at least 'Medium'. Multiple transfers in a short period could also be a flag. If no issues are found, the risk is 'Low'. Clearly list your findings.
5.  **Overall Assessment:** Provide a brief, final summary of the address's digital standing.

Present your findings clearly and professionally in the specified JSON format. Do not invent any information not present in the provided data sources.`,
});


const generateAddressReportFlow = ai.defineFlow(
  {
    name: 'generateAddressReportFlow',
    inputSchema: GenerateAddressReportInputSchema.extend({
        marketplaceListings: z.string(),
        servicePartners: z.string(),
        kycHistory: z.string(),
        ownershipHistory: z.string(),
    }),
    outputSchema: GenerateAddressReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
```

---

## File: `src/ai/flows/validate-door-photo.ts`

```ts
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

---

## File: `src/ai/genkit.ts`

```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

```

---

## File: `src/app/access-requests/data.ts`

```ts
export const initialRequests = [
  {
    id: 'REQ-001',
    name: 'Alice Johnson',
    avatar: 'https://placehold.co/100x100.png',
    purpose: 'Tenant',
    date: '2024-08-15',
    status: 'Pending',
    address: '123 Main Street, Anytown, USA 12345',
    houseNumber: 'Apt 2B',
    doorPicture: 'https://placehold.co/400x300.png',
  },
  {
    id: 'REQ-002',
    name: 'Bob Williams',
    avatar: 'https://placehold.co/100x100.png',
    purpose: 'Family Member',
    date: '2024-08-14',
    status: 'Pending',
    address: '123 Main Street, Anytown, USA 12345',
  },
  {
    id: 'REQ-003',
    name: 'Charlie Brown',
    avatar: 'https://placehold.co/100x100.png',
    purpose: 'Guest (Short-term)',
    date: '2024-08-12',
    status: 'Pending',
    address: '456 Oak Avenue, Springfield, USA 67890',
  },
    {
    id: 'REQ-004',
    name: 'David Smith',
    avatar: 'https://placehold.co/100x100.png',
    purpose: 'Tenant',
    date: '2024-07-20',
    status: 'Approved',
    address: '123 Main Street, Anytown, USA 12345',
    houseNumber: 'Apt 3C',
    doorPicture: 'https://placehold.co/400x300.png',
  },
  {
    id: 'REQ-005',
    name: 'Eve Davis',
    avatar: 'https://placehold.co/100x100.png',
    purpose: 'Family Member',
    date: '2024-07-18',
    status: 'Rejected',
    address: '123 Main Street, Anytown, USA 12345',
  },
];

export type AccessRequest = typeof initialRequests[0];

```

---

## File: `src/app/access-requests/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MoreVertical,
  ChevronRight,
  UserCheck,
  UserX,
  Trash2,
  Building,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { initialRequests, type AccessRequest } from './data';
import { AppLayout } from '@/components/layout/app-layout';

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const [requestToDelete, setRequestToDelete] = useState<AccessRequest | null>(null);
  const { toast } = useToast();

  const handleRequestAction = (requestId: string, newStatus: 'Approved' | 'Rejected') => {
    const request = requests.find(req => req.id === requestId);
    if (!request) return;
    
    setRequests(requests.map(req => req.id === requestId ? { ...req, status: newStatus } : req));
     toast({
      title: `Request ${newStatus}`,
      description: `The access request from ${request.name} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleDeleteRequest = () => {
    if (!requestToDelete) return;

    setRequests(requests.filter(req => req.id !== requestToDelete.id));
    toast({
      variant: "destructive",
      title: "Request Deleted",
      description: `The access request from ${requestToDelete.name} has been removed.`,
    });
    setRequestToDelete(null);
  };
  
  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Manage Access Requests</CardTitle>
                <CardDescription>Review, approve, or reject requests for others to use your verified addresses.</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="w-[250px]">Requester</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                      <TableBody>
                        {requests.map((request) => (
                           <React.Fragment key={request.id}>
                            <TableRow className="hover:bg-muted/50">
                              <TableCell>
                                {request.purpose === 'Tenant' && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpenCollapsible(prev => prev === request.id ? null : request.id)}>
                                        <ChevronRight className={cn("h-4 w-4 transition-transform", openCollapsible === request.id && "rotate-90")} />
                                    </Button>
                                )}
                              </TableCell>
                              <TableCell>
                                  <div className="flex items-center gap-3">
                                      <Avatar>
                                          <AvatarImage src={request.avatar} alt={request.name} data-ai-hint="person avatar"/>
                                          <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{request.name}</span>
                                  </div>
                              </TableCell>
                              <TableCell>{request.purpose}</TableCell>
                              <TableCell className="text-muted-foreground">{request.address}</TableCell>
                              <TableCell className="text-muted-foreground">{request.date}</TableCell>
                              <TableCell>
                                  <Badge variant={
                                      request.status === 'Approved' ? 'default' : request.status === 'Rejected' ? 'destructive' : 'secondary'
                                  } className={
                                      request.status === 'Approved' ? 'bg-green-100 text-green-800' : request.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                                  }>
                                      {request.status}
                                  </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                  </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      {request.status === 'Pending' && (
                                        <>
                                          <DropdownMenuItem onClick={() => handleRequestAction(request.id, 'Approved')}>
                                              <UserCheck className="mr-2 h-4 w-4" />
                                              Approve
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => handleRequestAction(request.id, 'Rejected')} className="text-destructive">
                                              <UserX className="mr-2 h-4 w-4" />
                                              Reject
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                        </>
                                      )}
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-destructive" onSelect={(e) => { e.preventDefault(); setRequestToDelete(request); }}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                              </TableCell>
                            </TableRow>
                            {request.purpose === 'Tenant' && openCollapsible === request.id && (
                                <TableRow>
                                    <TableCell colSpan={7} className="p-0">
                                      <div className="bg-secondary/50 p-6">
                                        <h4 className="font-semibold text-lg mb-4">Tenant Details</h4>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                              <div className="flex items-center gap-2">
                                                  <Building className="h-5 w-5 text-muted-foreground" />
                                                  <div>
                                                      <p className="text-sm text-muted-foreground">House/Apt Number</p>
                                                      <p className="font-medium">{request.houseNumber}</p>
                                                  </div>
                                              </div>
                                            </div>
                                            <div>
                                              <p className="text-sm text-muted-foreground mb-2">Door Picture</p>
                                              <Image src={request.doorPicture!} alt={`Door for ${request.houseNumber}`} width={200} height={150} className="rounded-lg border shadow-md" data-ai-hint="apartment door"/>
                                            </div>
                                        </div>
                                      </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            </React.Fragment>
                        ))}
                      </TableBody>
                </Table>

                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the access request from <span className="font-semibold">{requestToDelete?.name}</span>.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setRequestToDelete(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteRequest}>
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/address-audit/page.tsx`

```tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, CheckCircle2, History, MoreHorizontal, Search, Loader2 } from 'lucide-react';
import { countries } from '@/lib/countries';
import { Input } from '@/components/ui/input';
import { findAddressByClue, type FindAddressByClueOutput } from '@/ai/flows/find-address-by-clue';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';

const allValidationActivities = [
  { id: 'VAL-001', address: '123 Main St, Anytown, US', date: '2024-08-15', status: 'Verified', validator: 'ValidatorCorp' },
  { id: 'VAL-002', address: '456 Oak Ave, Springfield, US', date: '2024-08-14', status: 'Pending', validator: 'N/A' },
  { id: 'VAL-003', address: '10 Downing St, London, GB', date: '2024-08-12', status: 'Verified', validator: 'UKVerify' },
  { id: 'VAL-004', address: '221B Baker St, London, GB', date: '2024-08-11', status: 'Rejected', validator: 'UKVerify' },
  { id: 'VAL-005', address: '789 Pine Ln, Lakeside, US', date: '2024-08-10', status: 'Verified', validator: 'ValidatorCorp' },
  { id: 'VAL-006', address: '1600 Amphitheatre Pkwy, Mountain View, US', date: '2024-08-09', status: 'Pending', validator: 'N/A' },
  { id: 'VAL-007', address: 'Brandenburg Gate, Berlin, DE', date: '2024-08-08', status: 'Verified', validator: 'DEPrüfung' },
];

export default function AddressAuditPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FindAddressByClueOutput | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults(null);
    try {
      const results = await findAddressByClue({ clue: searchQuery });
      setSearchResults(results);
       if (results.foundAddresses.length === 0) {
        toast({
          title: "No Results Found",
          description: "The search query did not match any records.",
        });
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const filteredActivities = useMemo(() => {
    if (selectedCountry === 'ALL') {
      return allValidationActivities;
    }
    return allValidationActivities.filter(activity => activity.address.endsWith(`, ${selectedCountry}`));
  }, [selectedCountry]);
  
   const getStatusBadge = (status: 'Verified' | 'Pending' | 'Compromised' | 'Rejected') => {
    switch (status) {
      case 'Verified':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Compromised':
        return <Badge variant="destructive">Compromised</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verified Addresses</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254,890</div>
              <p className="text-xs text-muted-foreground">+5,210 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Validation</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,432</div>
              <p className="text-xs text-muted-foreground">78 new today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries Active</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">+2 since last quarter</p>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Identity Search</CardTitle>
                <CardDescription>
                    In an emergency, find a user's address with any clue (name, ID, phone, etc.).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Enter a name, email, address fragment, phone, or ID number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                        {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Search
                    </Button>
                </div>
            </CardContent>
            {isSearching && (
              <CardFooter>
                  <p className="text-sm text-muted-foreground">Searching immutable records...</p>
              </CardFooter>
            )}
             {searchResults && searchResults.foundAddresses.length > 0 && (
                <CardContent>
                    <h3 className="font-semibold mb-2">Search Results</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Owner</TableHead>
                                <TableHead>Physical Address</TableHead>
                                <TableHead>NFT ID</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {searchResults.foundAddresses.map(result => (
                                <TableRow key={result.nftId}>
                                    <TableCell>{result.ownerName}</TableCell>
                                    <TableCell>{result.physicalAddress}</TableCell>
                                    <TableCell className="font-mono">{result.nftId}</TableCell>
                                    <TableCell>{getStatusBadge(result.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle>Validation Activity Log</CardTitle>
                    <CardDescription>
                    {selectedCountry === 'ALL' ? 'Global overview of recent address validations.' : `Showing activities for ${countries.find(c => c.code === selectedCountry)?.name}.`}
                    </CardDescription>
                </div>
                <div className="w-full md:w-64">
                    <Select onValueChange={setSelectedCountry} value={selectedCountry}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Countries</SelectItem>
                            {countries.map(country => (
                                <SelectItem key={country.code} value={country.code}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Validator</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.address}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>
                      {getStatusBadge(activity.status as 'Verified' | 'Pending' | 'Rejected')}
                    </TableCell>
                    <TableCell>{activity.validator}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/b2b-clients/client-table.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';
import { OnboardingDialog, Client } from './onboarding-dialog';
import { useToast } from '@/hooks/use-toast';
import { initialClients } from './clients';

export function ClientTable() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toast } = useToast();

  const handleSaveClient = (client: Client) => {
    if (editingClient) {
      // Update existing client
      setClients(clients.map(c => c.id === client.id ? client : c));
      toast({ title: 'Client Updated', description: `${client.companyName} has been updated.` });
    } else {
      // Add new client
      const newClient = { ...client, id: `cli_${Date.now()}` };
      setClients([newClient, ...clients]);
      toast({ title: 'Client Added', description: `${client.companyName} is now pending review.` });
    }
    setEditingClient(null);
  };
  
  const handleEdit = (client: Client) => {
      setEditingClient(client);
      setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingClient(null);
    setIsDialogOpen(true);
  };

  const handleSetStatus = (clientId: string, status: 'Active' | 'Rejected') => {
      setClients(clients.map(c => c.id === clientId ? {...c, status} : c));
      const clientName = clients.find(c => c.id === clientId)?.companyName;
      toast({ title: `Client ${status}`, description: `${clientName} has been marked as ${status.toLowerCase()}.` });
  }

  const handleDelete = (clientId: string) => {
      const clientName = clients.find(c => c.id === clientId)?.companyName;
      setClients(clients.filter(c => c.id !== clientId));
      toast({ variant: 'destructive', title: `Client Deleted`, description: `${clientName} has been removed.` });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>B2B Client Management</CardTitle>
            <CardDescription>
              Onboard, review, and manage your business clients.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2" />
            Add New Client
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Onboarded Since</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.companyName}</TableCell>
                <TableCell>
                    <Badge variant={
                        client.status === 'Active' ? 'default' : client.status === 'Rejected' ? 'destructive' : 'secondary'
                    } className={
                        client.status === 'Active' ? 'bg-green-100 text-green-800' : client.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                    }>
                        {client.status}
                    </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{client.plan}</Badge>
                </TableCell>
                <TableCell>{client.contactName}</TableCell>
                <TableCell>{client.onboardedSince}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       {client.status === 'Pending Review' && (
                           <>
                                <DropdownMenuItem onClick={() => handleSetStatus(client.id, 'Active')}>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleSetStatus(client.id, 'Rejected')}>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Reject
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                           </>
                       )}
                       <DropdownMenuItem onClick={() => handleEdit(client)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(client.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <OnboardingDialog 
            isOpen={isDialogOpen} 
            setIsOpen={setIsDialogOpen}
            onSave={handleSaveClient}
            client={editingClient}
        />
    </Card>
  );
}
```

---

## File: `src/app/admin/b2b-clients/clients.ts`

```ts
export const initialClients = [
  {
    id: 'cli_1',
    companyName: 'Global Logistics',
    status: 'Active' as const,
    plan: 'Enterprise',
    contactName: 'Dana Smith',
    contactEmail: 'd.smith@globallogistics.com',
    countryOfRegistration: 'US',
    countriesOfOperation: ['US', 'CA', 'MX'],
    registrationNumber: 'GLO-12345',
    taxId: 'US123456789',
    billingAddressNftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B',
    bankName: 'Global Bank',
    bankAccountNumber: '...1234',
    onboardedSince: '2024-05-10',
  },
  {
    id: 'cli_2',
    companyName: 'E-Shop Now',
    status: 'Active' as const,
    plan: 'Standard',
    contactName: 'Mike Johnson',
    contactEmail: 'manager@eshopnow.com',
    countryOfRegistration: 'GB',
    countriesOfOperation: ['GB', 'FR', 'DE'],
    registrationNumber: 'ESN-98765',
    taxId: 'GB987654321',
    billingAddressNftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
    bankName: 'Commerce Bank',
    bankAccountNumber: '...5678',
    onboardedSince: '2024-06-22',
  },
  {
    id: 'cli_3',
    companyName: 'Quick Couriers',
    status: 'Pending Review' as const,
    plan: 'Standard',
    contactName: 'Maria Garcia',
    contactEmail: 'maria.g@qcouriers.com',
    countryOfRegistration: 'ES',
    countriesOfOperation: ['ES', 'PT'],
    registrationNumber: 'QC-55555',
    taxId: 'ES555555555',
    billingAddressNftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
    bankName: 'Rapid Bank',
    bankAccountNumber: '...9012',
    onboardedSince: '2024-08-01',
  },
   {
    id: 'cli_4',
    companyName: 'Invalid Ventures',
    status: 'Rejected' as const,
    plan: 'Standard',
    contactName: 'John Doe',
    contactEmail: 'john.d@invalid.com',
    countryOfRegistration: 'US',
    countriesOfOperation: ['US'],
    registrationNumber: 'INV-00000',
    taxId: 'IV000000000',
    billingAddressNftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D',
    bankName: 'Questionable Bank',
    bankAccountNumber: '...0000',
    onboardedSince: '2024-08-05',
  },
];
```

---

## File: `src/app/admin/b2b-clients/onboarding-dialog.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, KeyRound } from 'lucide-react';
import { pricingPlans } from '../pricing-data';
import { countries } from '@/lib/countries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { verifyNftId } from '@/lib/verify-nft';
import { useToast } from '@/hooks/use-toast';

const clientSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required.'),
  registrationNumber: z.string().min(1, 'Registration number is required.'),
  taxId: z.string().min(1, 'Tax ID / VAT number is required.'),
  plan: z.string().min(1, 'A plan must be selected.'),
  countryOfRegistration: z.string().min(1, 'Country of registration is required.'),
  countriesOfOperation: z.array(z.string()).min(1, 'At least one country of operation must be selected.'),
  
  contactName: z.string().min(1, 'Contact name is required.'),
  contactEmail: z.string().email('Please enter a valid email for the contact.'),
  
  billingAddressNftId: z.string().min(1, 'Digital Address NFT ID is required.').startsWith('0x', { message: "Must be a valid blockchain address starting with 0x"}),
  bankName: z.string().min(1, 'Bank name is required.'),
  bankAccountNumber: z.string().min(1, 'Bank account number is required.'),

  status: z.enum(['Pending Review', 'Active', 'Rejected']).default('Pending Review'),
  onboardedSince: z.string().default(new Date().toISOString().split('T')[0]),
});

export type Client = z.infer<typeof clientSchema>;

interface OnboardingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (client: Client) => void;
  client: Client | null;
}

const defaultValues = {
      companyName: '',
      registrationNumber: '',
      taxId: '',
      plan: 'Standard',
      countryOfRegistration: '',
      countriesOfOperation: [],
      contactName: '',
      contactEmail: '',
      billingAddressNftId: '',
      bankName: '',
      bankAccountNumber: '',
      status: 'Pending Review' as const,
      onboardedSince: new Date().toISOString().split('T')[0],
};

export function OnboardingDialog({ isOpen, setIsOpen, onSave, client }: OnboardingDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('company');
  const { toast } = useToast();

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: client ? { ...client, countriesOfOperation: client.countriesOfOperation || [] } : defaultValues,
  });

  useEffect(() => {
    if (client) {
      form.reset({ ...client, countriesOfOperation: client.countriesOfOperation || [] });
    } else {
      form.reset(defaultValues);
    }
    setCurrentTab('company');
  }, [client, form, isOpen]);


  const handleNextTab = async () => {
    let fieldsToValidate: (keyof Client)[] = [];
    let nextTab = '';

    switch (currentTab) {
        case 'company':
            fieldsToValidate = ['companyName', 'registrationNumber', 'taxId', 'plan', 'countryOfRegistration'];
            nextTab = 'operations';
            break;
        case 'operations':
            fieldsToValidate = ['countriesOfOperation'];
            nextTab = 'contact';
            break;
        case 'contact':
            fieldsToValidate = ['contactName', 'contactEmail'];
            nextTab = 'billing';
            break;
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
        setCurrentTab(nextTab);
    }
  };

  const handleBackTab = () => {
    switch (currentTab) {
        case 'billing': setCurrentTab('contact'); break;
        case 'contact': setCurrentTab('operations'); break;
        case 'operations': setCurrentTab('company'); break;
    }
  }

  const onSubmit = async (data: Client) => {
    setIsLoading(true);

    try {
      // Step 1: Verify the NFT ID
      const verificationResult = await verifyNftId(data.billingAddressNftId);

      if (!verificationResult.success) {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: verificationResult.message,
        });
        setIsLoading(false);
        return;
      }

      // Step 2: Proceed with saving if verification is successful
      // Simulate API call for saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(data);
      setIsOpen(false);
      setCurrentTab('company');

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Onboarding Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{client ? 'Edit Client' : 'Onboard New B2B Client'}</DialogTitle>
          <DialogDescription>
            {client ? 'Update the details for this client.' : 'Fill in the details to add a new business client.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <div className="py-4 max-h-[50vh] overflow-y-auto px-1">
                <TabsContent value="company" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                        control={form.control}
                        name="countryOfRegistration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country of Registration</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries.map(country => (
                                            <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                   <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Business Registration No.</FormLabel>
                        <FormControl><Input placeholder="e.g., 1234567-8" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="taxId" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tax ID / VAT Number</FormLabel>
                        <FormControl><Input placeholder="e.g., EU123456789" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                   </div>
                   <FormField control={form.control} name="plan" render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a plan" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {pricingPlans.map(plan => (
                                <SelectItem key={plan.name} value={plan.name}>{plan.name} ({plan.price})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TabsContent>
                <TabsContent value="operations" className="space-y-4">
                    <FormField
                        control={form.control}
                        name="countriesOfOperation"
                        render={() => (
                            <FormItem>
                                <FormLabel>Countries of Operation</FormLabel>
                                <FormDescription>
                                    Select all countries where this client will be utilizing address services.
                                </FormDescription>
                                <ScrollArea className="h-64 rounded-md border p-4">
                                    {countries.map((country) => (
                                        <FormField
                                            key={country.code}
                                            control={form.control}
                                            name="countriesOfOperation"
                                            render={({ field }) => (
                                                <FormItem
                                                    key={country.code}
                                                    className="flex flex-row items-start space-x-3 space-y-0 py-2"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(country.code)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...(field.value || []), country.code])
                                                                    : field.onChange(field.value?.filter((value) => value !== country.code));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{country.name}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </ScrollArea>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </TabsContent>
                <TabsContent value="contact" className="space-y-4">
                    <FormField control={form.control} name="contactName" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Person's Full Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="contactEmail" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Person's Email</FormLabel>
                        <FormControl><Input type="email" placeholder="e.g., jane.doe@example.com" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                </TabsContent>
                <TabsContent value="billing" className="space-y-4">
                    <Alert>
                        <AlertTitle>Billing Address Requirement</AlertTitle>
                        <AlertDescription>
                            The client must have a registered Digital Address for billing. Ask the client to provide their verified Address NFT ID. If they don't have one, they must register one first.
                        </AlertDescription>
                    </Alert>
                    <FormField control={form.control} name="billingAddressNftId" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Digital Address NFT ID</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="0x..." {...field} className="pl-10 font-mono" />
                            </div>
                         </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="bankName" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl><Input placeholder="e.g., First National Bank" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bankAccountNumber" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bank Account Number</FormLabel>
                            <FormControl><Input placeholder="e.g., 123-456-789" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </TabsContent>
              </div>
            </Tabs>
            <DialogFooter className="pt-4 border-t">
              {currentTab !== 'company' && (
                <Button type="button" variant="outline" onClick={handleBackTab}>
                  Back
                </Button>
              )}
              {currentTab !== 'billing' ? (
                 <Button type="button" onClick={handleNextTab}>
                   Next
                 </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? 'Verifying...' : client ? 'Save Changes' : 'Submit for Review'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

## File: `src/app/admin/b2b-clients/page.tsx`

```tsx
'use client';

import React from 'react';
import { ClientTable } from './client-table';
import { AppLayout } from '@/components/layout/app-layout';

export default function B2bClientsPage() {
  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <ClientTable />
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/dashboard/data.ts`

```ts
export const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

export const adminUsers = [
    { name: 'Alice Johnson', email: 'alice.j@digitaladdress.com', role: 'Super Admin', status: 'Active' },
    { name: 'Bob Williams', email: 'bob.w@digitaladdress.com', role: 'Admin Assistant', status: 'Active' },
    { name: 'Charlie Brown', email: 'charlie.b@digitaladdress.com', role: 'Admin Assistant', status: 'Inactive' },
];

export const b2bClients = [
    { company: 'Global Logistics', contact: 'd.smith@globallogistics.com', plan: 'Enterprise', since: '2024-05-10'},
    { company: 'E-Shop Now', contact: 'manager@eshopnow.com', plan: 'Standard', since: '2024-06-22'},
    { company: 'Finance Corp', contact: 'compliance@financecorp.com', plan: 'Enterprise', since: '2024-07-01'},
];
```

---

## File: `src/app/admin/dashboard/page.tsx`

```tsx
'use client';

import React from 'react';
import {
  DollarSign,
  Users,
  Briefcase,
  MoreHorizontal,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { adminUsers, b2bClients, revenueData } from './data';
import { AppLayout } from '@/components/layout/app-layout';


export default function AdminDashboardPage() {
  return (
    <AppLayout nav="admin">
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active B2B Clients</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+57</div>
                    <p className="text-xs text-muted-foreground">+12 since last quarter</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly income from API services and marketplace fees.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}K`} />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Admin Assistants</CardTitle>
                    <CardDescription>Manage administrator access to the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminUsers.map(user => (
                                <TableRow key={user.email}>
                                    <TableCell>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Recent B2B Signups</CardTitle>
                <CardDescription>Onboarding status for new business customers.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Contact Email</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Member Since</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {b2bClients.map(client => (
                            <TableRow key={client.company}>
                                <TableCell className="font-medium">{client.company}</TableCell>
                                <TableCell>{client.contact}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{client.plan}</Badge>
                                </TableCell>
                                <TableCell>{client.since}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            </CardContent>
         </Card>
        </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/feedback/data.ts`

```ts
export type Feedback = {
    id: string;
    category: 'Bug Report' | 'Feature Request' | 'Account Issue' | 'General Feedback';
    subject: string;
    message: string;
    date: string;
    user: {
        name: string;
        email: string;
        accountTier: 'Free' | 'Standard' | 'Pro' | 'Enterprise';
    }
}

export const initialFeedback: Feedback[] = [
    {
        id: 'FB-001',
        category: 'Bug Report',
        subject: 'Cannot upload door photo on registration',
        message: 'When I try to upload my door photo on the registration page, the loading spinner just keeps spinning forever and nothing happens. I\'ve tried with both JPG and PNG files. My browser is Chrome on Windows.',
        date: '2024-08-18',
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            accountTier: 'Free'
        }
    },
    {
        id: 'FB-002',
        category: 'Feature Request',
        subject: 'Can we get dark mode please?',
        message: 'The app is great but it\'s very bright, especially at night. It would be amazing if you could add a dark mode option. Thanks!',
        date: '2024-08-17',
        user: {
            name: 'Alice Johnson',
            email: 'alice.j@example.com',
            accountTier: 'Pro'
        }
    },
    {
        id: 'FB-003',
        category: 'Account Issue',
        subject: 'Forgot my password and can\'t log in',
        message: 'I seem to have forgotten my password. I clicked the "Forgot Password" link but I never received an email. Can you please help me reset it? My account email is bob.w@example.com.',
        date: '2024-08-16',
        user: {
            name: 'Bob Williams',
            email: 'bob.w@example.com',
            accountTier: 'Standard'
        }
    },
    {
        id: 'FB-004',
        category: 'General Feedback',
        subject: 'Love the app!',
        message: 'Just wanted to say that this is one of the most innovative and useful applications I\'ve seen in a long time. The address verification process was so smooth. Keep up the great work!',
        date: '2024-08-15',
        user: {
            name: 'Charlie Brown',
            email: 'charlie.b@example.com',
            accountTier: 'Free'
        }
    },
     {
        id: 'FB-005',
        category: 'Bug Report',
        subject: 'API returning 500 error for address lookup',
        message: 'We are an enterprise client and our integration is suddenly failing. The /api/v1/lookup endpoint is returning a 500 Internal Server Error for all requests. This is critical for our business operations. Please investigate immediately.',
        date: '2024-08-18',
        user: {
            name: 'Dana Smith',
            email: 'd.smith@globallogistics.com',
            accountTier: 'Enterprise'
        }
    }
];
```

---

## File: `src/app/admin/feedback/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { AppLayout } from '@/components/layout/app-layout';
import { initialFeedback, type Feedback } from './data';
import { analyzeFeedback, type AnalyzeFeedbackInput, type AnalyzeFeedbackOutput } from '@/ai/flows/analyze-feedback';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function FeedbackPage() {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>(initialFeedback);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeFeedbackOutput | null>(null);
  const { toast } = useToast();

  const handleOpenDialog = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setAnalysisResult(null);
  };
  
  const handleCloseDialog = () => {
    setSelectedFeedback(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFeedback) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const input: AnalyzeFeedbackInput = {
        category: selectedFeedback.category,
        subject: selectedFeedback.subject,
        message: selectedFeedback.message,
        userContext: {
          name: selectedFeedback.user.name,
          email: selectedFeedback.user.email,
          accountTier: selectedFeedback.user.accountTier,
        }
      };
      const result = await analyzeFeedback(input);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getPriorityBadge = (priority: AnalyzeFeedbackOutput['priority']) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="destructive" className="bg-red-700">{priority}</Badge>;
      case 'High':
        return <Badge variant="destructive">{priority}</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-500 text-black">{priority}</Badge>;
      case 'Low':
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  }

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>User Feedback Inbox</CardTitle>
            <CardDescription>
              Review and analyze incoming support tickets and feedback from users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbackItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.user.name}</div>
                      <div className="text-sm text-muted-foreground">{item.user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">{item.subject}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(item)}>
                        View & Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && handleCloseDialog()}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline">{selectedFeedback?.subject}</DialogTitle>
              <div className="flex items-center gap-2">
                <DialogDescription>
                  From: {selectedFeedback?.user.name} ({selectedFeedback?.user.email})
                </DialogDescription>
                <Badge variant="secondary">{selectedFeedback?.user.accountTier}</Badge>
              </div>
            </DialogHeader>
            <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto px-1 pr-4">
              <div>
                <h4 className="font-semibold mb-2">User's Message</h4>
                <p className="text-sm text-muted-foreground p-4 bg-secondary rounded-md whitespace-pre-wrap">
                  {selectedFeedback?.message}
                </p>
              </div>

              {analysisResult && (
                <div>
                  <h4 className="font-semibold mb-2">AI Analysis</h4>
                   <div className="p-4 rounded-lg border bg-secondary/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Priority</span>
                            {getPriorityBadge(analysisResult.priority)}
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Summary</p>
                            <p className="text-sm font-medium">{analysisResult.summary}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground mb-1">AI Category</p>
                            <p className="text-sm font-medium">{analysisResult.autoCategory}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground mb-1">Suggested Action</p>
                            <p className="text-sm font-medium">{analysisResult.suggestedAction}</p>
                        </div>
                   </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>Close</Button>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                {analysisResult ? 'Re-analyze' : 'Analyze with AI'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/incident-response/incidents.ts`

```ts
export type Incident = {
    id: string;
    type: 'Natural Disaster' | 'Forced Relocation' | 'Physical Destruction' | 'Memory Loss';
    status: 'Reported' | 'Under Review' | 'Restoration Pending' | 'Resolved' | 'Closed';
    reportedDate: string;
    affectedUser: {
        name: string;
        email: string;
    };
    affectedAddress: {
        address: string;
        nftId: string;
        gps: string;
    };
    successor: {
        name: string;
        address: string;
    };
};

export const incidents: Incident[] = [
    {
        id: 'INC-2024-001',
        type: 'Physical Destruction',
        status: 'Reported',
        reportedDate: '2024-08-10',
        affectedUser: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        affectedAddress: {
            address: '101 Industrial Way, Floodzone, USA 98765',
            nftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D',
            gps: '40.7128° N, 74.0060° W',
        },
        successor: {
            name: 'Jane Doe',
            address: '0xSUCCESSORWALLETADDRESS...1234',
        },
    },
    {
        id: 'INC-2024-002',
        type: 'Natural Disaster',
        status: 'Under Review',
        reportedDate: '2024-08-12',
        affectedUser: {
            name: 'Alice Johnson',
            email: 'alice.j@example.com',
        },
        affectedAddress: {
            address: '789 Pine Lane, Lakeside, USA 54321',
            nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
            gps: '41.7638° N, 72.6851° W',
        },
        successor: {
            name: 'Bob Johnson',
            address: '0xSUCCESSORWALLETADDRESS...5678',
        },
    },
    {
        id: 'INC-2024-003',
        type: 'Memory Loss',
        status: 'Resolved',
        reportedDate: '2024-07-20',
        affectedUser: {
            name: 'Charlie Brown',
            email: 'charlie.b@example.com',
        },
        affectedAddress: {
            address: '456 Oak Avenue, Springfield, USA 67890',
            nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
            gps: '39.7817° N, 89.6501° W',
        },
        successor: {
            name: 'Sally Brown',
            address: '0xSUCCESSORWALLETADDRESS...9012',
        },
    },
];
```

---

## File: `src/app/admin/incident-response/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldAlert,
  History,
  CheckCircle2,
  ArchiveRestore,
} from 'lucide-react';
import { incidents, type Incident } from './incidents';
import { RecoveryWizard } from './recovery-wizard';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';

export default function IncidentResponsePage() {
  const [allIncidents, setAllIncidents] = useState<Incident[]>(incidents);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const { toast } = useToast();

  const handleStartRecovery = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsWizardOpen(true);
  };

  const handleSaveAndClose = (updatedIncident: Incident) => {
    setAllIncidents(allIncidents.map(inc => inc.id === updatedIncident.id ? updatedIncident : inc));
    setIsWizardOpen(false);
    setSelectedIncident(null);
    toast({
      title: 'Incident Updated',
      description: `The status for incident ${updatedIncident.id} has been updated.`,
    });
  };

  const getStatusBadgeVariant = (status: Incident['status']) => {
    switch (status) {
      case 'Reported':
        return 'destructive';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Restoration Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'secondary';
    }
  };

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reported Incidents
              </CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allIncidents.filter((i) => i.status === 'Reported').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Requiring immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  allIncidents.filter((i) => i.status === 'Under Review')
                    .length
                }
              </div>
              <p className="text-xs text-muted-foreground">Cases in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved This Month
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allIncidents.filter((i) => i.status === 'Resolved').length}
              </div>
              <p className="text-xs text-muted-foreground">
                +2 since last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Incident Queue</CardTitle>
            <CardDescription>
              Manage reported incidents and begin the asset recovery process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Reported Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-mono">{incident.id}</TableCell>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {incident.affectedAddress.address}
                    </TableCell>
                    <TableCell>{incident.affectedUser.name}</TableCell>
                    <TableCell>{incident.reportedDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(incident.status)}
                        className={getStatusBadgeVariant(incident.status)}
                      >
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartRecovery(incident)}
                        disabled={
                          incident.status === 'Resolved' ||
                          incident.status === 'Closed'
                        }
                      >
                        <ArchiveRestore className="mr-2 h-4 w-4" />
                        {incident.status === 'Reported'
                          ? 'Start Recovery'
                          : 'Continue Recovery'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      {selectedIncident && (
        <RecoveryWizard
          isOpen={isWizardOpen}
          setIsOpen={setIsWizardOpen}
          incident={selectedIncident}
          onSave={handleSaveAndClose}
        />
      )}
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/incident-response/recovery-wizard.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Fingerprint,
  KeyRound,
  Loader2,
  LocateFixed,
  MapPin,
  Phone,
  User,
  UserCheck,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Incident } from './incidents';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface RecoveryWizardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  incident: Incident;
  onSave: (incident: Incident) => void;
}

const steps = [
  { id: 'verify', name: 'Verify Details' },
  { id: 'identity', name: 'Verify ID' },
  { id: 'contact', name: 'Contact & Successor' },
  { id: 'resolve', name: 'Resolve Incident' },
];

export function RecoveryWizard({
  isOpen,
  setIsOpen,
  incident,
  onSave,
}: RecoveryWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({});
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setVerifiedItems({});
      setResolutionNotes('');
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const updatedIncident = {
      ...incident,
      status: 'Resolved' as const, // Assuming saving resolves it
    };
    onSave(updatedIncident);
    setIsSaving(false);
  };
  
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setVerifiedItems(prev => ({...prev, [id]: checked}));
  }

  const VerificationItem = ({ id, label, value, icon }: {id: string, label: string, value: string, icon: React.ReactNode}) => (
    <div className="flex items-start gap-4 p-3 rounded-md border bg-secondary/50">
        <div className="text-primary mt-1">{icon}</div>
        <div className="flex-1">
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground font-mono">{value}</p>
        </div>
        <Checkbox id={id} checked={verifiedItems[id]} onCheckedChange={(checked) => handleCheckboxChange(id, !!checked)} />
    </div>
  );


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">
            Asset Recovery Wizard
          </DialogTitle>
          <DialogDescription>
            Follow these steps to securely verify and restore the user's
            digital address. Incident ID: {incident.id}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 my-4">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex items-center space-x-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                           {index < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                        </div>
                        <span className={`font-medium ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</span>
                    </div>
                     {index < steps.length - 1 && <Separator className="flex-1" />}
                </React.Fragment>
            ))}
        </div>

        <div className="py-4 min-h-[300px]">
          {currentStep === 0 && (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 1: Primary Locator Verification</h3>
                <p className="text-muted-foreground text-sm">Verify the core immutable details of the digital address. Check external maps and records to confirm these details.</p>
                <VerificationItem id="gps" label="Last Recorded GPS" value={incident.affectedAddress.gps} icon={<LocateFixed />} />
                <VerificationItem id="addressName" label="Full Address" value={incident.affectedAddress.address} icon={<MapPin />} />
                <VerificationItem id="userName" label="Registered Owner" value={incident.affectedUser.name} icon={<User />} />
            </div>
          )}
           {currentStep === 1 && (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 2: Identity Document Verification</h3>
                <p className="text-muted-foreground text-sm">Verify the user's identity by comparing their provided government-issued ID with the information on file.</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>ID / Passport (Front)</Label>
                        <Image src="https://placehold.co/300x180.png" width={300} height={180} alt="ID front" className="rounded-lg border shadow-sm w-full" data-ai-hint="id card"/>
                    </div>
                    <div className="space-y-2">
                        <Label>ID (Back)</Label>
                        <Image src="https://placehold.co/300x180.png" width={300} height={180} alt="ID back" className="rounded-lg border shadow-sm w-full" data-ai-hint="id card"/>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-3 rounded-md border bg-secondary/50">
                    <div className="text-primary mt-1"><Fingerprint /></div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Confirm Identity</p>
                        <p className="text-sm text-muted-foreground">Check that the name and photo on the ID match the user's profile and biometric data on file.</p>
                    </div>
                    <Checkbox id="identity" checked={verifiedItems['identity']} onCheckedChange={(checked) => handleCheckboxChange('identity', !!checked)} />
                </div>
            </div>
          )}
          {currentStep === 2 && (
             <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 3: Dynamic Factor & Successor Verification</h3>
                <p className="text-muted-foreground text-sm">Verify the user's linked contact details and the designated successor information. Contact the user if possible.</p>
                <VerificationItem id="phone" label="Linked Phone Number" value="+1-555-XXX-1234" icon={<Phone />} />
                <VerificationItem id="successorName" label="Designated Successor" value={incident.successor.name} icon={<UserCheck />} />
                <VerificationItem id="successorAddress" label="Successor's Wallet Address" value={incident.successor.address} icon={<KeyRound />} />
            </div>
          )}
          {currentStep === 3 && (
             <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 4: Resolution & Final Actions</h3>
                <p className="text-muted-foreground text-sm">Document the actions taken to resolve this incident. This will be recorded in the address's immutable history.</p>
                 <div className="space-y-2">
                    <Label htmlFor="resolution-notes">Resolution Notes</Label>
                    <Textarea
                        id="resolution-notes"
                        placeholder="e.g., Verified user identity via video call and ID check. Initiated transfer of NFT to the designated successor's wallet address. Reason: Memory Loss..."
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        rows={6}
                    />
                </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isSaving}
            >
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? 'Saving...' : 'Complete Recovery'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## File: `src/app/admin/login/page.tsx`

```tsx
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary font-body p-4">
       <div className="absolute top-4 left-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold">Digital Address</span>
          </Link>
        </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Administrator Portal</CardTitle>
          <CardDescription>Enter your email to receive a login link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="admin@digitaladdress.com" className="pl-10" required />
              </div>
            </div>
            <Button asChild type="submit" className="w-full mt-2">
              <Link href="/admin/dashboard">Log In</Link>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
                This is a restricted area. Only authorized personnel are permitted.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## File: `src/app/admin/monetization/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DollarSign, ArrowUpRight, Edit, Briefcase, Save, ShoppingCart, ArrowLeftRight, FileText, History, Users, PlusCircle, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { pricingPlans } from '../pricing-data';
import { AppLayout } from '@/components/layout/app-layout';


const revenueData = [
  { month: 'Jan', api: 2400, marketplace: 1600 },
  { month: 'Feb', api: 1398, marketplace: 1200 },
  { month: 'Mar', api: 9800, marketplace: 2290 },
  { month: 'Apr', api: 3908, marketplace: 2000 },
  { month: 'May', api: 4800, marketplace: 2181 },
  { month: 'Jun', api: 3800, marketplace: 2500 },
  { month: 'Jul', api: 4300, marketplace: 2100 },
];

const initialRevenueStreams = [
    { id: 'marketplace', name: 'Marketplace Sale Commission', description: 'Percentage fee for each sale on the Address NFT Marketplace.', value: 2.5, type: 'percentage', isActive: true, icon: ShoppingCart },
    { id: 'api_lookup', name: 'API Lookup Fee', description: 'Flat rate fee for each API address lookup request.', value: 0.10, type: 'flat', isActive: true, icon: FileText },
    { id: 'transfer', name: 'NFT Transfer Fee', description: 'Commission on wallet-to-wallet address NFT transfers.', value: 0.1, type: 'percentage', isActive: true, icon: ArrowLeftRight },
    { id: 'minting', name: 'Address Minting Fee', description: 'One-time fee charged for creating a new digital address NFT.', value: 5.00, type: 'flat', isActive: true, icon: History },
    { id: 'handshake', name: 'Handshake Delivery Fee', description: 'Service fee for verified, in-person "handshake" deliveries.', value: 1.00, type: 'flat', isActive: false, icon: Users },
];

const initialTaxRules = [
    { id: 'tax-1', jurisdiction: 'California, US', rate: '8.25%', type: 'Sales Tax' },
    { id: 'tax-2', jurisdiction: 'United Kingdom', rate: '20.0%', type: 'VAT' },
    { id: 'tax-3', jurisdiction: 'Quebec, CA', rate: '14.975%', type: 'GST + QST' },
];

type RevenueStream = {
    id: string;
    name: string;
    description: string;
    value: number;
    type: 'percentage' | 'flat';
    isActive: boolean;
    icon: React.ComponentType<any>;
}

type TaxRule = {
    id: string;
    jurisdiction: string;
    rate: string;
    type: string;
}

export default function MonetizationPage() {
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>(initialRevenueStreams);
  const [taxRules, setTaxRules] = useState<TaxRule[]>(initialTaxRules);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStream, setNewStream] = useState({ name: '', description: '', type: 'percentage' as 'percentage' | 'flat', value: 0 });
  const { toast } = useToast();

  const [newTaxCountry, setNewTaxCountry] = useState('');
  const [newTaxState, setNewTaxState] = useState('');
  const [newTaxRate, setNewTaxRate] = useState('');
  const [newTaxType, setNewTaxType] = useState('Sales Tax');


  const handleStreamChange = (id: string, field: 'value' | 'isActive', value: number | boolean) => {
    setRevenueStreams(prevStreams =>
      prevStreams.map(stream =>
        stream.id === id ? { ...stream, [field]: value } : stream
      )
    );
  };

  const handleDeleteStream = (id: string) => {
    setRevenueStreams(prevStreams => prevStreams.filter(stream => stream.id !== id));
    toast({
        variant: "destructive",
        title: "Revenue Stream Deleted",
        description: "The revenue stream has been successfully removed.",
    });
  };

  const handleAddNewStream = () => {
    if (!newStream.name || !newStream.description) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Stream name and description are required.",
        });
        return;
    }
    const newId = newStream.name.toLowerCase().replace(/\s+/g, '_');
    const newRevenueStream: RevenueStream = {
        ...newStream,
        id: newId,
        isActive: true,
        icon: FileText, // Default icon for new streams
    };
    setRevenueStreams(prev => [...prev, newRevenueStream]);
    toast({
        title: "Revenue Stream Added",
        description: `Successfully added "${newStream.name}".`,
    });
    setNewStream({ name: '', description: '', type: 'percentage', value: 0 });
    setIsAddDialogOpen(false);
  };
  
  const handleAddTaxRule = () => {
    if (!newTaxCountry || !newTaxRate || !newTaxType) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Country, Tax Rate, and Tax Type are required.",
        });
        return;
    }
    const countryName = countries.find(c => c.code === newTaxCountry)?.name || newTaxCountry;
    const jurisdiction = newTaxState ? `${newTaxState}, ${countryName}` : countryName;

    const newRule: TaxRule = {
        id: `tax-${Date.now()}`,
        jurisdiction,
        rate: `${parseFloat(newTaxRate).toFixed(2)}%`,
        type: newTaxType
    };

    setTaxRules(prev => [...prev, newRule]);
    toast({
        title: "Tax Rule Added",
        description: `Rule for ${jurisdiction} has been added.`,
    });
    
    // Reset form
    setNewTaxCountry('');
    setNewTaxState('');
    setNewTaxRate('');
    setNewTaxType('Sales Tax');
  };

  const handleDeleteTaxRule = (id: string) => {
      setTaxRules(prev => prev.filter(rule => rule.id !== id));
      toast({
          variant: 'destructive',
          title: "Tax Rule Deleted",
          description: "The selected tax rule has been removed.",
      });
  };


  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (USD)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,431.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Subscriptions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$98,210.50</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marketplace Fees</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$27,221.39</div>
              <p className="text-xs text-muted-foreground">+45.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Revenue Streams Overview</CardTitle>
                <CardDescription>Monthly income from different platform services.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}K`} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="api" stroke="hsl(var(--primary))" name="API Revenue" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="marketplace" name="Marketplace Fees" stroke="hsl(var(--accent))" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Stream Management</CardTitle>
            <CardDescription>Configure commission rates and activate/deactivate revenue streams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {revenueStreams.map(stream => {
                const Icon = stream.icon;
                return (
                 <div key={stream.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Icon className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <Label htmlFor={`${stream.id}-fee`} className="font-semibold">{stream.name}</Label>
                            <p className="text-sm text-muted-foreground">{stream.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                          {stream.type === 'flat' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>}
                          <Input 
                            id={`${stream.id}-fee`} type="number" value={stream.value}
                            onChange={(e) => handleStreamChange(stream.id, 'value', parseFloat(e.target.value))}
                            step={stream.type === 'percentage' ? "0.1" : "0.01"}
                            className={`w-full md:w-32 ${stream.type === 'flat' ? 'pl-7' : 'pr-8'}`}
                          />
                          {stream.type === 'percentage' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>}
                        </div>
                        <Switch id={`${stream.id}-switch`} checked={stream.isActive} onCheckedChange={(checked) => handleStreamChange(stream.id, 'isActive', checked)}/>
                        <Button size="sm" variant="ghost"><Save className="h-4 w-4"/> <span className="sr-only">Save</span></Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDeleteStream(stream.id)}><Trash2 className="h-4 w-4"/><span className="sr-only">Delete</span></Button>
                    </div>
                 </div>
                );
             })}
          </CardContent>
          <CardFooter>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add New Revenue Stream
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Revenue Stream</DialogTitle>
                        <DialogDescription>
                            Define a new fee or commission to be charged on the platform.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={newStream.name} onChange={(e) => setNewStream(s => ({...s, name: e.target.value}))} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">Description</Label>
                            <Textarea id="description" value={newStream.description} onChange={(e) => setNewStream(s => ({...s, description: e.target.value}))} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Type</Label>
                            <RadioGroup defaultValue="percentage" className="col-span-3 flex gap-4" value={newStream.type} onValueChange={(value) => setNewStream(s => ({...s, type: value as 'percentage' | 'flat'}))}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="percentage" id="r-percentage" />
                                    <Label htmlFor="r-percentage">Percentage</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="flat" id="r-flat" />
                                    <Label htmlFor="r-flat">Flat Fee</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="value" className="text-right">Value</Label>
                            <div className="relative col-span-3">
                                {newStream.type === 'flat' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>}
                                <Input id="value" type="number" value={newStream.value} onChange={(e) => setNewStream(s => ({...s, value: parseFloat(e.target.value) || 0}))} className={newStream.type === 'flat' ? 'pl-7' : 'pr-8'}/>
                                {newStream.type === 'percentage' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleAddNewStream}>Add Stream</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Tax Management</CardTitle>
                <CardDescription>Set and manage tax rates for different jurisdictions.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div className="p-4 rounded-lg border bg-secondary/50">
                    <h4 className="font-semibold mb-4">Add New Tax Rule</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1 md:col-span-2">
                            <Label>Jurisdiction</Label>
                            <div className="flex gap-2">
                                <Select onValueChange={setNewTaxCountry} value={newTaxCountry}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map(country => (
                                            <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input placeholder="State/Province (Optional)" value={newTaxState} onChange={(e) => setNewTaxState(e.target.value)}/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="tax-rate">Tax Rate</Label>
                             <div className="relative">
                                <Input id="tax-rate" type="number" placeholder="e.g., 8.25" value={newTaxRate} onChange={(e) => setNewTaxRate(e.target.value)} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                            </div>
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="tax-type">Tax Type</Label>
                            <Input id="tax-type" placeholder="e.g., VAT, Sales Tax" value={newTaxType} onChange={(e) => setNewTaxType(e.target.value)} />
                        </div>
                        <Button onClick={handleAddTaxRule} className="w-full">Add Tax Rule</Button>
                    </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Active Tax Rules</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Jurisdiction</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taxRules.map(rule => (
                           <TableRow key={rule.id}>
                            <TableCell className="font-medium">{rule.jurisdiction}</TableCell>
                            <TableCell>{rule.rate}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{rule.type}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                               <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                               <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteTaxRule(rule.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>API Pricing Plans</CardTitle>
                <CardDescription>Manage the subscription tiers for B2B clients.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plan</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>API Calls</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pricingPlans.map((plan) => (
                            <TableRow key={plan.name}>
                                <TableCell className="font-medium">{plan.name}</TableCell>
                                <TableCell>{plan.price}</TableCell>
                                <TableCell>{plan.apiCalls}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/platform-settings/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  ShieldCheck,
  KeyRound,
  Globe,
  Save,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';

export default function PlatformSettingsPage() {
  const { toast } = useToast();
  
  // State for Domain & DNS settings
  const [domainRegistrar, setDomainRegistrar] = useState('Namecheap');
  const [domainExpiry, setDomainExpiry] = useState('2025-10-26');
  const [dnsProvider, setDnsProvider] = useState('Cloudflare');
  const [paymentMethod, setPaymentMethod] = useState('Corporate Visa **** 1234');

  const handleSaveDomainSettings = () => {
    // In a real app, you would send this data to a secure backend.
    console.log('Saving Domain Settings:', { domainRegistrar, domainExpiry, dnsProvider, paymentMethod });
    toast({
      title: 'Settings Saved',
      description: 'Domain & DNS settings have been updated.',
    });
  };

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* General Settings Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" /> General Settings
              </CardTitle>
              <CardDescription>
                Configure global platform details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input
                  id="platform-name"
                  defaultValue="Digital Address"
                  placeholder="Your Platform Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Public Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="support@digitaladdress.com"
                  placeholder="support@example.com"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save General Settings
              </Button>
            </CardFooter>
          </Card>

          {/* Security Settings Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Security & Access
              </CardTitle>
              <CardDescription>
                Manage security policies for administrators and users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="mfa-required">
                    Require MFA for Admins
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce Multi-Factor Authentication for all team members.
                  </p>
                </div>
                <Switch id="mfa-required" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="session-timeout">
                    Admin Session Timeout (minutes)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out admins after a period of inactivity.
                  </p>
                </div>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue={60}
                  className="w-24"
                />
              </div>
            </CardContent>
             <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Security Policies
              </Button>
            </CardFooter>
          </Card>
          
           {/* API Keys Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" /> API Keys & Integrations
              </CardTitle>
              <CardDescription>
                Manage third-party service API keys and blockchain settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Service Keys</h4>
                  <div className="space-y-2">
                    <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
                    <Input id="google-maps-api-key" type="password" defaultValue="AIzaSy..."/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-api-key">Stripe API Key</Label>
                    <Input id="stripe-api-key" type="password" defaultValue="sk_live_..."/>
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Blockchain</h4>
                   <div className="space-y-2">
                    <Label htmlFor="nft-contract-address">Address NFT Smart Contract</Label>
                    <Input id="nft-contract-address" defaultValue="0x..."/>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="rpc-endpoint">RPC Endpoint URL</Label>
                    <Input id="rpc-endpoint" defaultValue="https://mainnet.infura.io/v3/..."/>
                  </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Integration Settings
              </Button>
            </CardFooter>
          </Card>

          {/* Domain & DNS Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" /> Domain & DNS Management
              </CardTitle>
              <CardDescription>
                Manage domain registrar and DNS provider details.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Domain Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="domain-registrar">Domain Registrar</Label>
                    <Input 
                      id="domain-registrar" 
                      value={domainRegistrar}
                      onChange={(e) => setDomainRegistrar(e.target.value)}
                      placeholder="e.g., Google Domains"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain-expiry">Domain Expiry Date</Label>
                    <Input 
                      id="domain-expiry" 
                      type="date" 
                      value={domainExpiry}
                      onChange={(e) => setDomainExpiry(e.target.value)}
                    />
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Provider Details</h4>
                   <div className="space-y-2">
                    <Label htmlFor="dns-provider">DNS Provider</Label>
                    <Input 
                      id="dns-provider" 
                      value={dnsProvider}
                      onChange={(e) => setDnsProvider(e.target.value)}
                      placeholder="e.g., AWS Route 53"
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Input 
                      id="payment-method" 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDomainSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Domain Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/pricing-data.ts`

```ts
export const pricingPlans = [
    { name: 'Standard', price: '$49/mo', apiCalls: '10,000/mo', users: 5 },
    { name: 'Pro', price: '$99/mo', apiCalls: '50,000/mo', users: 25 },
    { name: 'Enterprise', price: 'Custom', apiCalls: 'Unlimited', users: 'Unlimited' },
];
```

---

## File: `src/app/admin/user-management/page.tsx`

```tsx
'use client';

import React from 'react';
import { UserTable } from './user-table';
import { AppLayout } from '@/components/layout/app-layout';

export default function UserManagementPage() {
  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <UserTable />
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/admin/user-management/portals.ts`

```ts
export type Portal = {
  id: string;
  name: string;
  description: string;
};

export const portals: Portal[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'View overview metrics and platform statistics.',
  },
  {
    id: 'user-management',
    name: 'User Management',
    description: 'Add, edit, and manage internal team members.',
  },
  {
    id: 'b2b-clients',
    name: 'B2B Clients',
    description: 'Manage and onboard business clients.',
  },
  {
    id: 'address-audit',
    name: 'Address Audit',
    description: 'Review and audit address validation activities.',
  },
  {
    id: 'monetization',
    name: 'Monetization',
    description: 'Configure pricing, fees, and tax rules.',
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    description: 'Manage asset recovery for users after major incidents.',
  },
  {
    id: 'platform-settings',
    name: 'Platform Settings',
    description: 'Access to global platform configurations.',
  },
];
```

---

## File: `src/app/admin/user-management/roles.ts`

```ts
export type Role = {
    id: string;
    name: string;
    description: string;
}

export const roles: Role[] = [
    {
        id: 'super-admin',
        name: 'Super Admin',
        description: 'Full access to all platform settings and user management.',
    },
    {
        id: 'admin-assistant',
        name: 'Admin Assistant',
        description: 'Can manage B2B clients and address audits.',
    },
    {
        id: 'compliance-officer',
        name: 'Compliance Officer',
        description: 'Access to audit trails and verification data.',
    },
    {
        id: 'support-agent',
        name: 'Support Agent',
        description: 'Access to user-facing support tools.',
    }
];
```

---

## File: `src/app/admin/user-management/user-dialog.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Mail, User, Briefcase, Phone, KeyRound, Copy, Globe, Fingerprint } from 'lucide-react';
import { roles } from './roles';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { countries } from '@/lib/countries';
import { verifyNftId } from '@/lib/verify-nft';
import { portals } from './portals';
import { Checkbox } from '@/components/ui/checkbox';

const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  role: z.string().min(1, 'Please select a role.'),
  status: z.enum(['Active', 'Inactive', 'Pending Approval', 'Suspended']).default('Pending Approval'),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  additionalPhone: z.string().optional(),
  homeAddress: z.string().startsWith('0x', { message: 'Must be a valid Digital Address NFT ID.' }).optional().or(z.literal('')),
  workAddress: z.string().startsWith('0x', { message: 'Must be a valid Digital Address NFT ID.' }).optional().or(z.literal('')),
  workCountry: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  biometricHash: z.string().optional(),
});

export type AdminUser = z.infer<typeof userSchema>;

interface UserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (user: AdminUser) => void;
  user: AdminUser | null;
}

const defaultValues: Omit<AdminUser, 'id'> = {
  name: '',
  email: '',
  role: 'support-agent',
  status: 'Pending Approval' as const,
  jobTitle: '',
  bio: '',
  phone: '',
  additionalPhone: '',
  homeAddress: '',
  workAddress: '',
  workCountry: '',
  gender: '',
  dateOfBirth: '',
  permissions: [],
  biometricHash: '',
};

export function UserDialog({ isOpen, setIsOpen, user, onSave }: UserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AdminUser>({
    resolver: zodResolver(userSchema),
    defaultValues: user || defaultValues,
  });

  useEffect(() => {
    form.reset(user || defaultValues);
  }, [user, form, isOpen]);


  const onSubmit = async (data: AdminUser) => {
    setIsLoading(true);
    
    try {
      if (data.homeAddress) {
        const verificationResult = await verifyNftId(data.homeAddress);
        if (!verificationResult.success) {
          toast({ variant: "destructive", title: "Home Address Verification Failed", description: verificationResult.message });
          setIsLoading(false);
          return;
        }
      }

      if (data.workAddress) {
        const verificationResult = await verifyNftId(data.workAddress);
        if (!verificationResult.success) {
          toast({ variant: "destructive", title: "Work Address Verification Failed", description: verificationResult.message });
          setIsLoading(false);
          return;
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(data);
      setIsOpen(false);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "An unexpected error occurred during verification.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePaste = async (fieldName: 'homeAddress' | 'workAddress') => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue(fieldName, text, { shouldValidate: true });
      toast({
        title: 'Pasted from clipboard!',
        description: `The address has been pasted into the ${fieldName === 'homeAddress' ? 'Home' : 'Work'} Address field.`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Paste Failed',
        description: 'Could not read from clipboard. Please check browser permissions.',
      });
    }
  };
  
  const handleGenerateBiometricHash = () => {
    // In a real app, this would involve a complex process with a biometric scanner.
    // For this prototype, we simulate it by generating a random hash.
    const hash = `bio_${[...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    form.setValue('biometricHash', hash, { shouldValidate: true });
    toast({
      title: "Biometric Hash Generated",
      description: "A simulated biometric hash has been created for this user.",
    });
  };

  const isEditingSelfAsSuperAdmin = user?.role === 'super-admin' && user?.email === 'nicholas@digitaladdress.com';


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {user ? 'Update the details for this user.' : 'Fill in the details to add a new team member.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="biometric">Biometric</TabsTrigger>
              </TabsList>
              <div className="py-4 max-h-[50vh] overflow-y-auto px-1">
                <TabsContent value="account" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Enter user's full name..." {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="email" placeholder="user@digitaladdress.com" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditingSelfAsSuperAdmin}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.id} disabled={role.id === 'super-admin' && user?.role !== 'super-admin'}>
                                <div className="flex flex-col">
                                  <span>{role.name}</span>
                                  <span className="text-xs text-muted-foreground">{role.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isEditingSelfAsSuperAdmin && <FormDescription>Super Admin role cannot be changed.</FormDescription>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Active">
                                        <div className="flex flex-col">
                                            <span>Active</span>
                                            <span className="text-xs text-muted-foreground">User can log in and access features based on role.</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Pending Approval">
                                         <div className="flex flex-col">
                                            <span>Pending Approval</span>
                                            <span className="text-xs text-muted-foreground">Account created, awaiting admin approval.</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Suspended">
                                        <div className="flex flex-col">
                                            <span>Suspended</span>
                                            <span className="text-xs text-muted-foreground">User is temporarily blocked from logging in.</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Inactive">
                                         <div className="flex flex-col">
                                            <span>Inactive</span>
                                            <span className="text-xs text-muted-foreground">User is deactivated and cannot log in.</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </TabsContent>
                <TabsContent value="profile" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="e.g., Compliance Manager" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                           <FormControl>
                            <Input type="date" {...field} />
                           </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="tel" placeholder="+1 (555) 123-4567" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="tel" placeholder="Spouse or family member..." {...field} className="pl-10" />
                          </div>
                        </FormControl>
                         <FormDescription>An optional secondary contact number.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio / Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A short description or any relevant notes about the user." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                 <TabsContent value="location" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="workCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Location Country</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                               <div className="flex items-center gap-2">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <span className="pl-6">
                                  <SelectValue placeholder="Select a country..." />
                                </span>
                               </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="homeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Digital Address NFT ID</FormLabel>
                        <div className="flex gap-2">
                            <FormControl>
                            <div className="relative flex-grow">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="0x..." {...field} className="pl-10 font-mono" />
                            </div>
                            </FormControl>
                            <Button type="button" variant="outline" size="icon" onClick={() => handlePaste('homeAddress')}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Paste</span>
                            </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="workAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Digital Address NFT ID</FormLabel>
                         <div className="flex gap-2">
                            <FormControl>
                              <div className="relative flex-grow">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="0x..." {...field} className="pl-10 font-mono" />
                              </div>
                            </FormControl>
                             <Button type="button" variant="outline" size="icon" onClick={() => handlePaste('workAddress')}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Paste</span>
                            </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                 <TabsContent value="permissions">
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Portal Access</FormLabel>
                          <FormDescription>
                            Select which admin portals this user can access.
                          </FormDescription>
                        </div>
                        <div className="space-y-4">
                          {portals.map((portal) => (
                            <FormField
                              key={portal.id}
                              control={form.control}
                              name="permissions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={portal.id}
                                    className="flex flex-row items-center justify-between rounded-lg border p-4"
                                  >
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-sm font-medium">
                                        {portal.name}
                                      </FormLabel>
                                      <FormDescription>
                                        {portal.description}
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(portal.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), portal.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== portal.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                 <TabsContent value="biometric">
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                             <Fingerprint className="h-8 w-8 text-muted-foreground mt-1" />
                             <div>
                                <FormLabel className="text-base">Biometric Handshake</FormLabel>
                                <FormDescription>
                                Link a unique biometric signature to this user's account for enhanced security.
                                </FormDescription>
                             </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="biometricHash"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Biometric Hash</FormLabel>
                                <FormControl>
                                    <Input placeholder="No biometric data linked..." {...field} readOnly className="font-mono bg-secondary"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="outline" onClick={handleGenerateBiometricHash}>
                            Simulate Biometric Scan
                        </Button>
                    </div>
                </TabsContent>
              </div>
            </Tabs>
            <DialogFooter className="pt-4 border-t mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLoading ? 'Verifying...' : user ? 'Save Changes' : 'Add User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

## File: `src/app/admin/user-management/user-table.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { UserDialog, type AdminUser } from './user-dialog';
import { useToast } from '@/hooks/use-toast';
import { roles } from './roles';
import { initialUsers } from './users';


export function UserTable() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();

  const handleSaveUser = (user: AdminUser) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === user.id ? user : u));
      toast({ title: 'User Updated', description: `${user.name}'s details have been updated.` });
    } else {
      const newUser = { ...user, id: `usr_${Date.now()}` };
      setUsers([newUser, ...users]);
      toast({ title: 'User Added', description: `${user.name} has been added to the system.` });
    }
    setEditingUser(null);
  };
  
  const handleEdit = (user: AdminUser) => {
      setEditingUser(user);
      setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (userId: string) => {
      const userName = users.find(u => u.id === userId)?.name;
      setUsers(users.filter(u => u.id !== userId));
      toast({ variant: 'destructive', title: `User Deleted`, description: `${userName} has been removed from the system.` });
  }

  const handleSetStatus = (userId: string, status: AdminUser['status']) => {
      setUsers(users.map(u => u.id === userId ? {...u, status} : u));
      const userName = users.find(u => u.id === userId)?.name;
      toast({ title: `Status Updated`, description: `${userName}'s status has been set to ${status}.` });
  }

  const getRoleName = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.name || roleId;
  }
  
  const getStatusBadgeVariant = (status: AdminUser['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800';
      case 'Inactive':
      default:
        return 'secondary';
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>Internal User Management</CardTitle>
            <CardDescription>
              Onboard, manage roles, and set permissions for your team.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2" />
            Add New User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                </TableCell>
                <TableCell>
                    <Badge variant="outline">{getRoleName(user.role)}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={getStatusBadgeVariant(user.status)}>
                        {user.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem onClick={() => handleEdit(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                       <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Active')} disabled={user.status === 'Active'}>
                              Mark as Active
                            </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Pending Approval')} disabled={user.status === 'Pending Approval'}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Suspended')} disabled={user.status === 'Suspended'}>
                              Mark as Suspended
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Inactive')} disabled={user.status === 'Inactive'}>
                              Mark as Inactive
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                       </DropdownMenuSub>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)} disabled={user.role === 'super-admin'}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <UserDialog 
            isOpen={isDialogOpen} 
            setIsOpen={setIsDialogOpen}
            onSave={handleSaveUser}
            user={editingUser}
        />
    </Card>
  );
}
```

---

## File: `src/app/admin/user-management/users.ts`

```ts
import { type AdminUser } from './user-dialog';

export const initialUsers: AdminUser[] = [
  {
    id: 'usr_1',
    name: 'Nicholas C.',
    email: 'nicholas@digitaladdress.com',
    role: 'super-admin',
    status: 'Active',
    permissions: ['dashboard', 'user-management', 'b2b-clients', 'address-audit', 'monetization', 'incident-response', 'platform-settings'],
  },
  {
    id: 'usr_2',
    name: 'Alice Johnson',
    email: 'alice.j@digitaladdress.com',
    role: 'admin-assistant',
    status: 'Active',
    permissions: ['dashboard', 'b2b-clients', 'address-audit'],
  },
  {
    id: 'usr_3',
    name: 'Bob Williams',
    email: 'bob.w@digitaladdress.com',
    role: 'compliance-officer',
    status: 'Pending Approval',
    permissions: ['address-audit'],
  },
  {
    id: 'usr_4',
    name: 'Charlie Brown',
    email: 'charlie.b@digitaladdress.com',
    role: 'support-agent',
    status: 'Inactive',
    permissions: [],
  },
   {
    id: 'usr_5',
    name: 'Diana Prince',
    email: 'diana.p@digitaladdress.com',
    role: 'support-agent',
    status: 'Suspended',
    permissions: [],
  },
];
```

---

## File: `src/app/dashboard/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Users,
  CandlestickChart,
  Download,
  ChevronDown,
  QrCode,
  Copy,
  Mail,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';


const activityItems = [
  {
    type: 'Delivery',
    vendor: 'Amazon',
    date: '2024-07-29',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Amazon logo" width={32} height={32} className="rounded-full" data-ai-hint="amazon logo" />,
  },
  {
    type: 'Verification',
    vendor: 'Post Office',
    date: '2024-07-28',
    status: 'Confirmed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Post office logo" width={32} height={32} className="rounded-full" data-ai-hint="post office"/>,
  },
  {
    type: 'Service Call',
    vendor: 'Gas Company',
    date: '2024-07-27',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Gas company logo" width={32} height={32} className="rounded-full" data-ai-hint="gas logo"/>,
  },
  {
    type: 'Food Delivery',
    vendor: 'Uber Eats',
    date: '2024-07-26',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Uber Eats logo" width={32} height={32} className="rounded-full" data-ai-hint="food delivery" />,
  },
  {
    type: 'KYC Check',
    vendor: 'Coinbase',
    date: '2024-07-25',
    status: 'Confirmed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Coinbase logo" width={32} height={32} className="rounded-full" data-ai-hint="crypto logo" />,
  },
  {
    type: 'Delivery',
    vendor: 'FedEx',
    date: '2024-07-24',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="FedEx logo" width={32} height={32} className="rounded-full" data-ai-hint="delivery truck" />,
  },
  {
    type: 'Utility Bill',
    vendor: 'Water Dept.',
    date: '2024-07-22',
    status: 'Paid',
    icon: <Image src="https://placehold.co/32x32.png" alt="Water dept logo" width={32} height={32} className="rounded-full" data-ai-hint="water drop" />,
  },
];

const INITIAL_VISIBLE_ACTIVITIES = 5;

export default function DashboardPage() {
  const [visibleActivities, setVisibleActivities] = useState(INITIAL_VISIBLE_ACTIVITIES);
  const { toast } = useToast();

  const showMoreActivities = () => {
    setVisibleActivities(activityItems.length);
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your activity statement will be sent to your email shortly.",
    });
  };

  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">My Digital Address</CardTitle>
                <CardDescription>Your primary verified address NFT.</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Verified</Badge>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Location</h3>
                  <p className="text-muted-foreground">123 Main Street, Anytown, USA 12345</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">GPS Coordinates</h3>
                  <p className="text-muted-foreground">34.0522° N, 118.2437° W</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Address NFT ID</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                    <p className="truncate font-mono">0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B</p>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-6">
                <div className="p-3 bg-white rounded-lg shadow-md">
                  <Image src="https://placehold.co/180x180.png" alt="QR Code" width={180} height={180} data-ai-hint="qr code"/>
                </div>
                <div className="flex gap-2 w-full mt-4">
                    <Button variant="outline" className="w-full">
                      <QrCode className="mr-2 h-4 w-4" />
                      Expand QR
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Send to Email
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
                <CardDescription>
                  Latest transactions and verifications for your address.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {activityItems.slice(0, visibleActivities).map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.type}: {item.vendor}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.date}
                          </p>
                        </div>
                        <Badge
                          variant={item.status === 'Completed' || item.status === 'Confirmed' || item.status === 'Paid' ? 'default' : 'secondary'}
                          className={
                            item.status === 'Completed' || item.status === 'Confirmed' || item.status === 'Paid'
                              ? 'bg-accent/20 text-accent-foreground'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      {index < activityItems.slice(0, visibleActivities).length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
              {activityItems.length > INITIAL_VISIBLE_ACTIVITIES && (
                <CardFooter className="flex justify-center gap-2">
                   {visibleActivities < activityItems.length && (
                    <Button variant="outline" onClick={showMoreActivities}>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Show All
                    </Button>
                    )}
                    <Button variant="secondary" onClick={handleExport}>
                       <Download className="mr-2 h-4 w-4" />
                       Export to Email
                    </Button>
                </CardFooter>
              )}
            </Card>

            <div className="space-y-8">
              <Card className="shadow-lg bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="font-headline">Register a New Address</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Expand your portfolio by adding another property.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/register">
                    <Button variant="secondary" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Start Registration
                    </Button>
                  </Link>
                </CardContent>
              </Card>
               <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline">Pending Access Requests</CardTitle>
                  <CardDescription>Manage requests from others to use your address.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground mb-4">You have 3 pending requests.</p>
                   <Link href="/access-requests">
                     <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        View Requests
                      </Button>
                   </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/exchange/page.tsx`

```tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  Settings,
  MoreHorizontal,
  Home,
  Building,
  Edit,
  Trash2,
  LayoutDashboard,
  ChevronDown,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  FileText,
  History,
  ShoppingCart,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from '@/components/ui/skeleton';
import { countries } from '@/lib/countries';
import { generateAddressReport, type GenerateAddressReportOutput, type GenerateAddressReportInput } from '@/ai/flows/generate-address-report';
import { useToast } from '@/hooks/use-toast';

const generateListings = (count: number) => {
  const listings = [];
  const propertyTypes = ['Office', 'House', 'Warehouse', 'Vacation'];
  const statuses = ['Verified', 'Pending'];
  const names = [
    'Downtown Commercial Space', 'Lakeside Family Home', 'Modern Warehouse Unit', 'Cozy Mountain Cabin', 'Suburban Office Building',
    'Urban Loft Apartment', 'Industrial Park Bay', 'Beachfront Villa', 'Rural Farmstead', 'City Center Penthouse',
    'Tech Startup Garage', 'Retail Storefront', 'Historic District Home', 'Waterfront Condo', 'Ski Chalet Retreat'
  ];
  
  const sampleCountries = [
    { code: 'US', name: 'USA', cities: ['Metropolis', 'Springfield', 'Rivertown', 'Oakhaven'] },
    { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
    { code: 'GB', name: 'UK', cities: ['London', 'Manchester', 'Edinburgh', 'Birmingham'] },
    { code: 'DE', name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne'] },
    { code: 'JP', name: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo'] },
  ];

  const listedBySuffix = ['Properties', 'Realty', 'Ventures', 'Holdings', 'Group'];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
  const lastNames = ['Johnson', 'Williams', 'Brown', 'Smith', 'Davis', 'Miller', 'Wilson', 'Moore'];

  for (let i = 0; i < count; i++) {
    const countryData = sampleCountries[i % sampleCountries.length];
    const city = countryData.cities[i % countryData.cities.length];
    const type = propertyTypes[i % propertyTypes.length];
    const streetNum = Math.floor(Math.random() * 2000) + 1;
    const streetName = ['Business Rd', 'Lake View', 'Industrial Way', 'Pine Ridge', 'Commerce Drive', 'Main St', 'Oak Ave', 'Elm St'][i % 8];
    const price = (Math.random() * 30 + 1).toFixed(1);
    const listedByFirstName = firstNames[i % firstNames.length];
    const listedByLastName = lastNames[i % lastNames.length];
    let listedBy;
    if (i % 3 === 0) {
      listedBy = `${city} ${listedBySuffix[i % listedBySuffix.length]}`;
    } else {
      listedBy = `${listedByFirstName} ${listedByLastName}`;
    }

    listings.push({
      name: `${names[i % names.length]} #${i + 1}`,
      address: `${streetNum} ${streetName}, ${city}, ${countryData.name}`,
      countryCode: countryData.code,
      price: `${price} ETH`,
      type: type,
      nftId: `0x${[...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase()}${i}`,
      listedBy: listedBy,
      avatar: `https://placehold.co/32x32.png?text=${listedBy.charAt(0)}`,
      status: statuses[i % statuses.length],
    });
  }
  return listings;
};

const mySaleListings = [
    { name: 'Work', address: '456 Oak Avenue, Springfield, USA 67890', price: '9.5 ETH', status: 'Listed', views: 124 },
    { name: 'Vacation House', address: '789 Pine Lane, Lakeside, USA 54321', price: '6.2 ETH', status: 'Listed', views: 88 },
];

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            {children}
        </Link>
    )
}

type Listing = ReturnType<typeof generateListings>[0];

export default function ExchangePage() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedListingForReport, setSelectedListingForReport] = useState<Listing | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportResult, setReportResult] = useState<GenerateAddressReportOutput | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setAllListings(generateListings(200));
  }, []);

  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
        const countryMatch = selectedCountry ? listing.countryCode === selectedCountry : true;
        const cityMatch = selectedCity ? listing.address.toLowerCase().includes(selectedCity.toLowerCase()) : true;
        return countryMatch && cityMatch;
    });
  }, [allListings, selectedCountry, selectedCity]);

  const selectedCountryName = useMemo(() => {
    if (!selectedCountry) return null;
    const country = countries.find(c => c.code === selectedCountry);
    return country ? country.name : null;
  }, [selectedCountry]);

  const handleGenerateReport = async () => {
    if (!selectedListingForReport) return;
    setIsGeneratingReport(true);
    setReportResult(null);
    try {
        const input: GenerateAddressReportInput = {
            addressNftId: selectedListingForReport.nftId,
            physicalAddress: selectedListingForReport.address,
        };
        const result = await generateAddressReport(input);
        setReportResult(result);
    } catch (error) {
        console.error("Failed to generate report:", error);
        toast({
            variant: "destructive",
            title: "Report Generation Failed",
            description: "An unexpected error occurred. Please try again.",
        });
    } finally {
        setIsGeneratingReport(false);
    }
  };
  
  const openReportDialog = (listing: Listing) => {
    setSelectedListingForReport(listing);
    setReportResult(null);
    setIsReportDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="mr-2 flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg">Digital Address</span>
            </Link>
             <nav className="hidden md:flex items-center gap-6">
                <NavLink href="/exchange">Buy</NavLink>
                <NavLink href="/exchange">Sell</NavLink>
                <NavLink href="/exchange">Market</NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-0">
                      Trade <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      <span>P2P Exchange</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span>Derivatives</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem>
                      <TrendingDown className="mr-2 h-4 w-4" />
                      <span>Margin Trading</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
          </div>
          <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar"/>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Wallet</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Go to Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-2xl p-4 md:p-6 lg:p-8 space-y-8">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">List an Address for Sale</CardTitle>
                <CardDescription>Put one of your verified Address NFTs on the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row gap-4 items-end'>
                <div className='flex-1 w-full space-y-2'>
                    <label className='text-sm font-medium'>Your Address NFT</label>
                    <Input placeholder="Search for an address or NFT ID to list..." />
                </div>
                <div className='w-full md:w-auto space-y-2'>
                    <label className='text-sm font-medium'>Asking Price (ETH)</label>
                    <Input type="number" placeholder="e.g., 10.5" />
                </div>
                <Button>List for Sale</Button>
            </CardContent>
        </Card>

        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Address NFT Marketplace</CardTitle>
                    <CardDescription>
                        {selectedCountryName
                            ? <>Browsing listings in <span className="font-semibold text-primary">{selectedCountryName}</span>.</>
                            : 'Browse and acquire verified digital addresses from around the world.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 p-4 border rounded-lg bg-secondary/50">
                        <h4 className="font-semibold mb-2">Filter Listings</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Country</label>
                                <Select onValueChange={(value) => setSelectedCountry(value === 'ALL' ? '' : value)} value={selectedCountry || 'ALL'}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All Countries</SelectItem>
                                        {countries.map(country => (
                                        <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">State/Province</label>
                                <Input placeholder="e.g., California" disabled={!selectedCountry} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">City</label>
                                <Input placeholder="e.g., San Francisco" disabled={!selectedCountry} onChange={(e) => setSelectedCity(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[300px]">Listing</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Verification</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredListings.length === 0 && allListings.length > 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No listings found for the selected filters.
                                    </TableCell>
                                </TableRow>
                            ) : filteredListings.length === 0 ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                </TableRow>
                            ))
                            ) : (
                            filteredListings.map((listing) => (
                            <TableRow key={listing.nftId}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image src={`https://placehold.co/100x75.png`} alt={listing.name} width={60} height={45} className="rounded-md" data-ai-hint="building exterior"/>
                                        <div>
                                            <p className="font-medium">{listing.name}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                                <Avatar className='h-5 w-5'>
                                                    <AvatarImage src={listing.avatar} alt={listing.listedBy} data-ai-hint="person avatar"/>
                                                    <AvatarFallback>{listing.listedBy.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {listing.listedBy}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{listing.address}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize flex items-center gap-1">
                                        {listing.type === 'Office' && <Building className="h-3 w-3"/>}
                                        {listing.type === 'Warehouse' && <Building className="h-3 w-3"/>}
                                        {listing.type === 'House' && <Home className="h-3 w-3"/>}
                                        {listing.type === 'Vacation' && <Home className="h-3 w-3"/>}
                                        {listing.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={listing.status === 'Verified' ? 'default' : 'secondary'} className={listing.status === 'Verified' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                        {listing.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono">{listing.price}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                      <Button size="sm" variant="outline" onClick={() => openReportDialog(listing)}>AI Report</Button>
                                      <Button size="sm">Buy Now</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle className="font-headline">AI Due Diligence Report</DialogTitle>
                    <DialogDescription>
                        This report provides an AI-generated analysis of the address's digital history.
                    </DialogDescription>
                </DialogHeader>
                {!reportResult && !isGeneratingReport && (
                    <div className="py-8 text-center">
                        <p className="mb-4 text-muted-foreground">Generate a comprehensive report for:</p>
                        <p className="font-semibold">{selectedListingForReport?.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedListingForReport?.address}</p>
                        <p className="text-sm font-mono text-muted-foreground mt-2">{selectedListingForReport?.nftId}</p>
                    </div>
                )}
                {isGeneratingReport && (
                    <div className="flex flex-col items-center justify-center gap-4 py-8">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="text-muted-foreground">Analyzing data sources... Please wait.</p>
                    </div>
                )}
                {reportResult && (
                    <div className="space-y-6 max-h-[60vh] overflow-y-auto p-1 pr-4">
                        <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Overall Assessment</h4>
                            <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">{reportResult.overallAssessment}</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-primary" /> Risk Assessment</h4>
                            <div className="p-3 rounded-md border bg-secondary/50">
                                <Badge variant={reportResult.riskAssessment.level === 'Low' ? 'default' : 'destructive'} className={reportResult.riskAssessment.level === 'Low' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    Risk Level: {reportResult.riskAssessment.level}
                                </Badge>
                                <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-muted-foreground">
                                    {reportResult.riskAssessment.findings.map((finding, i) => <li key={i}>{finding}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2"><History className="h-5 w-5 text-primary" /> Verification History</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {reportResult.verificationHistory.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-primary" /> Commercial Usage</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {reportResult.commercialUsage.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                         <div className="space-y-3">
                            <h4 className="font-semibold flex items-center gap-2"><ArrowLeftRight className="h-5 w-5 text-primary" /> Listing Summary</h4>
                            <p className="text-sm text-muted-foreground">{reportResult.listingSummary}</p>
                        </div>
                    </div>
                )}
                <DialogFooter>
                  {!reportResult ? (
                    <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
                      {isGeneratingReport ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Generating...</> : "Generate Report"}
                    </Button>
                   ) : (
                    <Button onClick={() => setIsReportDialogOpen(false)}>Close</Button>
                   )}
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Your Active Listings</CardTitle>
                <CardDescription>Manage the addresses you have listed for sale.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Address Name</TableHead>
                        <TableHead>Full Address</TableHead>
                        <TableHead>Asking Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mySaleListings.map((listing) => (
                        <TableRow key={listing.address}>
                            <TableCell className="font-medium">{listing.name}</TableCell>
                            <TableCell>{listing.address}</TableCell>
                            <TableCell className="font-mono">{listing.price}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className='text-green-600 border-green-300'>{listing.status}</Badge>
                            </TableCell>
                            <TableCell>{listing.views}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className='mr-2 h-4 w-4' />
                                          Edit Listing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className='mr-2 h-4 w-4' />
                                          Delist
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
```

---

## File: `src/app/for-businesses/page.tsx`

```tsx
'use client';

import React from 'react';
import { Globe, ArrowLeftRight, TrendingUp, ShieldCheck, CheckCircle } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';


export default function ForBusinessesPage() {
  
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
             <Link
              href="/exchange"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Marketplace
            </Link>
            <Link
              href="/for-businesses"
              className="font-bold text-primary transition-colors hover:text-foreground/80"
            >
              For Businesses
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                 <div className="mx-auto max-w-3xl text-center">
                    <p className="font-semibold text-primary">POWER YOUR BUSINESS</p>
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl mt-2">Immutable Addresses, Unstoppable Growth</h1>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Integrate our API to verify addresses, prevent fraud, and streamline logistics with the most reliable location data available anywhere.
                    </p>
                     <div className="mt-8 flex justify-center gap-4">
                        <Button size="lg">Contact Sales</Button>
                        <Button size="lg" variant="outline">View Documentation</Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter">Transforming Industries with Location Certainty</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                        Our tamper-proof, AI-verified addresses solve critical business challenges across multiple sectors.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="text-center">
                        <CardHeader className="items-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                             <ArrowLeftRight className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">E-commerce & Retail</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Reduce failed deliveries and cart abandonment by validating addresses at checkout in real-time. Boost customer satisfaction and your bottom line.
                        </CardContent>
                    </Card>
                     <Card className="text-center">
                        <CardHeader className="items-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                            <TrendingUp className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">Logistics & Delivery</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Optimize routes and ensure first-time delivery success with pin-point accurate, verified location data. Cut fuel costs and improve delivery times.
                        </CardContent>
                    </Card>
                     <Card className="text-center">
                        <CardHeader className="items-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                            <ShieldCheck className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">Finance & KYC</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Meet regulatory requirements and onboard users faster with undeniable proof-of-residence verification. Reduce fraud and compliance risks.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                     <h2 className="font-headline text-3xl font-bold tracking-tighter">Simple API, Powerful Results</h2>
                     <p className="text-muted-foreground md:text-lg">
                        Our developer-friendly REST API makes it easy to integrate Digital Address verification into any application. With just a few lines of code, you can start validating addresses, reducing fraud, and ensuring your services reach the right place, every time.
                     </p>
                     <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Real-time address verification and validation.</span>
                        </li>
                         <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Access historical data and trust scores for any address NFT.</span>
                        </li>
                         <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Scalable, reliable infrastructure with enterprise-grade SLAs.</span>
                        </li>
                     </ul>
                </div>
                <div className="relative h-80 rounded-lg bg-card shadow-lg p-2 border">
                    <Image src="https://placehold.co/600x400.png" alt="API Code Snippet" className="object-cover rounded-md h-full w-full" fill data-ai-hint="code snippet"/>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter">Ready to Build on a Foundation of Trust?</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                    Join the growing network of businesses that rely on Digital Address for location certainty. Explore our plans or get in touch with our team to find the right solution for you.
                 </p>
                 <div className="mt-8">
                    <Button size="lg">
                        View Pricing & Plans
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary">Terms of Service</Link>
            <Link href="/" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

## File: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 20% 95%;
    --foreground: 222.2 84% 4.9%;
    --card: 210 20% 95%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 210 20% 95%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 210 70% 50%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 180 60% 40%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 210 70% 50%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --sidebar-background: 210 20% 98%;
    --sidebar-foreground: 222.2 47.4% 11.2%;
    --sidebar-primary: 210 70% 50%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 40% 90%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%;
    --sidebar-border: 214.3 31.8% 91.4%;
    --sidebar-ring: 210 70% 50%;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 70% 50%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 180 60% 40%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 210 70% 50%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 222.2 84% 6%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 210 70% 50%;
    --sidebar-primary-foreground: 222.2 47.4% 11.2%;
    --sidebar-accent: 217.2 32.6% 20%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 210 70% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## File: `src/app/layout.tsx`

```tsx
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from 'next/font/google'
import { cn } from '@/lib/utils';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});


export const metadata: Metadata = {
  title: 'Digital Address',
  description: 'Your place, your pin, your proof.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        fontSans.variable,
        fontDisplay.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

## File: `src/app/login/page.tsx`

```tsx
import { Mail, Lock } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-body p-4">
       <div className="absolute top-4 left-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold">Digital Address</span>
          </Link>
        </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your email to receive a secure login link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>
            <Button asChild type="submit" className="w-full mt-2">
              <Link href="/dashboard">Send Login Link</Link>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-primary underline-offset-4 hover:underline">
                  Sign Up
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## File: `src/app/my-addresses/delete-address.ts`

```ts
'use server';

type ActionResponse = {
  success: boolean;
  error?: string;
};

export async function deleteAddress(nftId: string): Promise<ActionResponse> {
  if (!nftId) {
    return { success: false, error: 'NFT ID is required.' };
  }

  // In a real application, you would mark the address as archived
  // in your database or on the blockchain here using the nftId.
  console.log('Archiving address:', { nftId });

  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demonstration, we'll assume the action is always successful.
  // In a real scenario, you would handle potential errors from the database/blockchain.

  return { success: true };
}
```

---

## File: `src/app/my-addresses/edit-address-form.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Address } from '@/lib/addresses';
import { updateAddress } from './update-address';

const formSchema = z.object({
  name: z.string().min(1, 'Address name is required.'),
  address: z.string().min(1, 'Address is required.'),
});

type FormValues = z.infer<typeof formSchema>;

interface EditAddressFormProps {
  address: Address;
  onFormSubmit: (updatedAddress: Address) => void;
}

export function EditAddressForm({ address, onFormSubmit }: EditAddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: address.name,
      address: address.address,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('nftId', address.nftId);
    formData.append('name', values.name);
    formData.append('address', values.address);

    try {
      const result = await updateAddress(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: "Address Updated",
        description: "Your address details have been saved.",
      });
      onFormSubmit({ ...address, ...values });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Home, Work" {...field} />
              </FormControl>
              <FormDescription>A friendly name for this address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, Anytown, USA 12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
```

---

## File: `src/app/my-addresses/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  PlusCircle,
  QrCode,
  Copy,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  ShieldAlert,
  FileText,
  Link as LinkIcon,
  Fingerprint,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { EditAddressForm } from './edit-address-form';
import { deleteAddress } from './delete-address';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addresses as initialAddresses, type Address } from '@/lib/addresses';
import { AppLayout } from '@/components/layout/app-layout';

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(addresses.find(a => a.isPrimary) || addresses[0] || null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState<'archive' | 'incident' | null>(null);

  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleAddressSelect = (addressId: string) => {
    const address = addresses.find(addr => addr.nftId === addressId);
    setSelectedAddress(address || null);
  };
  
  const handleAddressUpdate = (updatedAddress: Address) => {
    const newAddresses = addresses.map(addr => addr.nftId === updatedAddress.nftId ? updatedAddress : addr);
    setAddresses(newAddresses);
    setSelectedAddress(updatedAddress);
    setIsEditDialogOpen(false);
  };
  
  const handleSetPrimary = (nftId: string) => {
    const newAddresses = addresses.map(addr => ({
      ...addr,
      isPrimary: addr.nftId === nftId
    }));
    setAddresses(newAddresses);
    const newSelected = newAddresses.find(addr => addr.nftId === selectedAddress?.nftId);
    if(newSelected) setSelectedAddress(newSelected);
    toast({
      title: "Primary Address Updated",
      description: "Your primary address has been changed.",
    });
  }

  const handleArchiveAddress = async (nftId: string) => {
    try {
      const result = await deleteAddress(nftId);
      if (result.error) {
        throw new Error(result.error);
      }
      
      const newAddresses = addresses.filter(addr => addr.nftId !== nftId);
      setAddresses(newAddresses);
      
      if (selectedAddress?.nftId === nftId) {
        setSelectedAddress(newAddresses.find(a => a.isPrimary) || newAddresses[0] || null);
      }
      
      toast({
        title: "Address Archived",
        description: "The address has been successfully archived.",
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Archive Failed",
        description: errorMessage,
      });
    }
  };

  const handleCopy = (text: string, type: 'Address' | 'NFT ID' | 'GPS' | 'Personal ID') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(type);
      toast({
        title: `${type} Copied!`,
        description: `The ${type.toLowerCase()} has been copied to your clipboard.`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };
  
  const handleReportIncident = (nftId: string) => {
     setAddresses(addresses.map(addr => addr.nftId === nftId ? { ...addr, status: 'Compromised' } : addr));
     setSelectedAddress(prev => prev && prev.nftId === nftId ? { ...prev, status: 'Compromised' } : prev);
     toast({
       variant: 'destructive',
       title: "Incident Reported",
       description: "The address has been marked as compromised and requires re-validation.",
     });
     setActionDialog(null);
  }

  const handleGetDirections = () => {
    if (!selectedAddress || !selectedAddress.gps) return;
    try {
        const cleanedGps = selectedAddress.gps.replace(/[°N°W°S°E\s]/g, '');
        const [lat, lng] = cleanedGps.split(',');
        if (lat && lng) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
             toast({ variant: 'destructive', title: 'Invalid GPS Format' });
        }
    } catch (error) {
        toast({ variant: 'destructive', title: 'Could not open maps' });
    }
  };

  const getStatusBadge = (status: Address['status']) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Compromised':
        return <Badge variant="destructive">Compromised</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }
  
  const getQrCodeUrl = (data: string, size: number) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }

  const handleCopyQr = async (data: string) => {
    if (!data) return;
    try {
      const imageUrl = getQrCodeUrl(data, 256);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast({
        title: "QR Code Copied",
        description: "The QR code image has been copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy QR code: ', err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the QR code image.",
      });
    }
  };

  return (
    <AppLayout>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="grid gap-8">
                  <div className='flex justify-between items-start md:items-center flex-col md:flex-row gap-4'>
                      <div>
                          <h2 className="text-2xl font-headline font-semibold">Your Address NFTs</h2>
                          <p className="text-muted-foreground">Manage your verified digital addresses.</p>
                      </div>
                      <Link href="/register">
                          <Button>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Register New Address
                          </Button>
                      </Link>
                  </div>
                
                <div className="space-y-8">
                  <Select onValueChange={handleAddressSelect} value={selectedAddress?.nftId || ''}>
                    <SelectTrigger className="w-full md:w-[400px]">
                      <SelectValue placeholder="Select an address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.nftId} value={address.nftId}>
                          {address.name}{' '}
                          <span className="text-muted-foreground">({address.address})</span>
                          {address.isPrimary && ' - Primary'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedAddress && (
                     <Card className="shadow-lg animate-in fade-in-50 duration-500">
                        <Tabs defaultValue="details">
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                <TabsList>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="succession">Succession</TabsTrigger>
                                </TabsList>
                                <CardTitle className="font-headline mt-4">{selectedAddress.name}</CardTitle>
                                <CardDescription>
                                    {selectedAddress.address}
                                </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                {selectedAddress.isPrimary && (
                                    <Badge variant="outline" className="mr-2 border-primary text-primary">Primary</Badge>
                                )}
                                {getStatusBadge(selectedAddress.status)}
                                <AlertDialog open={!!actionDialog} onOpenChange={(open) => !open && setActionDialog(null)}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)} disabled={selectedAddress.status !== 'Verified'}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                <span>Edit Details</span>
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuItem onSelect={() => handleSetPrimary(selectedAddress.nftId)} disabled={selectedAddress.isPrimary || selectedAddress.status !== 'Verified'}>
                                           <Check className="mr-2 h-4 w-4" />
                                           <span>Set as Primary</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                         <DropdownMenuItem className="text-destructive" onSelect={() => setActionDialog('incident')}>
                                            <ShieldAlert className="mr-2 h-4 w-4" />
                                            <span>Report Incident</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onSelect={() => setActionDialog('archive')} disabled={selectedAddress.isPrimary || selectedAddress.status !== 'Verified'}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Archive</span>
                                        </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                        {actionDialog === 'archive' && `This action cannot be undone. This will permanently archive the address "${selectedAddress.name}".`}
                                        {actionDialog === 'incident' && `This will mark the address "${selectedAddress.name}" as compromised, requiring re-validation. This action is recorded publicly.`}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setActionDialog(null)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => {
                                            if (actionDialog === 'archive') handleArchiveAddress(selectedAddress.nftId);
                                            if (actionDialog === 'incident') handleReportIncident(selectedAddress.nftId);
                                        }}>
                                        Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </div>
                            </CardHeader>
                            <TabsContent value="details">
                                <CardContent className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-4">
                                    {selectedAddress.status === 'Compromised' && (
                                        <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                                            <h4 className="font-bold flex items-center gap-2"><ShieldAlert />Incident Reported</h4>
                                            <p className="text-sm mt-1">This address is locked pending re-validation due to a reported incident (e.g., natural disaster). No transfers are permitted.</p>
                                            <Button size="sm" className="mt-2"><Link href="/admin/incident-response" className="flex items-center"><FileText className="mr-2 h-4 w-4"/>View Incident Report</Link></Button>
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <h3 className="font-semibold flex items-center gap-2"><Fingerprint className="text-muted-foreground"/> Digital Personal ID</h3>
                                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(selectedAddress.personalId, 'Personal ID')}>
                                            {copiedItem === 'Personal ID' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                          </Button>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                                          <p className="truncate font-mono">{selectedAddress.personalId}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <h3 className="font-semibold flex items-center gap-2"><LinkIcon className="text-muted-foreground"/> Address NFT ID</h3>
                                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(selectedAddress.nftId, 'NFT ID')}>
                                            {copiedItem === 'NFT ID' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                          </Button>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                                          <p className="truncate font-mono">{selectedAddress.nftId}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                            <h3 className="font-semibold flex items-center gap-2"><MapPin className="text-muted-foreground"/> GPS Coordinates</h3>
                                            <p className="text-muted-foreground">{selectedAddress.gps}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={handleGetDirections} disabled={!selectedAddress.gps}>
                                        <LinkIcon className="mr-2 h-4 w-4"/>
                                        Get Directions
                                    </Button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                                      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
                                        <DialogTrigger asChild>
                                           <div className="p-2 bg-white rounded-lg shadow-md cursor-pointer">
                                                <Image src={getQrCodeUrl(selectedAddress.nftId, 120)} alt="QR Code" width={120} height={120} data-ai-hint="qr code"/>
                                           </div>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                          <Tabs defaultValue="address" className="w-full">
                                            <DialogHeader>
                                              <DialogTitle>Shareable Codes</DialogTitle>
                                              <DialogDescription>
                                                Select a code to share, then scan or copy it.
                                              </DialogDescription>
                                              <TabsList className="grid w-full grid-cols-2 mt-2">
                                                <TabsTrigger value="address">Address NFT</TabsTrigger>
                                                <TabsTrigger value="personal">Personal ID</TabsTrigger>
                                              </TabsList>
                                            </DialogHeader>
                                            <TabsContent value="address">
                                               <div className="flex flex-col items-center justify-center p-4">
                                                <div className="p-4 bg-white rounded-lg shadow-md">
                                                    <Image src={getQrCodeUrl(selectedAddress.nftId, 256)} alt="Address QR Code" width={256} height={256} data-ai-hint="qr code" />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <p className="text-xs font-mono text-muted-foreground mt-2">{selectedAddress.nftId}</p>
                                                </div>
                                              </div>
                                              <DialogFooter>
                                                <Button onClick={() => handleCopyQr(selectedAddress.nftId)} className="w-full">
                                                  <Copy className="mr-2 h-4 w-4" />
                                                  Copy QR Image
                                                </Button>
                                              </DialogFooter>
                                            </TabsContent>
                                            <TabsContent value="personal">
                                              <div className="flex flex-col items-center justify-center p-4">
                                                <div className="p-4 bg-white rounded-lg shadow-md">
                                                    <Image src={getQrCodeUrl(selectedAddress.personalId, 256)} alt="Personal ID QR Code" width={256} height={256} data-ai-hint="qr code" />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <p className="text-xs font-mono text-muted-foreground mt-2">{selectedAddress.personalId}</p>
                                                </div>
                                              </div>
                                              <DialogFooter>
                                                <Button onClick={() => handleCopyQr(selectedAddress.personalId)} className="w-full">
                                                  <Copy className="mr-2 h-4 w-4" />
                                                  Copy QR Image
                                                </Button>
                                              </DialogFooter>
                                            </TabsContent>
                                          </Tabs>
                                        </DialogContent>
                                      </Dialog>
                                      <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsQrDialogOpen(true)}>
                                        <QrCode className="mr-2 h-4 w-4" />
                                        Show Codes
                                      </Button>
                                    </div>
                                </CardContent>
                            </TabsContent>
                             <TabsContent value="succession">
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg bg-secondary border">
                                        <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5"/> Digital Will & Succession</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Designate a beneficiary to inherit this Digital Address NFT in the event of your incapacitation or death. This action requires administrative verification of legal documents to execute.</p>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="beneficiary">Beneficiary Wallet Address</Label>
                                        <Input id="beneficiary" placeholder="0x... (Beneficiary's Wallet Address)" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Beneficiary</Button>
                                </CardFooter>
                            </TabsContent>
                        </Tabs>
                    </Card>
                  )}
                </div>
              </div>
            </main>
             {selectedAddress && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Address</DialogTitle>
                  <DialogDescription>
                    Update the details for your address. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <EditAddressForm
                  address={selectedAddress}
                  onFormSubmit={handleAddressUpdate}
                />
              </DialogContent>
            )}
        </Dialog>
    </AppLayout>
  );
}
```

---

## File: `src/app/my-addresses/update-address.ts`

```ts
'use server';

type ActionResponse = {
  success: boolean;
  error?: string;
};

export async function updateAddress(formData: FormData): Promise<ActionResponse> {
  const nftId = formData.get('nftId') as string | null;
  const name = formData.get('name') as string | null;
  const address = formData.get('address') as string | null;

  if (!nftId || !name || !address) {
    return { success: false, error: 'Missing required fields.' };
  }

  // In a real application, you would update the data in your database
  // or on the blockchain here using the nftId.
  console.log('Updating address:', { nftId, name, address });

  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demonstration, we'll assume the update is always successful.
  // In a real scenario, you would handle potential errors from the database/blockchain.

  return { success: true };
}
```

---

## File: `src/app/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { ArrowRight, KeyRound, Mail, Search, Copy } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const existingEmails = ['john.doe@example.com', 'admin@digitaladdress.com'];

export default function LandingPage() {
  const [nftId, setNftId] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleResolve = () => {
    if (nftId.trim()) {
      router.push(`/resolve/${nftId.trim()}`);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setNftId(text);
        toast({
          title: 'Pasted from clipboard!',
          description: 'The address has been pasted into the input field.',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Paste Failed',
        description: 'Could not read from clipboard. Please check browser permissions.',
      });
    }
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (existingEmails.includes(email)) {
        toast({
            title: "Login Link Sent",
            description: `A secure login link has been sent to ${email}.`,
        });
        setTimeout(() => router.push('/dashboard'), 2000);

      } else {
        toast({
            title: "Create Your Account",
            description: "This email is not registered. Please create an account.",
        });
        router.push('/register');
      }
    } else {
        toast({
            variant: 'destructive',
            title: 'Invalid Email',
            description: 'Please enter a valid email address.',
        });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-start gap-8">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your Identity, Your Address. Verified.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Digital Address provides a revolutionary way to manage and verify
              physical addresses using the power of AI and blockchain technology.
              Prevent fraud, streamline deliveries, and own your address like never before.
            </p>
            <div className="w-full max-w-md space-y-6">
               <Card className="bg-secondary/50">
                  <CardHeader>
                      <CardTitle className="font-headline">Get Started</CardTitle>
                      <CardDescription>Enter your email to log in or create your secure Digital Address.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={handleEmailSubmit} className="grid gap-2">
                          <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                          </div>
                          <Button type="submit" className="w-full">
                              Continue with Email
                              <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                      </form>
                  </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Find a Digital Address</CardTitle>
                    <CardDescription>Paste an NFT ID to resolve its physical location and get directions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="0x..."
                                className="pl-10 font-mono"
                                value={nftId}
                                onChange={(e) => setNftId(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="w-full" onClick={handleResolve}>
                                <Search className="mr-2 h-4 w-4" />
                                Resolve Address
                            </Button>
                             <Button type="button" variant="outline" size="icon" onClick={handlePaste} aria-label="Paste Address">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="relative w-full h-full min-h-[400px]">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Hero image showing a modern house with a digital lock"
              fill
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="modern house digital"
            />
            <div className="absolute -bottom-8 -right-8 w-48 rounded-lg bg-card p-4 shadow-lg border">
                <KeyRound className="h-8 w-8 text-accent mb-2"/>
                <h3 className="font-headline font-semibold">Address NFT</h3>
                <p className="text-sm text-muted-foreground">Your address, secured as a unique digital asset on the blockchain.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/for-businesses" className="hover:text-primary">For Businesses</Link>
            <Link href="/admin/login" className="hover:text-primary">Admin</Link>
            <Link href="/" className="hover:text-primary">Terms of Service</Link>
            <Link href="/" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

## File: `src/app/register/actions.ts`

```ts
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


type ActionResponse = ValidateDoorPhotoOutput & { error?: string, submitted?: boolean };

export async function handleRegistration(formData: FormData): Promise<ActionResponse> {
  try {
    const doorPhoto = formData.get('doorPhoto') as File | null;
    const gpsCoordinates = formData.get('gpsCoordinates') as string | null;
    const cryptoAddress = formData.get('cryptoAddress') as string | null;
    const countryCode = formData.get('countryCode') as string | null;
    const physicalAddress = formData.get('physicalAddress') as string | null;

    if (!doorPhoto || doorPhoto.size === 0) {
      return { isValid: false, validationDetails: 'Door photo is missing or empty.', error: 'Door photo is missing or empty.' };
    }
    if (!gpsCoordinates) {
      return { isValid: false, validationDetails: 'GPS coordinates are required.', error: 'GPS coordinates are required.' };
    }
    if (!cryptoAddress) {
        return { isValid: false, validationDetails: 'Crypto wallet address is required.', error: 'Crypto wallet address is required.' };
    }
    if (!countryCode) {
        return { isValid: false, validationDetails: 'Country code is required.', error: 'Country code is required.' };
    }
    if (!physicalAddress) {
        return { isValid: false, validationDetails: 'Physical address is required.', error: 'Physical address is required.' };
    }

    // Fetch satellite image based on GPS
    const satelliteImageDataUri = await getSatelliteImageForGps(gpsCoordinates);

    const doorPhotoDataUri = await fileToDataUri(doorPhoto);

    const input: ValidateDoorPhotoInput = {
      doorPhotoDataUri,
      satelliteImageDataUri,
      gpsCoordinates,
      cryptoAddress,
      countryCode,
      physicalAddress,
    };

    // The AI validation here is a preliminary check.
    const preliminaryValidation = await validateDoorPhoto(input);

    if (!preliminaryValidation.isValid) {
      return {
        ...preliminaryValidation,
        error: `Preliminary validation failed: ${preliminaryValidation.validationDetails}`
      }
    }
    
    // In a real app, you would now save the registration to the database with a 'pending_validation' status.
    // A new validation request would be created for third-party validators.
    console.log('Registration submitted for validation:', input);
    
    // For the demo, we'll return a success state indicating it's been submitted.
    return { 
      isValid: true,
      validationDetails: 'Your address has been submitted and is now pending third-party validation. You can track its status on the "My Addresses" page.',
      submitted: true,
    };

  } catch (e) {
    console.error('[handleRegistration Error]', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred during validation.';
    return {
      isValid: false,
      validationDetails: `Submission failed due to a server error: ${errorMessage}`,
      error: errorMessage,
    };
  }
}
```

---

## File: `src/app/register/add-family-member-form.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Mail, Home, User, CheckCircle, QrCode, Fingerprint } from 'lucide-react';
import Image from 'next/image';
import { generateSubAddress } from './utils';
import { addresses as userProperties } from '@/lib/addresses';

const formSchema = z.object({
  property: z.string().min(1, 'Please select a property.'),
  memberName: z.string().min(1, 'Family member name is required.'),
  memberEmail: z.string().email('Please enter a valid email.'),
  relationship: z.string().min(1, 'Relationship is required.'),
  idNumber: z.string().min(1, 'ID/Passport number is required.'),
});

type FormValues = z.infer<typeof formSchema>;

interface AddFamilyMemberFormProps {
  onBack: () => void;
}

type SubAddressResult = {
  subAddressId: string;
  memberName: string;
}

export function AddFamilyMemberForm({ onBack }: AddFamilyMemberFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SubAddressResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: '',
      memberName: '',
      memberEmail: '',
      relationship: '',
      idNumber: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    console.log('Submitting family member registration:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // The sub-address for a family member could be the same as the primary for simplicity
    const subAddressId = await generateSubAddress(values.property, values.relationship);

    toast({
      title: "Family Member Invitation Sent",
      description: `${values.memberName} has been invited to use your address.`,
    });
    
    setResult({ subAddressId, memberName: values.memberName });
    setIsLoading(false);
  };
  
  const handleDialogClose = () => {
    setResult(null);
    form.reset();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Options
      </Button>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Add a Family Member</CardTitle>
              <CardDescription>
                Invite a family member to share access to one of your verified properties.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Select Shared Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose one of your verified addresses..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userProperties.filter(p => p.status === 'Verified').map(prop => (
                          <SelectItem key={prop.nftId} value={prop.nftId}>
                            <div className="flex flex-col">
                              <span>{prop.address}</span>
                              <span className="text-xs text-muted-foreground font-mono">
                                (...{prop.nftId.slice(-8)})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Family Member's Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., John Doe" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="memberEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Family Member's Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., john.doe@example.com" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. Relationship</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., Spouse, Child, Parent" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. ID / Passport Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Enter government-issued ID number" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  'Send Invitation'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {result && (
        <AlertDialog open={!!result} onOpenChange={() => handleDialogClose()}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex justify-center">
                 <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              </div>
              <AlertDialogTitle className="text-center font-headline text-2xl">Access Granted!</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                An access request has been sent to {result.memberName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
                <div className="p-4 rounded-lg bg-secondary text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Their unique access ID for this property is:</p>
                    <p className="font-mono text-sm break-all">{result.subAddressId}</p>
                </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleDialogClose} className="w-full">
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </div>
  );
}
```

---

## File: `src/app/register/add-tenant-form.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Mail, Home, User, UploadCloud, CheckCircle, QrCode, Fingerprint } from 'lucide-react';
import Image from 'next/image';
import { generateSubAddress } from './utils';
import { addresses as userProperties } from '@/lib/addresses';


const formSchema = z.object({
  property: z.string().min(1, 'Please select a property.'),
  tenantName: z.string().min(1, 'Tenant name is required.'),
  tenantEmail: z.string().email('Please enter a valid email.'),
  idNumber: z.string().min(1, 'ID/Passport number is required.'),
  apartmentNumber: z.string().min(1, 'Apartment/unit number is required.'),
  doorPhoto: z.instanceof(File, { message: 'A photo of the tenant\'s door is required.' }).refine(file => file.size > 0, 'Door photo is required.'),
});

type FormValues = z.infer<typeof formSchema>;


interface AddTenantFormProps {
  onBack: () => void;
}

type SubAddressResult = {
  subAddressId: string;
  tenantName: string;
}

export function AddTenantForm({ onBack }: AddTenantFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [result, setResult] = useState<SubAddressResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: '',
      tenantName: '',
      tenantEmail: '',
      idNumber: '',
      apartmentNumber: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('doorPhoto', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    console.log('Submitting tenant registration:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const subAddressId = await generateSubAddress(values.property, values.apartmentNumber);

    toast({
      title: "Tenant Invitation Sent",
      description: `${values.tenantName} has been invited to use your address.`,
    });
    
    setResult({ subAddressId, tenantName: values.tenantName });
    setIsLoading(false);
  };
  
  const handleDialogClose = () => {
    setResult(null);
    form.reset();
    setPhotoPreview(null);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Options
      </Button>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Add a New Tenant</CardTitle>
              <CardDescription>
                Invite a tenant to use one of your verified properties. They will receive an access request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Select Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose one of your verified addresses..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userProperties.filter(p => p.status === 'Verified').map(prop => (
                          <SelectItem key={prop.nftId} value={prop.nftId}>
                            <div className="flex flex-col">
                              <span>{prop.address}</span>
                              <span className="text-xs text-muted-foreground font-mono">
                                (...{prop.nftId.slice(-8)})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="tenantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Tenant's Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., Jane Doe" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="tenantEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Tenant's Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., jane.doe@example.com" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>4. Tenant's ID / Passport Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Enter government-issued ID number" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="apartmentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. House / Apartment Number</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., Apt 4B" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormDescription>The specific unit for this tenant.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doorPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>6. Tenant's Door Photo</FormLabel>
                      <FormControl>
                        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors">
                          {photoPreview ? (
                            <Image src={photoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" data-ai-hint="apartment door"/>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center">
                              <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload photo</span>
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleFileChange}
                          />
                        </label>
                      </FormControl>
                       <FormDescription>A photo of the tenant's specific door.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  'Send Invitation'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {result && (
        <AlertDialog open={!!result} onOpenChange={() => handleDialogClose()}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex justify-center">
                 <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              </div>
              <AlertDialogTitle className="text-center font-headline text-2xl">Sub-Address Created!</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                A new sub-digital address has been generated for {result.tenantName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
                <div className="p-4 rounded-lg bg-secondary text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Tenant's Sub-Digital Address</p>
                    <p className="font-mono text-sm break-all">{result.subAddressId}</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                    <div className="p-2 bg-white rounded-lg shadow-md">
                      <Image src="https://placehold.co/160x160.png" alt="QR Code" width={160} height={160} data-ai-hint="qr code"/>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Scan QR code for verification</p>
                </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleDialogClose} className="w-full">
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </div>
  );
}
```

---

## File: `src/app/register/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { RegistrationOptions, type RegistrationChoice } from './registration-options';
import { AddTenantForm } from './add-tenant-form';
import { AddFamilyMemberForm } from './add-family-member-form';
import { AppLayout } from '@/components/layout/app-layout';

const RegisterForm = dynamic(() => import('./register-form').then(mod => mod.RegisterForm), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto space-y-4">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-10 w-48" />
    </div>
  ),
});

export default function RegisterPage() {
  const [choice, setChoice] = useState<RegistrationChoice | null>(null);

  const handleResetChoice = () => {
    setChoice(null);
  };

  const renderContent = () => {
    switch (choice) {
      case 'new-property':
        return <RegisterForm onBack={handleResetChoice} />;
      case 'add-tenant':
        return <AddTenantForm onBack={handleResetChoice} />;
      case 'add-family-member':
        return <AddFamilyMemberForm onBack={handleResetChoice} />;
      default:
        return <RegistrationOptions onChoice={setChoice} />;
    }
  };

  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {renderContent()}
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/register/register-form.tsx`

```tsx
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { handleRegistration } from './actions';
import type { ValidateDoorPhotoOutput } from '@/ai/flows/validate-door-photo';
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Camera, LocateFixed, Wallet, AlertTriangle, RefreshCw, Eye, Home, ArrowLeft, Building, Globe, Save, FileText, Fingerprint } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, type Country } from '@/lib/countries';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  country: z.string().min(1, 'Please select a country.'),
  state: z.string().optional(),
  addressName: z.string().min(1, 'An address name is required (e.g., Home, Office).'),
  titleDeedNumber: z.string().optional(),
  idNumber: z.string().optional(),
  gpsCoordinates: z.string().min(1, 'GPS coordinates are required.'),
  physicalAddress: z.string().min(1, 'Physical address is required.'),
  doorPhoto: z.instanceof(File, { message: 'Door photo is required.' }).refine(file => file.size > 0, 'Door photo is required.'),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const drawSignatureOnImage = (imageSrc: string, cryptoAddress: string, physicalAddress: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context.'));
      }
      
      ctx.drawImage(img, 0, 0);

      const timestamp = new Date().toISOString();
      
      const maxAddressLength = 40;
      const truncatedAddress = physicalAddress.length > maxAddressLength 
          ? physicalAddress.substring(0, maxAddressLength) + '...'
          : physicalAddress;

      const signatureLine1 = truncatedAddress;
      const signatureLine2 = `${cryptoAddress} | ${timestamp}`;
      
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const textWidth1 = ctx.measureText(signatureLine1).width;
      const textWidth2 = ctx.measureText(signatureLine2).width;
      const maxWidth = Math.max(textWidth1, textWidth2);

      ctx.fillRect(8, canvas.height - 52, maxWidth + 24, 44);
      
      ctx.fillStyle = 'white';
      ctx.fillText(signatureLine1, 20, canvas.height - 32);
      ctx.fillText(signatureLine2, 20, canvas.height - 12);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "signed_door_photo.jpg", { type: "image/jpeg" });
          resolve(file);
        } else {
          reject(new Error('Could not create blob from canvas.'));
        }
      }, 'image/jpeg', 0.95);
    };
    img.onerror = () => {
      reject(new Error('Failed to load image for signing.'));
    }
  });
};

// Mock function to generate a crypto address from a seed
const generateMockAddress = (seed: string): string => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    const randomHex = (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
    const remaining = [...Array(42 - 2 - 3 - 8)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
    return `0xADD${randomHex}${remaining}`;
};

interface RegisterFormProps {
  onBack: () => void;
}

type RegistrationResult = ValidateDoorPhotoOutput & { submitted?: boolean };

const LOCAL_STORAGE_KEY = 'addressChainRegistrationForm';

export function RegisterForm({ onBack }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const doorPhotoRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'loading' | 'allowed' | 'denied' | 'notsupported'>('idle');
  const [isCapturing, setIsCapturing] = useState(false);
  
  const [capturedImage, setCapturedImage] = useState<{ src: string, file: File } | null>(null);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      state: '',
      addressName: '',
      titleDeedNumber: '',
      idNumber: '',
      gpsCoordinates: '',
      physicalAddress: '',
      terms: false,
    },
  });

  const { watch, setValue, reset, getValues, formState: { isValid } } = form;
  const countryCode = watch('country');
  const gpsCoordinates = watch('gpsCoordinates');
  const physicalAddress = watch('physicalAddress');
  const doorPhoto = watch('doorPhoto');
  const addressName = watch('addressName');
  const titleDeedNumber = watch('titleDeedNumber');
  const idNumber = watch('idNumber');

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsedData:Partial<FormValues> = JSON.parse(savedData);
        // We don't restore the file input, but we restore the text fields
        const { doorPhoto, terms, ...restOfData } = parsedData;
        reset(restOfData);
        toast({
          title: "Draft Loaded",
          description: "Your previously saved registration data has been loaded.",
        })
      }
    } catch (e) {
      console.error("Failed to load saved form data:", e);
    }
  }, [reset, toast]);

  useEffect(() => {
    if (countryCode) {
      const country = countries.find(c => c.code === countryCode) || null;
      setSelectedCountry(country);
      setValue('state', ''); // Reset state selection when country changes
    } else {
      setSelectedCountry(null);
    }
  }, [countryCode, setValue]);

  useEffect(() => {
    if (gpsCoordinates && countryCode) {
        const seed = `${countryCode}:${gpsCoordinates}`;
        const newAddress = generateMockAddress(seed);
        setGeneratedAddress(newAddress);
    } else {
        setGeneratedAddress(null);
    }
  }, [gpsCoordinates, countryCode]);

  const requestCamera = async () => {
    if (cameraStatus !== 'idle' && cameraStatus !== 'denied') return;
    let stream: MediaStream | null = null;
    if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraStatus('loading');
      try {
        stream = await navigator.mediaDevices.getUserMedia({video: true});
        setCameraStatus('allowed');
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraStatus('denied');
      }
    } else {
      console.error('Camera not supported by this browser.');
      setCameraStatus('notsupported');
    }
  };

  const processAndSetImage = useCallback(async (imageSrc: string, source: 'upload' | 'camera') => {
    if (!generatedAddress) {
      toast({
        variant: 'destructive',
        title: 'Complete Previous Steps',
        description: 'You must provide country and GPS coordinates before adding a photo.',
      });
      return null;
    }

    if (!physicalAddress) {
        toast({
            variant: 'destructive',
            title: 'Physical Address Required',
            description: 'You must provide a physical address before adding a photo.',
        });
        return null;
    }

    try {
      const signedFile = await drawSignatureOnImage(imageSrc, generatedAddress, physicalAddress);
      const signedImageSrc = URL.createObjectURL(signedFile);
      
      if (source === 'upload') {
        setValue('doorPhoto', signedFile, { shouldValidate: true });
        setDoorPhotoPreview(signedImageSrc);
      }
      
      return { src: signedImageSrc, file: signedFile };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Image Signing Failed",
        description: errorMessage,
      });
      return null;
    }
  }, [setValue, toast, generatedAddress, physicalAddress]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await processAndSetImage(reader.result as string, 'upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await processAndSetImage(reader.result as string, 'upload');
      };
      reader.readAsDataURL(file);
    }
  }, [processAndSetImage]);
  
  const handleCapture = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      const signedImage = await processAndSetImage(imageDataUrl, 'camera');
      if (signedImage) {
        setCapturedImage(signedImage);
      }
      
      setIsCapturing(false);
    }
  }, [processAndSetImage]);

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirmCapture = () => {
    if (capturedImage) {
      setValue('doorPhoto', capturedImage.file, { shouldValidate: true });
      setDoorPhotoPreview(capturedImage.src);
      toast({
        title: "Photo Confirmed",
        description: "Your door photo has been set and is ready for submission.",
      });
      setCapturedImage(null); // Clear the captured image to hide the confirm/retake buttons
    }
  };


  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    if (!generatedAddress) {
      setError("Could not generate a wallet address. Please check your GPS coordinates.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('cryptoAddress', generatedAddress);
    formData.append('gpsCoordinates', values.gpsCoordinates);
    formData.append('doorPhoto', values.doorPhoto);
    formData.append('countryCode', values.country);
    formData.append('physicalAddress', values.physicalAddress);
    
    try {
      const response = await handleRegistration(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setResult(response);
      toast({
        title: response.submitted ? "Registration Submitted" : "Validation Complete",
        description: response.validationDetails,
      });
      // Clear saved data on successful submission
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = () => {
    try {
      const currentData = getValues();
      const { doorPhoto, ...dataToSave } = currentData; // Don't save the file object
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      toast({
        title: "Draft Saved",
        description: "Your registration progress has been saved locally.",
      });
    } catch (e) {
      console.error("Failed to save form data:", e);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save your progress.",
      });
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const coords = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
                setValue('gpsCoordinates', coords, { shouldValidate: true });
                setIsLoading(false);
                toast({
                    title: "Location Fetched",
                    description: "Your GPS coordinates have been set.",
                });
            },
            (error) => {
                console.error("Error getting location", error);
                setIsLoading(false);
                toast({
                    variant: 'destructive',
                    title: 'Location Error',
                    description: 'Could not retrieve your location. Please enter it manually.',
                });
            }
        );
    } else {
        toast({
            variant: 'destructive',
            title: 'Geolocation not supported',
            description: 'Your browser does not support geolocation.',
        });
    }
  };

  const isDataReadyForReview = gpsCoordinates && generatedAddress && physicalAddress && doorPhoto && addressName && countryCode;
  const isFormReadOnly = result?.submitted === true;

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Options
      </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Register a New Property</CardTitle>
          <CardDescription>
            {isFormReadOnly ? "Your address has been submitted for validation." : "Follow the steps to submit your address and location for validation."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isFormReadOnly}>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                     <FormField
                      control={form.control}
                      name="addressName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>1. Address Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="e.g., Home, Office, Warehouse" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            A friendly name for this address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>2. Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                   <SelectTrigger>
                                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                      <span className="pl-6">
                                        <SelectValue placeholder="Select..." />
                                      </span>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countries.map(country => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.name} ({country.phoneCode})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                             <FormItem>
                              <FormLabel>3. State/Province</FormLabel>
                              {selectedCountry && selectedCountry.states ? (
                                <Select onValueChange={field.onChange} value={field.value || ''} disabled={!selectedCountry?.states}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {selectedCountry.states.map(state => (
                                      <SelectItem key={state.code} value={state.code}>
                                        {state.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <FormControl>
                                  <Input placeholder="Enter state/province..." {...field} disabled={!selectedCountry} />
                                </FormControl>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="physicalAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>4. Physical Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Street, City, Postal Code" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormDescription>
                              This will be included in the digital signature on your photo.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                       <FormField
                        control={form.control}
                        name="titleDeedNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>5. Title Deed Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="e.g., T-1234567" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormDescription>
                              (Optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="idNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>6. ID/Passport No.</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Owner's ID" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                             <FormDescription>
                              (Optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                      <FormField
                        control={form.control}
                        name="gpsCoordinates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>7. GPS Coordinates</FormLabel>
                            <div className="flex gap-2">
                                <FormControl>
                                  <div className="relative flex-grow">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="e.g., 34.0522,-118.2437" {...field} className="pl-10" />
                                  </div>
                                </FormControl>
                                <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLoading}>
                                    <LocateFixed className="mr-2 h-4 w-4"/>
                                    My Location
                                </Button>
                            </div>
                            <FormDescription>
                              Provide latitude and longitude to generate a crypto wallet address.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       {generatedAddress && (
                          <FormItem>
                            <FormLabel>8. Generated Crypto Wallet Address</FormLabel>
                             <FormControl>
                              <div className="relative flex-grow bg-secondary p-2 rounded-md">
                                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <p className="pl-10 font-mono text-sm truncate">{generatedAddress}</p>
                              </div>
                            </FormControl>
                            <FormDescription>
                              This "country-stamped" address is generated from your GPS & country.
                            </FormDescription>
                          </FormItem>
                      )}
                  </div>
                  <FormField
                    control={form.control}
                    name="doorPhoto"
                    render={() => (
                      <FormItem>
                        <FormLabel>9. Door Photo</FormLabel>
                        <Tabs defaultValue="camera" className="w-full" onValueChange={(value) => value === 'camera' && requestCamera()}>
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="camera" disabled={cameraStatus === 'notsupported'}><Camera className="mr-2"/>Use Camera</TabsTrigger>
                            <TabsTrigger value="upload"><UploadCloud className="mr-2"/>Upload File</TabsTrigger>
                          </TabsList>
                          <TabsContent value="upload">
                            <div className="space-y-4">
                              <Alert variant="default" className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500/50 dark:text-yellow-400 [&>svg]:text-yellow-500">
                                 <AlertTriangle className="h-4 w-4" />
                                 <AlertTitle>Location Mismatch Warning</AlertTitle>
                                 <AlertDescription>
                                   If your photo contains location data (EXIF) that does not match the GPS coordinates provided, validation may fail. For best results, use the "Use Camera" option to take a fresh photo.
                                 </AlertDescription>
                               </Alert>
                              <FormControl>
                                <label
                                  onDragOver={onDragOver}
                                  onDrop={onDrop}
                                  className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${doorPhotoPreview ? 'border-primary' : ''}`}
                                >
                                  {doorPhotoPreview ? (
                                    <Image src={doorPhotoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" data-ai-hint="house door"/>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                      <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                      <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                      </p>
                                      <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
                                    </div>
                                  )}
                                  <input
                                    ref={doorPhotoRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </FormControl>
                            </div>
                          </TabsContent>
                          <TabsContent value="camera">
                            <div className="relative overflow-hidden rounded-md">
                              {capturedImage ? (
                                <Image src={capturedImage.src} alt="Captured preview" width={1920} height={1080} className="w-full aspect-video" data-ai-hint="house door"/>
                              ) : (
                                <video ref={videoRef} className="w-full aspect-video bg-black" autoPlay muted playsInline />
                              )}
                              <canvas ref={canvasRef} className="hidden"></canvas>
                              {!capturedImage && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[calc(100%-4rem)] h-[calc(100%-4rem)] border-4 border-white/50 border-dashed rounded-lg shadow-2xl" />
                                </div>
                              )}
                              {cameraStatus !== 'allowed' && !capturedImage && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                                   {cameraStatus === 'loading' && <Loader2 className="h-8 w-8 animate-spin text-white" />}
                                   {cameraStatus === 'denied' && (
                                     <Alert variant="destructive" className="w-auto">
                                        <AlertTitle>Camera Access Denied</AlertTitle>
                                        <AlertDescription>
                                          Please enable camera permissions to use this feature.
                                        </AlertDescription>
                                    </Alert>
                                   )}
                                   {cameraStatus === 'notsupported' && (
                                     <Alert variant="destructive" className="w-auto">
                                        <AlertTitle>Camera Not Supported</AlertTitle>
                                        <AlertDescription>
                                          Your browser does not support camera access.
                                        </AlertDescription>
                                    </Alert>
                                   )}
                                </div>
                              )}
                            </div>
                            {capturedImage ? (
                               <div className="flex gap-2 w-full mt-2">
                                <Button type="button" onClick={handleRetake} variant="outline" className="w-full">
                                  <RefreshCw className="mr-2" />
                                  Retake Photo
                                </Button>
                                <Button type="button" onClick={handleConfirmCapture} className="w-full">
                                  <CheckCircle className="mr-2" />
                                  Confirm & Proceed
                                </Button>
                              </div>
                            ) : (
                              <Button type="button" onClick={handleCapture} disabled={cameraStatus !== 'allowed' || isCapturing} className="w-full mt-2">
                                {isCapturing ? <Loader2 className="animate-spin mr-2" /> : <Camera className="mr-2" />}
                                {isCapturing ? 'Processing...' : 'Capture & Sign Photo'}
                              </Button>
                            )}
                          </TabsContent>
                        </Tabs>
                        <FormDescription>
                          A clear photo of the main entrance, signed with your address details.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {(isDataReadyForReview || isFormReadOnly) && (
                  <div className="border-t pt-6 space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2"><Eye className="h-5 w-5"/> Review Your Data</h3>
                      <div className="p-4 rounded-lg bg-secondary space-y-3 text-sm">
                          <div>
                              <span className="font-semibold text-muted-foreground">Address Name:</span>
                              <p>{addressName}</p>
                          </div>
                           <div>
                              <span className="font-semibold text-muted-foreground">Title Deed Number:</span>
                              <p>{titleDeedNumber || 'N/A'}</p>
                          </div>
                           <div>
                              <span className="font-semibold text-muted-foreground">ID / Passport Number:</span>
                              <p>{idNumber || 'N/A'}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-muted-foreground">GPS Coordinates:</span>
                              <p className="font-mono">{gpsCoordinates}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-muted-foreground">Physical Address:</span>
                              <p>{physicalAddress}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-muted-foreground">Crypto Wallet Address:</span>
                              <p className="font-mono truncate">{generatedAddress}</p>
                          </div>
                           <div>
                              <span className="font-semibold text-muted-foreground">Signed Door Photo:</span>
                              {doorPhotoPreview && <Image src={doorPhotoPreview} alt="Door photo preview" width={150} height={150} className="mt-2 rounded-md border" data-ai-hint="house door"/>}
                          </div>
                      </div>
                  </div>
                )}
                 {!isFormReadOnly && (
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6 shadow-sm">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Agree to terms and conditions
                                </FormLabel>
                                <FormDescription>
                                Your data is secure. Only your generated digital address is shared with companies you authorize. By proceeding, you agree to our{' '}
                                <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and{' '}
                                <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                                </FormDescription>
                                <FormMessage />
                            </div>
                            </FormItem>
                        )}
                        />
                 )}
              </CardContent>
              {!isFormReadOnly && (
                <CardFooter className="flex justify-between items-center">
                   <Button type="button" variant="outline" onClick={handleSave} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save for Later
                  </Button>
                  <Button type="submit" disabled={isLoading || !isValid}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit for Validation'
                    )}
                  </Button>
                </CardFooter>
              )}
            </fieldset>
          </form>
        </Form>
      </Card>
      
      {result && (
        <Card className={`mt-8 shadow-lg ${result.isValid ? 'border-green-500' : 'border-red-500'}`}>
          <CardHeader className="flex flex-row items-center gap-4">
            {result.isValid ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-red-500" />}
            <div>
              <CardTitle className="font-headline text-xl">
                {result.submitted ? "Registration Submitted" : "Preliminary Check Failed"}
              </CardTitle>
              <CardDescription>{result.isValid ? "Your address is pending third-party validation." : "Your submission could not be processed."}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Details:</p>
            <p className="text-muted-foreground p-3 bg-secondary rounded-md mt-2">{result.validationDetails}</p>
             {result.submitted && (
                <Button asChild className="mt-4">
                    <Link href="/my-addresses">
                        Go to My Addresses
                    </Link>
                </Button>
            )}
          </CardContent>
        </Card>
      )}

      {error && !result &&(
         <Card className="mt-8 shadow-lg border-destructive">
          <CardHeader className="flex flex-row items-center gap-4">
            <XCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="font-headline text-xl">Submission Failed</CardTitle>
              <CardDescription>An error occurred during the submission process.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-destructive p-3 bg-destructive/10 rounded-md">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

---

## File: `src/app/register/registration-options.tsx`

```tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, UserPlus, ArrowRight } from 'lucide-react';

export type RegistrationChoice = 'new-property' | 'add-tenant' | 'add-family-member';

interface RegistrationOptionsProps {
  onChoice: (choice: RegistrationChoice) => void;
}

export function RegistrationOptions({ onChoice }: RegistrationOptionsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">What would you like to do?</CardTitle>
          <CardDescription>Choose an option to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => onChoice('new-property')}
              className="group text-left p-6 border rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-center gap-4 mb-2">
                <Building className="h-8 w-8 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Register a New Property</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Verify a new physical address you own, like a home or rental property. This will create a new primary Address NFT.
              </p>
              <div className="flex items-center text-primary font-medium">
                Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <div className="p-6 border rounded-lg">
               <div className="flex items-center gap-4 mb-2">
                <UserPlus className="h-8 w-8 text-accent" />
                <h3 className="font-headline text-xl font-semibold">Grant Access to an Address</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Grant access to a tenant or family member to use one of your already verified addresses.
              </p>
              <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={() => onChoice('add-tenant')} className="justify-start">Add a Tenant</Button>
                  <Button variant="outline" onClick={() => onChoice('add-family-member')} className="justify-start">Add a Family Member</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## File: `src/app/register/utils.ts`

```ts
'use server';

// Mock function to generate a sub-address ID
export const generateSubAddress = async (primaryNftId: string, apartmentNumber: string): Promise<string> => {
    const primaryPart = primaryNftId.slice(2, 10);
    
    let aptHash = 0;
    for (let i = 0; i < apartmentNumber.length; i++) {
        const char = apartmentNumber.charCodeAt(i);
        aptHash = ((aptHash << 5) - aptHash) + char;
        aptHash |= 0; // Convert to 32bit integer
    }
    const aptPart = (aptHash & 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
    
    return `0x${primaryPart}SUB${aptPart}${'0'.repeat(42 - 13 - aptPart.length)}`.slice(0, 42);
};
```

---

## File: `src/app/resolve/[nftId]/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { MapPin, KeyRound, CheckCircle, Copy, Check, LocateFixed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addresses } from '@/lib/addresses';

export default function ResolveAddressPage({ params }: { params: { nftId: string } }) {
  const nftId = params.nftId;
  const addressDetails = addresses.find(addr => addr.nftId.toLowerCase() === nftId.toLowerCase());
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetDirections = () => {
    if (!addressDetails || !addressDetails.gps) return;
    try {
        const cleanedGps = addressDetails.gps.replace(/[°N°W°S°E\s]/g, '');
        const [lat, lng] = cleanedGps.split(',');
        if (lat && lng) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    } catch (error) {
        console.error('Could not open maps', error);
    }
  };

  const handleCopy = (text: string, type: 'Address' | 'NFT ID' | 'GPS') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(type);
      toast({
        title: `${type} Copied!`,
        description: `The ${type.toLowerCase()} has been copied to your clipboard.`,
      });
      setTimeout(() => setCopiedItem(null), 2000); // Revert after 2 seconds
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary font-body p-4">
      <header className="absolute top-0 left-0 right-0 p-4">
        <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline font-bold">Digital Address</span>
            </Link>
        </div>
      </header>
      
      <Card className="w-full max-w-lg shadow-xl">
        {addressDetails ? (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="font-headline text-2xl">Verified Physical Address</CardTitle>
              <CardDescription>This address has been verified on the Digital Address platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 rounded-md border bg-background p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-semibold">Physical Address</span>
                    </div>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(addressDetails.address, 'Address')}>
                        {copiedItem === 'Address' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                     </Button>
                </div>
                <p className="pl-8 text-lg font-medium text-foreground">{addressDetails.address}</p>
                 <div className="pl-8 flex gap-2 pt-2">
                    <Button onClick={handleGetDirections} size="sm">
                        <MapPin className="mr-2 h-4 w-4"/>
                        Get Directions
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleCopy(addressDetails.gps, 'GPS')}>
                         {copiedItem === 'GPS' ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <LocateFixed className="mr-2 h-4 w-4" />}
                        Copy GPS
                    </Button>
                </div>
              </div>
              <div className="space-y-1 rounded-md border bg-background p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                    <KeyRound className="h-5 w-5" />
                    <span className="text-sm font-semibold">Digital Address NFT ID</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(addressDetails.nftId, 'NFT ID')}>
                         {copiedItem === 'NFT ID' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <p className="pl-8 font-mono text-sm text-foreground break-all">{addressDetails.nftId}</p>
              </div>
            </CardContent>
             <CardFooter className="flex justify-center">
               <Button asChild variant="link">
                 <Link href="/dashboard">
                    Go to Dashboard
                 </Link>
               </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Address Not Found</CardTitle>
              <CardDescription>The requested Digital Address NFT ID could not be found.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground">Please check the link and try again.</p>
                 <Button asChild className="w-full mt-4">
                    <Link href="/">
                        Return to Homepage
                    </Link>
                </Button>
            </CardContent>
          </>
        )}
      </Card>
      
       <footer className="absolute bottom-0 left-0 right-0 p-4">
        <div className="container mx-auto text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
```

---

## File: `src/app/support/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2 } from 'lucide-react';

const supportFormSchema = z.object({
  category: z.string().min(1, 'Please select a category.'),
  subject: z.string().min(1, 'Subject is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      category: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: SupportFormValues) => {
    setIsLoading(true);
    console.log('Submitting support request:', values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Feedback Submitted',
      description: 'Thank you! Your message has been received.',
    });

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AppLayout>
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <Card className="max-w-2xl w-full text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="font-headline text-2xl">Thank You!</CardTitle>
              <CardDescription>
                Your feedback has been successfully submitted. Our team will review it shortly.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}>
                Submit Another Request
              </Button>
            </CardFooter>
          </Card>
        </main>
      </AppLayout>
    );
  }


  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Support & Feedback</CardTitle>
              <CardDescription>
                Have a question, a bug to report, or a feature to suggest? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bug-report">Bug Report</SelectItem>
                            <SelectItem value="feature-request">Feature Request</SelectItem>
                            <SelectItem value="account-issue">Account Issue</SelectItem>
                            <SelectItem value="general-feedback">General Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="A brief summary of your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide as much detail as possible..."
                            rows={8}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </AppLayout>
  );
}
```

---

## File: `src/app/validate/[requestId]/actions.ts`

```ts
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
```

---

## File: `src/app/validate/[requestId]/page.tsx`

```tsx
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { handleValidation } from './actions';
import type { CompareValidationPhotosOutput } from '@/ai/flows/compare-validation-photos';
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Camera, LocateFixed, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';
import { Logo } from '@/components/icons';

const formSchema = z.object({
  validatorDoorPhoto: z.instanceof(File, { message: 'A photo of the door is required.' }).refine(file => file.size > 0, 'A photo of the door is required.'),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for the request - in a real app, this would be fetched based on `requestId`
const mockRequest = {
  requestId: 'REQ-12345',
  addressToVerify: '123 Main Street, Anytown, USA 12345',
  originalUserPhoto: 'https://placehold.co/600x400.png',
  gpsCoordinates: '34.0522,-118.2437', // Pre-defined GPS for validation
};

export default function ValidateRequestPage({ params }: { params: { requestId: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CompareValidationPhotosOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const [mapOpened, setMapOpened] = useState(false);
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'loading' | 'allowed' | 'denied' | 'notsupported'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { setValue, trigger, watch } = form;
  const photo = watch('validatorDoorPhoto');

  const requestCamera = async () => {
    if (cameraStatus !== 'idle' && cameraStatus !== 'denied') return;
    let stream: MediaStream | null = null;
    if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setCameraStatus('loading');
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStatus('allowed');
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setCameraStatus('denied');
        }
    } else {
        setCameraStatus('notsupported');
    }
  };

  const setFileInForm = useCallback((file: File) => {
      const previewUrl = URL.createObjectURL(file);
      setDoorPhotoPreview(previewUrl);
      setValue('validatorDoorPhoto', file, { shouldValidate: true });
      trigger('validatorDoorPhoto'); // Manually trigger validation
  }, [setValue, trigger]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInForm(file);
    }
  };

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      canvas.toBlob((blob) => {
        if (blob) {
            const capturedFile = new File([blob], "validator-photo.jpg", { type: "image/jpeg" });
            setFileInForm(capturedFile);
            toast({ title: "Photo Captured", description: "The captured image is now ready for submission."});
        }
      }, 'image/jpeg');
    }
  }, [setFileInForm, toast]);
  
  const handleRetake = () => {
    setDoorPhotoPreview(null);
    setValue('validatorDoorPhoto', new File([], ''), { shouldValidate: true });
  }

  const handleOpenMap = () => {
    const [lat, lng] = mockRequest.gpsCoordinates.split(',');
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
    setMapOpened(true);
    toast({
      title: 'Map Opened',
      description: 'Please confirm the location on the map, then return to this tab.',
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('requestId', params.requestId);
    formData.append('validatorGpsCoordinates', mockRequest.gpsCoordinates);
    formData.append('validatorDoorPhoto', values.validatorDoorPhoto);

    try {
      const response = await handleValidation(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setResult(response);
      toast({
        title: "Validation Submitted",
        description: "Your validation has been recorded.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const isFormReadOnly = result?.isMatch === true;
  const canSubmit = mapOpened && photo && photo.size > 0;

  return (
    <div className="flex min-h-screen flex-col items-center bg-background font-body p-4">
        <header className="w-full max-w-4xl mx-auto mb-4">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline font-bold">Digital Address Validator</span>
            </Link>
        </header>
        <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="font-headline text-2xl">Third-Party Validation</CardTitle>
            <CardDescription>
                You have been selected to validate a new address registration. Please confirm the location and capture a photo of the door.
            </CardDescription>
            </CardHeader>
             <CardContent>
                <div className="p-4 rounded-lg bg-secondary space-y-3 text-sm border">
                    <h3 className="font-semibold text-lg">Request Details</h3>
                    <div>
                        <span className="font-semibold text-muted-foreground">Request ID:</span>
                        <p className="font-mono">{params.requestId}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-muted-foreground">Address to Verify:</span>
                        <p>{mockRequest.addressToVerify}</p>
                    </div>
                     <div>
                        <span className="font-semibold text-muted-foreground">Original User's Photo:</span>
                        <Image src={mockRequest.originalUserPhoto} alt="Original user's door photo" width={200} height={150} className="mt-2 rounded-md border" data-ai-hint="front door"/>
                    </div>
                </div>
            </CardContent>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={isFormReadOnly}>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormItem>
                                <FormLabel>1. Verify Location</FormLabel>
                                 <Alert>
                                  <MapPin className="h-4 w-4" />
                                  <AlertTitle>Action Required</AlertTitle>
                                  <AlertDescription>
                                    Click the button below to open Google Maps in a new tab. Confirm you are at the correct location, then return here to complete the next step.
                                  </AlertDescription>
                                </Alert>
                                <Button type="button" onClick={handleOpenMap} className="w-full" disabled={mapOpened}>
                                  {mapOpened ? <CheckCircle className="mr-2 h-4 w-4" /> : <MapPin className="mr-2 h-4 w-4" />}
                                  {mapOpened ? "Map Opened" : "Open Map to Verify Location"}
                                </Button>
                            </FormItem>
                        </div>

                        <FormField
                            control={form.control}
                            name="validatorDoorPhoto"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>2. Capture Door Photo</FormLabel>
                                <Tabs defaultValue="camera" className="w-full" onValueChange={(value) => value === 'camera' && requestCamera()}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="camera" disabled={cameraStatus === 'notsupported'}><Camera className="mr-2"/>Use Camera</TabsTrigger>
                                    <TabsTrigger value="upload"><UploadCloud className="mr-2"/>Upload File</TabsTrigger>
                                </TabsList>
                                <TabsContent value="upload">
                                    <FormControl>
                                        <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${doorPhotoPreview ? 'border-primary' : ''}`}>
                                        {doorPhotoPreview ? (
                                            <Image src={doorPhotoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/png, image/jpeg, image/webp"
                                            onChange={handleFileChange}
                                        />
                                        </label>
                                    </FormControl>
                                </TabsContent>
                                <TabsContent value="camera">
                                     <div className="space-y-2">
                                        <div className="relative overflow-hidden rounded-md">
                                            <video ref={videoRef} className="w-full aspect-video bg-black" autoPlay muted playsInline />
                                            <canvas ref={canvasRef} className="hidden"></canvas>
                                            {cameraStatus !== 'allowed' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                    {cameraStatus === 'loading' && <Loader2 className="h-8 w-8 animate-spin text-white" />}
                                                    {cameraStatus === 'denied' && <Alert variant="destructive"><AlertTitle>Camera Denied</AlertTitle></Alert>}
                                                </div>
                                            )}
                                        </div>
                                        {doorPhotoPreview ? (
                                             <div className="flex gap-2 items-center">
                                                 <Image src={doorPhotoPreview} alt="Captured preview" width={100} height={75} className="rounded-md border"/>
                                                 <p className="text-sm text-green-600 flex-1">Photo captured. Ready to submit.</p>
                                                 <Button type="button" onClick={handleRetake} variant="outline" size="sm">
                                                    <RefreshCw className="mr-2 h-4 w-4"/> Retake
                                                 </Button>
                                             </div>
                                        ) : (
                                            <Button type="button" onClick={handleCapture} disabled={cameraStatus !== 'allowed'} className="w-full">
                                                <Camera className="mr-2" /> Capture Photo
                                            </Button>
                                        )}
                                    </div>
                                </TabsContent>
                                </Tabs>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                {!isFormReadOnly && (
                    <CardFooter>
                    <Button type="submit" disabled={isLoading || !canSubmit} className="w-full md:w-auto">
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                        ) : (
                        'Submit Validation'
                        )}
                    </Button>
                    </CardFooter>
                )}
                </fieldset>
            </form>
            </Form>
        </Card>
        
        {result && (
            <Card className={`mt-8 shadow-lg ${result.isMatch ? 'border-green-500' : 'border-red-500'}`}>
            <CardHeader className="flex flex-row items-center gap-4">
                {result.isMatch ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-red-500" />}
                <div>
                <CardTitle className="font-headline text-xl">Comparison Result</CardTitle>
                <CardDescription>{result.isMatch ? "The photos appear to match." : "The photos do not appear to match."}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="font-medium">AI Analysis:</p>
                <p className="text-muted-foreground p-3 bg-secondary rounded-md mt-2">{result.reasoning}</p>
            </CardContent>
            </Card>
        )}

        {error && !result &&(
            <Card className="mt-8 shadow-lg border-destructive">
            <CardHeader className="flex flex-row items-center gap-4">
                <XCircle className="h-8 w-8 text-destructive" />
                <div>
                <CardTitle className="font-headline text-xl">Submission Failed</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-destructive p-3 bg-destructive/10 rounded-md">{error}</p>
            </CardContent>
            </Card>
        )}
        </div>
    </div>
  );
}
```

---

## File: `src/components/icons.tsx`

```tsx
import React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z" />
      <path d="m9.5 9.5 5 5" />
      <path d="m14.5 9.5-5 5" />
    </svg>
  );
}
```

---

## File: `src/components/layout/app-layout.tsx`

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  Settings,
  ArrowLeft,
  HelpCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { adminNav, mainNav, type NavItem } from '@/config/nav';

interface AppLayoutProps {
  children: React.ReactNode;
  nav?: 'main' | 'admin';
}

export function AppLayout({ children, nav = 'main' }: AppLayoutProps) {
  const pathname = usePathname();
  const navItems = nav === 'admin' ? adminNav : mainNav;
  const isUserAdmin = nav === 'admin';

  const user = isUserAdmin
    ? { name: 'Nicholas C.', email: 'nicholas@digitaladdress.com', fallback: 'NC' }
    : { name: 'John Doe', email: 'john.doe@example.com', fallback: 'JD' };

  const getPageTitle = () => {
    for (const section of navItems) {
      if (section.href === pathname) return section.title;
      if (section.items) {
        for (const item of section.items) {
          if (item.href === pathname) return item.title;
        }
      }
    }
    const pathParts = pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart ? lastPart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Dashboard';
  };
  
  const pageTitle = getPageTitle();
  const isDashboard = pathname.endsWith('/dashboard');


  const renderNavItems = (items: NavItem[]) => (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton isActive={pathname === item.href}>
                <Icon />
                {item.title}
                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href={isUserAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">
                {isUserAdmin ? 'Admin Portal' : 'Digital Address'}
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {renderNavItems(navItems.filter(item => !item.isFooter && !item.isBottomSeparator))}
          </SidebarContent>
          <SidebarFooter>
            {navItems.some(item => item.isBottomSeparator) && <Separator className="my-1" />}
            {renderNavItems(navItems.filter(item => item.isFooter))}
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              {!isDashboard && isUserAdmin && (
                <Link href="/admin/dashboard">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Dashboard</span>
                    </Button>
                </Link>
              )}
              <h1 className="text-2xl font-headline font-semibold">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person avatar"/>
                      <AvatarFallback>{user.fallback}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    {!isUserAdmin && (
                      <DropdownMenuItem>
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/support">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Support & Feedback</span>
                        </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

---

## File: `src/config/nav.ts`

```ts
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Users,
  CandlestickChart,
  Settings,
  LogOut,
  Briefcase,
  ShieldCheck,
  DollarSign,
  ShieldAlert,
  Mail,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
  badge?: string | number;
  isFooter?: boolean;
  isBottomSeparator?: boolean;
  items?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'My Addresses',
    href: '/my-addresses',
    icon: MapPin,
  },
  {
    title: 'Register New Address',
    href: '/register',
    icon: PlusCircle,
  },
  {
    title: 'Access Requests',
    href: '/access-requests',
    icon: Users,
    badge: 3,
  },
  {
    title: 'Address Marketplace',
    href: '/exchange',
    icon: CandlestickChart,
  },
  {
    title: 'Settings',
    href: '#',
    icon: Settings,
    isFooter: true,
  },
];

export const adminNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'User Management',
    href: '/admin/user-management',
    icon: Users,
  },
  {
    title: 'B2B Clients',
    href: '/admin/b2b-clients',
    icon: Briefcase,
  },
  {
    title: 'Address Audit',
    href: '/admin/address-audit',
    icon: ShieldCheck,
  },
  {
    title: 'User Feedback',
    href: '/admin/feedback',
    icon: MessageSquare,
  },
  {
    title: 'Monetization',
    href: '/admin/monetization',
    icon: DollarSign,
  },
  {
    title: 'Incident Response',
    href: '/admin/incident-response',
    icon: ShieldAlert,
  },
  {
    title: 'Platform Settings',
    href: '/admin/platform-settings',
    icon: Settings,
    isFooter: true,
  },
  {
    title: 'Exit Portal',
    href: '/admin/login',
    icon: LogOut,
    isFooter: true,
    isBottomSeparator: true,
  },
];
```

---

## File: `src/hooks/use-mobile.tsx`

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---

## File: `src/hooks/use-toast.ts`

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---

## File: `src/lib/addresses.ts`

```ts
export const addresses = [
  {
    isPrimary: true,
    name: 'Home',
    address: '123 Main Street, Anytown, USA 12345',
    nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B',
    personalId: 'did:dap:1234-5678-9012-3456',
    gps: '34.0522° N, 118.2437° W',
    status: 'Verified' as const,
  },
  {
    isPrimary: false,
    name: 'Work',
    address: '456 Oak Avenue, Springfield, USA 67890',
    nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
    personalId: 'did:dap:9876-5432-1098-7654',
    gps: '39.7817° N, 89.6501° W',
    status: 'Verified' as const,
  },
  {
    isPrimary: false,
    name: 'New Property',
    address: '789 Pine Lane, Lakeside, USA 54321',
    nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
    personalId: 'did:dap:1122-3344-5566-7788',
    gps: '41.7638° N, 72.6851° W',
    status: 'Pending' as const,
  },
  {
    isPrimary: false,
    name: 'Damaged Warehouse',
    address: '101 Industrial Way, Floodzone, USA 98765',
    nftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D',
    personalId: 'did:dap:0000-1111-2222-3333',
    gps: '40.7128° N, 74.0060° W',
    status: 'Compromised' as const,
  },
];

export type Address = (typeof addresses)[0];
```

---

## File: `src/lib/countries.ts`

```ts
export type State = {
  name: string;
  code: string;
};

export type Country = {
  name: string;
  code: string;
  phoneCode: string;
  states: State[] | null;
};

export const countries: Country[] = [
  {
    name: 'United States',
    code: 'US',
    phoneCode: '+1',
    states: [
      { name: 'Alabama', code: 'AL' },
      { name: 'Alaska', code: 'AK' },
      { name: 'Arizona', code: 'AZ' },
      { name: 'Arkansas', code: 'AR' },
      { name: 'California', code: 'CA' },
      { name: 'Colorado', code: 'CO' },
      { name: 'Connecticut', code: 'CT' },
      { name: 'Delaware', code: 'DE' },
      { name: 'Florida', code: 'FL' },
      { name: 'Georgia', code: 'GA' },
      { name: 'Hawaii', code: 'HI' },
      { name: 'Idaho', code: 'ID' },
      { name: 'Illinois', code: 'IL' },
      { name: 'Indiana', code: 'IN' },
      { name: 'Iowa', code: 'IA' },
      { name: 'Kansas', code: 'KS' },
      { name: 'Kentucky', code: 'KY' },
      { name: 'Louisiana', code: 'LA' },
      { name: 'Maine', code: 'ME' },
      { name: 'Maryland', code: 'MD' },
      { name: 'Massachusetts', code: 'MA' },
      { name: 'Michigan', code: 'MI' },
      { name: 'Minnesota', code: 'MN' },
      { name: 'Mississippi', code: 'MS' },
      { name: 'Missouri', code: 'MO' },
      { name: 'Montana', code: 'MT' },
      { name: 'Nebraska', code: 'NE' },
      { name: 'Nevada', code: 'NV' },
      { name: 'New Hampshire', code: 'NH' },
      { name: 'New Jersey', code: 'NJ' },
      { name: 'New Mexico', code: 'NM' },
      { name: 'New York', code: 'NY' },
      { name: 'North Carolina', code: 'NC' },
      { name: 'North Dakota', code: 'ND' },
      { name: 'Ohio', code: 'OH' },
      { name: 'Oklahoma', code: 'OK' },
      { name: 'Oregon', code: 'OR' },
      { name: 'Pennsylvania', code: 'PA' },
      { name: 'Rhode Island', code: 'RI' },
      { name: 'South Carolina', code: 'SC' },
      { name: 'South Dakota', code: 'SD' },
      { name: 'Tennessee', code: 'TN' },
      { name: 'Texas', code: 'TX' },
      { name: 'Utah', code: 'UT' },
      { name: 'Vermont', code: 'VT' },
      { name: 'Virginia', code: 'VA' },
      { name: 'Washington', code: 'WA' },
      { name: 'West Virginia', code: 'WV' },
      { name: 'Wisconsin', code: 'WI' },
      { name: 'Wyoming', code: 'WY' },
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    phoneCode: '+1',
    states: [
        { name: 'Alberta', code: 'AB' },
        { name: 'British Columbia', code: 'BC' },
        { name: 'Manitoba', code: 'MB' },
        { name: 'New Brunswick', code: 'NB' },
        { name: 'Newfoundland and Labrador', code: 'NL' },
        { name: 'Nova Scotia', code: 'NS' },
        { name: 'Ontario', code: 'ON' },
        { name: 'Prince Edward Island', code: 'PE' },
        { name: 'Quebec', code: 'QC' },
        { name: 'Saskatchewan', code: 'SK' },
    ],
  },
  { name: 'Afghanistan', code: 'AF', phoneCode: '+93', states: null },
  { name: 'Albania', code: 'AL', phoneCode: '+355', states: null },
  { name: 'Algeria', code: 'DZ', phoneCode: '+213', states: null },
  { name: 'Andorra', code: 'AD', phoneCode: '+376', states: null },
  { name: 'Angola', code: 'AO', phoneCode: '+244', states: null },
  { name: 'Argentina', code: 'AR', phoneCode: '+54', states: null },
  { name: 'Armenia', code: 'AM', phoneCode: '+374', states: null },
  { name: 'Australia', code: 'AU', phoneCode: '+61', states: null },
  { name: 'Austria', code: 'AT', phoneCode: '+43', states: null },
  { name: 'Azerbaijan', code: 'AZ', phoneCode: '+994', states: null },
  { name: 'Bahamas', code: 'BS', phoneCode: '+1-242', states: null },
  { name: 'Bahrain', code: 'BH', phoneCode: '+973', states: null },
  { name: 'Bangladesh', code: 'BD', phoneCode: '+880', states: null },
  { name: 'Barbados', code: 'BB', phoneCode: '+1-246', states: null },
  { name: 'Belarus', code: 'BY', phoneCode: '+375', states: null },
  { name: 'Belgium', code: 'BE', phoneCode: '+32', states: null },
  { name: 'Belize', code: 'BZ', phoneCode: '+501', states: null },
  { name: 'Benin', code: 'BJ', phoneCode: '+229', states: null },
  { name: 'Bhutan', code: 'BT', phoneCode: '+975', states: null },
  { name: 'Bolivia', code: 'BO', phoneCode: '+591', states: null },
  { name: 'Bosnia and Herzegovina', code: 'BA', phoneCode: '+387', states: null },
  { name: 'Botswana', code: 'BW', phoneCode: '+267', states: null },
  { name: 'Brazil', code: 'BR', phoneCode: '+55', states: null },
  { name: 'Brunei', code: 'BN', phoneCode: '+673', states: null },
  { name: 'Bulgaria', code: 'BG', phoneCode: '+359', states: null },
  { name: 'Burkina Faso', code: 'BF', phoneCode: '+226', states: null },
  { name: 'Burundi', code: 'BI', phoneCode: '+257', states: null },
  { name: 'Cambodia', code: 'KH', phoneCode: '+855', states: null },
  { name: 'Cameroon', code: 'CM', phoneCode: '+237', states: null },
  { name: 'Cape Verde', code: 'CV', phoneCode: '+238', states: null },
  { name: 'Central African Republic', code: 'CF', phoneCode: '+236', states: null },
  { name: 'Chad', code: 'TD', phoneCode: '+235', states: null },
  { name: 'Chile', code: 'CL', phoneCode: '+56', states: null },
  { name: 'China', code: 'CN', phoneCode: '+86', states: null },
  { name: 'Colombia', code: 'CO', phoneCode: '+57', states: null },
  { name: 'Comoros', code: 'KM', phoneCode: '+269', states: null },
  { name: 'Congo (Brazzaville)', code: 'CG', phoneCode: '+242', states: null },
  { name: 'Congo (Kinshasa)', code: 'CD', phoneCode: '+243', states: null },
  { name: 'Costa Rica', code: 'CR', phoneCode: '+506', states: null },
  { name: 'Croatia', code: 'HR', phoneCode: '+385', states: null },
  { name: 'Cuba', code: 'CU', phoneCode: '+53', states: null },
  { name: 'Cyprus', code: 'CY', phoneCode: '+357', states: null },
  { name: 'Czech Republic', code: 'CZ', phoneCode: '+420', states: null },
  { name: 'Denmark', code: 'DK', phoneCode: '+45', states: null },
  { name: 'Djibouti', code: 'DJ', phoneCode: '+253', states: null },
  { name: 'Dominica', code: 'DM', phoneCode: '+1-767', states: null },
  { name: 'Dominican Republic', code: 'DO', phoneCode: '+1-809', states: null },
  { name: 'Ecuador', code: 'EC', phoneCode: '+593', states: null },
  { name: 'Egypt', code: 'EG', phoneCode: '+20', states: null },
  { name: 'El Salvador', code: 'SV', phoneCode: '+503', states: null },
  { name: 'Equatorial Guinea', code: 'GQ', phoneCode: '+240', states: null },
  { name: 'Eritrea', code: 'ER', phoneCode: '+291', states: null },
  { name: 'Estonia', code: 'EE', phoneCode: '+372', states: null },
  { name: 'Eswatini', code: 'SZ', phoneCode: '+268', states: null },
  { name: 'Ethiopia', code: 'ET', phoneCode: '+251', states: null },
  { name: 'Fiji', code: 'FJ', phoneCode: '+679', states: null },
  { name: 'Finland', code: 'FI', phoneCode: '+358', states: null },
  { name: 'France', code: 'FR', phoneCode: '+33', states: null },
  { name: 'Gabon', code: 'GA', phoneCode: '+241', states: null },
  { name: 'Gambia', code: 'GM', phoneCode: '+220', states: null },
  { name: 'Georgia', code: 'GE', phoneCode: '+995', states: null },
  { name: 'Germany', code: 'DE', phoneCode: '+49', states: null },
  { name: 'Ghana', code: 'GH', phoneCode: '+233', states: null },
  { name: 'Greece', code: 'GR', phoneCode: '+30', states: null },
  { name: 'Grenada', code: 'GD', phoneCode: '+1-473', states: null },
  { name: 'Guatemala', code: 'GT', phoneCode: '+502', states: null },
  { name: 'Guinea', code: 'GN', phoneCode: '+224', states: null },
  { name: 'Guinea-Bissau', code: 'GW', phoneCode: '+245', states: null },
  { name: 'Guyana', code: 'GY', phoneCode: '+592', states: null },
  { name: 'Haiti', code: 'HT', phoneCode: '+509', states: null },
  { name: 'Honduras', code: 'HN', phoneCode: '+504', states: null },
  { name: 'Hungary', code: 'HU', phoneCode: '+36', states: null },
  { name: 'Iceland', code: 'IS', phoneCode: '+354', states: null },
  { name: 'India', code: 'IN', phoneCode: '+91', states: null },
  { name: 'Indonesia', code: 'ID', phoneCode: '+62', states: null },
  { name: 'Iran', code: 'IR', phoneCode: '+98', states: null },
  { name: 'Iraq', code: 'IQ', phoneCode: '+964', states: null },
  { name: 'Ireland', code: 'IE', phoneCode: '+353', states: null },
  { name: 'Israel', code: 'IL', phoneCode: '+972', states: null },
  { name: 'Italy', code: 'IT', phoneCode: '+39', states: null },
  { name: 'Jamaica', code: 'JM', phoneCode: '+1-876', states: null },
  { name: 'Japan', code: 'JP', phoneCode: '+81', states: null },
  { name: 'Jordan', code: 'JO', phoneCode: '+962', states: null },
  { name: 'Kazakhstan', code: 'KZ', phoneCode: '+7', states: null },
  { name: 'Kenya', code: 'KE', phoneCode: '+254', states: null },
  { name: 'Kiribati', code: 'KI', phoneCode: '+686', states: null },
  { name: 'Kuwait', code: 'KW', phoneCode: '+965', states: null },
  { name: 'Kyrgyzstan', code: 'KG', phoneCode: '+996', states: null },
  { name: 'Laos', code: 'LA', phoneCode: '+856', states: null },
  { name: 'Latvia', code: 'LV', phoneCode: '+371', states: null },
  { name: 'Lebanon', code: 'LB', phoneCode: '+961', states: null },
  { name: 'Lesotho', code: 'LS', phoneCode: '+266', states: null },
  { name: 'Liberia', code: 'LR', phoneCode: '+231', states: null },
  { name: 'Libya', code: 'LY', phoneCode: '+218', states: null },
  { name: 'Liechtenstein', code: 'LI', phoneCode: '+423', states: null },
  { name: 'Lithuania', code: 'LT', phoneCode: '+370', states: null },
  { name: 'Luxembourg', code: 'LU', phoneCode: '+352', states: null },
  { name: 'Madagascar', code: 'MG', phoneCode: '+261', states: null },
  { name: 'Malawi', code: 'MW', phoneCode: '+265', states: null },
  { name: 'Malaysia', code: 'MY', phoneCode: '+60', states: null },
  { name: 'Maldives', code: 'MV', phoneCode: '+960', states: null },
  { name: 'Mali', code: 'ML', phoneCode: '+223', states: null },
  { name: 'Malta', code: 'MT', phoneCode: '+356', states: null },
  { name: 'Marshall Islands', code: 'MH', phoneCode: '+692', states: null },
  { name: 'Mauritania', code: 'MR', phoneCode: '+222', states: null },
  { name: 'Mauritius', code: 'MU', phoneCode: '+230', states: null },
  { name: 'Mexico', code: 'MX', phoneCode: '+52', states: null },
  { name: 'Micronesia', code: 'FM', phoneCode: '+691', states: null },
  { name: 'Moldova', code: 'MD', phoneCode: '+373', states: null },
  { name: 'Monaco', code: 'MC', phoneCode: '+377', states: null },
  { name: 'Mongolia', code: 'MN', phoneCode: '+976', states: null },
  { name: 'Montenegro', code: 'ME', phoneCode: '+382', states: null },
  { name: 'Morocco', code: 'MA', phoneCode: '+212', states: null },
  { name: 'Mozambique', code: 'MZ', phoneCode: '+258', states: null },
  { name: 'Myanmar', code: 'MM', phoneCode: '+95', states: null },
  { name: 'Namibia', code: 'NA', phoneCode: '+264', states: null },
  { name: 'Nauru', code: 'NR', phoneCode: '+674', states: null },
  { name: 'Nepal', code: 'NP', phoneCode: '+977', states: null },
  { name: 'Netherlands', code: 'NL', phoneCode: '+31', states: null },
  { name: 'New Zealand', code: 'NZ', phoneCode: '+64', states: null },
  { name: 'Nicaragua', code: 'NI', phoneCode: '+505', states: null },
  { name: 'Niger', code: 'NE', phoneCode: '+227', states: null },
  { name: 'Nigeria', code: 'NG', phoneCode: '+234', states: null },
  { name: 'North Korea', code: 'KP', phoneCode: '+850', states: null },
  { name: 'North Macedonia', code: 'MK', phoneCode: '+389', states: null },
  { name: 'Norway', code: 'NO', phoneCode: '+47', states: null },
  { name: 'Oman', code: 'OM', phoneCode: '+968', states: null },
  { name: 'Pakistan', code: 'PK', phoneCode: '+92', states: null },
  { name: 'Palau', code: 'PW', phoneCode: '+680', states: null },
  { name: 'Panama', code: 'PA', phoneCode: '+507', states: null },
  { name: 'Papua New Guinea', code: 'PG', phoneCode: '+675', states: null },
  { name: 'Paraguay', code: 'PY', phoneCode: '+595', states: null },
  { name: 'Peru', code: 'PE', phoneCode: '+51', states: null },
  { name: 'Philippines', code: 'PH', phoneCode: '+63', states: null },
  { name: 'Poland', code: 'PL', phoneCode: '+48', states: null },
  { name: 'Portugal', code: 'PT', phoneCode: '+351', states: null },
  { name: 'Qatar', code: 'QA', phoneCode: '+974', states: null },
  { name: 'Romania', code: 'RO', phoneCode: '+40', states: null },
  { name: 'Russia', code: 'RU', phoneCode: '+7', states: null },
  { name: 'Rwanda', code: 'RW', phoneCode: '+250', states: null },
  { name: 'Saint Kitts and Nevis', code: 'KN', phoneCode: '+1-869', states: null },
  { name: 'Saint Lucia', code: 'LC', phoneCode: '+1-758', states: null },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', phoneCode: '+1-784', states: null },
  { name: 'Samoa', code: 'WS', phoneCode: '+685', states: null },
  { name: 'San Marino', code: 'SM', phoneCode: '+378', states: null },
  { name: 'Sao Tome and Principe', code: 'ST', phoneCode: '+239', states: null },
  { name: 'Saudi Arabia', code: 'SA', phoneCode: '+966', states: null },
  { name: 'Senegal', code: 'SN', phoneCode: '+221', states: null },
  { name: 'Serbia', code: 'RS', phoneCode: '+381', states: null },
  { name: 'Seychelles', code: 'SC', phoneCode: '+248', states: null },
  { name: 'Sierra Leone', code: 'SL', phoneCode: '+232', states: null },
  { name: 'Singapore', code: 'SG', phoneCode: '+65', states: null },
  { name: 'Slovakia', code: 'SK', phoneCode: '+421', states: null },
  { name: 'Slovenia', code: 'SI', phoneCode: '+386', states: null },
  { name: 'Solomon Islands', code: 'SB', phoneCode: '+677', states: null },
  { name: 'Somalia', code: 'SO', phoneCode: '+252', states: null },
  { name: 'South Africa', code: 'ZA', phoneCode: '+27', states: null },
  { name: 'South Korea', code: 'KR', phoneCode: '+82', states: null },
  { name: 'South Sudan', code: 'SS', phoneCode: '+211', states: null },
  { name: 'Spain', code: 'ES', phoneCode: '+34', states: null },
  { name: 'Sri Lanka', code: 'LK', phoneCode: '+94', states: null },
  { name: 'Sudan', code: 'SD', phoneCode: '+249', states: null },
  { name: 'Suriname', code: 'SR', phoneCode: '+597', states: null },
  { name: 'Sweden', code: 'SE', phoneCode: '+46', states: null },
  { name: 'Switzerland', code: 'CH', phoneCode: '+41', states: null },
  { name: 'Syria', code: 'SY', phoneCode: '+963', states: null },
  { name: 'Taiwan', code: 'TW', phoneCode: '+886', states: null },
  { name: 'Tajikistan', code: 'TJ', phoneCode: '+992', states: null },
  { name: 'Tanzania', code: 'TZ', phoneCode: '+255', states: null },
  { name: 'Thailand', code: 'TH', phoneCode: '+66', states: null },
  { name: 'Timor-Leste', code: 'TL', phoneCode: '+670', states: null },
  { name: 'Togo', code: 'TG', phoneCode: '+228', states: null },
  { name: 'Tonga', code: 'TO', phoneCode: '+676', states: null },
  { name: 'Trinidad and Tobago', code: 'TT', phoneCode: '+1-868', states: null },
  { name: 'Tunisia', code: 'TN', phoneCode: '+216', states: null },
  { name: 'Turkey', code: 'TR', phoneCode: '+90', states: null },
  { name: 'Turkmenistan', code: 'TM', phoneCode: '+993', states: null },
  { name: 'Tuvalu', code: 'TV', phoneCode: '+688', states: null },
  { name: 'Uganda', code: 'UG', phoneCode: '+256', states: null },
  { name: 'Ukraine', code: 'UA', phoneCode: '+380', states: null },
  { name: 'United Arab Emirates', code: 'AE', phoneCode: '+971', states: null },
  { name: 'United Kingdom', code: 'GB', phoneCode: '+44', states: null },
  { name: 'Uruguay', code: 'UY', phoneCode: '+598', states: null },
  { name: 'Uzbekistan', code: 'UZ', phoneCode: '+998', states: null },
  { name: 'Vanuatu', code: 'VU', phoneCode: '+678', states: null },
  { name: 'Venezuela', code: 'VE', phoneCode: '+58', states: null },
  { name: 'Vietnam', code: 'VN', phoneCode: '+84', states: null },
  { name: 'Yemen', code: 'YE', phoneCode: '+967', states: null },
  { name: 'Zambia', code: 'ZM', phoneCode: '+260', states: null },
  { name: 'Zimbabwe', code: 'ZW', phoneCode: '+263', states: null },
];
```

---

## File: `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## File: `src/lib/verify-nft.ts`

```ts
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
```

---

## File: `src/lucide-react.d.ts`

```ts
declare module 'lucide-react' {
  import { SVGProps } from 'react';

  export type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

  export const ArrowRight: Icon;
  export const KeyRound: Icon;
  export const Mail: Icon;
  export const Lock: Icon;
  export const LayoutDashboard: Icon;
  export const MapPin: Icon;
  export const PlusCircle: Icon;
  export const Settings: Icon;
  export const Bell: Icon;
  export const UserCircle: Icon;
  export const LogOut: Icon;
  export const Wallet: Icon;
  export const Activity: Icon;
  export const QrCode: Icon;
  export const Copy: Icon;
  export const Users: Icon;
  export const CheckCircle2: Icon;
  export const MoreVertical: Icon;
  export const ChevronRight: Icon;
  export const UserCheck: Icon;
  export const UserX: Icon;
  export const Home: Icon;
  export const Building: Icon;
  export const UploadCloud: Icon;
  export const CheckCircle: Icon;
  export const ArrowLeft: Icon;
  export const User: Icon;
  export const XCircle: Icon;
  export const Camera: Icon;
  export const LocateFixed: Icon;
  export const AlertTriangle: Icon;
  export const RefreshCw: Icon;
  export const Eye: Icon;
  export const UserPlus: Icon;
  export const CandlestickChart: Icon;
  export const ArrowLeftRight: Icon;
  export const TrendingUp: Icon;
  export const TrendingDown: Icon;
  export const PanelLeft: Icon;
  export const Circle: Icon;
  export const Check: Icon;
  export const ChevronUp: Icon;
  export const X: Icon;
  export const Globe: Icon;
  export const Save: Icon;
  export const FileText: Icon;
  export const History: Icon;
  export const ShoppingCart: Icon;
  export const ShieldAlert: Icon;
  export const Loader2: Icon;
  export const Briefcase: Icon;
  export const ShieldCheck: Icon;
  export const DollarSign: Icon;
  export const ArrowUpRight: Icon;
  export const Phone: Icon;
  export const Calendar: Icon;
  export const Fingerprint: Icon;
  export const ArchiveRestore: Icon;
  export const ChevronDown: Icon;
  export const MoreHorizontal: Icon;
  export const Edit: Icon;
  export const Trash2: Icon;
  export const Search: Icon;
  export const Link: Icon;
  export const HelpCircle: Icon;
  export const MessageSquare: Icon;
}
```

---

## File: `tailwind.config.ts`

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-sans)', 'sans-serif'],
        headline: ['var(--font-display)', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```