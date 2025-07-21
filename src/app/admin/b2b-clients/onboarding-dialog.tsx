
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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { pricingPlans } from '../pricing-data';

const clientSchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required.'),
  registrationNumber: z.string().min(1, 'Registration number is required.'),
  taxId: z.string().min(1, 'Tax ID / VAT number is required.'),
  plan: z.string().min(1, 'A plan must be selected.'),
  
  contactName: z.string().min(1, 'Contact name is required.'),
  contactEmail: z.string().email('Please enter a valid email for the contact.'),
  
  billingAddress: z.string().min(1, 'Billing address is required.'),
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

export function OnboardingDialog({ isOpen, setIsOpen, onSave, client }: OnboardingDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('company');

  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: client || {
      companyName: '',
      registrationNumber: '',
      taxId: '',
      plan: 'Standard',
      contactName: '',
      contactEmail: '',
      billingAddress: '',
      bankName: '',
      bankAccountNumber: '',
      status: 'Pending Review',
      onboardedSince: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (client) {
      form.reset(client);
    } else {
      form.reset({
        companyName: '',
        registrationNumber: '',
        taxId: '',
        plan: 'Standard',
        contactName: '',
        contactEmail: '',
        billingAddress: '',
        bankName: '',
        bankAccountNumber: '',
        status: 'Pending Review',
        onboardedSince: new Date().toISOString().split('T')[0],
      });
    }
  }, [client, form]);

  const handleNextTab = async () => {
    let fieldsToValidate: (keyof Client)[] = [];
    if (currentTab === 'company') fieldsToValidate = ['companyName', 'registrationNumber', 'taxId', 'plan'];
    if (currentTab === 'contact') fieldsToValidate = ['contactName', 'contactEmail'];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
        if(currentTab === 'company') setCurrentTab('contact');
        if(currentTab === 'contact') setCurrentTab('billing');
    }
  };

  const onSubmit = (data: Client) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSave(data);
      setIsLoading(false);
      setIsOpen(false);
      setCurrentTab('company');
    }, 1000);
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="company">Company</TabsTrigger>
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
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a company or type to add..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Global Logistics">Global Logistics</SelectItem>
                            <SelectItem value="E-Shop Now">E-Shop Now</SelectItem>
                            <SelectItem value="Quick Couriers">Quick Couriers</SelectItem>
                            <SelectItem value="Innovate Tech">Innovate Tech</SelectItem>
                            <SelectItem value="Sunrise Foods">Sunrise Foods</SelectItem>
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
                    <FormField control={form.control} name="billingAddress" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Billing Address</FormLabel>
                        <FormControl><Textarea placeholder="Enter full billing address" {...field} /></FormControl>
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
                <Button type="button" variant="outline" onClick={() => setCurrentTab(currentTab === 'billing' ? 'contact' : 'company')}>
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
                    {client ? 'Save Changes' : 'Submit for Review'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
