
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  LayoutDashboard,
  ChevronDown,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from '@/components/ui/skeleton';
import { countries } from '@/lib/countries';

const generateListings = (count: number) => {
  const listings = [];
  const propertyTypes = ['Office', 'House', 'Warehouse', 'Vacation'];
  const statuses = ['Verified', 'Pending'];
  const names = [
    'Downtown Commercial Space', 'Lakeside Family Home', 'Modern Warehouse Unit', 'Cozy Mountain Cabin', 'Suburban Office Building',
    'Urban Loft Apartment', 'Industrial Park Bay', 'Beachfront Villa', 'Rural Farmstead', 'City Center Penthouse',
    'Tech Startup Garage', 'Retail Storefront', 'Historic District Home', 'Waterfront Condo', 'Ski Chalet Retreat'
  ];
  
  const sampleCountries = [
    { code: 'US', name: 'USA', cities: ['Metropolis', 'Springfield', 'Rivertown', 'Oakhaven'] },
    { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
    { code: 'GB', name: 'UK', cities: ['London', 'Manchester', 'Edinburgh', 'Birmingham'] },
    { code: 'DE', name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne'] },
    { code: 'JP', name: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo'] },
  ];

  const listedBySuffix = ['Properties', 'Realty', 'Ventures', 'Holdings', 'Group'];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
  const lastNames = ['Johnson', 'Williams', 'Brown', 'Smith', 'Davis', 'Miller', 'Wilson', 'Moore'];

  for (let i = 0; i < count; i++) {
    const countryData = sampleCountries[i % sampleCountries.length];
    const city = countryData.cities[i % countryData.cities.length];
    const type = propertyTypes[i % propertyTypes.length];
    const streetNum = Math.floor(Math.random() * 2000) + 1;
    const streetName = ['Business Rd', 'Lake View', 'Industrial Way', 'Pine Ridge', 'Commerce Drive', 'Main St', 'Oak Ave', 'Elm St'][i % 8];
    const price = (Math.random() * 30 + 1).toFixed(1);
    const listedByFirstName = firstNames[i % firstNames.length];
    const listedByLastName = lastNames[i % lastNames.length];
    let listedBy;
    if (i % 3 === 0) {
      listedBy = `${city} ${listedBySuffix[i % listedBySuffix.length]}`;
    } else {
      listedBy = `${listedByFirstName} ${listedByLastName}`;
    }

    listings.push({
      name: `${names[i % names.length]} #${i + 1}`,
      address: `${streetNum} ${streetName}, ${city}, ${countryData.name}`,
      countryCode: countryData.code,
      price: `${price} ETH`,
      type: type,
      nftId: `0x${[...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase()}${i}`,
      listedBy: listedBy,
      avatar: `https://placehold.co/32x32.png?text=${listedBy.charAt(0)}`,
      status: statuses[i % statuses.length],
    });
  }
  return listings;
};


const mySaleListings = [
    { name: 'Work', address: '456 Oak Avenue, Springfield, USA 67890', price: '9.5 ETH', status: 'Listed', views: 124 },
    { name: 'Vacation House', address: '789 Pine Lane, Lakeside, USA 54321', price: '6.2 ETH', status: 'Listed', views: 88 },
];

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            {children}
        </Link>
    )
}

export default function ExchangePage() {
  const [allListings, setAllListings] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  useEffect(() => {
    setAllListings(generateListings(200));
  }, []);

  const filteredListings = useMemo(() => {
    if (!selectedCountry) {
        return allListings;
    }
    return allListings.filter(listing => {
        const countryMatch = listing.countryCode === selectedCountry;
        const cityMatch = selectedCity ? listing.address.toLowerCase().includes(selectedCity.toLowerCase()) : true;
        // State filtering is not implemented in mock data, but this is where it would go
        return countryMatch && cityMatch;
    });
  }, [allListings, selectedCountry, selectedCity]);

  const selectedCountryName = useMemo(() => {
    if (!selectedCountry) return null;
    const country = countries.find(c => c.code === selectedCountry);
    return country ? country.name : null;
  }, [selectedCountry]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="mr-2 flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg">Digital Address</span>
            </Link>
             <nav className="hidden md:flex items-center gap-6">
                <NavLink href="/exchange">Buy</NavLink>
                <NavLink href="/exchange">Sell</NavLink>
                <NavLink href="/exchange">Market</NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-0">
                      Trade <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                      <ArrowLeftRight className="mr-2 h-4 w-4" />
                      <span>P2P Exchange</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span>Derivatives</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem>
                      <TrendingDown className="mr-2 h-4 w-4" />
                      <span>Margin Trading</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
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

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Address NFT Marketplace</CardTitle>
                <CardDescription>
                    {selectedCountryName
                        ? <>Browsing listings in <span className="font-semibold text-primary">{selectedCountryName}</span>.</>
                        : 'Browse and acquire verified digital addresses from around the world.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 p-4 border rounded-lg bg-secondary/50">
                    <h4 className="font-semibold mb-2">Filter Listings</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Country</label>
                            <Select onValueChange={(value) => setSelectedCountry(value === 'ALL' ? '' : value)} value={selectedCountry || 'ALL'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Countries</SelectItem>
                                    {countries.map(country => (
                                      <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">State/Province</label>
                            <Input placeholder="e.g., California" disabled={!selectedCountry} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">City</label>
                            <Input placeholder="e.g., San Francisco" disabled={!selectedCountry} onChange={(e) => setSelectedCity(e.target.value)} />
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
                        {filteredListings.length === 0 && allListings.length > 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">
                                    No listings found for the selected filters.
                                </TableCell>
                            </TableRow>
                        ) : filteredListings.length === 0 ? (
                           Array.from({ length: 5 }).map((_, index) => (
                             <TableRow key={index}>
                               <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                               <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                               <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                               <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                               <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                               <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                             </TableRow>
                           ))
                        ) : (
                          filteredListings.map((listing) => (
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
                          ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

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
      </main>
    </div>
  );
}
