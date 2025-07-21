
'use client';

import React from 'react';
import Link from 'next/link';
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
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  MoreHorizontal,
  DollarSign,
  ShieldCheck,
  Briefcase,
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const adminUsers = [
    { name: 'Alice Johnson', email: 'alice.j@digitaladdress.com', role: 'Super Admin', status: 'Active' },
    { name: 'Bob Williams', email: 'bob.w@digitaladdress.com', role: 'Admin Assistant', status: 'Active' },
    { name: 'Charlie Brown', email: 'charlie.b@digitaladdress.com', role: 'Admin Assistant', status: 'Inactive' },
]

const b2bClients = [
    { company: 'Global Logistics', contact: 'd.smith@globallogistics.com', plan: 'Enterprise', since: '2024-05-10'},
    { company: 'E-Shop Now', contact: 'manager@eshopnow.com', plan: 'Standard', since: '2024-06-22'},
    { company: 'Finance Corp', contact: 'compliance@financecorp.com', plan: 'Enterprise', since: '2024-07-01'},
]

export default function AdminDashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href="/admin/dashboard" className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">Admin Portal</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton href="/admin/dashboard" isActive>
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton href="#">
                  <Users />
                  User Management
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Briefcase />
                  B2B Clients
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton href="#">
                  <ShieldCheck />
                  Address Audit
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <DollarSign />
                  Monetization
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Platform Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-headline font-semibold">Administrator Dashboard</h1>
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
                      <AvatarImage src="https://placehold.co/100x100.png" alt="Admin avatar" data-ai-hint="person avatar"/>
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Nicholas C.</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        nicholas@digitaladdress.com
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

    