
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  ChevronRight,
  UserCheck,
  UserX,
  Users,
  Trash2,
  Home,
  Building,
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
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const initialRequests = [
  {
    id: 'REQ-001',
    name: 'Alice Johnson',
    avatar: 'https://placehold.co/100x100.png?text=AJ',
    purpose: 'Tenant',
    date: '2024-08-15',
    status: 'Pending',
    address: '123 Main Street, Anytown, USA 12345',
    houseNumber: 'Apt 2B',
    doorPicture: 'https://placehold.co/400x300.png',
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
    houseNumber: 'Apt 3C',
    doorPicture: 'https://placehold.co/400x300.png',
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

export type AccessRequest = {
    id: string;
    name: string;
    avatar: string;
    purpose: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    address: string;
    houseNumber?: string;
    doorPicture?: string;
};


export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const [requestToDelete, setRequestToDelete] = useState<AccessRequest | null>(null);
  const { toast } = useToast();

  const handleRequestAction = (requestId: string, newStatus: 'Approved' | 'Rejected') => {
    const request = requests.find(req => req.id === requestId);
    if (!request) return;
    
    setRequests(requests.map(req => req.id === requestId ? { ...req, status: newStatus } : req));
     toast({
      title: `Request ${newStatus}`,
      description: `The access request from ${request.name} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleDeleteRequest = () => {
    if (!requestToDelete) return;

    setRequests(requests.filter(req => req.id !== requestToDelete.id));
    toast({
      variant: "destructive",
      title: "Request Deleted",
      description: `The access request from ${requestToDelete.name} has been removed.`,
    });
    setRequestToDelete(null);
  };
  
  const pendingCount = requests.filter(req => req.status === 'Pending').length;

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
                            <TableHead className="w-12"></TableHead>
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
                            <Collapsible asChild key={request.id} open={openCollapsible === request.id} onOpenChange={() => setOpenCollapsible(prev => prev === request.id ? null : request.id)}>
                              <React.Fragment>
                                <TableRow className="hover:bg-muted/50">
                                    <TableCell>
                                      {request.purpose === 'Tenant' && (
                                        <CollapsibleTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ChevronRight className={cn("h-4 w-4 transition-transform", openCollapsible === request.id && "rotate-90")} />
                                          </Button>
                                        </CollapsibleTrigger>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={request.avatar} alt={request.name} data-ai-hint="person avatar"/>
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {request.status === 'Pending' && (
                                              <>
                                                <DropdownMenuItem onClick={() => handleRequestAction(request.id, 'Approved')}>
                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                    Approve
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRequestAction(request.id, 'Rejected')} className="text-destructive">
                                                    <UserX className="mr-2 h-4 w-4" />
                                                    Reject
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                              </>
                                            )}
                                            <AlertDialogTrigger asChild onSelect={(e) => { e.preventDefault(); setRequestToDelete(request); }}>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                {request.purpose === 'Tenant' && (
                                  <CollapsibleContent asChild>
                                    <TableRow>
                                      <TableCell colSpan={7} className="p-0">
                                        <div className="bg-secondary/50 p-6">
                                          <h4 className="font-semibold text-lg mb-4">Tenant Details</h4>
                                          <div className="grid md:grid-cols-2 gap-6">
                                              <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Building className="h-5 w-5 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">House/Apt Number</p>
                                                        <p className="font-medium">{request.houseNumber}</p>
                                                    </div>
                                                </div>
                                              </div>
                                              <div>
                                                <p className="text-sm text-muted-foreground mb-2">Door Picture</p>
                                                <Image src={request.doorPicture!} alt={`Door for ${request.houseNumber}`} width={200} height={150} className="rounded-lg border shadow-md" data-ai-hint="apartment door"/>
                                              </div>
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </CollapsibleContent>
                                )}
                              </React.Fragment>
                            </Collapsible>
                            ))}
                          </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <AlertDialog open={!!requestToDelete} onOpenChange={() => setRequestToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the access request from <span className="font-semibold">{requestToDelete?.name}</span>.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteRequest}>
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
