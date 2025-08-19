
'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Loader2, CheckCircle, PackageCheck, Wand2, MapPin, AlertTriangle, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CompanyLayout from '../layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { addresses, type Address } from '@/lib/addresses';
import { initialUsers, type AdminUser } from '@/app/admin/user-management/users';
import { Skeleton } from '@/components/ui/skeleton';

type ShareClass = {
  id: string;
  name: string;
  shares: string;
  isMinted: boolean;
  selectedClass: string;
};

const predefinedShareClasses = [
    "Common Stock",
    "Preferred Stock",
    "Founders Shares",
    "Series A",
    "Series B",
    "Employee Stock Option Pool",
];

const USER_STORAGE_KEY = 'addressChainAdminUsers';

export default function TokenizeSharesPage() {
  const [shareClasses, setShareClasses] = useState<ShareClass[]>([
    { id: `sc_${Date.now()}`, name: 'Founders Shares', shares: '1000000', isMinted: false, selectedClass: 'Founders Shares' },
  ]);
  const [isMinting, setIsMinting] = useState<string | null>(null);
  const [locationVerified, setLocationVerified] = useState(false);
  const [isVerifyingLocation, setIsVerifyingLocation] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<{name: string, registrationNumber: string | undefined, headquartersAddress: string} | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this data would come from a user session/context.
    // For this prototype, we simulate fetching it based on the logged-in user.
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    const allUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
    const allUsers: AdminUser[] = allUsersRaw ? JSON.parse(allUsersRaw) : initialUsers;
    const currentUser = allUsers.find(u => u.name === loggedInUserName && u.role === 'company');

    if (currentUser) {
        // Find the company's headquarters address from the mock data
        const hqAddress = addresses.find(a => a.type === 'Company' && a.isHeadquarters);
        
        setCompanyDetails({
            name: currentUser.name,
            registrationNumber: currentUser.jobTitle, // Assuming reg no. is stored here for demo
            headquartersAddress: hqAddress ? hqAddress.address : "No headquarters set",
        });
    } else {
        // Fallback for when no user is found or user is not a company
        setCompanyDetails({
            name: "Your Company",
            registrationNumber: "N/A",
            headquartersAddress: "Please set a headquarters address.",
        });
    }

  }, []);

  const handleAddClass = () => {
    setShareClasses(prev => [
      ...prev,
      { id: `sc_${Date.now()}`, name: '', shares: '', isMinted: false, selectedClass: '' },
    ]);
  };

  const handleRemoveClass = (id: string) => {
    setShareClasses(prev => prev.filter(sc => sc.id !== id));
  };

  const handleClassChange = (id: string, field: 'name' | 'shares' | 'selectedClass', value: string) => {
    setShareClasses(prev =>
      prev.map(sc => {
          if (sc.id === id) {
              if (field === 'selectedClass') {
                  const isCustom = value === 'Custom...';
                  return { ...sc, selectedClass: value, name: isCustom ? '' : value };
              }
              return { ...sc, [field]: value };
          }
          return sc;
      })
    );
  };
  
  const handleMint = async (id: string) => {
      const shareClass = shareClasses.find(sc => sc.id === id);
      const finalClassName = shareClass?.selectedClass === 'Custom...' ? shareClass.name : shareClass?.selectedClass;

      if (!shareClass || !finalClassName || !shareClass.shares) {
          toast({ variant: 'destructive', title: 'Error', description: 'Share class name and number of shares cannot be empty.' });
          return;
      }

      setIsMinting(id);
      // Simulate API call to a blockchain service
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShareClasses(prev => prev.map(sc => sc.id === id ? {...sc, isMinted: true} : sc));
      toast({
          title: 'Minting Successful!',
          description: `Successfully minted ${shareClass.shares} shares for the ${finalClassName} class.`
      });
      setIsMinting(null);
  }

  const handleVerifyLocation = async () => {
      setIsVerifyingLocation(true);
      // Simulate fetching GPS and comparing with the company's verified address
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLocationVerified(true);
      setIsVerifyingLocation(false);
      toast({
          title: "Location Verified!",
          description: "You are at the company's registered address. Minting is now enabled.",
      });
  }
  
  const totalShares = shareClasses.reduce((acc, sc) => acc + (parseInt(sc.shares, 10) || 0), 0);
  const atLeastOneClassMinted = shareClasses.some(sc => sc.isMinted);

  return (
    <CompanyLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase/>Company Details</CardTitle>
                    <CardDescription>Minting is based on the following verified company information.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
                    {!companyDetails ? (
                      <>
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full sm:col-span-2" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                            <FileText className="h-5 w-5 text-muted-foreground"/>
                            <div>
                                <p className="text-muted-foreground">Company Name</p>
                                <p className="font-semibold">{companyDetails.name}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                            <FileText className="h-5 w-5 text-muted-foreground"/>
                            <div>
                                <p className="text-muted-foreground">Registration No.</p>
                                <p className="font-semibold">{companyDetails.registrationNumber}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3 p-3 bg-secondary rounded-md sm:col-span-2">
                            <MapPin className="h-5 w-5 text-muted-foreground"/>
                            <div>
                                <p className="text-muted-foreground">Registered Headquarters</p>
                                <p className="font-semibold">{companyDetails.headquartersAddress}</p>
                            </div>
                        </div>
                      </>
                    )}
                </CardContent>
            </Card>

            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Tokenize Company Shares</CardTitle>
                <CardDescription>
                    Create and mint share classes for your company. These will be represented as tradable tokens on the blockchain, tied to your verified Digital Address.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <Alert variant="default" className="border-amber-500/50 text-amber-700 dark:border-amber-500/50 dark:text-amber-400 [&>svg]:text-amber-500">
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Physical Location Required</AlertTitle>
                    <AlertDescription>
                        For security, minting new share tokens can only be performed from a computer located at your company's primary verified address. Please verify your location to proceed.
                    </AlertDescription>
                </Alert>

                 <div className="p-4 border rounded-lg bg-secondary/50 space-y-4">
                    <h4 className="font-semibold">Step 1: Verify Your Location</h4>
                    <p className="text-sm text-muted-foreground">Confirm you are at your company's registered address to enable minting.</p>
                    <Button onClick={handleVerifyLocation} disabled={locationVerified || isVerifyingLocation}>
                        {isVerifyingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MapPin className="mr-2 h-4 w-4"/>}
                        {isVerifyingLocation ? 'Verifying...' : locationVerified ? 'Location Verified' : 'Verify My Location'}
                    </Button>
                    {locationVerified && <p className="text-sm text-green-600 font-medium flex items-center gap-2"><CheckCircle className="h-4 w-4"/>Location confirmed. You may now mint shares.</p>}
                </div>


                {shareClasses.map((shareClass, index) => (
                <div key={shareClass.id} className="p-4 border rounded-lg bg-secondary/50 space-y-4 relative">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Share Class Name</Label>
                            <Select 
                                value={shareClass.selectedClass}
                                onValueChange={(value) => handleClassChange(shareClass.id, 'selectedClass', value)}
                                disabled={shareClass.isMinted || !locationVerified}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a share class..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {predefinedShareClasses.map(name => (
                                        <SelectItem key={name} value={name}>{name}</SelectItem>
                                    ))}
                                    <SelectItem value="Custom...">Custom...</SelectItem>
                                </SelectContent>
                            </Select>
                            {shareClass.selectedClass === 'Custom...' && (
                                <Input
                                    placeholder="Enter custom class name"
                                    value={shareClass.name}
                                    onChange={e => handleClassChange(shareClass.id, 'name', e.target.value)}
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`shares-count-${index}`}>Number of Shares</Label>
                            <Input
                            id={`shares-count-${index}`}
                            type="number"
                            placeholder="e.g., 1,000,000"
                            value={shareClass.shares}
                            onChange={e => handleClassChange(shareClass.id, 'shares', e.target.value)}
                            disabled={shareClass.isMinted || !locationVerified}
                            />
                        </div>
                    </div>
                    {shareClass.isMinted ? (
                        <div className="flex items-center gap-2 text-green-600">
                           <CheckCircle className="h-5 w-5"/>
                           <p className="font-semibold">This class has been minted.</p>
                        </div>
                    ) : (
                         <Button onClick={() => handleMint(shareClass.id)} disabled={isMinting !== null || !locationVerified}>
                            {isMinting === shareClass.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                            {isMinting === shareClass.id ? 'Minting...' : 'Mint Share Class'}
                        </Button>
                    )}

                    {shareClasses.length > 1 && !shareClass.isMinted && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveClass(shareClass.id)}
                        disabled={!locationVerified}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    )}
                </div>
                ))}

                <Button variant="outline" onClick={handleAddClass} disabled={isMinting !== null || !locationVerified}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Share Class
                </Button>

                <Separator />

                <div className="p-4 rounded-lg bg-secondary border">
                    <h4 className="font-semibold text-lg">Summary</h4>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-muted-foreground">Total Shares to be Minted:</p>
                        <p className="font-bold text-xl">{totalShares.toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
             <CardFooter className="flex-col items-start gap-4">
                 <div className="p-4 rounded-lg bg-primary/10 text-primary border border-primary/20 w-full">
                    <h4 className="font-bold flex items-center gap-2"><PackageCheck /> Next Steps</h4>
                    <p className="text-sm mt-1 text-primary/90">Once minted, you can proceed to the 'Distribution' page to allocate these tokens to founder wallets, employee vesting contracts, or list them on the marketplace for a Security Token Offering (STO).</p>
                    <Button asChild className="mt-4" disabled={!atLeastOneClassMinted}>
                        <Link href="/company/distribution">
                            Go to Distribution <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </div>
             </CardFooter>
            </Card>
        </div>
      </main>
    </CompanyLayout>
  );
}
