
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { MapPin, KeyRound, CheckCircle, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data store. In a real application, you would fetch this from a database.
const addresses = [
  {
    isPrimary: true,
    name: 'Home',
    address: '123 Main Street, Anytown, USA 12345',
    nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B',
    gps: '34.0522,-118.2437',
    status: 'Verified',
  },
  {
    isPrimary: false,
    name: 'Work',
    address: '456 Oak Avenue, Springfield, USA 67890',
    nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
    gps: '39.7817,-89.6501',
    status: 'Verified',
  },
  {
    isPrimary: false,
    name: 'New Property',
    address: '789 Pine Lane, Lakeside, USA 54321',
    nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
    gps: '41.7638,-72.6851',
    status: 'Pending',
  },
   {
    isPrimary: false,
    name: 'Damaged Warehouse',
    address: '101 Industrial Way, Floodzone, USA 98765',
    nftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D',
    gps: '40.7128,-74.0060',
    status: 'Compromised',
  },
];


export default function ResolveAddressPage({ params }: { params: { nftId: string } }) {
  const nftId = params.nftId;
  const addressDetails = addresses.find(addr => addr.nftId.toLowerCase() === nftId.toLowerCase());
  const [isCopied, setIsCopied] = useState(false);
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

  const handleCopy = (text: string, type: 'Address' | 'NFT ID') => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      toast({
        title: `${type} Copied!`,
        description: `The ${type.toLowerCase()} has been copied to your clipboard.`,
      });
      setTimeout(() => setIsCopied(false), 2000); // Revert after 2 seconds
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
              <div className="space-y-1 rounded-md border bg-background p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm font-semibold">Physical Address</span>
                    </div>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(addressDetails.address, 'Address')}>
                        {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                     </Button>
                </div>
                <p className="pl-8 text-lg font-medium text-foreground">{addressDetails.address}</p>
              </div>
              <div className="space-y-1 rounded-md border bg-background p-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <KeyRound className="h-5 w-5" />
                  <span className="text-sm font-semibold">Digital Address NFT ID</span>
                </div>
                <p className="pl-8 font-mono text-sm text-foreground break-all">{addressDetails.nftId}</p>
              </div>
              <Button onClick={handleGetDirections} className="w-full" size="lg">
                Get Directions on Google Maps
              </Button>
            </CardContent>
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
