'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
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
                <p className="text-lg text-muted-foreground">Last updated: {currentYear ? new Date().toLocaleDateString() : '...'}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>1. Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                       We collect information that you provide to us directly when you use our services. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><b>Account Information:</b> Name, email address, password.</li>
                        <li><b>Address Information:</b> Physical address, GPS coordinates, property photos, and optionally, title deed or government-issued ID numbers for enhanced verification.</li>
                        <li><b>Communications:</b> Any feedback, questions, or information you provide when you contact us.</li>
                    </ul>
                     <p>
                        We may also collect technical information automatically when you use our services, such as your IP address, device information, and browsing activity.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>2. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       We use the information we collect to provide, maintain, and improve our services, including to:
                   </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Verify your identity and link it to a physical address to create a Digital Address NFT.</li>
                        <li>Use your submitted data, including photos and location information, with our AI models to perform validation checks and generate due diligence reports.</li>
                        <li>Secure your account and prevent fraudulent activity.</li>
                        <li>Communicate with you about your account and our services.</li>
                        <li>Provide customer support.</li>
                   </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>3. Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       We do not sell your personal information. We may share your information with third parties only in the following circumstances:
                   </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><b>With Your Consent:</b> When you authorize a third-party service to access your Digital Address.</li>
                        <li><b>For Verification:</b> With third-party validators who are contractually obligated to verify physical addresses.</li>
                        <li><b>For Legal Reasons:</b> If required by law or in response to a valid legal process.</li>
                    </ul>
                   <p>
                        Your Digital Address NFT ID, its transaction history, and its status (e.g., Verified, Compromised) are public information recorded on the blockchain. However, the personal identifying information linked to it is kept private and is not stored on the blockchain.
                   </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>4. Data Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       We implement a variety of security measures to maintain the safety of your personal information. Your data is stored in a secure environment and is accessible only by a limited number of persons who have special access rights and are required to keep the information confidential.
                   </p>
                </CardContent>
            </Card>
        </div>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
