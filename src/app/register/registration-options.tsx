'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, UserPlus, ArrowRight, Home } from 'lucide-react';

export type RegistrationChoice = 'new-property' | 'new-company' | 'add-tenant' | 'add-family-member';

interface RegistrationOptionsProps {
  onChoice: (choice: RegistrationChoice) => void;
}

export function RegistrationOptions({ onChoice }: RegistrationOptionsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">What would you like to do?</CardTitle>
          <CardDescription>Choose an option to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg space-y-4 flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Home className="h-8 w-8 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Register a Personal Property</h3>
              </div>
              <p className="text-muted-foreground flex-1">
                Verify a new physical address you own, like a home or rental property. This will create a new primary Address NFT for an individual.
              </p>
              <Button onClick={() => onChoice('new-property')} className="w-full">
                Register Personal Property <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
             <div className="p-6 border rounded-lg space-y-4 flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Building className="h-8 w-8 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Register a Company Address</h3>
              </div>
              <p className="text-muted-foreground flex-1">
                Verify a new address for a registered business or organization. This requires company registration details.
              </p>
              <Button onClick={() => onChoice('new-company')} className="w-full">
                Register Company Address <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 border rounded-lg md:col-span-2">
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
