
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
  CheckCircle2,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  QrCode,
  Copy,
  MoreVertical,
  ChevronDown,
  Edit,
  Trash2,
  Users,
  CandlestickChart,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';
import { EditAddressForm } from './edit-address-form';
import { deleteAddress } from './delete-address';
import { useToast } from '@/hooks/use-toast';


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
    name: 'Vacation House',
    address: '789 Pine Lane, Lakeside, USA 54321',
    nftId: '0x9D8C7B6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C',
    gps: '41.7638° N, 72.6851° W',
    status: 'Pending',
  },
];

export type Address = typeof initialAddresses[0];

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(addresses.find(a => a.isPrimary) || addresses[0] || null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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


  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">AddressChain</h1>
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
                    Exchange
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
                      <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                          <CardTitle className="font-headline">{selectedAddress.name}</CardTitle>
                           <CardDescription>
                            {selectedAddress.address}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                           {selectedAddress.isPrimary && (
                              <Badge variant="outline" className="mr-2 border-primary text-primary">Primary</Badge>
                            )}
                            <Badge variant={selectedAddress.status === 'Verified' ? 'secondary' : 'default'} className={selectedAddress.status === 'Verified' ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}>
                            {selectedAddress.status}
                            </Badge>
                             <AlertDialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)} disabled={selectedAddress.isPrimary}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Edit Details</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuItem onSelect={() => handleSetPrimary(selectedAddress.nftId)} disabled={selectedAddress.isPrimary}>Set as Primary</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-destructive" disabled={selectedAddress.isPrimary}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Archive</span>
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently archive the address "{selectedAddress.name}".
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleArchiveAddress(selectedAddress.nftId)}>
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold">Address NFT ID</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                              <p className="truncate">{selectedAddress.nftId}</p>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                           <div className="space-y-1">
                                <h3 className="font-semibold">GPS Coordinates</h3>
                                <p className="text-muted-foreground">{selectedAddress.gps}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4">
                          <div className="p-2 bg-white rounded-lg shadow-md">
                            <Image src="https://placehold.co/120x120.png" alt="QR Code" width={120} height={120} data-ai-hint="qr code" />
                          </div>
                           <Button variant="outline" size="sm" className="mt-4">
                            <QrCode className="mr-2 h-4 w-4" />
                            Show QR
                          </Button>
                        </div>
                      </CardContent>
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
