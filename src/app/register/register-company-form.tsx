

'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { handleRegistration } from './actions';
import type { ValidateDoorPhotoOutput } from '@/ai/flows/validate-door-photo';
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Camera, LocateFixed, Wallet, AlertTriangle, RefreshCw, Eye, Briefcase, ArrowLeft, Building, Globe, Save, FileText, User } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, type Country } from '@/lib/countries';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import type { AdminUser } from '../admin/user-management/user-dialog';
import type { Address } from '@/lib/addresses';

const formSchema = z.object({
  country: z.string().min(1, 'Please select a country.'),
  state: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required.'),
  registrationNumber: z.string().min(1, 'Business registration number is required.'),
  taxId: z.string().optional(),
  contactPerson: z.string().min(1, 'An authorized contact person is required.'),
  gpsCoordinates: z.string().min(1, 'GPS coordinates are required.'),
  physicalAddress: z.string().min(1, 'Physical address is required.'),
  doorPhoto: z.instanceof(File, { message: 'A photo of the building entrance is required.' }).optional(),
  isHeadquarters: z.boolean().default(false).optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const drawSignatureOnImage = (imageSrc: string, cryptoAddress: string, physicalAddress: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context.'));
      }
      
      ctx.drawImage(img, 0, 0);

      const timestamp = new Date().toISOString();
      
      const maxAddressLength = 40;
      const truncatedAddress = physicalAddress.length > maxAddressLength 
          ? physicalAddress.substring(0, maxAddressLength) + '...'
          : physicalAddress;

      const signatureLine1 = truncatedAddress;
      const signatureLine2 = `${cryptoAddress} | ${timestamp}`;
      
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const textWidth1 = ctx.measureText(signatureLine1).width;
      const textWidth2 = ctx.measureText(signatureLine2).width;
      const maxWidth = Math.max(textWidth1, textWidth2);

      ctx.fillRect(8, canvas.height - 52, maxWidth + 24, 44);
      
      ctx.fillStyle = 'white';
      ctx.fillText(signatureLine1, 20, canvas.height - 32);
      ctx.fillText(signatureLine2, 20, canvas.height - 12);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "signed_door_photo.jpg", { type: "image/jpeg" });
          resolve(file);
        } else {
          reject(new Error('Could not create blob from canvas.'));
        }
      }, 'image/jpeg', 0.95);
    };
    img.onerror = () => {
      reject(new Error('Failed to load image for signing.'));
    }
  });
};

