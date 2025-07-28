'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { Download, CreditCard } from 'lucide-react';

const billingHistory = [
  { invoiceId: 'INV-2024-08', date: '2024-08-01', amount: '$5,000.00', status: 'Paid' },
  { invoiceId: 'INV-2024-07', date: '2024-07-01', amount: '$4,850.00', status: 'Paid' },
  { invoiceId: 'INV-2024-06', date: '2024-06-01', amount: '$5,120.00', status: 'Paid' },
  { invoiceId: 'INV-2024-05', date: '2024-05-01', amount: '$4,980.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription tier.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary border">
                <h3 className="text-2xl font-bold text-primary">Enterprise Plan</h3>
                <p className="text-muted-foreground">Unlimited API calls, dedicated support.</p>
            </div>
            <Button>Upgrade Plan</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>The primary payment method for your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 rounded-lg bg-secondary border flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-muted-foreground"/>
                <div>
                    <p className="font-semibold">Visa ending in 1234</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                </div>
            </div>
            <Button variant="outline">Update Payment Method</Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your past invoices and payment history.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map(invoice => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell className="font-mono">{invoice.invoiceId}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
