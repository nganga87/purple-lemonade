'use client';

import React from 'react';
import { Globe, ArrowLeftRight, TrendingUp, ShieldCheck, CheckCircle } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';


export default function ForBusinessesPage() {
  
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
             <Link
              href="/exchange"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Marketplace
            </Link>
            <Link
              href="/for-businesses"
              className="font-bold text-primary transition-colors hover:text-foreground/80"
            >
              For Businesses
            </Link>
          </nav>
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
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                 <div className="mx-auto max-w-3xl text-center">
                    <p className="font-semibold text-primary">POWER YOUR BUSINESS</p>
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl mt-2">Immutable Addresses, Unstoppable Growth</h1>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Integrate our API to verify addresses, prevent fraud, and streamline logistics with the most reliable location data available anywhere.
                    </p>
                     <div className="mt-8 flex justify-center gap-4">
                        <Button size="lg">Contact Sales</Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/docs">View Documentation</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter">Transforming Industries with Location Certainty</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                        Our tamper-proof, AI-verified addresses solve critical business challenges across multiple sectors.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="text-center">
                        <CardHeader className="items-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                             <ArrowLeftRight className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">E-commerce & Retail</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Reduce failed deliveries and cart abandonment by validating addresses at checkout in real-time. Boost customer satisfaction and your bottom line.
                        </CardContent>
                    </Card>
                     <Card className="text-center">
                        <CardHeader className="items-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                            <TrendingUp className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">Logistics & Delivery</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Optimize routes and ensure first-time delivery success with pin-point accurate, verified location data. Cut fuel costs and improve delivery times.
                        </CardContent>
                    </Card>
                     <Card className="text-center">
                        <CardHeader className="items-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                            <ShieldCheck className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">Finance & KYC</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Meet regulatory requirements and onboard users faster with undeniable proof-of-residence verification. Reduce fraud and compliance risks.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                     <h2 className="font-headline text-3xl font-bold tracking-tighter">Simple API, Powerful Results</h2>
                     <p className="text-muted-foreground md:text-lg">
                        Our developer-friendly REST API makes it easy to integrate Digital Address verification into any application. With just a few lines of code, you can start validating addresses, reducing fraud, and ensuring your services reach the right place, every time.
                     </p>
                     <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Real-time address verification and validation.</span>
                        </li>
                         <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Access historical data and trust scores for any address NFT.</span>
                        </li>
                         <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>Scalable, reliable infrastructure with enterprise-grade SLAs.</span>
                        </li>
                     </ul>
                </div>
                <div className="relative h-80 rounded-lg bg-card shadow-lg p-2 border">
                    <Image src="https://placehold.co/600x400.png" alt="API Code Snippet" className="object-cover rounded-md h-full w-full" fill data-ai-hint="code snippet"/>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter">Ready to Build on a Foundation of Trust?</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                    Join the growing network of businesses that rely on Digital Address for location certainty. Explore our plans or get in touch with our team to find the right solution for you.
                 </p>
                 <div className="mt-8">
                    <Button size="lg">
                        View Pricing & Plans
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary">Terms of Service</Link>
            <Link href="/" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
