
'use client';

import React, { useState } from 'react';
import { AdminLayout } from '../admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DollarSign, ArrowUpRight, Edit, MoreHorizontal, Briefcase, Save, ShoppingCart, ArrowLeftRight, FileText, History, Users, PlusCircle, Trash2, Globe, ShieldAlert } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { pricingPlans } from '../pricing-data';


const revenueData = [
  { month: 'Jan', api: 2400, marketplace: 1600 },
  { month: 'Feb', api: 1398, marketplace: 1200 },
  { month: 'Mar', api: 9800, marketplace: 2290 },
  { month: 'Apr', api: 3908, marketplace: 2000 },
  { month: 'May', api: 4800, marketplace: 2181 },
  { month: 'Jun', api: 3800, marketplace: 2500 },
  { month: 'Jul', api: 4300, marketplace: 2100 },
];

const initialRevenueStreams = [
    { id: 'marketplace', name: 'Marketplace Sale Commission', description: 'Percentage fee for each sale on the Address NFT Marketplace.', value: 2.5, type: 'percentage', isActive: true, icon: ShoppingCart },
    { id: 'api_lookup', name: 'API Lookup Fee', description: 'Flat rate fee for each API address lookup request.', value: 0.10, type: 'flat', isActive: true, icon: FileText },
    { id: 'transfer', name: 'NFT Transfer Fee', description: 'Commission on wallet-to-wallet address NFT transfers.', value: 0.1, type: 'percentage', isActive: true, icon: ArrowLeftRight },
    { id: 'minting', name: 'Address Minting Fee', description: 'One-time fee charged for creating a new digital address NFT.', value: 5.00, type: 'flat', isActive: true, icon: History },
    { id: 'handshake', name: 'Handshake Delivery Fee', description: 'Service fee for verified, in-person "handshake" deliveries.', value: 1.00, type: 'flat', isActive: false, icon: Users },
];

const initialTaxRules = [
    { id: 'tax-1', jurisdiction: 'California, US', rate: '8.25%', type: 'Sales Tax' },
    { id: 'tax-2', jurisdiction: 'United Kingdom', rate: '20.0%', type: 'VAT' },
    { id: 'tax-3', jurisdiction: 'Quebec, CA', rate: '14.975%', type: 'GST + QST' },
];

type RevenueStream = {
    id: string;
    name: string;
    description: string;
    value: number;
    type: 'percentage' | 'flat';
    isActive: boolean;
    icon: React.ComponentType<any>;
}

type TaxRule = {
    id: string;
    jurisdiction: string;
    rate: string;
    type: string;
}

