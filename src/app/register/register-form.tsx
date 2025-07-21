
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
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Camera, LocateFixed, Wallet, AlertTriangle, RefreshCw, Eye, Home, ArrowLeft, Building, Globe } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, type Country } from '@/lib/countries';

const formSchema = z.object({
  country: z.string().min(1, 'Please select a country.'),
  state: z.string().optional(),
  addressName: z.string().min(1, 'An address name is required (e.g., Home, Office).'),
  gpsCoordinates: z.string().min(1, 'GPS coordinates are required.'),
  physicalAddress: z.string().min(1, 'Physical address is required.'),
  doorPhoto: z.instanceof(File, { message: 'Door photo is required.' }).refine(file => file.size > 0, 'Door photo is required.'),
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

// Mock function to generate a crypto address from a seed
const generateMockAddress = (seed: string): string => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    const randomHex = (hash & 0xFFFFFF).toString(16).toUpperCase();
    return `0x${randomHex}${'A'.repeat(40 - 6 - randomHex.length)}${randomHex}`.slice(0, 42);
};

interface RegisterFormProps {
  onBack: () => void;
}


export function RegisterForm({ onBack }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidateDoorPhotoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const doorPhotoRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStatus, setCameraStatus] = useState<'loading' | 'allowed' | 'denied' | 'notsupported'>('loading');
  const [isCapturing, setIsCapturing] = useState(false);
  
  const [capturedImage, setCapturedImage] = useState<{ src: string, file: File } | null>(null);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      state: '',
      addressName: '',
      gpsCoordinates: '',
      physicalAddress: '',
    },
  });

  const { watch, setValue } = form;
  const countryCode = watch('country');
  const gpsCoordinates = watch('gpsCoordinates');
  const physicalAddress = watch('physicalAddress');
  const doorPhoto = watch('doorPhoto');
  const addressName = watch('addressName');

  useEffect(() => {
    if (countryCode) {
      const country = countries.find(c => c.code === countryCode) || null;
      setSelectedCountry(country);
      setValue('state', ''); // Reset state selection when country changes
    } else {
      setSelectedCountry(null);
    }
  }, [countryCode, setValue]);

  useEffect(() => {
    if (gpsCoordinates && countryCode) {
        const seed = `${countryCode}:${gpsCoordinates}`;
        const newAddress = generateMockAddress(seed);
        setGeneratedAddress(newAddress);
    } else {
        setGeneratedAddress(null);
    }
  }, [gpsCoordinates, countryCode]);

 useEffect(() => {
    let stream: MediaStream | null = null;
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({video: true});
          setCameraStatus('allowed');
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setCameraStatus('denied');
        }
      } else {
        console.error('Camera not supported by this browser.');
        setCameraStatus('notsupported');
      }
    };

    getCameraPermission();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, []);

  const processAndSetImage = useCallback(async (imageSrc: string, source: 'upload' | 'camera') => {
    if (!generatedAddress) {
      toast({
        variant: 'destructive',
        title: 'Complete Previous Steps',
        description: 'You must provide country and GPS coordinates before adding a photo.',
      });
      return null;
    }

    if (!physicalAddress) {
        toast({
            variant: 'destructive',
            title: 'Physical Address Required',
            description: 'You must provide a physical address before adding a photo.',
        });
        return null;
    }

    try {
      const signedFile = await drawSignatureOnImage(imageSrc, generatedAddress, physicalAddress);
      const signedImageSrc = URL.createObjectURL(signedFile);
      
      if (source === 'upload') {
        setValue('doorPhoto', signedFile, { shouldValidate: true });
        setDoorPhotoPreview(signedImageSrc);
      }
      
      return { src: signedImageSrc, file: signedFile };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Image Signing Failed",
        description: errorMessage,
      });
      return null;
    }
  }, [setValue, toast, generatedAddress, physicalAddress]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await processAndSetImage(reader.result as string, 'upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await processAndSetImage(reader.result as string, 'upload');
      };
      reader.readAsDataURL(file);
    }
  }, [processAndSetImage]);
  
  const handleCapture = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      const signedImage = await processAndSetImage(imageDataUrl, 'camera');
      if (signedImage) {
        setCapturedImage(signedImage);
      }
      
      setIsCapturing(false);
    }
  }, [processAndSetImage]);

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirmCapture = () => {
    if (capturedImage) {
      setValue('doorPhoto', capturedImage.file, { shouldValidate: true });
      setDoorPhotoPreview(capturedImage.src);
      toast({
        title: "Photo Confirmed",
        description: "Your door photo has been set and is ready for submission.",
      });
      setCapturedImage(null); // Clear the captured image to hide the confirm/retake buttons
    }
  };


  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    if (!generatedAddress) {
      setError("Could not generate a wallet address. Please check your GPS coordinates.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('cryptoAddress', generatedAddress);
    formData.append('gpsCoordinates', values.gpsCoordinates);
    formData.append('doorPhoto', values.doorPhoto);
    formData.append('countryCode', values.country);
    formData.append('physicalAddress', values.physicalAddress);
    
    try {
      const response = await handleRegistration(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setResult(response);
      toast({
        title: "Validation Complete",
        description: "AI validation has finished successfully.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
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
                toast({
                    title: "Location Fetched",
                    description: "Your GPS coordinates have been set.",
                });
            },
            (error) => {
                console.error("Error getting location", error);
                setIsLoading(false);
                toast({
                    variant: 'destructive',
                    title: 'Location Error',
                    description: 'Could not retrieve your location. Please enter it manually.',
                });
            }
        );
    } else {
        toast({
            variant: 'destructive',
            title: 'Geolocation not supported',
            description: 'Your browser does not support geolocation.',
        });
    }
  };

  const isDataReadyForReview = gpsCoordinates && generatedAddress && physicalAddress && doorPhoto && addressName && countryCode;
  const isFormReadOnly = result?.isValid === true;

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Options
      </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI-Powered Address Verification</CardTitle>
          <CardDescription>
            {isFormReadOnly ? "Your address has been successfully validated and registered." : "Follow the steps to submit your address and location for validation."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isFormReadOnly}>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                     <FormField
                      control={form.control}
                      name="addressName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>1. Address Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="e.g., Home, Office, Warehouse" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            A friendly name for this address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>2. Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                   <SelectTrigger>
                                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                      <span className="pl-6">
                                        <SelectValue placeholder="Select..." />
                                      </span>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countries.map(country => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.name} ({country.phoneCode})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                             <FormItem>
                              <FormLabel>3. State/Province</FormLabel>
                              {selectedCountry && selectedCountry.states ? (
                                <Select onValueChange={field.onChange} value={field.value || ''} disabled={!selectedCountry?.states}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {selectedCountry.states.map(state => (
                                      <SelectItem key={state.code} value={state.code}>
                                        {state.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <FormControl>
                                  <Input placeholder="Enter state/province..." {...field} disabled={!selectedCountry} />
                                </FormControl>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="physicalAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>4. Physical Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Street, City, Postal Code" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormDescription>
                              This will be included in the digital signature on your photo.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gpsCoordinates"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>5. GPS Coordinates</FormLabel>
                            <div className="flex gap-2">
                                <FormControl>
                                  <div className="relative flex-grow">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="e.g., 34.0522,-118.2437" {...field} className="pl-10" />
                                  </div>
                                </FormControl>
                                <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLoading}>
                                    <LocateFixed className="mr-2 h-4 w-4"/>
                                    My Location
                                </Button>
                            </div>
                            <FormDescription>
                              Provide latitude and longitude to generate a crypto wallet address.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       {generatedAddress && (
                          <FormItem>
                            <FormLabel>6. Generated Crypto Wallet Address</FormLabel>
                             <FormControl>
                              <div className="relative flex-grow bg-secondary p-2 rounded-md">
                                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <p className="pl-10 font-mono text-sm truncate">{generatedAddress}</p>
                              </div>
                            </FormControl>
                            <FormDescription>
                              This "country-stamped" address is generated from your GPS & country.
                            </FormDescription>
                          </FormItem>
                      )}
                  </div>
                  <FormField
                    control={form.control}
                    name="doorPhoto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>7. Door Photo</FormLabel>
                        <Tabs defaultValue="camera" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="camera" disabled={cameraStatus === 'denied' || cameraStatus === 'notsupported'}><Camera className="mr-2"/>Use Camera</TabsTrigger>
                            <TabsTrigger value="upload"><UploadCloud className="mr-2"/>Upload File</TabsTrigger>
                          </TabsList>
                          <TabsContent value="upload">
                            <div className="space-y-4">
                              <Alert variant="default" className="border-yellow-500/50 text-yellow-700 dark:border-yellow-500/50 dark:text-yellow-400 [&>svg]:text-yellow-500">
                                 <AlertTriangle className="h-4 w-4" />
                                 <AlertTitle>Location Mismatch Warning</AlertTitle>
                                 <AlertDescription>
                                   If your photo contains location data (EXIF) that does not match the GPS coordinates provided, validation may fail. For best results, use the "Use Camera" option to take a fresh photo.
                                 </AlertDescription>
                               </Alert>
                              <FormControl>
                                <label
                                  onDragOver={onDragOver}
                                  onDrop={onDrop}
                                  className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${doorPhotoPreview ? 'border-primary' : ''}`}
                                >
                                  {doorPhotoPreview ? (
                                    <Image src={doorPhotoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" data-ai-hint="house door"/>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                      <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                      <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                      </p>
                                      <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
                                    </div>
                                  )}
                                  <input
                                    ref={doorPhotoRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </FormControl>
                            </div>
                          </TabsContent>
                          <TabsContent value="camera">
                            <div className="relative overflow-hidden rounded-md">
                              {capturedImage ? (
                                <Image src={capturedImage.src} alt="Captured preview" width={1920} height={1080} className="w-full aspect-video" data-ai-hint="house door"/>
                              ) : (
                                <video ref={videoRef} className="w-full aspect-video bg-black" autoPlay muted playsInline />
                              )}
                              <canvas ref={canvasRef} className="hidden"></canvas>
                              {!capturedImage && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[calc(100%-4rem)] h-[calc(100%-4rem)] border-4 border-white/50 border-dashed rounded-lg shadow-2xl" />
                                </div>
                              )}
                              {cameraStatus !== 'allowed' && !capturedImage && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                                   {cameraStatus === 'loading' && <Loader2 className="h-8 w-8 animate-spin text-white" />}
                                   {cameraStatus === 'denied' && (
                                     <Alert variant="destructive" className="w-auto">
                                        <AlertTitle>Camera Access Denied</AlertTitle>
                                        <AlertDescription>
                                          Please enable camera permissions to use this feature.
                                        </AlertDescription>
                                    </Alert>
                                   )}
                                   {cameraStatus === 'notsupported' && (
                                     <Alert variant="destructive" className="w-auto">
                                        <AlertTitle>Camera Not Supported</AlertTitle>
                                        <AlertDescription>
                                          Your browser does not support camera access.
                                        </AlertDescription>
                                    </Alert>
                                   )}
                                </div>
                              )}
                            </div>
                            {capturedImage ? (
                               <div className="flex gap-2 w-full mt-2">
                                <Button type="button" onClick={handleRetake} variant="outline" className="w-full">
                                  <RefreshCw className="mr-2" />
                                  Retake Photo
                                </Button>
                                <Button type="button" onClick={handleConfirmCapture} className="w-full">
                                  <CheckCircle className="mr-2" />
                                  Confirm & Proceed
                                </Button>
                              </div>
                            ) : (
                              <Button type="button" onClick={handleCapture} disabled={cameraStatus !== 'allowed' || isCapturing} className="w-full mt-2">
                                {isCapturing ? <Loader2 className="animate-spin mr-2" /> : <Camera className="mr-2" />}
                                {isCapturing ? 'Processing...' : 'Capture & Sign Photo'}
                              </Button>
                            )}
                          </TabsContent>
                        </Tabs>
                        <FormDescription>
                          A clear photo of the main entrance, signed with your address details.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isDataReadyForReview && !isFormReadOnly && (
                  <div className="border-t pt-6 space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2"><Eye className="h-5 w-5"/> Review Your Data</h3>
                      <div className="p-4 rounded-lg bg-secondary space-y-3 text-sm">
                          <div>
                              <span className="font-semibold text-muted-foreground">Address Name:</span>
                              <p>{addressName}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-muted-foreground">GPS Coordinates:</span>
                              <p className="font-mono">{gpsCoordinates}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-muted-foreground">Physical Address:</span>
                              <p>{physicalAddress}</p>
                          </div>
                          <div>
                              <span className="font-semibold text-muted-foreground">Crypto Wallet Address:</span>
                              <p className="font-mono truncate">{generatedAddress}</p>
                          </div>
                           <div>
                              <span className="font-semibold text-muted-foreground">Signed Door Photo:</span>
                              {doorPhotoPreview && <Image src={doorPhotoPreview} alt="Door photo preview" width={150} height={150} className="mt-2 rounded-md border" data-ai-hint="house door"/>}
                          </div>
                      </div>
                  </div>
                )}
              </CardContent>
              {!isFormReadOnly && (
                <CardFooter>
                  <Button type="submit" disabled={isLoading || !isDataReadyForReview} className="w-full md:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      'Validate & Register Address'
                    )}
                  </Button>
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
              <CardTitle className="font-headline text-xl">Validation Result</CardTitle>
              <CardDescription>{result.isValid ? "This address has been successfully validated." : "This address could not be validated."}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Validation Details:</p>
            <p className="text-muted-foreground p-3 bg-secondary rounded-md mt-2">{result.validationDetails}</p>
          </CardContent>
        </Card>
      )}

      {error && !result &&(
         <Card className="mt-8 shadow-lg border-destructive">
          <CardHeader className="flex flex-row items-center gap-4">
            <XCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="font-headline text-xl">Validation Failed</CardTitle>
              <CardDescription>An error occurred during the validation process.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-destructive p-3 bg-destructive/10 rounded-md">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
