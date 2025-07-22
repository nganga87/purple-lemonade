
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  QrCode,
  Copy,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  CandlestickChart,
  Check,
  ArchiveRestore,
  ShieldAlert,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
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
  DialogFooter,
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
import { Logo } from '@/components/icons';
import { EditAddressForm } from './edit-address-form';
import { deleteAddress } from './delete-address';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialAddresses = [
  {
    isPrimary: true,
    name: 'Home',
    address: '123 Main Street, Anytown, USA 12345',
    nftId: '0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B',
    gps: '34.0522° N, 118.2437° W',
    status: 'Verified',
  },
  {
    isPrimary: false,
    name: 'Work',
    address: '456 Oak Avenue, Springfield, USA 67890',
    nftId: '0x1A2B3c4D5e6F7a8B9c0d1E2f3A4b5C6d7E8f9A0C',
    gps: '39.7817° N, 89.6501° W',
    status: 'Verified',
  },
  {
    isPrimary: false,
    name: 'New Property',
    address: '789 Pine Lane, Lakeside, USA 54321',
    nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
    gps: '41.7638° N, 72.6851° W',
    status: 'Pending',
  },
  {
    isPrimary: false,
    name: 'Damaged Warehouse',
    address: '101 Industrial Way, Floodzone, USA 98765',
    nftId: '0x4F5E6D7C8B9A0F1E2D3C4B5A6F7E8D9C0A1B2C3D',
    gps: '40.7128° N, 74.0060° W',
    status: 'Compromised',
  },
];

export type Address = typeof initialAddresses[0];

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(addresses.find(a => a.isPrimary) || addresses[0] || null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [actionDialog, setActionDialog] = useState<'archive' | 'incident' | null>(null);

  const { toast } = useToast();

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Revert after 2 seconds
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">Digital Address</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <Link href="/dashboard">
                  <SidebarMenuButton>
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="/my-addresses">
                    <SidebarMenuButton isActive>
                    <MapPin />
                    My Addresses
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/register">
                  <SidebarMenuButton>
                    <PlusCircle />
                    Register New Address
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/access-requests">
                  <SidebarMenuButton>
                    <Users />
                    Access Requests
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/exchange">
                    <SidebarMenuButton>
                    <CandlestickChart />
                    Address Marketplace
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <SidebarInset className="flex-1 flex flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-headline font-semibold">My Addresses</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar"/>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john.doe@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

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
                          {address.name}{' '}
                          <span className="text-muted-foreground">({address.address})</span>
                          {address.isPrimary && ' - Primary'}
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
                                <CardTitle className="font-headline mt-4">{selectedAddress.name}</CardTitle>
                                <CardDescription>
                                    {selectedAddress.address}
                                </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
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
                                            <Button size="sm" className="mt-2"><ArchiveRestore className="mr-2 h-4 w-4"/>Start Re-validation</Button>
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">Address NFT ID</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                                        <p className="truncate">{selectedAddress.nftId}</p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => handleCopy(selectedAddress.nftId)}
                                        >
                                            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                            <h3 className="font-semibold">GPS Coordinates</h3>
                                            <p className="text-muted-foreground">{selectedAddress.gps}</p>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={handleGetDirections} disabled={!selectedAddress.gps}>
                                          <LinkIcon className="mr-2 h-4 w-4"/>
                                          Get Directions
                                        </Button>
                                    </div>
                                    <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                                    <div className="p-2 bg-white rounded-lg shadow-md">
                                        <Image src="https://placehold.co/120x120.png" alt="QR Code" width={120} height={120} data-ai-hint="qr code"/>
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-4">
                                        <QrCode className="mr-2 h-4 w-4" />
                                        Show QR
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
          </SidebarInset>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
