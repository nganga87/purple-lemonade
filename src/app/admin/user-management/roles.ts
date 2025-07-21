
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
