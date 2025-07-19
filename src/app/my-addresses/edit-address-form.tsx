'use client';

import React, { useState } from 'react';
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
import { DialogFooter } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Address } from './page';
import { updateAddress } from './update-address';

const formSchema = z.object({
  name: z.string().min(1, 'Address name is required.'),
  address: z.string().min(1, 'Address is required.'),
});

type FormValues = z.infer<typeof formSchema>;

interface EditAddressFormProps {
  address: Address;
  onFormSubmit: (updatedAddress: Address) => void;
}

export function EditAddressForm({ address, onFormSubmit }: EditAddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: address.name,
      address: address.address,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('nftId', address.nftId);
    formData.append('name', values.name);
    formData.append('address', values.address);

    try {
      const result = await updateAddress(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: "Address Updated",
        description: "Your address details have been saved.",
      });
      onFormSubmit({ ...address, ...values });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Home, Work" {...field} />
              </FormControl>
              <FormDescription>A friendly name for this address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, Anytown, USA 12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
