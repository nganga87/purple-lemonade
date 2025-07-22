
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
