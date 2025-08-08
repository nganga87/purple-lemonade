'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, UserPlus, ArrowRight, Home, PackagePlus } from 'lucide-react';
import Link from 'next/link';

export type RegistrationChoice = 'new-property' | 'new-company' | 'add-tenant' | 'add-family-member';

interface RegistrationOptionsProps {
  onChoice: (choice: RegistrationChoice) => void;
}

export function RegistrationOptions({ onChoice }: RegistrationOptionsProps) {
  const [accountType, setAccountType] = useState<'individual' | 'company' | null>(null);

  useEffect(() => {
    // In a real app, you would get this from a user context or session.
    // For this prototype, we'll simulate checking localStorage.
    const name = localStorage.getItem('loggedInUserName');
    if (name && (name.toLowerCase().includes('corp') || name.toLowerCase().includes('inc') || name.toLowerCase().includes('logistics'))) {
        setAccountType('company');
    } else {
        setAccountType('individual');
    }
  }, []);

  const handlePropertyRegistration = () => {
      onChoice(accountType === 'company' ? 'new-company' : 'new-property');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">What would you like to do?</CardTitle>
          <CardDescription>Choose an option to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-1 gap-6">
            <button
              onClick={handlePropertyRegistration}
              className="group text-left p-6 border rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-center gap-4 mb-2">
                {accountType === 'company' ? <Building className="h-8 w-8 text-primary" /> : <Home className="h-8 w-8 text-primary" />}
                <h3 className="font-headline text-xl font-semibold">
                    {accountType === 'company' ? 'Register a Company Property' : 'Register a Personal Property'}
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Verify a new physical address for yourself or your company. This will create a new primary Address NFT.
              </p>
              <div className="flex items-center text-primary font-medium">
                Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {accountType === 'company' && (
               <Card className="group text-left p-6 border rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-4 mb-2">
                    <PackagePlus className="h-8 w-8 text-purple-600" />
                    <CardTitle className="font-headline text-xl font-semibold">Company Asset Management</CardTitle>
                  </div>
                  <CardDescription className="mb-4">
                    Manage your company's tokenized assets, such as minting new shares tied to your verified headquarters.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                   <Button asChild>
                    <Link href="/company/tokenize-shares">
                        Tokenize Company Shares
                    </Link>
                  </Button>
                </CardContent>
               </Card>
            )}
           
            <div className="p-6 border rounded-lg">
               <div className="flex items-center gap-4 mb-2">
                <UserPlus className="h-8 w-8 text-accent" />
                <h3 className="font-headline text-xl font-semibold">Grant Access to an Address</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Grant access to a tenant or family member to use one of your already verified addresses. This creates a sub-address linked to your primary one.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => onChoice('add-tenant')} className="justify-start flex-1">Add a Tenant</Button>
                  <Button variant="outline" onClick={() => onChoice('add-family-member')} className="justify-start flex-1">Add a Family Member</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
