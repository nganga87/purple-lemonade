'use client';

import React, { useState, useRef, useCallback } from 'react';
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
import { Loader2, UploadCloud, CheckCircle, XCircle, MapPin, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  gpsCoordinates: z.string().min(1, 'GPS coordinates are required.'),
  doorPhoto: z.instanceof(File, { message: 'Door photo is required.' }).refine(file => file.size > 0, 'Door photo is required.'),
  satelliteImage: z.instanceof(File, { message: 'Satellite image is required.' }).refine(file => file.size > 0, 'Satellite image is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidateDoorPhotoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doorPhotoPreview, setDoorPhotoPreview] = useState<string | null>(null);
  const [satelliteImagePreview, setSatelliteImagePreview] = useState<string | null>(null);
  const doorPhotoRef = useRef<HTMLInputElement>(null);
  const satelliteImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gpsCoordinates: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'doorPhoto' | 'satelliteImage', setPreview: (url: string | null) => void) => {
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

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>, fieldName: 'doorPhoto' | 'satelliteImage', setPreview: (url: string | null) => void) => {
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

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('gpsCoordinates', values.gpsCoordinates);
    formData.append('doorPhoto', values.doorPhoto);
    formData.append('satelliteImage', values.satelliteImage);

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
  
  const FileUploadArea = ({ field, previewUrl, onFileRef, fieldName, setPreview, label }: { field: any, previewUrl: string | null, onFileRef: React.RefObject<HTMLInputElement>, fieldName: "doorPhoto" | "satelliteImage", setPreview: (url: string | null) => void, label: string }) => (
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
            Submit property photos for validation against satellite imagery. This ensures the authenticity of new address registrations.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="doorPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FileUploadArea field={field} previewUrl={doorPhotoPreview} onFileRef={doorPhotoRef} fieldName="doorPhoto" setPreview={setDoorPhotoPreview} label="Door Photo" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="satelliteImage"
                  render={({ field }) => (
                    <FormItem>
                      <FileUploadArea field={field} previewUrl={satelliteImagePreview} onFileRef={satelliteImageRef} fieldName="satelliteImage" setPreview={setSatelliteImagePreview} label="Satellite Image" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gpsCoordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPS Coordinates</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g., 34.0522,-118.2437" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Provide the latitude and longitude for the property.
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
