# AddressChain: Admin Portal Introduction & Functional Overview

This document provides a detailed walkthrough of the AddressChain Administrator Portal, outlining the navigation, required inputs, and expected outcomes for each core feature.

## 1. Accessing the Administrator Portal

**Objective:** To provide a secure entry point for authorized administrators.

-   **Navigation:** The administrator navigates to the dedicated login page at `/admin/login`.
-   **Input:** The admin enters their registered email address and clicks "Log In". The system uses a passwordless flow.
-   **Outcome & Logic:**
    1.  The system sends a secure, one-time login link to the administrator's email.
    2.  Clicking the link grants an authenticated session and redirects the admin to the main Admin Dashboard at `/admin/dashboard`.

## 2. Core Admin Journey & Functionality

### 2.1 The Admin Dashboard (`/admin/dashboard`)

**Objective:** To provide a high-level overview of platform health and key metrics.

-   **Navigation:** This is the landing page after a successful admin login.
-   **Input:** Admin views the dashboard.
-   **Outcome:** The admin can see key performance indicators (KPIs) such as:
    -   Total Revenue and a corresponding chart showing trends over time.
    -   New user sign-ups.
    -   Number of active B2B clients.
    -   A list of recent B2B signups and internal admin users.

### 2.2 User Management (`/admin/user-management`)

**Objective:** To securely manage internal team members and their platform access levels.

-   **Navigation:** Admin navigates to the "User Management" section from the sidebar.
-   **Input:**
    1.  **Add User:** Admin clicks "Add New User", which opens a multi-tabbed dialog. They fill in the user's details (name, email, role, contact info) and assign specific portal access permissions.
    2.  **Edit User:** Admin clicks the action menu on an existing user and selects "Edit User" to modify their details or permissions.
    3.  **Change Status/Delete:** Admin uses the action menu to change a user's status (e.g., Active, Suspended) or delete them.
-   **Outcome:** New admin accounts are created with specific roles and permissions. Existing user permissions can be updated to reflect changes in responsibility. Access can be revoked instantly.

### 2.3 B2B Client Management (`/admin/b2b-clients`)

**Objective:** To onboard, review, and manage business clients who use the AddressChain API.

-   **Navigation:** Admin navigates to the "B2B Clients" section.
-   **Input:**
    1.  **Onboard Client:** Admin clicks "Add New Client" and fills out a detailed form including company information, contact person, API plan, and billing details (which requires a valid Address NFT ID for verification).
    2.  **Review Pending Client:** Admin reviews clients with a "Pending Review" status, verifies their information, and uses the action menu to "Approve" or "Reject" the application.
-   **Outcome:** Approved B2B clients are moved to an "Active" status, granting them API access according to their selected plan. This flow ensures proper vetting of all business partners.

### 2.4 Address Audit & Identity Search (`/admin/address-audit`)

**Objective:** To provide powerful tools for auditing platform activity and assisting in emergencies.

-   **Navigation:** Admin navigates to the "Address Audit" section.
-   **Input:**
    1.  **Filter Activity:** Admin selects a country from a dropdown to view a filtered list of all validation activities within that jurisdiction.
    2.  **Identity Search:** Admin enters a clue (e.g., name, phone number, physical address fragment, ID number) into the search bar and clicks "Search".
-   **Outcome:**
    -   The activity log updates to show relevant validation events.
    -   The AI-powered `findAddressByClue` flow is triggered. It searches a simulated database and returns a list of all matching Digital Address NFTs, including owner details and status, which is then displayed in a table. This is critical for emergency response scenarios.

### 2.5 Incident Response (`/admin/incident-response`)

**Objective:** To manage asset recovery for users who have reported a catastrophic event.

-   **Navigation:** Admin navigates to the "Incident Response" section.
-   **Input:** Admin sees a queue of reported incidents. They click "Start Recovery" or "Continue Recovery" on an incident, which launches a multi-step wizard. In the wizard, the admin must:
    1.  Verify primary address details.
    2.  Verify the user's government-issued ID (mocked).
    3.  Verify contact details and the designated successor's information.
    4.  Enter resolution notes and complete the recovery process.
-   **Outcome:** The incident's status is updated (e.g., from "Reported" to "Under Review" to "Resolved"). The wizard ensures a secure, auditable process for transferring a compromised Address NFT to a designated successor, a key security feature of the platform.

### 2.6 Monetization (`/admin/monetization`)

**Objective:** To configure all financial aspects of the platform.

-   **Navigation:** Admin navigates to the "Monetization" section.
-   **Input:** Admin interacts with various controls to:
    -   Adjust the values (flat fee or percentage) of different revenue streams (e.g., marketplace commission, API fees).
    -   Activate or deactivate specific revenue streams.
    -   Add or remove tax rules for different jurisdictions.
-   **Outcome:** All financial parameters for the platform are updated in real-time, affecting marketplace transactions and API billing.

### 2.7 Platform Settings (`/admin/platform-settings`)

**Objective:** To manage global, high-level platform configurations and third-party integrations.

-   **Navigation:** Admin navigates to the "Platform Settings" section.
-   **Input:** Admin modifies various settings fields, such as:
    -   Platform name and public support email.
    -   Security policies like required MFA for admins.
    -   API keys for third-party services like Google Maps and Stripe.
    -   The primary smart contract address for the Address NFTs.
-   **Outcome:** Core platform variables and integration keys are updated. These are critical for the overall operation and security of the application.