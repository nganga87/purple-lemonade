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
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Camera, Image as ImageIcon, LocateFixed } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  gpsCoordinates: z.string().min(1, 'GPS coordinates are required.'),
  doorPhoto: z.instanceof(File, { message: 'Door photo is required.' }).refine(file => file.size > 0, 'Door photo is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidateDoorPhotoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const doorPhotoRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gpsCoordinates: '',
    },
  });

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setHasCameraPermission(false);
          return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'doorPhoto' , setPreview: (url: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(fieldName, file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>, fieldName: 'doorPhoto', setPreview: (url: string | null) => void) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      form.setValue(fieldName, file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [form]);
  
  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "door_photo.jpg", { type: "image/jpeg" });
          form.setValue('doorPhoto', file, { shouldValidate: true });
          setDoorPhotoPreview(URL.createObjectURL(file));
          toast({
            title: "Photo Captured",
            description: "Your door photo has been captured successfully.",
          });
          setIsCapturing(false);
        }
      }, 'image/jpeg');
    }
  }, [form, toast]);


  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('gpsCoordinates', values.gpsCoordinates);
    formData.append('doorPhoto', values.doorPhoto);
    
    // The satellite image will be fetched in the server action
    
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
                form.setValue('gpsCoordinates', coords, { shouldValidate: true });
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


  const FileUploadArea = ({ field, previewUrl, onFileRef, fieldName, setPreview, label }: { field: any, previewUrl: string | null, onFileRef: React.RefObject<HTMLInputElement>, fieldName: "doorPhoto", setPreview: (url: string | null) => void, label: string }) => (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <label
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, fieldName, setPreview)}
          className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${field.value ? 'border-primary' : ''}`}
        >
          {previewUrl ? (
            <Image src={previewUrl} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
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
            {...form.register(fieldName)}
            ref={onFileRef}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => handleFileChange(e, fieldName, setPreview)}
          />
        </label>
      </FormControl>
      <FormMessage />
    </div>
  );


  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI-Powered Address Verification</CardTitle>
          <CardDescription>
            Submit your door photo and location for validation. This ensures the authenticity of new address registrations.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              
              <FormField
                control={form.control}
                name="doorPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Door Photo</FormLabel>
                    <Tabs defaultValue="upload">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload"><UploadCloud className="mr-2"/>Upload File</TabsTrigger>
                        <TabsTrigger value="camera" disabled={hasCameraPermission === false}><Camera className="mr-2"/>Use Camera</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upload">
                        <FormControl>
                          <label
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, 'doorPhoto', setDoorPhotoPreview)}
                            className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors ${doorPhotoPreview ? 'border-primary' : ''}`}
                          >
                            {doorPhotoPreview ? (
                              <Image src={doorPhotoPreview} alt="Preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
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
                              {...form.register("doorPhoto")}
                              ref={doorPhotoRef}
                              type="file"
                              className="hidden"
                              accept="image/png, image/jpeg, image/webp"
                              onChange={(e) => handleFileChange(e, 'doorPhoto', setDoorPhotoPreview)}
                            />
                          </label>
                        </FormControl>
                      </TabsContent>
                      <TabsContent value="camera">
                        <div className="relative">
                          <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted playsInline />
                          <canvas ref={canvasRef} className="hidden"></canvas>
                          { hasCameraPermission === false && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                               <Alert variant="destructive" className="w-auto">
                                  <AlertTitle>Camera Access Denied</AlertTitle>
                                  <AlertDescription>
                                    Please enable camera permissions.
                                  </AlertDescription>
                              </Alert>
                            </div>
                          )}
                        </div>
                        <Button type="button" onClick={handleCapture} disabled={hasCameraPermission !== true || isCapturing} className="w-full mt-2">
                          {isCapturing ? <Loader2 className="animate-spin mr-2" /> : <Camera className="mr-2" />}
                          {isCapturing ? 'Capturing...' : 'Capture Photo'}
                        </Button>
                      </TabsContent>
                    </Tabs>
                    <FormDescription>
                      Provide a clear photo of the main entrance or front door that is publicly visible.
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
                    <FormLabel>GPS Coordinates</FormLabel>
                    <div className="flex gap-2">
                        <FormControl>
                          <div className="relative flex-grow">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="e.g., 34.0522,-118.2437" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLoading}>
                            <LocateFixed className="mr-2 h-4 w-4"/>
                            Use My Location
                        </Button>
                    </div>
                    <FormDescription>
                      Provide the latitude and longitude for the property, or use your current location.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  'Validate Address'
                )}
              </Button>
            </CardFooter>
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
