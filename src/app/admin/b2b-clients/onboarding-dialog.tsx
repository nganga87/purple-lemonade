
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, KeyRound } from 'lucide-react';
import { pricingPlans } from '../pricing-data';
import { countries } from '@/lib/countries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { verifyNftId } from '@/lib/verify-nft';
import { useToast } from '@/hooks/use-toast';

const clientSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required.'),
  registrationNumber: z.string().min(1, 'Registration number is required.'),
  taxId: z.string().min(1, 'Tax ID / VAT number is required.'),
  plan: z.string().min(1, 'A plan must be selected.'),
  countryOfRegistration: z.string().min(1, 'Country of registration is required.'),
  countriesOfOperation: z.array(z.string()).min(1, 'At least one country of operation must be selected.'),
  
  contactName: z.string().min(1, 'Contact name is required.'),
  contactEmail: z.string().email('Please enter a valid email for the contact.'),
  
  billingAddressNftId: z.string().min(1, 'Digital Address NFT ID is required.').startsWith('0x', { message: "Must be a valid blockchain address starting with 0x"}),
  bankName: z.string().min(1, 'Bank name is required.'),
  bankAccountNumber: z.string().min(1, 'Bank account number is required.'),

  status: z.enum(['Pending Review', 'Active', 'Rejected']).default('Pending Review'),
  onboardedSince: z.string().default(new Date().toISOString().split('T')[0]),
});

export type Client = z.infer<typeof clientSchema>;

interface OnboardingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (client: Client) => void;
  client: Client | null;
}

const defaultValues = {
      companyName: '',
      registrationNumber: '',
      taxId: '',
      plan: 'Standard',
      countryOfRegistration: '',
      countriesOfOperation: [],
      contactName: '',
      contactEmail: '',
      billingAddressNftId: '',
      bankName: '',
      bankAccountNumber: '',
      status: 'Pending Review' as const,
      onboardedSince: new Date().toISOString().split('T')[0],
};

export function OnboardingDialog({ isOpen, setIsOpen, onSave, client }: OnboardingDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('company');
  const { toast } = useToast();

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: client ? { ...client, countriesOfOperation: client.countriesOfOperation || [] } : defaultValues,
  });

  useEffect(() => {
    if (client) {
      form.reset({ ...client, countriesOfOperation: client.countriesOfOperation || [] });
    } else {
      form.reset(defaultValues);
    }
    setCurrentTab('company');
  }, [client, form, isOpen]);


  const handleNextTab = async () => {
    let fieldsToValidate: (keyof Client)[] = [];
    let nextTab = '';

    switch (currentTab) {
        case 'company':
            fieldsToValidate = ['companyName', 'registrationNumber', 'taxId', 'plan', 'countryOfRegistration'];
            nextTab = 'operations';
            break;
        case 'operations':
            fieldsToValidate = ['countriesOfOperation'];
            nextTab = 'contact';
            break;
        case 'contact':
            fieldsToValidate = ['contactName', 'contactEmail'];
            nextTab = 'billing';
            break;
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
        setCurrentTab(nextTab);
    }
  };

  const handleBackTab = () => {
    switch (currentTab) {
        case 'billing': setCurrentTab('contact'); break;
        case 'contact': setCurrentTab('operations'); break;
        case 'operations': setCurrentTab('company'); break;
    }
  }

  const onSubmit = async (data: Client) => {
    setIsLoading(true);

    try {
      // Step 1: Verify the NFT ID
      const verificationResult = await verifyNftId(data.billingAddressNftId);

      if (!verificationResult.success) {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: verificationResult.message,
        });
        setIsLoading(false);
        return;
      }

      // Step 2: Proceed with saving if verification is successful
      // Simulate API call for saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(data);
      setIsOpen(false);
      setCurrentTab('company');

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Onboarding Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{client ? 'Edit Client' : 'Onboard New B2B Client'}</DialogTitle>
          <DialogDescription>
            {client ? 'Update the details for this client.' : 'Fill in the details to add a new business client.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <div className="py-4 max-h-[50vh] overflow-y-auto px-1">
                <TabsContent value="company" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                        control={form.control}
                        name="countryOfRegistration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country of Registration</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries.map(country => (
                                            <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                   <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Business Registration No.</FormLabel>
                        <FormControl><Input placeholder="e.g., 1234567-8" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="taxId" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tax ID / VAT Number</FormLabel>
                        <FormControl><Input placeholder="e.g., EU123456789" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                   </div>
                   <FormField control={form.control} name="plan" render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a plan" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {pricingPlans.map(plan => (
                                <SelectItem key={plan.name} value={plan.name}>{plan.name} ({plan.price})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TabsContent>
                <TabsContent value="operations" className="space-y-4">
                    <FormField
                        control={form.control}
                        name="countriesOfOperation"
                        render={() => (
                            <FormItem>
                                <FormLabel>Countries of Operation</FormLabel>
                                <FormDescription>
                                    Select all countries where this client will be utilizing address services.
                                </FormDescription>
                                <ScrollArea className="h-64 rounded-md border p-4">
                                    {countries.map((country) => (
                                        <FormField
                                            key={country.code}
                                            control={form.control}
                                            name="countriesOfOperation"
                                            render={({ field }) => (
                                                <FormItem
                                                    key={country.code}
                                                    className="flex flex-row items-start space-x-3 space-y-0 py-2"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(country.code)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...(field.value || []), country.code])
                                                                    : field.onChange(field.value?.filter((value) => value !== country.code));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{country.name}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </ScrollArea>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </TabsContent>
                <TabsContent value="contact" className="space-y-4">
                    <FormField control={form.control} name="contactName" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Person's Full Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="contactEmail" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Person's Email</FormLabel>
                        <FormControl><Input type="email" placeholder="e.g., jane.doe@example.com" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                </TabsContent>
                <TabsContent value="billing" className="space-y-4">
                    <Alert>
                        <AlertTitle>Billing Address Requirement</AlertTitle>
                        <AlertDescription>
                            The client must have a registered Digital Address for billing. Ask the client to provide their verified Address NFT ID. If they don't have one, they must register one first.
                        </AlertDescription>
                    </Alert>
                    <FormField control={form.control} name="billingAddressNftId" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Digital Address NFT ID</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="0x..." {...field} className="pl-10 font-mono" />
                            </div>
                         </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="bankName" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl><Input placeholder="e.g., First National Bank" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bankAccountNumber" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bank Account Number</FormLabel>
                            <FormControl><Input placeholder="e.g., 123-456-789" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </TabsContent>
              </div>
            </Tabs>
            <DialogFooter className="pt-4 border-t">
              {currentTab !== 'company' && (
                <Button type="button" variant="outline" onClick={handleBackTab}>
                  Back
                </Button>
              )}
              {currentTab !== 'billing' ? (
                 <Button type="button" onClick={handleNextTab}>
                   Next
                 </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? 'Verifying...' : client ? 'Save Changes' : 'Submit for Review'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
