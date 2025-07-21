
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
