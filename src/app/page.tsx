
'use client';

import React, { useState } from 'react';
import { ArrowRight, KeyRound, Mail, Search, Copy, CheckCircle } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LandingPage() {
  const [nftId, setNftId] = useState('');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleResolve = () => {
    if (nftId.trim()) {
      router.push(`/resolve/${nftId.trim()}`);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setNftId(text);
        toast({
          title: 'Pasted from clipboard!',
          description: 'The address has been pasted into the input field.',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Paste Failed',
        description: 'Could not read from clipboard. Please check browser permissions.',
      });
    }
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailSubmitted(true);
      toast({
        title: "Verification Email Sent",
        description: `A confirmation link has been sent to ${email}.`,
      });
    } else {
        toast({
            variant: 'destructive',
            title: 'Invalid Email',
            description: 'Please enter a valid email address.',
        });
    }
  };

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

      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-start gap-8">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your Place, Your Pin, Your Proof.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Digital Address provides a revolutionary way to manage and verify
              physical addresses using the power of AI and blockchain technology.
              Prevent fraud, streamline deliveries, and own your address like never before.
            </p>
            <div className="w-full max-w-md space-y-6">
               <Card className="bg-secondary/50">
                  {!emailSubmitted ? (
                    <>
                      <CardHeader>
                          <CardTitle className="font-headline">Create Your Address</CardTitle>
                          <CardDescription>Get started now by creating your own secure Digital Address.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <form onSubmit={handleEmailSubmit} className="grid gap-2">
                              <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                  type="email"
                                  placeholder="Enter your email address"
                                  className="pl-10"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                              </div>
                              <Button type="submit" className="w-full">
                                  Verify My Email
                                  <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                          </form>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mb-4"/>
                            <h3 className="text-xl font-headline font-semibold">Check your email</h3>
                            <p className="text-muted-foreground mt-2">
                                We've sent a secure login link to <span className="font-semibold text-primary">{email}</span>. Click the link to continue the registration process.
                            </p>
                             <Button variant="outline" className="mt-4" onClick={() => toast({ title: "Email Resent", description: `A new link has been sent to ${email}.`})}>
                                Resend Email
                             </Button>
                        </div>
                    </CardContent>
                  )}
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Find a Digital Address</CardTitle>
                    <CardDescription>Paste an NFT ID to resolve its physical location and get directions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="0x..."
                                className="pl-10 font-mono"
                                value={nftId}
                                onChange={(e) => setNftId(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="w-full" onClick={handleResolve}>
                                <Search className="mr-2 h-4 w-4" />
                                Resolve Address
                            </Button>
                             <Button type="button" variant="outline" size="icon" onClick={handlePaste} aria-label="Paste Address">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="relative w-full h-full min-h-[400px]">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Hero image showing a modern house with a digital lock"
              fill
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="modern house digital"
            />
            <div className="absolute -bottom-8 -right-8 w-48 rounded-lg bg-card p-4 shadow-lg border">
                <KeyRound className="h-8 w-8 text-accent mb-2"/>
                <h3 className="font-headline font-semibold">Address NFT</h3>
                <p className="text-sm text-muted-foreground">Your address, secured as a unique digital asset on the blockchain.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/for-businesses" className="hover:text-primary">For Businesses</Link>
            <Link href="/admin/login" className="hover:text-primary">Admin</Link>
            <Link href="/" className="hover:text-primary">Terms of Service</Link>
            <Link href="/" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
