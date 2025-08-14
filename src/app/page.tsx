'use client';

import React, { useState } from 'react';
import { ArrowRight, KeyRound, Search, Copy } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Faq } from '@/components/faq';


export default function LandingPage() {
  const [nftId, setNftId] = useState('');
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
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-start gap-8">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Your Identity, Your Address. Verified.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Digital Address provides a revolutionary way to manage and verify
              physical addresses using the power of AI and blockchain technology.
              Prevent fraud, streamline deliveries, and own your address like never before.
            </p>
            <div className="w-full max-w-md space-y-6">
               <div className="flex items-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/for-businesses">For Businesses</Link>
                  </Button>
                </div>

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
              src="https://storage.googleapis.com/static.invertase.io/assets/images/studio/digital-address/bg-light-1.png"
              alt="Digital representation of a secure, interconnected globe"
              fill
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="digital globe network"
            />
          </div>
        </section>
        
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                <Faq />
            </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/for-businesses" className="hover:text-primary">For Businesses</Link>
            <Link href="/admin/login" className="hover:text-primary">Admin</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
