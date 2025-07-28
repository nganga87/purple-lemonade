'use client';

import React from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { pricingPlans } from '../admin/pricing-data';
import { CheckCircle } from 'lucide-react';

export default function PricingPage() {
  const planFeatures: Record<string, string[]> = {
    Standard: [
        "10,000 API Calls/mo",
        "5 Team Members",
        "Address Verification",
        "Basic Risk Assessment",
        "Email Support"
    ],
    Pro: [
        "50,000 API Calls/mo",
        "25 Team Members",
        "Address Verification",
        "Advanced Risk Assessment",
        "Priority Email Support"
    ],
    Enterprise: [
        "Unlimited API Calls",
        "Unlimited Team Members",
        "Custom Integrations",
        "Dedicated Support Manager",
        "Service Level Agreement (SLA)"
    ]
  };


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
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
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
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Choose the plan that's right for your business. No hidden fees. Ever.
                    </p>
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24">
            <div className="container grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col shadow-lg ${plan.name === 'Pro' ? 'border-primary ring-2 ring-primary' : ''}`}>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                            <CardDescription>
                                { plan.name === 'Standard' && 'For small teams and startups.' }
                                { plan.name === 'Pro' && 'For growing businesses with higher volume.' }
                                { plan.name === 'Enterprise' && 'For large-scale, custom deployments.' }
                            </CardDescription>
                             <p className="text-4xl font-bold pt-4">{plan.price}</p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <ul className="space-y-3 text-muted-foreground">
                                {planFeatures[plan.name]?.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary"/>
                                    <span>{feature}</span>
                                </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardContent>
                            <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                               {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
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
