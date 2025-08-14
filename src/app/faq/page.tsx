'use client';

import React from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const faqData = {
    'About AddressChain': [
        {
            question: 'What is AddressChain?',
            answer: 'AddressChain is a platform that transforms physical addresses into verifiable, tradable digital assets (NFTs) on the blockchain. It uses AI to validate addresses, reducing fraud and streamlining logistics.'
        },
        {
            question: 'What problem does AddressChain solve?',
            answer: 'It solves issues like address fraud, failed deliveries, and complex proof-of-residence verification by creating a single, secure, and tamper-proof source of truth for physical locations.'
        }
    ],
    'Blockchain & NFTs': [
        {
            question: 'What is an Address NFT?',
            answer: 'An Address NFT is a unique digital token (Non-Fungible Token) that represents a single, AI-verified physical address on the blockchain. It serves as a secure and portable proof of address.'
        },
        {
            question: 'Do I need to know about crypto to use AddressChain?',
            answer: 'While the underlying technology is blockchain, the user interface is designed to be intuitive for everyone. We handle the complexities of crypto wallet generation and blockchain interactions for you.'
        }
    ],
    'Security & Privacy': [
        {
            question: 'Is my personal information public on the blockchain?',
            answer: 'No. While the Address NFT ID is public, your personal identifying information is kept private. You control who has access to your detailed information.'
        },
        {
            question: 'How do you prevent fraudulent address registrations?',
            answer: 'We use a multi-step, AI-powered validation process. This includes cross-validating user-submitted photos with satellite imagery and requiring third-party human verification for final approval.'
        }
    ],
    'Integration & APIs': [
        {
            question: 'Can my business use AddressChain?',
            answer: 'Yes! We offer a simple REST API for businesses to integrate address verification into their applications, websites, and logistics systems.'
        },
        {
            question: 'What are the benefits for e-commerce stores?',
            answer: 'By integrating our API, e-commerce stores can validate shipping addresses in real-time at checkout. This drastically reduces failed deliveries, costly returns, and customer frustration.'
        }
    ],
};

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredFaqData = React.useMemo(() => {
    if (!searchTerm) return faqData;

    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered: typeof faqData = {};

    for (const category in faqData) {
        // @ts-ignore
        const questions = faqData[category].filter(
            (item) =>
            item.question.toLowerCase().includes(lowercasedFilter) ||
            item.answer.toLowerCase().includes(lowercasedFilter)
        );
        if (questions.length > 0) {
             // @ts-ignore
            filtered[category] = questions;
        }
    }
    return filtered;
  }, [searchTerm]);

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
        <main className="flex-1 container max-w-4xl mx-auto py-8 md:py-12">
            <div className="w-full">
                <div className="text-center mb-12">
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h1>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Can't find the answer you're looking for? Reach out to our support team.
                    </p>
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
                
                {Object.keys(filteredFaqData).length > 0 ? (
                    Object.entries(filteredFaqData).map(([category, qas]) => (
                        <div key={category} className="mb-8">
                            <h3 className="font-headline text-2xl font-semibold mb-4">{category}</h3>
                            <Accordion type="single" collapsible className="w-full">
                            {qas.map((qa, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-lg text-left">{qa.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
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