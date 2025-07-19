
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
  MoreVertical,
  Clock,
  UserCheck,
  UserX,
  Users,
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

const initialRequests = [
  {
    id: 'REQ-001',
    name: 'Alice Johnson',
    avatar: 'https://placehold.co/100x100.png?text=AJ',
    purpose: 'Tenant',
    date: '2024-08-15',
    status: 'Pending',
    address: '123 Main Street, Anytown, USA 12345',
  },
  {
    id: 'REQ-002',
    name: 'Bob Williams',
    avatar: 'https://placehold.co/100x100.png?text=BW',
    purpose: 'Family Member',
    date: '2024-08-14',
    status: 'Pending',
    address: '123 Main Street, Anytown, USA 12345',
  },
  {
    id: 'REQ-003',
    name: 'Charlie Brown',
    avatar: 'https://placehold.co/100x100.png?text=CB',
    purpose: 'Guest (Short-term)',
    date: '2024-08-12',
    status: 'Pending',
    address: '456 Oak Avenue, Springfield, USA 67890',
  },
    {
    id: 'REQ-004',
    name: 'David Smith',
    avatar: 'https://placehold.co/100x100.png?text=DS',
    purpose: 'Tenant',
    date: '2024-07-20',
    status: 'Approved',
    address: '123 Main Street, Anytown, USA 12345',
  },
  {
    id: 'REQ-005',
    name: 'Eve Davis',
    avatar: 'https://placehold.co/100x100.png?text=ED',
    purpose: 'Family Member',
    date: '2024-07-18',
    status: 'Rejected',
    address: '123 Main Street, Anytown, USA 12345',
  },
];

export type AccessRequest = typeof initialRequests[0];

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);

  const handleRequestAction = (requestId: string, newStatus: 'Approved' | 'Rejected') => {
    setRequests(requests.map(req => req.id === requestId ? { ...req, status: newStatus } : req));
  };
  
  const pendingCount = requests.filter(req => req.status === 'Pending').length;

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
                 <SidebarMenuButton href="/access-requests" isActive>
                  <Users />
                  Access Requests
                  {pendingCount > 0 && <SidebarMenuBadge>{pendingCount}</SidebarMenuBadge>}
                </SidebarMenuButton>
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
              <h1 className="text-2xl font-headline font-semibold">Access Requests</h1>
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
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Manage Access Requests</CardTitle>
                    <CardDescription>Review, approve, or reject requests for others to use your verified addresses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[250px]">Requester</TableHead>
                            <TableHead>Purpose</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={request.avatar} alt={request.name} />
                                            <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{request.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{request.purpose}</TableCell>
                                <TableCell className="text-muted-foreground">{request.address}</TableCell>
                                <TableCell className="text-muted-foreground">{request.date}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        request.status === 'Approved' ? 'default' : request.status === 'Rejected' ? 'destructive' : 'secondary'
                                    } className={
                                        request.status === 'Approved' ? 'bg-green-100 text-green-800' : request.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                                    }>
                                        {request.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                {request.status === 'Pending' ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleRequestAction(request.id, 'Approved')}>
                                                <UserCheck className="mr-2 h-4 w-4" />
                                                Approve
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRequestAction(request.id, 'Rejected')} className="text-destructive">
                                                <UserX className="mr-2 h-4 w-4" />
                                                Reject
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <span className="text-xs text-muted-foreground italic">Actioned</span>
                                )}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
