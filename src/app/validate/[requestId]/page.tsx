
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { handleValidation } from './actions';
import type { CompareValidationPhotosOutput } from '@/ai/flows/compare-validation-photos';
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Camera, LocateFixed, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';
import { Logo } from '@/components/icons';

const formSchema = z.object({
  validatorDoorPhoto: z.instanceof(File, { message: 'A photo of the door is required.' }).refine(file => file.size > 0, 'A photo of the door is required.'),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for the request - in a real app, this would be fetched based on `requestId`
const mockRequest = {
  requestId: 'REQ-12345',
  addressToVerify: '123 Main Street, Anytown, USA 12345',
  originalUserPhoto: 'https://placehold.co/600x400.png',
  gpsCoordinates: '34.0522,-118.2437', // Pre-defined GPS for validation
};

export default function ValidateRequestPage({ params }: { params: { requestId: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CompareValidationPhotosOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const [mapOpened, setMapOpened] = useState(false);
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'loading' | 'allowed' | 'denied' | 'notsupported'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { setValue, trigger, watch } = form;
  const photo = watch('validatorDoorPhoto');

  const requestCamera = async () => {
    if (cameraStatus !== 'idle' && cameraStatus !== 'denied') return;
    let stream: MediaStream | null = null;
    if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setCameraStatus('loading');
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStatus('allowed');
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setCameraStatus('denied');
        }
    } else {
        setCameraStatus('notsupported');
    }
  };

  const setFileInForm = useCallback((file: File) => {
      const previewUrl = URL.createObjectURL(file);
      setDoorPhotoPreview(previewUrl);
      setValue('validatorDoorPhoto', file, { shouldValidate: true });
      trigger('validatorDoorPhoto'); // Manually trigger validation
  }, [setValue, trigger]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInForm(file);
    }
  };

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      canvas.toBlob((blob) => {
        if (blob) {
            const capturedFile = new File([blob], "validator-photo.jpg", { type: "image/jpeg" });
            setFileInForm(capturedFile);
            toast({ title: "Photo Captured", description: "The captured image is now ready for submission."});
        }
      }, 'image/jpeg');
    }
  }, [setFileInForm, toast]);
  
  const handleRetake = () => {
    setDoorPhotoPreview(null);
    setValue('validatorDoorPhoto', new File([], ''), { shouldValidate: true });
  }

  const handleOpenMap = () => {
    const [lat, lng] = mockRequest.gpsCoordinates.split(',');
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
    setMapOpened(true);
    toast({
      title: 'Map Opened',
      description: 'Please confirm the location on the map, then return to this tab.',
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('requestId', params.requestId);
    formData.append('validatorGpsCoordinates', mockRequest.gpsCoordinates);
    formData.append('validatorDoorPhoto', values.validatorDoorPhoto);

    try {
      const response = await handleValidation(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setResult(response);
      toast({
        title: "Validation Submitted",
        description: "Your validation has been recorded.",
      });
    } catch (err) => {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const isFormReadOnly = result?.isMatch === true;
  const canSubmit = mapOpened && photo && photo.size > 0;

  return (
    <div className="flex min-h-screen flex-col items-center bg-background font-body p-4">
        <header className="w-full max-w-4xl mx-auto mb-4">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline font-bold">AddressChain Validator</span>
            </Link>
        </header>
        <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="font-headline text-2xl">Third-Party Validation</CardTitle>
            <CardDescription>
                You have been selected to validate a new address registration. Please confirm the location and capture a photo of the door.
            </CardDescription>
            </CardHeader>
             <CardContent>
                <div className="p-4 rounded-lg bg-secondary space-y-3 text-sm border">
                    <h3 className="font-semibold text-lg">Request Details</h3>
                    <div>
                        <span className="font-semibold text-muted-foreground">Request ID:</span>
                        <p className="font-mono">{params.requestId}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-muted-foreground">Address to Verify:</span>
                        <p>{mockRequest.addressToVerify}</p>
                    </div>
                     <div>
                        <span className="font-semibold text-muted-foreground">Original User's Photo:</span>
                        <Image src={mockRequest.originalUserPhoto} alt="Original user's door photo" width={200} height={150} className="mt-2 rounded-md border" data-ai-hint="front door"/>
                    </div>
                </div>
            </CardContent>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={isFormReadOnly}>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormItem>
                                <FormLabel>1. Verify Location</FormLabel>
                                 <Alert>
                                  <MapPin className="h-4 w-4" />
                                  <AlertTitle>Action Required</AlertTitle>
                                  <AlertDescription>
                                    Click the button below to open Google Maps in a new tab. Confirm you are at the correct location, then return here to complete the next step.
                                  </AlertDescription>
                                </Alert>
                                <Button type="button" onClick={handleOpenMap} className="w-full" disabled={mapOpened}>
                                  {mapOpened ? <CheckCircle className="mr-2 h-4 w-4" /> : <MapPin className="mr-2 h-4 w-4" />}
                                  {mapOpened ? "Map Opened" : "Open Map to Verify Location"}
                                </Button>
                            </FormItem>
                        </div>

                        <FormField
                            control={form.control}
                            name="validatorDoorPhoto"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>2. Capture Door Photo</FormLabel>
                                <Tabs defaultValue="camera" className="w-full" onValueChange={(value) => value === 'camera' && requestCamera()}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="camera" disabled={cameraStatus === 'notsupported'}><Camera className="mr-2"/>Use Camera</TabsTrigger>
                                    <TabsTrigger value="upload"><UploadCloud className="mr-2"/>Upload File</TabsTrigger>
                                </TabsList>
                                <TabsContent value="upload">
                                    <FormControl>
                                        <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${doorPhotoPreview ? 'border-primary' : ''}`}>
                                        {doorPhotoPreview ? (
                                            <Image src={doorPhotoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
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
                                </TabsContent>
                                <TabsContent value="camera">
                                     <div className="space-y-2">
                                        <div className="relative overflow-hidden rounded-md">
                                            <video ref={videoRef} className="w-full aspect-video bg-black" autoPlay muted playsInline />
                                            <canvas ref={canvasRef} className="hidden"></canvas>
                                            {cameraStatus !== 'allowed' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                    {cameraStatus === 'loading' && <Loader2 className="h-8 w-8 animate-spin text-white" />}
                                                    {cameraStatus === 'denied' && <Alert variant="destructive"><AlertTitle>Camera Denied</AlertTitle></Alert>}
                                                </div>
                                            )}
                                        </div>
                                        {doorPhotoPreview ? (
                                             <div className="flex gap-2 items-center">
                                                 <Image src={doorPhotoPreview} alt="Captured preview" width={100} height={75} className="rounded-md border"/>
                                                 <p className="text-sm text-green-600 flex-1">Photo captured. Ready to submit.</p>
                                                 <Button type="button" onClick={handleRetake} variant="outline" size="sm">
                                                    <RefreshCw className="mr-2 h-4 w-4"/> Retake
                                                 </Button>
                                             </div>
                                        ) : (
                                            <Button type="button" onClick={handleCapture} disabled={cameraStatus !== 'allowed'} className="w-full">
                                                <Camera className="mr-2" /> Capture Photo
                                            </Button>
                                        )}
                                    </div>
                                </TabsContent>
                                </Tabs>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                {!isFormReadOnly && (
                    <CardFooter>
                    <Button type="submit" disabled={isLoading || !canSubmit} className="w-full md:w-auto">
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                        ) : (
                        'Submit Validation'
                        )}
                    </Button>
                    </CardFooter>
                )}
                </fieldset>
            </form>
            </Form>
        </Card>
        
        {result && (
            <Card className={`mt-8 shadow-lg ${result.isMatch ? 'border-green-500' : 'border-red-500'}`}>
            <CardHeader className="flex flex-row items-center gap-4">
                {result.isMatch ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-red-500" />}
                <div>
                <CardTitle className="font-headline text-xl">Comparison Result</CardTitle>
                <CardDescription>{result.isMatch ? "The photos appear to match." : "The photos do not appear to match."}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="font-medium">AI Analysis:</p>
                <p className="text-muted-foreground p-3 bg-secondary rounded-md mt-2">{result.reasoning}</p>
            </CardContent>
            </Card>
        )}

        {error && !result &&(
            <Card className="mt-8 shadow-lg border-destructive">
            <CardHeader className="flex flex-row items-center gap-4">
                <XCircle className="h-8 w-8 text-destructive" />
                <div>
                <CardTitle className="font-headline text-xl">Submission Failed</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-destructive p-3 bg-destructive/10 rounded-md">{error}</p>
            </CardContent>
            </Card>
        )}
        </div>
    </div>
  );
}
