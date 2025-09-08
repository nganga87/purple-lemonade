'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Phone, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function QrUpload({ onImageUploaded }: { onImageUploaded: (imageData: string) => Promise<unknown> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sid, setSid] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const pollTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  // Generate a unique session ID when the dialog opens
  useEffect(() => {
    if (isOpen && !sid) {
      setSid(`upload_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
    } else if (!isOpen) {
      // Cleanup on close
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
      }
      setSid('');
      setIsPolling(false);
    }
  }, [isOpen]);

  // Poll for the uploaded image
  useEffect(() => {
    if (!isOpen || !sid || !isPolling) return;

    const checkForUpload = async () => {
      try {
        const res = await fetch(`/api/uploads/${sid}`);
        if (!res.ok) throw new Error('Failed to check upload status');
        
        const data = await res.json();
        if (data.found && data.image_data) {
          // Process the uploaded image
          await onImageUploaded(data.image_data);
          
          // Clean up
          await fetch(`/api/uploads/${sid}`, { method: 'DELETE' });
          setIsOpen(false);
          toast({
            title: 'Photo received',
            description: 'The photo has been added to your registration.',
          });
        } else {
          // Keep polling
          pollTimeoutRef.current = setTimeout(checkForUpload, 2000);
        }
      } catch (err) {
        console.error('Error checking upload:', err);
        pollTimeoutRef.current = setTimeout(checkForUpload, 2000);
      }
    };

    pollTimeoutRef.current = setTimeout(checkForUpload, 2000);
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, [isOpen, sid, isPolling, onImageUploaded, toast]);

  const uploadUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}/upload/${sid}`
    : '';

  return (
    <>
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => {
          setIsOpen(true);
          setIsPolling(true);
        }}
        className="w-full mt-2"
      >
        <Phone className="mr-2 h-4 w-4" />
        Use phone camera (QR)
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload with Phone Camera</DialogTitle>
            <DialogDescription>
              Scan this QR code with your phone to take and upload a photo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-4">
            {!sid ? (
              <div className="flex items-center justify-center h-64 w-64 bg-gray-100 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="relative">
                <div className="p-4 bg-white rounded-lg border">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uploadUrl)}`}
                    alt="QR Code"
                    className="w-64 h-64"
                  />
                </div>
                <div className="mt-2 text-center text-sm text-muted-foreground">
                  Scan this QR code with your phone camera
                </div>
                
                {isPolling && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Waiting for upload...
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsOpen(false);
                if (sid) {
                  fetch(`/api/uploads/${sid}`, { method: 'DELETE' }).catch(console.error);
                }
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
