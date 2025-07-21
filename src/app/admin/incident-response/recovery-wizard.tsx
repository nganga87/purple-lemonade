
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Fingerprint,
  KeyRound,
  Loader2,
  LocateFixed,
  MapPin,
  Phone,
  User,
  UserCheck,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Incident } from './incidents';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface RecoveryWizardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  incident: Incident;
  onSave: (incident: Incident) => void;
}

const steps = [
  { id: 'verify', name: 'Verify Details' },
  { id: 'identity', name: 'Verify ID' },
  { id: 'contact', name: 'Contact & Successor' },
  { id: 'resolve', name: 'Resolve Incident' },
];

export function RecoveryWizard({
  isOpen,
  setIsOpen,
  incident,
  onSave,
}: RecoveryWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({});
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setVerifiedItems({});
      setResolutionNotes('');
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const updatedIncident = {
      ...incident,
      status: 'Resolved' as const, // Assuming saving resolves it
    };
    onSave(updatedIncident);
    setIsSaving(false);
  };
  
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setVerifiedItems(prev => ({...prev, [id]: checked}));
  }

  const VerificationItem = ({ id, label, value, icon }: {id: string, label: string, value: string, icon: React.ReactNode}) => (
    <div className="flex items-start gap-4 p-3 rounded-md border bg-secondary/50">
        <div className="text-primary mt-1">{icon}</div>
        <div className="flex-1">
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground font-mono">{value}</p>
        </div>
        <Checkbox id={id} checked={verifiedItems[id]} onCheckedChange={(checked) => handleCheckboxChange(id, !!checked)} />
    </div>
  );


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">
            Asset Recovery Wizard
          </DialogTitle>
          <DialogDescription>
            Follow these steps to securely verify and restore the user's
            digital address. Incident ID: {incident.id}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 my-4">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex items-center space-x-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                           {index < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                        </div>
                        <span className={`font-medium ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</span>
                    </div>
                     {index < steps.length - 1 && <Separator className="flex-1" />}
                </React.Fragment>
            ))}
        </div>

        <div className="py-4 min-h-[300px]">
          {currentStep === 0 && (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 1: Primary Locator Verification</h3>
                <p className="text-muted-foreground text-sm">Verify the core immutable details of the digital address. Check external maps and records to confirm these details.</p>
                <VerificationItem id="gps" label="Last Recorded GPS" value={incident.affectedAddress.gps} icon={<LocateFixed />} />
                <VerificationItem id="addressName" label="Full Address" value={incident.affectedAddress.address} icon={<MapPin />} />
                <VerificationItem id="userName" label="Registered Owner" value={incident.affectedUser.name} icon={<User />} />
            </div>
          )}
           {currentStep === 1 && (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 2: Identity Document Verification</h3>
                <p className="text-muted-foreground text-sm">Verify the user's identity by comparing their provided government-issued ID with the information on file.</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>ID / Passport (Front)</Label>
                        <Image src="https://placehold.co/300x180.png" width={300} height={180} alt="ID front" className="rounded-lg border shadow-sm w-full" data-ai-hint="id card"/>
                    </div>
                    <div className="space-y-2">
                        <Label>ID (Back)</Label>
                        <Image src="https://placehold.co/300x180.png" width={300} height={180} alt="ID back" className="rounded-lg border shadow-sm w-full" data-ai-hint="id card"/>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-3 rounded-md border bg-secondary/50">
                    <div className="text-primary mt-1"><Fingerprint /></div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Confirm Identity</p>
                        <p className="text-sm text-muted-foreground">Check that the name and photo on the ID match the user's profile and biometric data on file.</p>
                    </div>
                    <Checkbox id="identity" checked={verifiedItems['identity']} onCheckedChange={(checked) => handleCheckboxChange('identity', !!checked)} />
                </div>
            </div>
          )}
          {currentStep === 2 && (
             <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 3: Dynamic Factor & Successor Verification</h3>
                <p className="text-muted-foreground text-sm">Verify the user's linked contact details and the designated successor information. Contact the user if possible.</p>
                <VerificationItem id="phone" label="Linked Phone Number" value="+1-555-XXX-1234" icon={<Phone />} />
                <VerificationItem id="successorName" label="Designated Successor" value={incident.successor.name} icon={<UserCheck />} />
                <VerificationItem id="successorAddress" label="Successor's Wallet Address" value={incident.successor.address} icon={<KeyRound />} />
            </div>
          )}
          {currentStep === 3 && (
             <div className="space-y-4">
                <h3 className="font-semibold text-lg">Step 4: Resolution & Final Actions</h3>
                <p className="text-muted-foreground text-sm">Document the actions taken to resolve this incident. This will be recorded in the address's immutable history.</p>
                 <div className="space-y-2">
                    <Label htmlFor="resolution-notes">Resolution Notes</Label>
                    <Textarea
                        id="resolution-notes"
                        placeholder="e.g., Verified user identity via video call and ID check. Initiated transfer of NFT to the designated successor's wallet address. Reason: Memory Loss..."
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        rows={6}
                    />
                </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isSaving}
            >
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? 'Saving...' : 'Complete Recovery'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
