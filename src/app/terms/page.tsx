'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
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
                 <h1 className="font-headline text-4xl font-bold tracking-tight">Terms and Conditions</h1>
                <p className="text-lg text-muted-foreground">Last updated: {currentYear ? new Date().toLocaleDateString() : '...'}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        Welcome to Digital Address. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website we assume you accept these terms and conditions. Do not continue to use Digital Address if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>2. User Accounts and Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                   </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>3. User Content and Data Consent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                   </p>
                    <p>
                        By submitting your data (including but not limited to physical address, GPS coordinates, property photos, and personal identification numbers) for verification, you grant us the right and license to use, modify, publicly display, and reproduce such Content on and through the Service. Specifically, you consent to your submitted data being processed by our automated and artificial intelligence (AI) systems for the purposes of address validation, risk assessment, and report generation. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.
                   </p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>4. Restrictions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                   <p>You are specifically restricted from all of the following:</p>
                   <ul className="list-disc pl-6 space-y-1">
                        <li>Publishing any website material in any other media without consent.</li>
                        <li>Selling, sublicensing and/or otherwise commercializing any website material.</li>
                        <li>Using this website in any way that is or may be damaging to this website.</li>
                        <li>Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity.</li>
                        <li>Submitting false, inaccurate, or misleading information for the purpose of creating a fraudulent Digital Address NFT.</li>
                   </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>5. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>
                       In no event shall Digital Address, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Digital Address, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
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
