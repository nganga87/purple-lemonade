
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Users,
  CandlestickChart,
  Download,
  ChevronDown,
  QrCode,
  Copy,
  Mail,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';


const activityItems = [
  {
    type: 'Delivery',
    vendor: 'Amazon',
    date: '2024-07-29',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Amazon logo" width={32} height={32} className="rounded-full" data-ai-hint="amazon logo" />,
  },
  {
    type: 'Verification',
    vendor: 'Post Office',
    date: '2024-07-28',
    status: 'Confirmed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Post office logo" width={32} height={32} className="rounded-full" data-ai-hint="post office"/>,
  },
  {
    type: 'Service Call',
    vendor: 'Gas Company',
    date: '2024-07-27',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Gas company logo" width={32} height={32} className="rounded-full" data-ai-hint="gas logo"/>,
  },
  {
    type: 'Food Delivery',
    vendor: 'Uber Eats',
    date: '2024-07-26',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Uber Eats logo" width={32} height={32} className="rounded-full" data-ai-hint="food delivery" />,
  },
  {
    type: 'KYC Check',
    vendor: 'Coinbase',
    date: '2024-07-25',
    status: 'Confirmed',
    icon: <Image src="https://placehold.co/32x32.png" alt="Coinbase logo" width={32} height={32} className="rounded-full" data-ai-hint="crypto logo" />,
  },
  {
    type: 'Delivery',
    vendor: 'FedEx',
    date: '2024-07-24',
    status: 'Completed',
    icon: <Image src="https://placehold.co/32x32.png" alt="FedEx logo" width={32} height={32} className="rounded-full" data-ai-hint="delivery truck" />,
  },
  {
    type: 'Utility Bill',
    vendor: 'Water Dept.',
    date: '2024-07-22',
    status: 'Paid',
    icon: <Image src="https://placehold.co/32x32.png" alt="Water dept logo" width={32} height={32} className="rounded-full" data-ai-hint="water drop" />,
  },
];

const INITIAL_VISIBLE_ACTIVITIES = 5;

export default function DashboardPage() {
  const [visibleActivities, setVisibleActivities] = useState(INITIAL_VISIBLE_ACTIVITIES);
  const { toast } = useToast();

  const showMoreActivities = () => {
    setVisibleActivities(activityItems.length);
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your activity statement will be sent to your email shortly.",
    });
  };

  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">My Digital Address</CardTitle>
                <CardDescription>Your primary verified address NFT.</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Verified</Badge>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Location</h3>
                  <p className="text-muted-foreground">123 Main Street, Anytown, USA 12345</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">GPS Coordinates</h3>
                  <p className="text-muted-foreground">34.0522° N, 118.2437° W</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Address NFT ID</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md">
                    <p className="truncate font-mono">0x7A1B2c3D4e5F6a7B8c9d0E1f2A3b4C5d6E7f8A9B</p>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-secondary rounded-lg p-6">
                <div className="p-3 bg-white rounded-lg shadow-md">
                  <Image src="https://placehold.co/180x180.png" alt="QR Code" width={180} height={180} data-ai-hint="qr code"/>
                </div>
                <div className="flex gap-2 w-full mt-4">
                    <Button variant="outline" className="w-full">
                      <QrCode className="mr-2 h-4 w-4" />
                      Expand QR
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Send to Email
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
             <Card className="shadow-lg flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">My Wallet</CardTitle>
                    <CardDescription>
                    Your balance for payments and trading.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                    <div className="p-4 rounded-lg bg-secondary border space-y-1">
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-3xl font-bold font-mono">5.204 ETH</p>
                        <p className="text-muted-foreground">≈ $15,612.00 USD</p>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                         <Button variant="outline"><ArrowDownLeft className="mr-2"/> Receive</Button>
                         <Button variant="outline"><ArrowUpRight className="mr-2"/> Send</Button>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-2">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full"><ArrowLeftRight className="mr-2"/>Trade on Markets</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem asChild>
                           <Link href="/exchange">Address Marketplace</Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                           <Link href="/share-market">CryptoShare Market</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </CardFooter>
            </Card>

            <div className="space-y-8 lg:col-span-2">
              <Card className="shadow-lg bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="font-headline">Register a New Address</CardTitle>
                  <CardDescription className="text-primary-foreground/80">Expand your portfolio by adding another property.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/register">
                    <Button variant="secondary" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Start Registration
                    </Button>
                  </Link>
                </CardContent>
              </Card>
               <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline">Pending Access Requests</CardTitle>
                  <CardDescription>Manage requests from others to use your address.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground mb-4">You have 3 pending requests.</p>
                   <Link href="/access-requests">
                     <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        View Requests
                      </Button>
                   </Link>
                </CardContent>
              </Card>
            </div>
          </div>

           <Card className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
                <CardDescription>
                  Latest transactions and verifications for your address.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {activityItems.slice(0, visibleActivities).map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.type}: {item.vendor}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.date}
                          </p>
                        </div>
                        <Badge
                          variant={item.status === 'Completed' || item.status === 'Confirmed' || item.status === 'Paid' ? 'default' : 'secondary'}
                          className={
                            item.status === 'Completed' || item.status === 'Confirmed' || item.status === 'Paid'
                              ? 'bg-accent/20 text-accent-foreground'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      {index < activityItems.slice(0, visibleActivities).length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
              {activityItems.length > INITIAL_VISIBLE_ACTIVITIES && (
                <CardFooter className="flex justify-center gap-2">
                   {visibleActivities < activityItems.length && (
                    <Button variant="outline" onClick={showMoreActivities}>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Show All
                    </Button>
                    )}
                    <Button variant="secondary" onClick={handleExport}>
                       <Download className="mr-2 h-4 w-4" />
                       Export to Email
                    </Button>
                </CardFooter>
              )}
            </Card>
        </div>
      </main>
    </AppLayout>
  );
}