const generateMockAddress = (seed: string): string => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    const randomHex = (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
    const remaining = [...Array(42 - 2 - 3 - 8)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
    return `0xCOM${randomHex}${remaining}`;
};

interface RegisterCompanyFormProps {
  onBack: () => void;
}

type RegistrationResult = ValidateDoorPhotoOutput & { submitted?: boolean };

const USER_STORAGE_KEY = 'addressChainAdminUsers';
const ADDRESS_STORAGE_KEY = 'addressChainUserAddresses';

export function RegisterCompanyForm({ onBack }: RegisterCompanyFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);
  const [isCompanyInfoLoaded, setIsCompanyInfoLoaded] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '', state: '', companyName: '', registrationNumber: '', taxId: '', contactPerson: '',
      gpsCoordinates: '', physicalAddress: '', terms: false, isHeadquarters: false,
    },
  });

  const { watch, setValue, getValues, formState: { isValid }, trigger, reset } = form;
  const watchedValues = watch();

  useEffect(() => {
    // Pre-populate form with logged-in company data
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    if (loggedInUserName) {
        reset({
            companyName: loggedInUserName,
            contactPerson: loggedInUserName, // Default to company name as contact person
        });
        setIsCompanyInfoLoaded(true);
    }
  }, [reset]);

  useEffect(() => {
    if (watchedValues.gpsCoordinates && watchedValues.country) {
        const seed = `${watchedValues.country}:${watchedValues.gpsCoordinates}`;
        const newAddress = generateMockAddress(seed);
        setGeneratedAddress(newAddress);
    } else {
        setGeneratedAddress(null);
    }
  }, [watchedValues.gpsCoordinates, watchedValues.country]);

  const processAndSetImage = useCallback(async (imageSrc: string) => {
    if (!generatedAddress || !watchedValues.physicalAddress) {
      toast({ variant: 'destructive', title: 'Complete Previous Steps', description: 'Please provide company address details and GPS coordinates first.' });
      return null;
    }
    try {
      const signedFile = await drawSignatureOnImage(imageSrc, generatedAddress, watchedValues.physicalAddress);
      const signedImageSrc = URL.createObjectURL(signedFile);
      setValue('doorPhoto', signedFile, { shouldValidate: true });
      setDoorPhotoPreview(signedImageSrc);
    } catch (err) {
      toast({ variant: "destructive", title: "Image Signing Failed" });
    }
  }, [setValue, toast, generatedAddress, watchedValues.physicalAddress]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => processAndSetImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const coords = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
                setValue('gpsCoordinates', coords, { shouldValidate: true });
                setIsLoading(false);
                toast({ title: "Location Fetched", description: "GPS coordinates have been set." });
            },
            () => {
                setIsLoading(false);
                toast({ variant: 'destructive', title: 'Location Error' });
            }
        );
    } else {
        toast({ variant: 'destructive', title: 'Geolocation not supported' });
    }
  };

  const handleSaveAndContinue = async () => {
      const fieldsToValidate: (keyof FormValues)[] = ['companyName', 'registrationNumber', 'contactPerson', 'physicalAddress', 'gpsCoordinates', 'country', 'terms'];
      const isValid = await trigger(fieldsToValidate);

      if (isValid) {
          setIsLoading(true);
          // Simulate saving data
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast({ title: "Company Information Saved", description: "Please upload the building entrance photo to continue."});
          setStep(2);
          setIsLoading(false);
      } else {
           toast({ variant: "destructive", title: "Missing Information", description: "Please fill out all required company details before continuing."});
      }
  }


  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    if (!generatedAddress || !values.doorPhoto) return;

    const formData = new FormData();
    formData.append('cryptoAddress', generatedAddress);
    formData.append('gpsCoordinates', values.gpsCoordinates);
    formData.append('doorPhoto', values.doorPhoto);
    formData.append('countryCode', values.country);
    formData.append('physicalAddress', values.physicalAddress);
    formData.append('idNumber', values.registrationNumber);
    formData.append('addressName', values.companyName);
    formData.append('isCompany', 'true');
    formData.append('isHeadquarters', values.isHeadquarters ? 'true' : 'false');
    try {
      const meRes = await fetch('/api/auth/me');
      if (meRes.ok) {
        const me = await meRes.json();
        if (me?.user?.sub) {
          formData.append('userId', me.user.sub);
        }
      }
    } catch {}

    try {
      const response = await handleRegistration(formData);
      if (response.error && !response.submitted) {
        throw new Error(response.error);
      }
      setResult(response);
      if (response.isValid && response.newAddress) {
        const existingAddressesRaw = localStorage.getItem(ADDRESS_STORAGE_KEY);
        const existingAddresses: Address[] = existingAddressesRaw ? JSON.parse(existingAddressesRaw) : [];
        const newAddresses = [...existingAddresses, response.newAddress];
        localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(newAddresses));

        toast({ title: "Registration Submitted", description: response.validationDetails });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast({ variant: "destructive", title: "Submission Error", description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormReadOnly = result?.submitted === true;

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Options
      </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Register a Company Address</CardTitle>
          <CardDescription>
            {isFormReadOnly ? "This address has been submitted for validation." : "Follow the steps to submit your company address for validation."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isFormReadOnly}>
              <CardContent className="space-y-6">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in-0 duration-500">
                        <FormField control={form.control} name="companyName" render={({ field }) => (
                            <FormItem>
                            <FormLabel>1. Company Name</FormLabel>
                            <FormControl><div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input placeholder="e.g., Acme Corporation" {...field} className="pl-10 capitalize" readOnly={isCompanyInfoLoaded} /></div></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel>2. Business Registration No.</FormLabel><FormControl><Input placeholder="e.g., 1234567-8" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="taxId" render={({ field }) => (<FormItem><FormLabel>3. Tax ID / VAT Number</FormLabel><FormControl><Input placeholder="(Optional)" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        </div>
                        <FormField control={form.control} name="contactPerson" render={({ field }) => (<FormItem><FormLabel>4. Authorized Contact Person</FormLabel><FormControl><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input placeholder="e.g., Jane Doe" {...field} className="pl-10 capitalize" /></div></FormControl><FormMessage /></FormItem>)}/>
                        <FormField control={form.control} name="physicalAddress" render={({ field }) => (<FormItem><FormLabel>5. Company Physical Address</FormLabel><FormControl><div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input placeholder="Street, City, Postal Code" {...field} className="pl-10 capitalize" /></div></FormControl><FormMessage /></FormItem>)}/>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="gpsCoordinates" render={({ field }) => (<FormItem><FormLabel>6. GPS Coordinates</FormLabel><div className="flex gap-2"><FormControl><div className="relative flex-grow"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input placeholder="e.g., 34.0522,-118.2437" {...field} className="pl-10" /></div></FormControl><Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLoading}><LocateFixed className="mr-2 h-4 w-4"/>My Location</Button></div><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>7. Country</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><span className="pl-6"><SelectValue placeholder="Select..." /></span></SelectTrigger></FormControl><SelectContent>{countries.map(country => (<SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)}/>
                        </div>
                        {generatedAddress && (<FormItem><FormLabel>8. Generated Crypto Wallet Address</FormLabel><FormControl><div className="relative flex-grow bg-secondary p-2 rounded-md"><Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><p className="pl-10 font-mono text-sm truncate">{generatedAddress}</p></div></FormControl></FormItem>)}
                         <FormField
                            control={form.control}
                            name="isHeadquarters"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                    Set as company headquarters
                                    </FormLabel>
                                    <FormDescription>
                                    This address will be used for official correspondence and share tokenization.
                                    </FormDescription>
                                </div>
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="terms" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Agree to terms and conditions</FormLabel><FormDescription>By submitting, you confirm you are an authorized representative of this company.</FormDescription><FormMessage /></div></FormItem>)}/>
                    </div>
                )}
                {step === 2 && (
                     <div className="space-y-6 animate-in fade-in-0 duration-500">
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertTitle>Information Saved</AlertTitle>
                          <AlertDescription>
                            Your company details are saved. Now, please provide a clear photo of the main building entrance to finalize your submission.
                          </AlertDescription>
                        </Alert>
                         <FormField
                            control={form.control}
                            name="doorPhoto"
                            render={() => (
                            <FormItem>
                                <FormLabel>9. Building Entrance Photo</FormLabel>
                                <FormControl>
                                    <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${doorPhotoPreview ? 'border-primary' : ''}`}>
                                    {doorPhotoPreview ? (
                                        <Image src={doorPhotoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" data-ai-hint="office building door"/>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                )}
              </CardContent>
              {!isFormReadOnly && (
                <CardFooter className="flex justify-between">
                   <Button type="button" variant="ghost" onClick={() => setStep(1)} disabled={step === 1}>Back</Button>
                  {step === 1 ? (
                    <Button type="button" onClick={handleSaveAndContinue} disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : 'Save and Continue'}</Button>
                  ) : (
                    <Button type="submit" disabled={isLoading || !watchedValues.doorPhoto}>
                        {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>) : ('Submit for Validation')}
                    </Button>
                  )}
                </CardFooter>
              )}
            </fieldset>
          </form>
        </Form>
      </Card>
      
      {result && (
        <Card className={`mt-8 shadow-lg ${result.isValid ? 'border-green-500' : 'border-red-500'}`}>
          <CardHeader className="flex flex-row items-center gap-4">
            {result.isValid ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-red-500" />}
            <div>
              <CardTitle className="font-headline text-xl">{result.submitted ? "Registration Submitted" : "Preliminary Check Failed"}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground p-3 bg-secondary rounded-md mt-2">{result.validationDetails}</p>
             {result.submitted && (<Button asChild className="mt-4"><Link href="/my-addresses">Go to My Addresses</Link></Button>)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
