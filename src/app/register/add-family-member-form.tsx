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
import { ArrowLeft, Loader2, Mail, Home, User, CheckCircle, QrCode, Fingerprint, Copy, X } from 'lucide-react';
import Image from 'next/image';
import { generateSubAddress } from './utils';
import { addresses as userProperties } from '@/lib/addresses';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';

const formSchema = z.object({
  property: z.string().min(1, 'Please select a property.'),
  memberName: z.string().min(1, 'Family member name is required.'),
  memberEmail: z.string().email('Please enter a valid email.'),
  relationship: z.string().min(1, 'Relationship is required.'),
  idNumber: z.string().min(1, 'ID/Passport number is required.'),
});

type FormValues = z.infer<typeof formSchema>;

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
      idNumber: '',
    },
  });
  
  const getQrCodeUrl = (data: string, size: number) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }

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
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: `ID Copied!`,
        description: `The access ID has been copied to your clipboard.`,
      });
    });
  };

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
                        {userProperties.filter(p => p.status === 'Verified').map(prop => (
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
              <div className="grid md:grid-cols-2 gap-6">
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
                 <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. ID / Passport Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Enter government-issued ID number" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
            <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-1 h-auto">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </AlertDialogCancel>
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
                    <Button variant="outline" size="sm" onClick={() => handleCopy(result.subAddressId)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy ID
                    </Button>
                </div>
                 <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                    <div className="p-2 bg-white rounded-lg shadow-md">
                      <Image src={getQrCodeUrl(result.subAddressId, 160)} alt="QR Code" width={160} height={160} data-ai-hint="qr code"/>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Scan QR code for verification</p>
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