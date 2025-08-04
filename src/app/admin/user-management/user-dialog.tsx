'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Mail, User, Briefcase, Phone, KeyRound, Copy, Globe, Fingerprint, Lock } from 'lucide-react';
import { roles } from './roles';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { countries } from '@/lib/countries';
import { verifyNftId } from '@/lib/verify-nft';
import { portals } from './portals';
import { Checkbox } from '@/components/ui/checkbox';

const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  role: z.string().min(1, 'Please select a role.'),
  password: z.string().optional(),
  status: z.enum(['Active', 'Inactive', 'Pending Approval', 'Suspended']).default('Pending Approval'),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  additionalPhone: z.string().optional(),
  homeAddress: z.string().startsWith('0x', { message: 'Must be a valid Digital Address NFT ID.' }).optional().or(z.literal('')),
  workAddress: z.string().startsWith('0x', { message: 'Must be a valid Digital Address NFT ID.' }).optional().or(z.literal('')),
  workCountry: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  biometricHash: z.string().optional(),
  securityQuestions: z.array(z.string()).optional(),
  securityAnswers: z.array(z.string()).optional(),
});

export type AdminUser = z.infer<typeof userSchema>;

interface UserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (user: AdminUser) => void;
  user: AdminUser | null;
}

const defaultValues: Omit<AdminUser, 'id'> = {
  name: '',
  email: '',
  phone: '',
  role: 'support-agent',
  status: 'Pending Approval' as const,
  jobTitle: '',
  bio: '',
  additionalPhone: '',
  homeAddress: '',
  workAddress: '',
  workCountry: '',
  gender: '',
  dateOfBirth: '',
  permissions: [],
  biometricHash: '',
  password: '',
  securityQuestions: [],
  securityAnswers: [],
};

