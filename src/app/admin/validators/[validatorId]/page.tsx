
'use client';

import React from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Star, TrendingUp, CheckCircle2, History } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { initialValidators, initialAppointments } from '../data';

export default function ValidatorDetailsPage({ params }: { params: { validatorId: string } }) {
  const validator = initialValidators.find(v => v.id === params.validatorId);
  
  if (!validator) {
    return (
      <AppLayout nav="admin">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Validator Not Found</CardTitle>
                    <CardDescription>The validator with ID "{params.validatorId}" could not be found.</CardDescription>
                </CardHeader>
            </Card>
        </main>
      </AppLayout>
    );
  }

  const assignedAppointments = initialAppointments.filter(a => a.assignedTo === validator?.name);
  
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
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div>
                        <CardTitle className="font-headline text-2xl">{validator.name}</CardTitle>
                        <CardDescription>
                            Detailed overview of performance and job history.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge(validator.status)}
                        <Button variant="outline">View Contract</Button>
                    </div>
                </div>
            </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{validator.rating}/5.0</div>
                    <p className="text-xs text-muted-foreground">Based on user feedback</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{validator.successRate}</div>
                    <p className="text-xs text-muted-foreground">Successful vs. failed validations</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Validations</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{validator.validations.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Total jobs completed</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
                    <History className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{assignedAppointments.filter(a => a.status === 'Assigned').length}</div>
                    <p className="text-xs text-muted-foreground">Jobs currently in progress</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Assigned Appointments</CardTitle>
            <CardDescription>A log of all jobs assigned to {validator.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedAppointments.length > 0 ? (
                    assignedAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.address}</TableCell>
                        <TableCell>
                        <Badge variant={appointment.status === 'Completed' ? 'secondary' : 'default'}
                                className={appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {appointment.status}
                        </Badge>
                        </TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4"/>
                                View Report
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No appointments assigned to this validator yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
