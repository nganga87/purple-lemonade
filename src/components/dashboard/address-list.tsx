'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Copy, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Address = {
  id: string;
  name: string;
  address: string;
  gps: string;
  status: string;
  type: string;
  isPrimary: boolean;
  isHeadquarters: boolean;
  personalId?: string;
  createdAt: string;
};

export function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/api/addresses');
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your addresses. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [toast]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Address copied to clipboard',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>My Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No addresses found</h3>
            <p className="text-muted-foreground mt-2">
              You haven't added any addresses yet.
            </p>
            <Button className="mt-4" asChild>
              <a href="/dashboard/addresses/new">Add Your First Address</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Addresses</CardTitle>
        </div>
        <Button asChild>
          <a href="/dashboard/addresses/new">Add Address</a>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className={`border rounded-lg p-4 ${address.isPrimary ? 'border-primary' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {address.name}
                    {address.isPrimary && (
                      <Badge variant="secondary">Primary</Badge>
                    )}
                    <Badge 
                      variant={address.status === 'verified' ? 'default' : 'outline'}
                      className="ml-1"
                    >
                      {address.status}
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{address.type}</p>
                </div>
              </div>
              
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{address.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4"></span>
                  <span className="text-muted-foreground">
                    {address.gps}
                  </span>
                </div>
              </div>

              {address.personalId && (
                <div className="mt-2 text-sm">
                  <p className="text-muted-foreground">
                    ID: {address.personalId}
                  </p>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Added {new Date(address.createdAt).toLocaleDateString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(address.address)}
                  className="h-8"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
