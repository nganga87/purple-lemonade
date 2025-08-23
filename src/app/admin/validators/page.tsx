
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ShieldAlert, TrendingUp, UserPlus, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { useToast } from '@/hooks/use-toast';
import { initialValidators, initialAppointments } from './data';


export default function ValidatorsPage() {
  const [validators, setValidators] = useState(initialValidators);
  const [appointments, setAppointments] = useState(initialAppointments);
  const { toast } = useToast();

  const handleAssign = (appointmentId: string, validatorId: string) => {
    const validator = validators.find(v => v.id === validatorId);
    if (!validator) return;

    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Assigned' as const, assignedTo: validator.name } : apt
    ));

    toast({
      title: 'Appointment Assigned',
      description: `Appointment ${appointmentId} has been assigned to ${validator.name}.`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case 'Pending Review':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case 'Suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Validators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{validators.length}</div>
              <p className="text-xs text-muted-foreground">+2 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.filter(a => a.status === 'Pending Assignment').length}</div>
              <p className="text-xs text-muted-foreground">Awaiting validator assignment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.7%</div>
              <p className="text-xs text-muted-foreground">Average across all active validators</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle>Validator Network</CardTitle>
                    <CardDescription>Manage and monitor third-party validation organizations.</CardDescription>
                </div>
                 <Button>
                    <UserPlus className="mr-2" />
                    Onboard New Validator
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Validator</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Total Validations</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validators.map((validator) => (
                  <TableRow key={validator.id}>
                    <TableCell className="font-medium">
                      <Link href={`/admin/validators/${validator.id}`} className="hover:underline text-primary">
                        {validator.name}
                      </Link>
                    </TableCell>
                    <TableCell>{getStatusBadge(validator.status)}</TableCell>
                    <TableCell>{validator.rating}/5.0</TableCell>
                    <TableCell>{validator.validations.toLocaleString()}</TableCell>
                    <TableCell>{validator.successRate}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                             <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    View Details
                                </DropdownMenuItem>
                                {validator.status === 'Pending Review' && (
                                    <DropdownMenuItem>
                                        Approve Validator
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">
                                    {validator.status === 'Suspended' ? 'Re-activate' : 'Suspend'}
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
        
        <Card>
          <CardHeader>
            <CardTitle>Validation Appointments</CardTitle>
            <CardDescription>Dispatch pending validation requests to your active validators.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.address}</TableCell>
                     <TableCell>
                        <Badge variant={appointment.status === 'Completed' ? 'secondary' : appointment.status === 'Assigned' ? 'default' : 'outline'}
                               className={appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : appointment.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : ''}>
                          {appointment.status}
                        </Badge>
                     </TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.assignedTo}</TableCell>
                    <TableCell className="text-right">
                       {appointment.status === 'Pending Assignment' && (
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">Assign</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {validators.filter(v => v.status === 'Active').map(v => (
                                    <DropdownMenuItem key={v.id} onClick={() => handleAssign(appointment.id, v.id)}>
                                        Assign to {v.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                           </DropdownMenu>
                       )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
