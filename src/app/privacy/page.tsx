'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-lg py-8 md:py-12">
        <div className="space-y-8">
            <div className="space-y-2">
                 <h1 className="font-headline text-4xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                       We collect information that you provide to us directly, such as when you create an account, register an address, or communicate with us. This may include your name, email address, physical address, and government-issued ID numbers.
                    </p>
                     <p>
                        We may also collect information automatically when you use our services, such as your IP address, device information, and browsing activity.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       We use the information we collect to provide, maintain, and improve our services, including for:
                   </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Verifying your identity and address.</li>
                        <li>Securing your account and preventing fraud.</li>
                        <li>Communicating with you about your account and our services.</li>
                        <li>Personalizing your experience.</li>
                   </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       We do not share your personal information with third parties except as described in this policy, such as with your consent, with service providers who perform services on our behalf, or for legal reasons.
                   </p>
                   <p>
                        Your Digital Address NFT ID is public on the blockchain, but your personal identifying information linked to it is not, unless you choose to share it.
                   </p>
                </CardContent>
            </Card>
        </div>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}