'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight, KeyRound, Search, Copy } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/../public/img/chain.jpg';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const faqData = {
  'Core Concept & Value Proposition': [
    {
      question: 'What is AddressChain Systems?',
      answer:
        'AddressChain is a blockchain-powered digital addressing platform that transforms how locations are identified, verified, and accessed. It enables secure, interoperable, and privacy-respecting address management for emergency response, logistics, and civic infrastructure.',
    },
    {
      question: 'What problem does AddressChain solve?',
      answer:
        'It addresses the fragmentation, inaccuracy, and lack of verifiability in traditional addressing systems—especially in underserved regions. By leveraging blockchain and behavioral validation, AddressChain ensures every address is unique, secure, and context-aware.',
    },
  ],
  'Blockchain & NFTs': [
    {
      question: 'How does blockchain make digital addresses reliable?',
      answer:
        'AddressChain uses blockchain to ensure that every digital address is:\n• \tTamper-proof: Once registered, it cannot be altered without consensus.\n• \tVerifiable: Anyone can confirm the authenticity of an address.\n• \tDecentralized: No single authority controls the data, reducing risk of manipulation.',
    },
    {
      question: 'What is an NFT and how does it relate to digital addresses?',
      answer:
        'An NFT (Non-Fungible Token) is a unique digital asset stored on a blockchain. In AddressChain, each address is minted as an ERC-721 NFT, meaning:\n• \tIt’s one-of-a-kind and cannot be duplicated.\n• \tIt has a traceable ownership history.\n• \tIt can be transferred or updated securely via smart contracts.\nThis makes each address a provable, ownable, and tradable asset, similar to a digital deed.',
    },
  ],
};

export default function LandingPage() {
  const [nftId, setNftId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleResolve = () => {
    if (nftId.trim()) {
      router.push(`/resolve/${nftId.trim()}`);
    }
  };

  const filteredFaqData = useMemo(() => {
    if (!searchTerm) return faqData as typeof faqData;
    const lower = searchTerm.toLowerCase();
    const filtered: any = {};
    for (const category in faqData) {
      // @ts-ignore
      const items = faqData[category].filter((qa) =>
        qa.question.toLowerCase().includes(lower) || qa.answer.toLowerCase().includes(lower)
      );
      if (items.length) filtered[category] = items;
    }
    return filtered;
  }, [searchTerm]);

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
      <header className="px-12 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="#faq">
              <Button variant="ghost">FAQ</Button>
            </a>
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
        <section className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-8 md:py-20 lg:py-24 px-24">
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
              src={heroImage}
              alt="Globe with silver chain link"
              fill
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="digital globe network"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container max-w-4xl mx-auto py-8 md:py-12 px-6 md:px-0">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground md:text-xl">Can’t find the answer? Reach out to our support team.</p>
          </div>
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {Object.keys(filteredFaqData).length ? (
            Object.entries(filteredFaqData).map(([category, qas]) => (
              <div key={category} className="mb-8">
                <h3 className="font-headline text-2xl font-semibold mb-4">{category}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {qas.map((qa: any, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg">{qa.question}</AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base text-muted-foreground whitespace-pre-line">
                        {qa.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No questions found for your search term.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-primary">FAQ</a>
            <Link href="/for-businesses" className="hover:text-primary">For Businesses</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
