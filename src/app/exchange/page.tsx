
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  Settings,
  MoreHorizontal,
  Home,
  Building,
  Edit,
  Trash2,
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
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const marketplaceListings = [
  { 
    name: 'Downtown Commercial Space', 
    address: '789 Business Rd, Metropolis, USA', 
    price: '15.5 ETH', 
    type: 'Office',
    nftId: '0xABC123DEF456...',
    listedBy: 'Metropolis Properties',
    avatar: 'https://placehold.co/32x32.png',
    status: 'Verified',
  },
  { 
    name: 'Lakeside Family Home', 
    address: '101 Lake View, Tranquil Town, USA', 
    price: '8.2 ETH', 
    type: 'House',
    nftId: '0xGHI789JKL012...',
    listedBy: 'Alice Johnson',
    avatar: 'https://placehold.co/32x32.png',
    status: 'Verified',
  },
  { 
    name: 'Modern Warehouse Unit', 
    address: '21 Industrial Way, Port City, USA', 
    price: '12.0 ETH', 
    type: 'Warehouse',
    nftId: '0xMNO345PQR678...',
    listedBy: 'Port Logistics Inc.',
    avatar: 'https://placehold.co/32x32.png',
    status: 'Verified',
  },
  { 
    name: 'Cozy Mountain Cabin', 
    address: '333 Pine Ridge, Summit, USA', 
    price: '4.8 ETH', 
    type: 'Vacation',
    nftId: '0xSTU901VWX234...',
    listedBy: 'Bob Williams',
    avatar: 'https://placehold.co/32x32.png',
    status: 'Verified',
  },
   { 
    name: 'Suburban Office Building', 
    address: '555 Commerce Drive, Suburbia, USA', 
    price: '25.0 ETH', 
    type: 'Office',
    nftId: '0xZYX987WVU654...',
    listedBy: 'Suburbia Real Estate',
    avatar: 'https://placehold.co/32x32.png',
    status: 'Pending',
  },
];

const mySaleListings = [
    { name: 'Work', address: '456 Oak Avenue, Springfield, USA 67890', price: '9.5 ETH', status: 'Listed', views: 124 },
    { name: 'Vacation House', address: '789 Pine Lane, Lakeside, USA 54321', price: '6.2 ETH', status: 'Listed', views: 88 },
];

export default function ExchangePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">AddressChain Marketplace</span>
          </Link>
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
                   <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Go to Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-2xl p-4 md:p-6 lg:p-8 space-y-8">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">List an Address for Sale</CardTitle>
                <CardDescription>Put one of your verified Address NFTs on the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row gap-4 items-end'>
                <div className='flex-1 w-full space-y-2'>
                    <label className='text-sm font-medium'>Your Address NFT</label>
                    <Input placeholder="Search for an address or NFT ID to list..." />
                </div>
                <div className='w-full md:w-auto space-y-2'>
                    <label className='text-sm font-medium'>Asking Price (ETH)</label>
                    <Input type="number" placeholder="e.g., 10.5" />
                </div>
                <Button>List for Sale</Button>
            </CardContent>
        </Card>

        <Tabs defaultValue="marketplace">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>
          <TabsContent value="marketplace">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Address NFT Marketplace</CardTitle>
                    <CardDescription>Browse and acquire verified digital addresses from around the world.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 p-4 border rounded-lg bg-secondary/50">
                        <h4 className="font-semibold mb-2">Filter Listings</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Country</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usa">United States</SelectItem>
                                        <SelectItem value="canada">Canada</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="germany">Germany</SelectItem>
                                        <SelectItem value="japan">Japan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">State/Province</label>
                                <Input placeholder="e.g., California" disabled />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">City</label>
                                <Input placeholder="e.g., San Francisco" disabled />
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[300px]">Listing</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Verification</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {marketplaceListings.map((listing) => (
                            <TableRow key={listing.nftId}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image src={`https://placehold.co/100x75.png`} alt={listing.name} width={60} height={45} className="rounded-md" data-ai-hint="building exterior"/>
                                        <div>
                                            <p className="font-medium">{listing.name}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                                 <Avatar className='h-5 w-5'>
                                                    <AvatarImage src={listing.avatar} alt={listing.listedBy} data-ai-hint="person avatar"/>
                                                    <AvatarFallback>{listing.listedBy.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {listing.listedBy}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{listing.address}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize flex items-center gap-1">
                                         {listing.type === 'Office' && <Building className="h-3 w-3"/>}
                                         {listing.type === 'Warehouse' && <Building className="h-3 w-3"/>}
                                         {listing.type === 'House' && <Home className="h-3 w-3"/>}
                                         {listing.type === 'Vacation' && <Home className="h-3 w-3"/>}
                                        {listing.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={listing.status === 'Verified' ? 'default' : 'secondary'} className={listing.status === 'Verified' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                        {listing.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono">{listing.price}</TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm">Buy Now</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="my-listings">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Your Active Listings</CardTitle>
                    <CardDescription>Manage the addresses you have listed for sale.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Address Name</TableHead>
                            <TableHead>Full Address</TableHead>
                            <TableHead>Asking Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mySaleListings.map((listing) => (
                            <TableRow key={listing.address}>
                                <TableCell className="font-medium">{listing.name}</TableCell>
                                <TableCell>{listing.address}</TableCell>
                                <TableCell className="font-mono">{listing.price}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className='text-green-600 border-green-300'>{listing.status}</Badge>
                                </TableCell>
                                <TableCell>{listing.views}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                              <Edit className='mr-2 h-4 w-4' />
                                              Edit Listing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                              <Trash2 className='mr-2 h-4 w-4' />
                                              Delist
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

    