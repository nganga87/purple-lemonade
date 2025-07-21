
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
