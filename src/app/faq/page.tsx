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
    'Core Concept & Value Proposition': [
        {
            question: 'What is AddressChain Systems?',
            answer: 'AddressChain is a blockchain-powered digital addressing platform that transforms how locations are identified, verified, and accessed. It enables secure, interoperable, and privacy-respecting address management for emergency response, logistics, and civic infrastructure.'
        },
        {
            question: 'What problem does AddressChain solve?',
            answer: 'It addresses the fragmentation, inaccuracy, and lack of verifiability in traditional addressing systems—especially in underserved regions. By leveraging blockchain and behavioral validation, AddressChain ensures every address is unique, secure, and context-aware.'
        }
    ],
    'Blockchain & NFTs': [
        {
            question: 'How does blockchain make digital addresses reliable?',
            answer: 'AddressChain uses blockchain to ensure that every digital address is:\n• Tamper-proof: Once registered, it cannot be altered without consensus.\n• Verifiable: Anyone can confirm the authenticity of an address.\n• Decentralized: No single authority controls the data, reducing risk of manipulation.'
        },
        {
            question: 'What is an NFT and how does it relate to digital addresses?',
            answer: 'An NFT (Non-Fungible Token) is a unique digital asset stored on a blockchain. In AddressChain, each address is minted as an ERC-721 NFT, meaning:\n• It’s one-of-a-kind and cannot be duplicated.\n• It has a traceable ownership history.\n• It can be transferred or updated securely via smart contracts.\nThis makes each address a provable, ownable, and tradable asset, similar to a digital deed.'
        },
        {
            question: 'Why use ERC-721 instead of ERC-20?',
            answer: 'ERC-721 is designed for non-fungible assets, where each token is unique—perfect for representing distinct addresses. ERC-20 is for fungible tokens (like cryptocurrencies), which are interchangeable. Since no two addresses are alike, ERC-721 is the ideal standard.'
        },
        {
            question: 'Can an NFT represent a physical location?',
            answer: 'Yes. NFTs in AddressChain represent real-world locations—like homes, businesses, or landmarks—by linking metadata (GPS coordinates, behavioral signals, ownership proofs) to the token. This creates a digital twin of the physical address.'
        },
        {
            question: 'How does AddressChain ensure privacy while using blockchain?',
            answer: 'While blockchain is transparent, AddressChain uses:\n• Zero-knowledge proofs to validate ownership without revealing personal data.\n• Encrypted metadata stored off-chain, with access controlled by the address owner.\n• Behavioral verification to confirm presence or usage without tracking identity.'
        },
        {
            question: 'What happens when an address changes or is reassigned?',
            answer: 'The NFT can be updated or transferred via smart contracts. Ownership changes, metadata updates, or behavioral revalidation are recorded immutably, ensuring historical traceability.'
        }
    ],
    'Printed NFTs vs Platform': [
        {
            question: 'Printing or Displaying an NFT Address Outside AddressChain',
            answer: '✅ What You Can Do\n• View and export metadata: If your NFT includes metadata (e.g., GPS coordinates, ownership proof, address description), you can extract it from the token URI and print it as a certificate, QR code, or visual map.\n• Use blockchain explorers: Tools like Etherscan or Moralis let you view NFT ownership, token ID, and contract details.\n• Print visual representations: Platforms like NFTY INK allow you to upscale and print NFTs as physical art or certificates, even if they originated digitally.\n\n🧾 Example Use Case: Printed Address Certificate\nImagine a printed certificate that includes:\n• Address name (e.g., “Plot 12, Green Valley”)\n• Token ID and blockchain contract\n• QR code linking to the token URI or metadata\n• Ownership signature or validation hash\n• Timestamp of minting\nThis can be used for:\n• Proof of residence\n• Emergency response tagging\n• Logistics drop-point verification\n• Civic documentation\n\n⚠️ Considerations\n• Metadata access: Ensure your NFT includes a token URI pointing to accessible metadata (e.g., IPFS or HTTPS).\n• Privacy: Avoid printing sensitive data unless encrypted or anonymized.\n• Legal recognition: Printed NFTs may not yet be legally recognized as address proof unless backed by local authorities or pilot agreements.'
        }
    ],
    'Technology & Architecture': [
        {
            question: 'What blockchain standard does AddressChain use?',
            answer: 'AddressChain utilizes the ERC-721 standard for non-fungible tokens (NFTs), allowing each digital address to be uniquely represented, owned, and transferred securely on-chain.'
        },
        {
            question: 'How does AddressChain handle offline environments?',
            answer: 'The system supports offline-first syncing and validation mechanisms, enabling address registration and verification even in low-connectivity areas. Data is queued locally and synced once connectivity is restored.'
        },
        {
            question: 'How is user privacy protected?',
            answer: 'AddressChain employs zero-knowledge proofs and behavioral verification to validate address ownership without exposing personal data. Users retain control over what information is shared and with whom.'
        }
    ],
    'Deployment & Integration': [
        {
            question: 'Can AddressChain integrate with existing GIS or logistics platforms?',
            answer: 'Yes. AddressChain offers APIs and SDKs for seamless integration with GIS tools, logistics platforms, and emergency dispatch systems. It’s designed to be interoperable and modular.'
        },
        {
            question: 'What hosting infrastructure does AddressChain use?',
            answer: 'The MVP is deployed on cost-efficient cloud infrastructure with containerized services, secure secret management, and CI/CD pipelines for rapid iteration and scalability.'
        }
    ],
    'Use Cases & Partnerships': [
        {
            question: 'Who are the ideal pilot partners?',
            answer: 'Emergency response units, logistics companies, municipal governments, and NGOs operating in regions with poor address infrastructure are ideal partners for pilot deployment.'
        },
        {
            question: 'How does AddressChain improve emergency response?',
            answer: 'By providing precise, validated digital addresses, responders can locate individuals faster, even in informal settlements or rural areas. Behavioral signals can also trigger alerts or verify presence.'
        }
    ],
    'Business Model & Growth': [
        {
            question: 'How does AddressChain generate revenue?',
            answer: 'Through tiered SaaS subscriptions for enterprise users, transaction fees for address minting and verification, and licensing of its API for third-party integrations.'
        },
        {
            question: 'What’s the long-term vision?',
            answer: 'To become the foundational layer for global addressing—enabling smart cities, autonomous logistics, and resilient civic infrastructure through secure, decentralized location intelligence.'
        }
    ]
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
                                <AccordionContent className="text-base text-muted-foreground whitespace-pre-line">
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
