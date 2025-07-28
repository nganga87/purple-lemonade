# AddressChain: Application Introduction & Functional Overview

This document provides a detailed walkthrough of the AddressChain application, outlining the user navigation, required inputs, and expected outcomes for each core feature.

## 1. Accessing the Application

**Objective:** To provide a secure, passwordless entry point for new and existing users.

-   **Navigation:** The user starts at the main landing page (`/`).
-   **Input:** The user enters their email address into the primary input field and clicks "Continue with Email".
-   **Outcome & Logic:**
    1.  The system checks if the email exists in the database.
    2.  **If the email exists**, it is recognized as a returning user. The system displays a confirmation message ("Login link sent") and simulates sending a secure, one-time login link to their email. Clicking this link (in a real-world scenario) would grant them an authenticated session and redirect them to their dashboard.
    3.  **If the email does not exist**, it is recognized as a new user. The system informs the user that the account does not exist and redirects them to the registration page (`/register`) to create a new account.

A separate, secure login is provided for administrators at `/admin/login`.

## 2. Core User Journey & Functionality

### 2.1 The User Dashboard (`/dashboard`)

**Objective:** To provide a central hub for the user to manage their primary digital address and view recent activity.

-   **Navigation:** This is the first page a user sees after a successful login.
-   **Input:** User interaction involves clicking on various links and buttons.
-   **Outcome:** The user can view:
    -   Their primary verified address and its core details (NFT ID, GPS).
    -   A shareable QR code for their address.
    -   A feed of recent activities, such as deliveries or verification checks.
    -   Quick links to register a new property or manage access requests.

### 2.2 Registering a New Property (`/register`)

**Objective:** A multi-step, AI-powered workflow to securely link a physical property to a unique digital asset (NFT).

-   **Navigation:** The user navigates to `/register` and selects "Register a New Property".
-   **Inputs (Step-by-Step):**
    1.  **Address Details:** User enters a nickname for the address (e.g., "Home"), the full physical address, and GPS coordinates. The system can auto-fill GPS coordinates.
    2.  **Crypto Wallet Generation:** Based on the country and GPS, the system automatically generates a unique, "country-stamped" crypto wallet address for the property. This is displayed to the user.
    3.  **Photo Evidence:** The user must provide a clear photo of the property's main entrance. They can either upload a file or use their device's camera directly within the app.
    4.  **Digital Signature:** The application automatically stamps the uploaded photo with the generated crypto address and a secure timestamp. This "signed" photo is shown as a preview.
-   **Outcome:**
    -   The user submits the form.
    -   The system triggers the `validateDoorPhoto` AI flow. This flow compares the user's signed door photo with a satellite image fetched using the provided GPS coordinates.
    -   If the preliminary AI validation is successful, the address is registered with a "Pending" status and submitted for final, third-party human verification. The user is shown a success message and can view the pending address in their "My Addresses" list.

### 2.3 Managing Addresses (`/my-addresses`)

**Objective:** To allow users to view, manage, and inspect all their owned Address NFTs.

-   **Navigation:** User clicks on the "My Addresses" link in the sidebar.
-   **Input:** The user selects an address from a list or dropdown.
-   **Outcome:** The selected address's details are displayed, including:
    -   Its name, physical address, NFT ID, and verification status (e.g., Verified, Pending, Compromised).
    -   A shareable QR code that resolves to the public address page.
    -   Options to edit the address name, set it as primary, or report an incident if the property has been compromised (e.g., destroyed in a natural disaster).

### 2.4 Managing Access Requests (`/access-requests`)

**Objective:** To enable property owners to securely grant or deny usage of their verified address to others.

-   **Navigation:** User navigates to the `/access-requests` page.
-   **Input:** The user reviews a list of pending requests from tenants or family members. For each request, the user can click "Approve" or "Reject".
-   **Outcome:**
    -   Approving a request links the requester to the property, granting them a temporary or subordinate digital address.
    -   Rejecting a request denies access.
    -   The system logs the decision, and the request moves from "Pending" to "Approved" or "Rejected".

### 2.5 The Address Marketplace (`/exchange`)

**Objective:** To create a secure P2P market for buying and selling verified Address NFTs, with AI-powered due diligence.

-   **Navigation:** User navigates to the `/exchange` page.
-   **Input:**
    1.  **To Buy:** A user browses the list of available properties. Before purchasing, they can click the "AI Report" button for a specific listing.
    2.  **To List:** A user can select one of their own verified addresses and set a sale price to list it on the market.
-   **Outcome:**
    -   **AI Report:** Clicking "AI Report" triggers the `generateAddressReport` flow. This AI model analyzes simulated on-chain and off-chain data (e.g., transaction history, commercial usage, KYC checks) and produces a structured due diligence report. The report, including a risk assessment, is displayed to the potential buyer in a dialog box.
    -   This allows buyers to make informed decisions based on an AI's analysis of the address's history and trustworthiness.
