
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
  FormDescription,
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
import { ArrowLeft, Loader2, Mail, Home, User, UploadCloud, CheckCircle, QrCode } from 'lucide-react';
import Image from 'next/image';
import { generateSubAddress } from './utils';

const formSchema = z.object({
  property: z.string().min(1, 'Please select a property.'),
  tenantName: z.string().min(1, 'Tenant name is required.'),
  tenantEmail: z.string().email('Please enter a valid email.'),
  apartmentNumber: z.string().min(1, 'Apartment/unit number is required.'),
  doorPhoto: z.instanceof(File, { message: 'A photo of the tenant\'s door is required.' }).refine(file => file.size > 0, 'Door photo is required.'),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for user's properties
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

interface AddTenantFormProps {
  onBack: () => void;
}

type SubAddressResult = {
  subAddressId: string;
  tenantName: string;
}

export function AddTenantForm({ onBack }: AddTenantFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [result, setResult] = useState<SubAddressResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: '',
      tenantName: '',
      tenantEmail: '',
      apartmentNumber: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('doorPhoto', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    console.log('Submitting tenant registration:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const subAddressId = generateSubAddress(values.property, values.apartmentNumber);

    toast({
      title: "Tenant Invitation Sent",
      description: `${values.tenantName} has been invited to use your address.`,
    });
    
    setResult({ subAddressId, tenantName: values.tenantName });
    setIsLoading(false);
  };
  
  const handleDialogClose = () => {
    setResult(null);
    form.reset();
    setPhotoPreview(null);
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
              <CardTitle className="font-headline text-2xl">Add a New Tenant</CardTitle>
              <CardDescription>
                Invite a tenant to use one of your verified properties. They will receive an access request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Select Property</FormLabel>
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
                  name="tenantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Tenant's Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., Jane Doe" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="tenantEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Tenant's Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., jane.doe@example.com" {...field} className="pl-10" />
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
                  name="apartmentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. House / Apartment Number</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="e.g., Apt 4B" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormDescription>The specific unit for this tenant.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doorPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. Tenant's Door Photo</FormLabel>
                      <FormControl>
                        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors">
                          {photoPreview ? (
                            <Image src={photoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" data-ai-hint="apartment door"/>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center">
                              <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload photo</span>
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleFileChange}
                          />
                        </label>
                      </FormControl>
                       <FormDescription>A photo of the tenant's specific door.</FormDescription>
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
            <AlertDialogHeader>
              <div className="flex justify-center">
                 <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              </div>
              <AlertDialogTitle className="text-center font-headline text-2xl">Sub-Address Created!</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                A new sub-digital address has been generated for {result.tenantName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
                <div className="p-4 rounded-lg bg-secondary text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Tenant's Sub-Digital Address</p>
                    <p className="font-mono text-sm break-all">{result.subAddressId}</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                    <div className="p-2 bg-white rounded-lg shadow-md">
                      <Image src="https://placehold.co/160x160.png" alt="QR Code" width={160} height={160} data-ai-hint="qr code"/>
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

    