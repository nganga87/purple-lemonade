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
