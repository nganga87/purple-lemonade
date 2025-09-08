'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Loader2, UploadCloud, Camera } from 'lucide-react';

export default function MobileUploadPage() {
  const params = useParams<{ sid: string }>();
  const sid = params?.sid;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!sid || !file) return;
    setIsSubmitting(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image_data = reader.result as string; // data URL
        const res = await fetch(`/api/uploads/${sid}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_data }),
        });
        if (res.ok) {
          alert('Upload received! You can return to your desktop browser to continue.');
        } else {
          alert('Failed to upload. Please try again.');
        }
        setIsSubmitting(false);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      alert('Unexpected error while uploading.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline">Upload Photo</CardTitle>
          <CardDescription>Use your phone camera to capture and upload the required photo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block">
            <span className="sr-only">Capture or select image</span>
            <Input type="file" accept="image/*" capture="environment" onChange={onFileChange} />
          </label>
          {preview && (
            <div className="relative w-full h-64">
              <Image src={preview} alt="Preview" fill className="object-contain rounded" />
            </div>
          )}
          <Button className="w-full" onClick={handleSubmit} disabled={!file || isSubmitting}>
            {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Uploading...</>) : (<><UploadCloud className="mr-2 h-4 w-4"/>Upload</>)}
          </Button>
          <p className="text-xs text-muted-foreground text-center">Session: {sid}</p>
        </CardContent>
      </Card>
    </div>
  );
}
