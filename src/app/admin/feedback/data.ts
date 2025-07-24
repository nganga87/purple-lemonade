
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
`,