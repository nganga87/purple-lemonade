
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MoreVertical,
  ChevronRight,
  UserCheck,
  UserX,
  Trash2,
  Building,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { initialRequests, type AccessRequest } from './data';
import { AppLayout } from '@/components/layout/app-layout';

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
  
  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Manage Access Requests</CardTitle>
                <CardDescription>Review, approve, or reject requests for others to use your verified addresses.</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
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
                           <React.Fragment key={request.id}>
                            <TableRow className="hover:bg-muted/50">
                              <TableCell>
                                {request.purpose === 'Tenant' && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpenCollapsible(prev => prev === request.id ? null : request.id)}>
                                        <ChevronRight className={cn("h-4 w-4 transition-transform", openCollapsible === request.id && "rotate-90")} />
                                    </Button>
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
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-destructive" onSelect={(e) => { e.preventDefault(); setRequestToDelete(request); }}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                              </TableCell>
                            </TableRow>
                            {request.purpose === 'Tenant' && openCollapsible === request.id && (
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
                            )}
                            </React.Fragment>
                        ))}
                      </TableBody>
                </Table>

                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the access request from <span className="font-semibold">{requestToDelete?.name}</span>.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setRequestToDelete(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteRequest}>
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