export function UserDialog({ isOpen, setIsOpen, user, onSave }: UserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AdminUser>({
    resolver: zodResolver(userSchema),
    defaultValues: user || defaultValues,
  });

  useEffect(() => {
    form.reset(user || defaultValues);
  }, [user, form, isOpen]);


  const onSubmit = async (data: AdminUser) => {
    setIsLoading(true);
    
    try {
      if (data.homeAddress) {
        const verificationResult = await verifyNftId(data.homeAddress);
        if (!verificationResult.success) {
          toast({ variant: "destructive", title: "Home Address Verification Failed", description: verificationResult.message });
          setIsLoading(false);
          return;
        }
      }

      if (data.workAddress) {
        const verificationResult = await verifyNftId(data.workAddress);
        if (!verificationResult.success) {
          toast({ variant: "destructive", title: "Work Address Verification Failed", description: verificationResult.message });
          setIsLoading(false);
          return;
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(data);
      setIsOpen(false);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "An unexpected error occurred during verification.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePaste = async (fieldName: 'homeAddress' | 'workAddress') => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue(fieldName, text, { shouldValidate: true });
      toast({
        title: 'Pasted from clipboard!',
        description: `The address has been pasted into the ${fieldName === 'homeAddress' ? 'Home' : 'Work'} Address field.`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Paste Failed',
        description: 'Could not read from clipboard. Please check browser permissions.',
      });
    }
  };
  
  const handleGenerateBiometricHash = () => {
    // In a real app, this would involve a complex process with a biometric scanner.
    // For this prototype, we simulate it by generating a random hash.
    const hash = `bio_${[...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    form.setValue('biometricHash', hash, { shouldValidate: true });
    toast({
      title: "Biometric Hash Generated",
      description: "A simulated biometric hash has been created for this user.",
    });
  };

  const isEditingSelfAsSuperAdmin = user?.role === 'super-admin' && user?.email === 'nicholas@digitaladdress.com';


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {user ? 'Update the details for this user.' : 'Fill in the details to add a new team member.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="biometric">Biometric</TabsTrigger>
              </TabsList>
              <div className="py-4 max-h-[50vh] overflow-y-auto px-1">
                <TabsContent value="account" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Enter user's full name..." {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input type="email" placeholder="user@digitaladdress.com" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                   </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Set Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="password" placeholder="Leave blank to keep unchanged" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                         <FormDescription>Set a new password for the user, or leave it blank.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditingSelfAsSuperAdmin}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.id} disabled={role.id === 'super-admin' && user?.role !== 'super-admin'}>
                                <div className="flex flex-col">
                                  <span>{role.name}</span>
                                  <span className="text-xs text-muted-foreground">{role.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isEditingSelfAsSuperAdmin && <FormDescription>Super Admin role cannot be changed.</FormDescription>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Active">
                                        <div className="flex flex-col">
                                            <span>Active</span>
                                            <span className="text-xs text-muted-foreground">User can log in and access features based on role.</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Pending Approval">
                                         <div className="flex flex-col">
                                            <span>Pending Approval</span>
                                            <span className="text-xs text-muted-foreground">Account created, awaiting admin approval.</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Suspended">
                                        <div className="flex flex-col">
                                            <span>Suspended</span>
                                            <span className="text-xs text-muted-foreground">User is temporarily blocked from logging in.</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="Inactive">
                                         <div className="flex flex-col">
                                            <span>Inactive</span>
                                            <span className="text-xs text-muted-foreground">User is deactivated and cannot log in.</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </TabsContent>
                <TabsContent value="profile" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="e.g., Compliance Manager" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                           <FormControl>
                            <Input type="date" {...field} />
                           </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   </div>
                  <FormField
                    control={form.control}
                    name="additionalPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="tel" placeholder="Spouse or family member..." {...field} className="pl-10" />
                          </div>
                        </FormControl>
                         <FormDescription>An optional secondary contact number.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio / Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A short description or any relevant notes about the user." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                 <TabsContent value="location" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="workCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Location Country</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                               <div className="flex items-center gap-2">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <span className="pl-6">
                                  <SelectValue placeholder="Select a country..." />
                                </span>
                               </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="homeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Digital Address NFT ID</FormLabel>
                        <div className="flex gap-2">
                            <FormControl>
                            <div className="relative flex-grow">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="0x..." {...field} className="pl-10 font-mono" />
                            </div>
                            </FormControl>
                            <Button type="button" variant="outline" size="icon" onClick={() => handlePaste('homeAddress')}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Paste</span>
                            </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="workAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Digital Address NFT ID</FormLabel>
                         <div className="flex gap-2">
                            <FormControl>
                              <div className="relative flex-grow">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="0x..." {...field} className="pl-10 font-mono" />
                              </div>
                            </FormControl>
                             <Button type="button" variant="outline" size="icon" onClick={() => handlePaste('workAddress')}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Paste</span>
                            </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                 <TabsContent value="permissions">
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Portal Access</FormLabel>
                          <FormDescription>
                            Select which admin portals this user can access.
                          </FormDescription>
                        </div>
                        <div className="space-y-4">
                          {portals.map((portal) => (
                            <FormField
                              key={portal.id}
                              control={form.control}
                              name="permissions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={portal.id}
                                    className="flex flex-row items-center justify-between rounded-lg border p-4"
                                  >
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-sm font-medium">
                                        {portal.name}
                                      </FormLabel>
                                      <FormDescription>
                                        {portal.description}
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(portal.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), portal.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== portal.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                 <TabsContent value="biometric">
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                             <Fingerprint className="h-8 w-8 text-muted-foreground mt-1" />
                             <div>
                                <FormLabel className="text-base">Biometric Handshake</FormLabel>
                                <FormDescription>
                                Link a unique biometric signature to this user's account for enhanced security.
                                </FormDescription>
                             </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="biometricHash"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Biometric Hash</FormLabel>
                                <FormControl>
                                    <Input placeholder="No biometric data linked..." {...field} readOnly className="font-mono bg-secondary"/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="outline" onClick={handleGenerateBiometricHash}>
                            Simulate Biometric Scan
                        </Button>
                    </div>
                </TabsContent>
              </div>
            </Tabs>
            <DialogFooter className="pt-4 border-t mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLoading ? 'Verifying...' : user ? 'Save Changes' : 'Add User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
