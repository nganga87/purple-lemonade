
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  PlusCircle,
  QrCode,
  Copy,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  ShieldAlert,
  FileText,
  Link as LinkIcon,
  Fingerprint,
  Home,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { EditAddressForm } from './edit-address-form';
import { deleteAddress } from './delete-address';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addresses as initialAddresses, type Address } from '@/lib/addresses';
import { AppLayout } from '@/components/layout/app-layout';

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(addresses.find(a => a.isPrimary) || addresses[0] || null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState<'archive' | 'incident' | null>(null);

  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleAddressSelect = (addressId: string) => {
    const address = addresses.find(addr => addr.nftId === addressId);
    setSelectedAddress(address || null);
  };
  
  const handleAddressUpdate = (updatedAddress: Address) => {
    const newAddresses = addresses.map(addr => addr.nftId === updatedAddress.nftId ? updatedAddress : addr);
    setAddresses(newAddresses);
    setSelectedAddress(updatedAddress);
    setIsEditDialogOpen(false);
  };
  
  const handleSetPrimary = (nftId: string) => {
    const newAddresses = addresses.map(addr => ({
      ...addr,
      isPrimary: addr.nftId === nftId
    }));
    setAddresses(newAddresses);
    const newSelected = newAddresses.find(addr => addr.nftId === selectedAddress?.nftId);
    if(newSelected) setSelectedAddress(newSelected);
    toast({
      title: "Primary Address Updated",
      description: "Your primary address has been changed.",
    });
  }

  const handleSetHeadquarters = (nftId: string) => {
      const newAddresses = addresses.map(addr => ({
        ...addr,
        isHeadquarters: addr.nftId === nftId
      }));
      setAddresses(newAddresses);
      const newSelected = newAddresses.find(addr => addr.nftId === selectedAddress?.nftId);
      if(newSelected) setSelectedAddress(newSelected);
      toast({
        title: "Headquarters Updated",
        description: "Your company headquarters has been set.",
      });
  }

  const handleArchiveAddress = async (nftId: string) => {
    try {
      const result = await deleteAddress(nftId);
      if (result.error) {
        throw new Error(result.error);
      }
      
      const newAddresses = addresses.filter(addr => addr.nftId !== nftId);
      setAddresses(newAddresses);
      
      if (selectedAddress?.nftId === nftId) {
        setSelectedAddress(newAddresses.find(a => a.isPrimary) || newAddresses[0] || null);
      }
      
      toast({
        title: "Address Archived",
        description: "The address has been successfully archived.",
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Archive Failed",
        description: errorMessage,
      });
    }
  };

  const handleCopy = (text: string, type: 'Address' | 'NFT ID' | 'GPS' | 'Personal ID') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(type);
      toast({
        title: `${type} Copied!`,
        description: `The ${type.toLowerCase()} has been copied to your clipboard.`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };
  
  const handleReportIncident = (nftId: string) => {
     setAddresses(addresses.map(addr => addr.nftId === nftId ? { ...addr, status: 'Compromised' } : addr));
     setSelectedAddress(prev => prev && prev.nftId === nftId ? { ...prev, status: 'Compromised' } : prev);
     toast({
       variant: 'destructive',
       title: "Incident Reported",
       description: "The address has been marked as compromised and requires re-validation.",
     });
     setActionDialog(null);
  }

  const handleGetDirections = () => {
    if (!selectedAddress || !selectedAddress.gps) return;
    try {
        const cleanedGps = selectedAddress.gps.replace(/[°N°W°S°E\s]/g, '');
        const [lat, lng] = cleanedGps.split(',');
        if (lat && lng) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
             toast({ variant: 'destructive', title: 'Invalid GPS Format' });
        }
    } catch (error) {
        toast({ variant: 'destructive', title: 'Could not open maps' });
    }
  };

  const getStatusBadge = (status: Address['status']) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Compromised':
        return <Badge variant="destructive">Compromised</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }
  
  const getQrCodeUrl = (data: string, size: number) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }

  const handleCopyQr = async (data: string) => {
    if (!data) return;
    try {
      const imageUrl = getQrCodeUrl(data, 256);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast({
        title: "QR Code Copied",
        description: "The QR code image has been copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy QR code: ', err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the QR code image.",
      });
    }
  };

  return (
    <AppLayout>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="grid gap-8">
                  <div className='flex justify-between items-start md:items-center flex-col md:flex-row gap-4'>
                      <div>
                          <h2 className="text-2xl font-headline font-semibold">Your Address NFTs</h2>
                          <p className="text-muted-foreground">Manage your verified digital addresses.</p>
                      </div>
                      <Link href="/register">
                          <Button>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Register New Address
                          </Button>
                      </Link>
                  </div>
                
                <div className="space-y-8">
                  <Select onValueChange={handleAddressSelect} value={selectedAddress?.nftId || ''}>
                    <SelectTrigger className="w-full md:w-[400px]">
                      <SelectValue placeholder="Select an address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.nftId} value={address.nftId}>
                            <div className="flex items-center gap-2">
                                {address.type === 'Company' ? <Building className="h-4 w-4 text-muted-foreground" /> : <Home className="h-4 w-4 text-muted-foreground" />}
                                <span>{address.name}</span>
                                <span className="text-muted-foreground truncate">({address.address})</span>
                                {address.isPrimary && <Badge variant="outline" className="ml-auto">Primary</Badge>}
                           </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedAddress && (
                     <Card className="shadow-lg animate-in fade-in-50 duration-500">
                        <Tabs defaultValue="details">
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                <TabsList>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="succession">Succession</TabsTrigger>
                                </TabsList>
                                <div className="flex items-center gap-3 mt-4">
                                    {selectedAddress.type === 'Company' ? <Building className="h-6 w-6 text-muted-foreground" /> : <Home className="h-6 w-6 text-muted-foreground" />}
                                    <CardTitle className="font-headline">{selectedAddress.name}</CardTitle>
                                </div>
                                <CardDescription>
                                    {selectedAddress.address}
                                </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                {selectedAddress.isHeadquarters && (
                                    <Badge variant="outline" className="mr-2 border-purple-500 text-purple-600">Headquarters</Badge>
                                )}
                                {selectedAddress.isPrimary && (
                                    <Badge variant="outline" className="mr-2 border-primary text-primary">Primary</Badge>
                                )}
                                {getStatusBadge(selectedAddress.status)}
                                <AlertDialog open={!!actionDialog} onOpenChange={(open) => !open && setActionDialog(null)}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)} disabled={selectedAddress.status !== 'Verified'}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                <span>Edit Details</span>
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuItem onSelect={() => handleSetPrimary(selectedAddress.nftId)} disabled={selectedAddress.isPrimary || selectedAddress.status !== 'Verified'}>
                                           <Check className="mr-2 h-4 w-4" />
                                           <span>Set as Primary</span>
                                        </DropdownMenuItem>
                                        {selectedAddress.type === 'Company' && (
                                            <DropdownMenuItem onSelect={() => handleSetHeadquarters(selectedAddress.nftId)} disabled={selectedAddress.isHeadquarters || selectedAddress.status !== 'Verified'}>
                                                <Building className="mr-2 h-4 w-4" />
                                                <span>Set as Headquarters</span>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                         <DropdownMenuItem className="text-destructive" onSelect={() => setActionDialog('incident')}>
                                            <ShieldAlert className="mr-2 h-4 w-4" />
                                            <span>Report Incident</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onSelect={() => setActionDialog('archive')} disabled={selectedAddress.isPrimary || selectedAddress.status !== 'Verified'}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Archive</span>
                                        </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                        {actionDialog === 'archive' && `This action cannot be undone. This will permanently archive the address "${selectedAddress.name}".`}
                                        {actionDialog === 'incident' && `This will mark the address "${selectedAddress.name}" as compromised, requiring re-validation. This action is recorded publicly.`}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setActionDialog(null)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => {
                                            if (actionDialog === 'archive') handleArchiveAddress(selectedAddress.nftId);
                                            if (actionDialog === 'incident') handleReportIncident(selectedAddress.nftId);
                                        }}>
                                        Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </div>
                            </CardHeader>
                            <TabsContent value="details">
                                <CardContent className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-4">
                                    {selectedAddress.status === 'Compromised' && (
                                        <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                                            <h4 className="font-bold flex items-center gap-2"><ShieldAlert />Incident Reported</h4>
                                            <p className="text-sm mt-1">This address is locked pending re-validation due to a reported incident (e.g., natural disaster). No transfers are permitted.</p>
                                            <Button size="sm" className="mt-2"><Link href="/admin/incident-response" className="flex items-center"><FileText className="mr-2 h-4 w-4"/>View Incident Report</Link></Button>
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <h3 className="font-semibold flex items-center gap-2"><Fingerprint className="text-muted-foreground"/> Digital Personal ID</h3>
                                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(selectedAddress.personalId, 'Personal ID')}>
                                            {copiedItem === 'Personal ID' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                          </Button>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                                          <p className="truncate font-mono">{selectedAddress.personalId}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <h3 className="font-semibold flex items-center gap-2"><LinkIcon className="text-muted-foreground"/> Address NFT ID</h3>
                                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(selectedAddress.nftId, 'NFT ID')}>
                                            {copiedItem === 'NFT ID' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                          </Button>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                                          <p className="truncate font-mono">{selectedAddress.nftId}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                            <h3 className="font-semibold flex items-center gap-2"><MapPin className="text-muted-foreground"/> GPS Coordinates</h3>
                                            <p className="text-muted-foreground">{selectedAddress.gps}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={handleGetDirections} disabled={!selectedAddress.gps}>
                                        <LinkIcon className="mr-2 h-4 w-4"/>
                                        Get Directions
                                    </Button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                                      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
                                        <DialogTrigger asChild>
                                           <div className="p-2 bg-white rounded-lg shadow-md cursor-pointer">
                                                <Image src={getQrCodeUrl(selectedAddress.nftId, 120)} alt="QR Code" width={120} height={120} data-ai-hint="qr code"/>
                                           </div>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                          <Tabs defaultValue="address" className="w-full">
                                            <DialogHeader>
                                              <DialogTitle>Shareable Codes</DialogTitle>
                                              <DialogDescription>
                                                Select a code to share, then scan or copy it.
                                              </DialogDescription>
                                              <TabsList className="grid w-full grid-cols-2 mt-2">
                                                <TabsTrigger value="address">Address NFT</TabsTrigger>
                                                <TabsTrigger value="personal">Personal ID</TabsTrigger>
                                              </TabsList>
                                            </DialogHeader>
                                            <TabsContent value="address">
                                               <div className="flex flex-col items-center justify-center p-4">
                                                <div className="p-4 bg-white rounded-lg shadow-md">
                                                    <Image src={getQrCodeUrl(selectedAddress.nftId, 256)} alt="Address QR Code" width={256} height={256} data-ai-hint="qr code" />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <p className="text-xs font-mono text-muted-foreground mt-2">{selectedAddress.nftId}</p>
                                                </div>
                                              </div>
                                              <DialogFooter>
                                                <Button onClick={() => handleCopyQr(selectedAddress.nftId)} className="w-full">
                                                  <Copy className="mr-2 h-4 w-4" />
                                                  Copy QR Image
                                                </Button>
                                              </DialogFooter>
                                            </TabsContent>
                                            <TabsContent value="personal">
                                              <div className="flex flex-col items-center justify-center p-4">
                                                <div className="p-4 bg-white rounded-lg shadow-md">
                                                    <Image src={getQrCodeUrl(selectedAddress.personalId, 256)} alt="Personal ID QR Code" width={256} height={256} data-ai-hint="qr code" />
                                                </div>
                                                <div className="text-center mt-4">
                                                    <p className="text-xs font-mono text-muted-foreground mt-2">{selectedAddress.personalId}</p>
                                                </div>
                                              </div>
                                              <DialogFooter>
                                                <Button onClick={() => handleCopyQr(selectedAddress.personalId)} className="w-full">
                                                  <Copy className="mr-2 h-4 w-4" />
                                                  Copy QR Image
                                                </Button>
                                              </DialogFooter>
                                            </TabsContent>
                                          </Tabs>
                                        </DialogContent>
                                      </Dialog>
                                      <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsQrDialogOpen(true)}>
                                        <QrCode className="mr-2 h-4 w-4" />
                                        Show Codes
                                      </Button>
                                    </div>
                                </CardContent>
                            </TabsContent>
                             <TabsContent value="succession">
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg bg-secondary border">
                                        <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5"/> Digital Will & Succession</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Designate a beneficiary to inherit this Digital Address NFT in the event of your incapacitation or death. This action requires administrative verification of legal documents to execute.</p>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="beneficiary">Beneficiary Wallet Address</Label>
                                        <Input id="beneficiary" placeholder="0x... (Beneficiary's Wallet Address)" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Beneficiary</Button>
                                </CardFooter>
                            </TabsContent>
                        </Tabs>
                    </Card>
                  )}
                </div>
              </div>
            </main>
             {selectedAddress && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Address</DialogTitle>
                  <DialogDescription>
                    Update the details for your address. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <EditAddressForm
                  address={selectedAddress}
                  onFormSubmit={handleAddressUpdate}
                />
              </DialogContent>
            )}
        </Dialog>
    </AppLayout>
  );
}