export default function MonetizationPage() {
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>(initialRevenueStreams);
  const [taxRules, setTaxRules] = useState<TaxRule[]>(initialTaxRules);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStream, setNewStream] = useState({ name: '', description: '', type: 'percentage' as 'percentage' | 'flat', value: 0 });
  const { toast } = useToast();

  const [newTaxCountry, setNewTaxCountry] = useState('');
  const [newTaxState, setNewTaxState] = useState('');
  const [newTaxRate, setNewTaxRate] = useState('');
  const [newTaxType, setNewTaxType] = useState('Sales Tax');


  const handleStreamChange = (id: string, field: 'value' | 'isActive', value: number | boolean) => {
    setRevenueStreams(prevStreams =>
      prevStreams.map(stream =>
        stream.id === id ? { ...stream, [field]: value } : stream
      )
    );
  };

  const handleDeleteStream = (id: string) => {
    setRevenueStreams(prevStreams => prevStreams.filter(stream => stream.id !== id));
    toast({
        variant: "destructive",
        title: "Revenue Stream Deleted",
        description: "The revenue stream has been successfully removed.",
    });
  };

  const handleAddNewStream = () => {
    if (!newStream.name || !newStream.description) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Stream name and description are required.",
        });
        return;
    }
    const newId = newStream.name.toLowerCase().replace(/\s+/g, '_');
    const newRevenueStream: RevenueStream = {
        ...newStream,
        id: newId,
        isActive: true,
        icon: FileText, // Default icon for new streams
    };
    setRevenueStreams(prev => [...prev, newRevenueStream]);
    toast({
        title: "Revenue Stream Added",
        description: `Successfully added "${newStream.name}".`,
    });
    setNewStream({ name: '', description: '', type: 'percentage', value: 0 });
    setIsAddDialogOpen(false);
  };
  
  const handleAddTaxRule = () => {
    if (!newTaxCountry || !newTaxRate || !newTaxType) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Country, Tax Rate, and Tax Type are required.",
        });
        return;
    }
    const countryName = countries.find(c => c.code === newTaxCountry)?.name || newTaxCountry;
    const jurisdiction = newTaxState ? `${newTaxState}, ${countryName}` : countryName;

    const newRule: TaxRule = {
        id: `tax-${Date.now()}`,
        jurisdiction,
        rate: `${parseFloat(newTaxRate).toFixed(2)}%`,
        type: newTaxType
    };

    setTaxRules(prev => [...prev, newRule]);
    toast({
        title: "Tax Rule Added",
        description: `Rule for ${jurisdiction} has been added.`,
    });
    
    // Reset form
    setNewTaxCountry('');
    setNewTaxState('');
    setNewTaxRate('');
    setNewTaxType('Sales Tax');
  };

  const handleDeleteTaxRule = (id: string) => {
      setTaxRules(prev => prev.filter(rule => rule.id !== id));
      toast({
          variant: 'destructive',
          title: "Tax Rule Deleted",
          description: "The selected tax rule has been removed.",
      });
  };


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
             {revenueStreams.map(stream => {
                const Icon = stream.icon;
                return (
                 <div key={stream.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Icon className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <Label htmlFor={`${stream.id}-fee`} className="font-semibold">{stream.name}</Label>
                            <p className="text-sm text-muted-foreground">{stream.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                          {stream.type === 'flat' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>}
                          <Input 
                            id={`${stream.id}-fee`} type="number" value={stream.value}
                            onChange={(e) => handleStreamChange(stream.id, 'value', parseFloat(e.target.value))}
                            step={stream.type === 'percentage' ? "0.1" : "0.01"}
                            className={`w-full md:w-32 ${stream.type === 'flat' ? 'pl-7' : 'pr-8'}`}
                          />
                          {stream.type === 'percentage' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>}
                        </div>
                        <Switch id={`${stream.id}-switch`} checked={stream.isActive} onCheckedChange={(checked) => handleStreamChange(stream.id, 'isActive', checked)}/>
                        <Button size="sm" variant="ghost"><Save className="h-4 w-4"/> <span className="sr-only">Save</span></Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDeleteStream(stream.id)}><Trash2 className="h-4 w-4"/><span className="sr-only">Delete</span></Button>
                    </div>
                 </div>
                );
             })}
          </CardContent>
          <CardFooter>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add New Revenue Stream
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Revenue Stream</DialogTitle>
                        <DialogDescription>
                            Define a new fee or commission to be charged on the platform.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={newStream.name} onChange={(e) => setNewStream(s => ({...s, name: e.target.value}))} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">Description</Label>
                            <Textarea id="description" value={newStream.description} onChange={(e) => setNewStream(s => ({...s, description: e.target.value}))} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Type</Label>
                            <RadioGroup defaultValue="percentage" className="col-span-3 flex gap-4" value={newStream.type} onValueChange={(value) => setNewStream(s => ({...s, type: value as 'percentage' | 'flat'}))}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="percentage" id="r-percentage" />
                                    <Label htmlFor="r-percentage">Percentage</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="flat" id="r-flat" />
                                    <Label htmlFor="r-flat">Flat Fee</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="value" className="text-right">Value</Label>
                            <div className="relative col-span-3">
                                {newStream.type === 'flat' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>}
                                <Input id="value" type="number" value={newStream.value} onChange={(e) => setNewStream(s => ({...s, value: parseFloat(e.target.value) || 0}))} className={newStream.type === 'flat' ? 'pl-7' : 'pr-8'}/>
                                {newStream.type === 'percentage' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleAddNewStream}>Add Stream</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Tax Management</CardTitle>
                <CardDescription>Set and manage tax rates for different jurisdictions.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div className="p-4 rounded-lg border bg-secondary/50">
                    <h4 className="font-semibold mb-4">Add New Tax Rule</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1 md:col-span-2">
                            <Label>Jurisdiction</Label>
                            <div className="flex gap-2">
                                <Select onValueChange={setNewTaxCountry} value={newTaxCountry}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map(country => (
                                            <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input placeholder="State/Province (Optional)" value={newTaxState} onChange={(e) => setNewTaxState(e.target.value)}/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="tax-rate">Tax Rate</Label>
                             <div className="relative">
                                <Input id="tax-rate" type="number" placeholder="e.g., 8.25" value={newTaxRate} onChange={(e) => setNewTaxRate(e.target.value)} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                            </div>
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="tax-type">Tax Type</Label>
                            <Input id="tax-type" placeholder="e.g., VAT, Sales Tax" value={newTaxType} onChange={(e) => setNewTaxType(e.target.value)} />
                        </div>
                        <Button onClick={handleAddTaxRule} className="w-full">Add Tax Rule</Button>
                    </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Active Tax Rules</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Jurisdiction</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taxRules.map(rule => (
                           <TableRow key={rule.id}>
                            <TableCell className="font-medium">{rule.jurisdiction}</TableCell>
                            <TableCell>{rule.rate}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{rule.type}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                               <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                               <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteTaxRule(rule.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
            </CardContent>
        </Card>

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
      </main>
    </AdminLayout>
  );
}
