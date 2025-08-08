
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { AppLayout } from '@/components/layout/app-layout';
import {
  DollarSign,
  CheckCircle2,
  History,
  MoreHorizontal,
  PlusCircle,
  BarChart,
  UserCheck,
  UserX,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid
} from 'recharts';

type Expense = {
  id: string;
  date: string;
  category: 'Marketing' | 'Software' | 'Travel' | 'Office Supplies';
  submittedBy: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const initialExpenses: Expense[] = [
  { id: 'exp-1', date: '2024-08-18', category: 'Software', submittedBy: 'Alice Johnson', amount: 49.99, status: 'Approved' },
  { id: 'exp-2', date: '2024-08-17', category: 'Marketing', submittedBy: 'Nicholas C.', amount: 500.00, status: 'Approved' },
  { id: 'exp-3', date: '2024-08-16', category: 'Travel', submittedBy: 'Bob Williams', amount: 1250.75, status: 'Pending' },
  { id: 'exp-4', date: '2024-08-15', category: 'Office Supplies', submittedBy: 'Alice Johnson', amount: 125.50, status: 'Rejected' },
  { id: 'exp-5', date: '2024-08-14', category: 'Software', submittedBy: 'Charlie Brown', amount: 99.00, status: 'Pending' },
];


export default function ExpensesPage() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newExpense, setNewExpense] = useState({
      category: 'Software' as Expense['category'],
      amount: '',
      submittedBy: '',
  });

  const kpiData = useMemo(() => {
    const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const pending = expenses.filter(e => e.status === 'Pending').reduce((acc, exp) => acc + exp.amount, 0);
    const approved = expenses.filter(e => e.status === 'Approved').reduce((acc, exp) => acc + exp.amount, 0);
    return { total, pending, approved };
  }, [expenses]);
  
  const chartData = useMemo(() => {
    const data: { [key: string]: number } = { Marketing: 0, Software: 0, Travel: 0, 'Office Supplies': 0 };
    expenses.forEach(exp => {
        if(exp.status === 'Approved') {
            data[exp.category] = (data[exp.category] || 0) + exp.amount;
        }
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [expenses]);
  
  const handleStatusChange = (id: string, status: 'Approved' | 'Rejected') => {
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, status } : exp));
    toast({ title: "Expense Updated", description: `The expense has been marked as ${status}.`});
  };

  const handleAddExpense = () => {
      if(!newExpense.amount || !newExpense.submittedBy) {
          toast({ variant: 'destructive', title: 'Error', description: 'Please fill in all fields.' });
          return;
      }
      const newEntry: Expense = {
        id: `exp-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        submittedBy: newExpense.submittedBy,
        status: 'Pending',
      }
      setExpenses(prev => [newEntry, ...prev]);
      toast({ title: 'Expense Submitted', description: 'The new expense claim has been added for approval.' });
      setIsDialogOpen(false);
      setNewExpense({ category: 'Software', amount: '', submittedBy: '' });
  };


  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses (This Month)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${kpiData.total.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${kpiData.pending.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From {expenses.filter(e => e.status === 'Pending').length} requests</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Expenses (This Month)</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${kpiData.approved.toFixed(2)}</div>
               <p className="text-xs text-muted-foreground">Total approved expenditures</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
            <Card className="md:col-span-3">
                <CardHeader>
                    <CardTitle>Expense Report</CardTitle>
                    <CardDescription>A list of recent expense claims from team members.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Submitted By</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.map((exp) => (
                            <TableRow key={exp.id}>
                                <TableCell>{exp.submittedBy}</TableCell>
                                <TableCell><Badge variant="outline">{exp.category}</Badge></TableCell>
                                <TableCell className="font-medium">${exp.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={exp.status === 'Approved' ? 'default' : exp.status === 'Rejected' ? 'destructive' : 'secondary'}
                                    className={exp.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                                    >
                                        {exp.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <Button variant="ghost" size="icon" disabled={exp.status !== 'Pending'} onClick={() => handleStatusChange(exp.id, 'Approved')}>
                                        <UserCheck className="h-4 w-4 text-green-600"/>
                                     </Button>
                                     <Button variant="ghost" size="icon" disabled={exp.status !== 'Pending'} onClick={() => handleStatusChange(exp.id, 'Rejected')}>
                                        <UserX className="h-4 w-4 text-red-600"/>
                                     </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                             <Button variant="outline">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Add New Expense Claim
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Expense Claim</DialogTitle>
                                <DialogDescription>
                                    Submit an expense claim for approval.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">Category</Label>
                                    <Select value={newExpense.category} onValueChange={(val) => setNewExpense(s => ({...s, category: val as Expense['category']}))}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a category"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Software">Software</SelectItem>
                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                            <SelectItem value="Travel">Travel</SelectItem>
                                            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">Amount (USD)</Label>
                                    <Input id="amount" type="number" value={newExpense.amount} onChange={e => setNewExpense(s => ({...s, amount: e.target.value}))} className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="submittedBy" className="text-right">Submitted By</Label>
                                    <Input id="submittedBy" value={newExpense.submittedBy} onChange={e => setNewExpense(s => ({...s, submittedBy: e.target.value}))} className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddExpense}>Submit for Approval</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Approved expenses this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart data={chartData}>
                             <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Spending" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </main>
    </AppLayout>
  );
}
