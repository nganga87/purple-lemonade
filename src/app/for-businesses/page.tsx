
'use client';

import React from 'react';
import { Globe, ArrowLeftRight, TrendingUp, ShieldCheck, CheckCircle, Truck, Banknote, MapPin } from 'lucide-react';
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
              href="#marketplace-benefits"
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
             <Link
              href="/docs"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Client Log In</Button>
            </Link>
            <Button asChild>
               <a href="mailto:sales@digitaladdress.com?subject=Sales%20Inquiry%20for%20Digital%20Address">Contact Sales</a>
            </Button>
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
                        <Button size="lg" asChild>
                           <a href="mailto:sales@digitaladdress.com?subject=Sales%20Inquiry%20for%20Digital%20Address">Contact Sales</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/docs">View Documentation</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container space-y-24">
                 <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter">A Single Source of Truth for Physical Location</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">
                        AddressChain transforms ambiguous physical locations into definitive, verifiable digital assets. See how our certainty solves critical challenges in your industry.
                    </p>
                </div>
                
                {/* Logistics Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" alt="Logistics and delivery trucks" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="delivery truck"/>
                    </div>
                    <div className="space-y-4">
                         <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                           <Truck className="h-5 w-5"/>
                           <span>For Logistics & E-commerce</span>
                         </div>
                         <h3 className="font-headline text-2xl font-bold tracking-tighter">Eliminate Delivery Failures & Returns</h3>
                         <p className="text-muted-foreground">
                            Failed deliveries due to incorrect or vague addresses cost billions annually. AddressChain provides a single, verified coordinate for every location, ensuring your product reaches the right hands, the first time.
                         </p>
                         <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                                <span>Drastically reduce the rate of returned-to-sender packages by validating addresses at the point of entry.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                                <span>Optimize last-mile delivery routes with guaranteed-accurate GPS data, saving fuel and time.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                                <span>Increase customer satisfaction and loyalty with reliable, on-time deliveries.</span>
                            </li>
                         </ul>
                    </div>
                </div>

                {/* Finance/KYC Section */}
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4 md:order-2">
                         <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                           <ShieldCheck className="h-5 w-5"/>
                           <span>For Financial Services & Compliance</span>
                         </div>
                         <h3 className="font-headline text-2xl font-bold tracking-tighter">Mitigate Fraud with Verified Identities</h3>
                         <p className="text-muted-foreground">
                            Address fraud is a cornerstone of synthetic identity theft and financial crime. By tying identity to a physically verified location, AddressChain makes it exponentially harder for fraudsters to operate.
                         </p>
                         <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                <span>Satisfy **Know Your Customer (KYC)** requirements with immutable, AI-verified proof of residence.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                <span>Conduct robust **Know Your Business (KYB)** checks by confirming a company's physical place of operation.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                <span>Reduce chargebacks by confirming delivery to a verified address, fighting "Item Not Received" fraud.</span>
                            </li>
                         </ul>
                    </div>
                     <div className="md:order-1">
                        <Image src="https://placehold.co/600x400.png" alt="Secure financial transaction" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="security shield"/>
                    </div>
                </div>
                
                 {/* Marketplace Section */}
                 <div id="marketplace-benefits" className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" alt="Digital marketplace for addresses" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="digital marketplace"/>
                    </div>
                    <div className="space-y-4">
                         <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                           <Banknote className="h-5 w-5"/>
                           <span>For Real Estate & Asset Management</span>
                         </div>
                         <h3 className="font-headline text-2xl font-bold tracking-tighter">Unlock the Value of Physical Locations</h3>
                         <p className="text-muted-foreground">
                            The AddressChain marketplace transforms physical properties into liquid digital assets. Buy, sell, or lease verified addresses with unprecedented transparency and efficiency.
                         </p>
                         <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                                <span>Acquire strategic commercial or residential addresses for market expansion or investment.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                                <span>Monetize unused or underutilized property assets by listing them on a global exchange.</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                                <span>Perform AI-powered due diligence on any listed property to assess its history, usage, and risk profile before acquisition.</span>
                            </li>
                         </ul>
                    </div>
                </div>

            </div>
        </section>

        <section className="bg-secondary py-16 md:py-24">
            <div className="container text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter">Ready to Build on a Foundation of Trust?</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                    Join the growing network of businesses that rely on Digital Address for location certainty. Explore our plans or get in touch with our team to find the right solution for you.
                 </p>
                 <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/pricing">
                            View Pricing &amp; Plans
                        </Link>
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
