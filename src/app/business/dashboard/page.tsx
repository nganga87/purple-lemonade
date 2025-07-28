
'use client';

import React from 'react';
import {
  DollarSign,
  Users,
  Briefcase,
  MoreHorizontal,
  BarChart2,
  TrendingUp,
  FileText,
  KeyRound,
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
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const apiUsageData = [
  { name: 'Jan', lookups: 4000, verifications: 2400 },
  { name: 'Feb', lookups: 3000, verifications: 1398 },
  { name: 'Mar', lookups: 2000, verifications: 9800 },
  { name: 'Apr', lookups: 2780, verifications: 3908 },
  { name: 'May', lookups: 1890, verifications: 4800 },
  { name: 'Jun', lookups: 2390, verifications: 3800 },
  { name: 'Jul', lookups: 3490, verifications: 4300 },
];

const recentTransactions = [
    { id: 'TXN-001', type: 'API Lookup', status: 'Success', amount: '$0.01', date: '2024-08-15 10:30 AM'},
    { id: 'TXN-002', type: 'Address Verification', status: 'Success', amount: '$0.05', date: '2024-08-15 10:28 AM'},
    { id: 'TXN-003', type: 'API Lookup', status: 'Failed', amount: '$0.00', date: '2024-08-15 10:25 AM'},
    { id: 'TXN-004', type: 'Batch Verification', status: 'Success', amount: '$2.50', date: '2024-08-14 04:00 PM'},
];


export default function BusinessDashboardPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Calls Today</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">15,231</div>
                <p className="text-xs text-muted-foreground">+12.5% from yesterday</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Active Users (MAU)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2,350,102</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gross Transaction Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$21,573.12</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
        </Card>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>API Usage Overview</CardTitle>
                <CardDescription>Monthly API call volume for your account.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={apiUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}K`} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="lookups" name="Lookups" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="verifications" name="Verifications" stroke="hsl(var(--accent))" />
                </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access key areas of your business portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start">
                    <Link href="/business/api-keys"><KeyRound/> View API Keys</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                    <Link href="/business/billing"><DollarSign/> Manage Billing & Plans</Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                    <Link href="/docs"><FileText/> Read Documentation</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
     <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A log of your recent API-related charges.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentTransactions.map(transaction => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-mono">{transaction.id}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>
                                <Badge variant={transaction.status === 'Success' ? 'secondary' : 'destructive'} className={transaction.status === 'Success' ? 'bg-green-100 text-green-800' : ''}>
                                    {transaction.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
        </CardContent>
     </Card>
    </main>
  );
}
