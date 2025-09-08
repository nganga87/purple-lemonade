
'use client';

import React, { useEffect, useState } from 'react';
import {
  DollarSign,
  Users,
  Briefcase,
  MoreHorizontal,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/app-layout';


type RevenuePoint = { name: string; revenue: number };
type AdminRow = { id?: string; name: string; email: string; role?: string; status: string };
type ClientRow = { company: string; contact: string; plan: string; since: string };

export default function AdminDashboardPage() {
  const [revenueData, setRevenueData] = useState<RevenuePoint[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminRow[]>([]);
  const [b2bClients, setB2bClients] = useState<ClientRow[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [revRes, usersRes, clientsRes] = await Promise.all([
          fetch('/api/admin/dashboard/revenue'),
          fetch('/api/admin/users'),
          fetch('/api/admin/dashboard/clients'),
        ]);
        const [rev, users, clients] = await Promise.all([
          revRes.json(), usersRes.json(), clientsRes.json()
        ]);
        if (Array.isArray(rev)) setRevenueData(rev);
        if (Array.isArray(users)) setAdminUsers(users);
        if (Array.isArray(clients)) setB2bClients(clients);
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      }
    };
    load();
  }, []);
  return (
    <AppLayout nav="admin">
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active B2B Clients</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+57</div>
                    <p className="text-xs text-muted-foreground">+12 since last quarter</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly income from API services and marketplace fees.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}K`} />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Admin Assistants</CardTitle>
                    <CardDescription>Manage administrator access to the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminUsers.map(user => (
                                <TableRow key={user.email}>
                                    <TableCell>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Recent B2B Signups</CardTitle>
                <CardDescription>Onboarding status for new business customers.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Contact Email</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Member Since</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {b2bClients.map(client => (
                            <TableRow key={client.company}>
                                <TableCell className="font-medium">{client.company}</TableCell>
                                <TableCell>{client.contact}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{client.plan}</Badge>
                                </TableCell>
                                <TableCell>{client.since}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
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
