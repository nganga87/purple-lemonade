
'use client';

import React from 'react';
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
  Activity,
  QrCode,
  Copy,
  Users,
  Mail,
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
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';

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
];

export default function DashboardPage() {
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
                <SidebarMenuButton href="/dashboard" isActive>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/my-addresses">
                  <SidebarMenuButton>
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

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-headline font-semibold">Dashboard</h1>
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

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-headline">Recent Activity</CardTitle>
                    <CardDescription>
                      Latest transactions and verifications for your address.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityItems.map((item, index) => (
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
                              variant={item.status === 'Completed' || item.status === 'Confirmed' ? 'default' : 'secondary'}
                              className={
                                item.status === 'Completed' || item.status === 'Confirmed'
                                  ? 'bg-accent/20 text-accent-foreground'
                                  : 'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                          {index < activityItems.length - 1 && <Separator />}
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
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
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
