
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, UserPlus, ArrowRight } from 'lucide-react';

export type RegistrationChoice = 'new-property' | 'add-tenant';

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
            <button
              onClick={() => onChoice('new-property')}
              className="group text-left p-6 border rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-center gap-4 mb-2">
                <Building className="h-8 w-8 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Register a New Property</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Verify a new physical address you own, like a home or rental property. This will create a new primary Address NFT.
              </p>
              <div className="flex items-center text-primary font-medium">
                Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button
              onClick={() => onChoice('add-tenant')}
              className="group text-left p-6 border rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="flex items-center gap-4 mb-2">
                <UserPlus className="h-8 w-8 text-accent" />
                <h3 className="font-headline text-xl font-semibold">Add a Tenant</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Grant access to a tenant or family member to use one of your already verified addresses.
              </p>
               <div className="flex items-center text-accent font-medium">
                Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
