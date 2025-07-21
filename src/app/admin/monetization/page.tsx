
'use client';

import React, { useState } from 'react';
import { AdminLayout } from '../admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUpRight, Edit, MoreHorizontal, Briefcase, Save, ShoppingCart, ArrowLeftRight, FileText, History, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const revenueData = [
  { month: 'Jan', api: 2400, marketplace: 1600 },
  { month: 'Feb', api: 1398, marketplace: 1200 },
  { month: 'Mar', api: 9800, marketplace: 2290 },
  { month: 'Apr', api: 3908, marketplace: 2000 },
  { month: 'May', api: 4800, marketplace: 2181 },
  { month: 'Jun', api: 3800, marketplace: 2500 },
  { month: 'Jul', api: 4300, marketplace: 2100 },
];

const pricingPlans = [
    { name: 'Standard', price: '$49/mo', apiCalls: '10,000/mo', users: 5 },
    { name: 'Pro', price: '$99/mo', apiCalls: '50,000/mo', users: 25 },
    { name: 'Enterprise', price: 'Custom', apiCalls: 'Unlimited', users: 'Unlimited' },
];

const recentTransactions = [
    { id: 'TRN-001', date: '2024-08-15', type: 'Marketplace Sale', amount: '2.5 ETH', details: 'NFT ID 0x...a9b -> 0x...c4d' },
    { id: 'TRN-002', date: '2024-08-14', type: 'API Subscription', amount: '$99.00', details: 'E-Shop Now - Pro Plan' },
    { id: 'TRN-003', date: '2024-08-12', type: 'API Subscription', amount: '$2,500.00', details: 'Global Logistics - Enterprise' },
    { id: 'TRN-004', date: '2024-08-11', type: 'Marketplace Sale', amount: '10.0 ETH', details: 'NFT ID 0x...f9c -> 0x...b2a' },
];

export default function MonetizationPage() {
  const [marketplaceFee, setMarketplaceFee] = useState(2.5);
  const [isMarketplaceActive, setIsMarketplaceActive] = useState(true);
  const [apiFee, setApiFee] = useState(0.001);
  const [isApiActive, setIsApiActive] = useState(true);
  const [lookupFee, setLookupFee] = useState(0.10);
  const [isLookupActive, setIsLookupActive] = useState(true);
  const [handshakeFee, setHandshakeFee] = useState(1.00);
  const [isHandshakeActive, setIsHandshakeActive] = useState(false);
  const [transferFee, setTransferFee] = useState(0.1);
  const [isTransferActive, setIsTransferActive] = useState(true);
  const [mintingFee, setMintingFee] = useState(5.00);
  const [isMintingActive, setIsMintingActive] = useState(true);

  return (
    <AdminLayout active="monetization">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (USD)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,431.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Subscriptions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$98,210.50</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marketplace Fees</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$27,221.39</div>
              <p className="text-xs text-muted-foreground">+45.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Revenue Streams Overview</CardTitle>
                <CardDescription>Monthly income from different platform services.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}K`} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="api" stroke="hsl(var(--primary))" name="API Revenue" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="marketplace" name="Marketplace Fees" stroke="hsl(var(--accent))" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Stream Management</CardTitle>
            <CardDescription>Configure commission rates and activate/deactivate revenue streams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-4 flex-1">
                <ShoppingCart className="h-6 w-6 text-muted-foreground"/>
                <div>
                    <Label htmlFor="marketplace-fee" className="font-semibold">Marketplace Sale Commission</Label>
                    <p className="text-sm text-muted-foreground">Percentage fee for each sale on the Address NFT Marketplace.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <Input 
                    id="marketplace-fee" type="number" value={marketplaceFee}
                    onChange={(e) => setMarketplaceFee(parseFloat(e.target.value))}
                    className="w-full md:w-32 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
                <Switch id="marketplace-switch" checked={isMarketplaceActive} onCheckedChange={setIsMarketplaceActive}/>
                <Button size="sm"><Save className="mr-2 h-4 w-4"/>Save</Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-4 flex-1">
                 <FileText className="h-6 w-6 text-muted-foreground"/>
                 <div>
                    <Label htmlFor="api-fee" className="font-semibold">API Lookup Fee</Label>
                    <p className="text-sm text-muted-foreground">Flat rate fee for each API address lookup request.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="api-fee" type="number" value={lookupFee} onChange={(e) => setLookupFee(parseFloat(e.target.value))} step="0.01" className="w-full md:w-32 pl-7"/>
                </div>
                <Switch id="api-switch" checked={isLookupActive} onCheckedChange={setIsLookupActive}/>
                <Button size="sm"><Save className="mr-2 h-4 w-4"/>Save</Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-4 flex-1">
                 <ArrowLeftRight className="h-6 w-6 text-muted-foreground"/>
                 <div>
                    <Label htmlFor="transfer-fee" className="font-semibold">NFT Transfer Fee</Label>
                    <p className="text-sm text-muted-foreground">Commission on wallet-to-wallet address NFT transfers.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                  <Input id="transfer-fee" type="number" value={transferFee} onChange={(e) => setTransferFee(parseFloat(e.target.value))} step="0.1" className="w-full md:w-32 pr-8"/>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
                <Switch id="transfer-switch" checked={isTransferActive} onCheckedChange={setIsTransferActive}/>
                <Button size="sm"><Save className="mr-2 h-4 w-4"/>Save</Button>
              </div>
            </div>
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-4 flex-1">
                 <History className="h-6 w-6 text-muted-foreground"/>
                 <div>
                    <Label htmlFor="minting-fee" className="font-semibold">Address Minting Fee</Label>
                    <p className="text-sm text-muted-foreground">One-time fee charged for creating a new digital address NFT.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="minting-fee" type="number" value={mintingFee} onChange={(e) => setMintingFee(parseFloat(e.target.value))} step="0.50" className="w-full md:w-32 pl-7"/>
                </div>
                <Switch id="minting-switch" checked={isMintingActive} onCheckedChange={setIsMintingActive}/>
                <Button size="sm"><Save className="mr-2 h-4 w-4"/>Save</Button>
              </div>
            </div>
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-4 flex-1">
                 <Users className="h-6 w-6 text-muted-foreground"/>
                 <div>
                    <Label htmlFor="handshake-fee" className="font-semibold">Handshake Delivery Fee</Label>
                    <p className="text-sm text-muted-foreground">Service fee for verified, in-person "handshake" deliveries.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input id="handshake-fee" type="number" value={handshakeFee} onChange={(e) => setHandshakeFee(parseFloat(e.target.value))} step="0.50" className="w-full md:w-32 pl-7"/>
                </div>
                <Switch id="handshake-switch" checked={isHandshakeActive} onCheckedChange={setIsHandshakeActive}/>
                <Button size="sm"><Save className="mr-2 h-4 w-4"/>Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>API Pricing Plans</CardTitle>
                    <CardDescription>Manage the subscription tiers for B2B clients.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Plan</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>API Calls</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pricingPlans.map((plan) => (
                                <TableRow key={plan.name}>
                                    <TableCell className="font-medium">{plan.name}</TableCell>
                                    <TableCell>{plan.price}</TableCell>
                                    <TableCell>{plan.apiCalls}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>A log of recent high-value transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
                                    <TableCell className="font-mono">{tx.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </main>
    </AdminLayout>
  );
}
