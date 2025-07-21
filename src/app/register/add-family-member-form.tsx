
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Mail, Home, User, CheckCircle, QrCode } from 'lucide-react';
import Image from 'next/image';
import { generateSubAddress } from './utils';

const formSchema = z.object({
  property: z.string().min(1, 'Please select a property.'),
  memberName: z.string().min(1, 'Family member name is required.'),
  memberEmail: z.string().email('Please enter a valid email.'),
  relationship: z.string().min(1, 'Relationship is required.'),
});

type FormValues = z.infer<typeof formSchema>;

const userProperties = [
  {
    address: '123 Main Street, Anytown, USA 12345',
    nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B',
  },
  {
    address: '456 Oak Avenue, Springfield, USA 67890',
    nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
  },
];

interface AddFamilyMemberFormProps {
  onBack: () => void;
}

type SubAddressResult = {
  subAddressId: string;
  memberName: string;
}

export function AddFamilyMemberForm({ onBack }: AddFamilyMemberFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SubAddressResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: '',
      memberName: '',
      memberEmail: '',
      relationship: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    console.log('Submitting family member registration:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // The sub-address for a family member could be the same as the primary for simplicity
    const subAddressId = await generateSubAddress(values.property, values.relationship);

    toast({
      title: "Family Member Invitation Sent",
      description: `${values.memberName} has been invited to use your address.`,
    });
    
    setResult({ subAddressId, memberName: values.memberName });
    setIsLoading(false);
  };
  
  const handleDialogClose = () => {
    setResult(null);
    form.reset();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Options
      </Button>
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Add a Family Member</CardTitle>
              <CardDescription>
                Invite a family member to share access to one of your verified properties.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Select Shared Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose one of your verified addresses..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userProperties.map(prop => (
                          <SelectItem key={prop.nftId} value={prop.nftId}>
                            <div className="flex flex-col">
                              <span>{prop.address}</span>
                              <span className="text-xs text-muted-foreground font-mono">
                                (...{prop.nftId.slice(-8)})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="memberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Family Member's Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., John Doe" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="memberEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Family Member's Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., john.doe@example.com" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>4. Relationship</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g., Spouse, Child, Parent" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  'Send Invitation'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {result && (
        <AlertDialog open={!!result} onOpenChange={() => handleDialogClose()}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex justify-center">
                 <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              </div>
              <AlertDialogTitle className="text-center font-headline text-2xl">Access Granted!</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                An access request has been sent to {result.memberName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
                <div className="p-4 rounded-lg bg-secondary text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Their unique access ID for this property is:</p>
                    <p className="font-mono text-sm break-all">{result.subAddressId}</p>
                </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleDialogClose} className="w-full">
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

    </div>
  );
}
