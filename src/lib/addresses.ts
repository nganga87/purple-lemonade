
export const addresses = [
  {
    isPrimary: true,
    name: 'Home',
    address: '123 Main Street, Anytown, USA 12345',
    nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B',
    gps: '34.0522° N, 118.2437° W',
    status: 'Verified' as const,
  },
  {
    isPrimary: false,
    name: 'Work',
    address: '456 Oak Avenue, Springfield, USA 67890',
    nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
    gps: '39.7817° N, 89.6501° W',
    status: 'Verified' as const,
  },
  {
    isPrimary: false,
    name: 'New Property',
    address: '789 Pine Lane, Lakeside, USA 54321',
    nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
    gps: '41.7638° N, 72.6851° W',
    status: 'Pending' as const,
  },
  {
    isPrimary: false,
    name: 'Damaged Warehouse',
    address: '101 Industrial Way, Floodzone, USA 98765',
    nftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D',
    gps: '40.7128° N, 74.0060° W',
    status: 'Compromised' as const,
  },
];

export type Address = (typeof addresses)[0];
