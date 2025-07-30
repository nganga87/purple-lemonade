'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function CodeBlock({ children, className }: { children: React.ReactNode, className?: string }) {
    const { toast } = useToast();
    const [hasCopied, setHasCopied] = useState(false);

    const onCopy = () => {
        if (typeof children === 'string') {
            navigator.clipboard.writeText(children);
            setHasCopied(true);
            toast({ title: 'Copied!', description: 'The code snippet has been copied to your clipboard.' });
            setTimeout(() => setHasCopied(false), 2000);
        }
    };

    return (
        <div className="relative group">
            <pre className={`bg-secondary p-4 rounded-md text-sm text-secondary-foreground overflow-x-auto ${className}`}>
                <code>
                    {children}
                </code>
            </pre>
            <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onCopy}
            >
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
            </Button>
        </div>
    )
}


export default function DocsPage() {
  
  const verifyRequest = `{
  "address": "1600 Amphitheatre Parkway, Mountain View, CA"
}`;

  const verifyResponse = `{
  "status": "VALID",
  "nftId": "0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C",
  "certaintyScore": 0.98
}`;

 const lookupResponse = `{
  "nftId": "0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C",
  "physicalAddress": "1600 Amphitheatre Parkway, Mountain View, CA, 94043",
  "status": "Verified",
  "commercialUsage": [
    "Amazon Prime",
    "FedEx Delivery Manager"
  ],
  "riskAssessment": {
    "level": "Low",
    "findings": []
  }
}`;


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

      <main className="flex-1 container max-w-screen-lg py-8 md:py-12">
        <div className="space-y-8">
            <div className="space-y-2">
                 <h1 className="font-headline text-4xl font-bold tracking-tight">API Documentation</h1>
                <p className="text-lg text-muted-foreground">Integrate Digital Address verification into your services.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        All API requests must be authenticated using an API key. You can generate an API key from your B2B client dashboard. Include the API key in the `Authorization` header of your requests.
                    </p>
                    <CodeBlock className="mt-4">
                        Authorization: Bearer YOUR_API_KEY
                    </CodeBlock>
                </CardContent>
            </Card>

            <div className="space-y-8">
                 <h2 className="text-2xl font-headline font-semibold border-b pb-2">Endpoints</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600 border-green-300">POST</Badge>
                            <span>/v1/verify</span>
                        </CardTitle>
                        <CardDescription>
                            Verifies a physical address and returns its corresponding Digital Address NFT ID if one exists.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h4 className="font-semibold">Request Body</h4>
                        <CodeBlock>{verifyRequest}</CodeBlock>
                        
                        <h4 className="font-semibold">Response</h4>
                        <CodeBlock>{verifyResponse}</CodeBlock>
                    </CardContent>
                 </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Badge variant="outline" className="text-blue-600 border-blue-300">GET</Badge>
                             <span>/v1/lookup/{'{nftId}'}</span>
                        </CardTitle>
                        <CardDescription>
                           Retrieves detailed information for a given Digital Address NFT ID, including its risk assessment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <h4 className="font-semibold">URL Parameters</h4>
                         <p className="text-sm"><code className="font-mono bg-secondary p-1 rounded-md">nftId</code> (string, required): The unique identifier of the Address NFT.</p>

                        <h4 className="font-semibold">Response</h4>
                        <CodeBlock>{lookupResponse}</CodeBlock>
                    </CardContent>
                 </Card>
            </div>
        </div>
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
