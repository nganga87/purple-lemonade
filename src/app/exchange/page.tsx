
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  ArrowRight,
  ArrowLeftRight,
  Users,
  CandlestickChart,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from '@/lib/utils';

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
}

const marketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 68432.11, change: 1.25, marketCap: '1.35T', icon: 'https://placehold.co/32x32/orange/white.png?text=B' },
  { name: 'Ethereum', symbol: 'ETH', price: 3567.89, change: -0.52, marketCap: '428.6B', icon: 'https://placehold.co/32x32/royalblue/white.png?text=E' },
  { name: 'AddressCoin', symbol: 'AC', price: 1.23, change: 5.78, marketCap: '12.3M', icon: 'https://placehold.co/32x32/green/white.png?text=A' },
  { name: 'Solana', symbol: 'SOL', price: 172.45, change: 2.18, marketCap: '79.1B', icon: 'https://placehold.co/32x32/purple/white.png?text=S' },
  { name: 'Ripple', symbol: 'XRP', price: 0.52, change: -1.13, marketCap: '28.9B', icon: 'https://placehold.co/32x32/grey/white.png?text=X' },
];

const transactionData = [
    { type: 'Buy', asset: 'BTC', amount: '0.05 BTC', value: '$3,421.60', date: '2024-08-15' },
    { type: 'Sell', asset: 'ETH', amount: '1.5 ETH', value: '$5,351.83', date: '2024-08-14' },
    { type: 'Deposit', asset: 'USD', amount: '$5,000.00', value: '', date: '2024-08-12' },
    { type: 'Buy', asset: 'AC', amount: '10,000 AC', value: '$12,300.00', date: '2024-08-11' },
]

export default function ExchangePage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">AddressChain</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <Link href="/dashboard">
                  <SidebarMenuButton>
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="/my-addresses">
                    <SidebarMenuButton>
                    <MapPin />
                    My Addresses
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/register">
                  <SidebarMenuButton>
                    <PlusCircle />
                    Register New Address
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/access-requests">
                  <SidebarMenuButton>
                    <Users />
                    Access Requests
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/exchange">
                    <SidebarMenuButton isActive>
                    <CandlestickChart />
                    Exchange
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-headline font-semibold">Exchange</h1>
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
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar"/>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
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
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Wallet</span>
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
            <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-2 shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">Portfolio Overview</CardTitle>
                        <CardDescription>Your total crypto asset balance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Balance</p>
                                <p className="text-4xl font-bold font-headline">$154,231.87</p>
                                <p className="text-sm text-green-500 flex items-center gap-1">
                                    <TrendingUp className="h-4 w-4"/>
                                    <span>+ $1,234.56 (2.1%) in last 24h</span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button>Deposit</Button>
                                <Button variant="outline">Withdraw</Button>
                            </div>
                        </div>
                         <div className="h-[200px] w-full mt-8">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)}/>
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <defs>
                                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">Quick Trade</CardTitle>
                        <CardDescription>Instantly buy or sell crypto.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label>You sell</label>
                            <div className="flex gap-2">
                                <Input type="number" placeholder="1,000" />
                                <Select defaultValue="usd">
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usd">USD</SelectItem>
                                        <SelectItem value="btc">BTC</SelectItem>
                                        <SelectItem value="eth">ETH</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button variant="ghost" size="icon" className="rounded-full bg-secondary">
                                <ArrowLeftRight className="h-4 w-4" />
                            </Button>
                        </div>
                         <div className="space-y-2">
                            <label>You buy</label>
                            <div className="flex gap-2">
                                <Input type="number" placeholder="0.0146" />
                                 <Select defaultValue="btc">
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="btc">BTC</SelectItem>
                                        <SelectItem value="usd">USD</SelectItem>
                                        <SelectItem value="eth">ETH</SelectItem>
                                         <SelectItem value="ac">AC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button className="w-full">
                            <ArrowLeftRight className="mr-2 h-4 w-4"/>
                            Exchange
                        </Button>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline">Market Overview</CardTitle>
                             <CardDescription>Browse and trade top cryptocurrencies.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Asset</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>24h Change</TableHead>
                                    <TableHead>Market Cap</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {marketData.map((coin) => (
                                    <TableRow key={coin.symbol}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Image src={coin.icon} alt={coin.name} width={32} height={32} data-ai-hint="crypto currency"/>
                                                <div>
                                                    <p className="font-medium">{coin.name}</p>
                                                    <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>${coin.price.toLocaleString()}</TableCell>
                                        <TableCell className={cn(coin.change > 0 ? "text-green-500" : "text-red-500", "flex items-center gap-1")}>
                                            {coin.change > 0 ? <TrendingUp className="h-4 w-4"/> : <TrendingDown className="h-4 w-4"/>}
                                            {coin.change.toFixed(2)}%
                                        </TableCell>
                                        <TableCell>${coin.marketCap}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Buy</DropdownMenuItem>
                                                    <DropdownMenuItem>Sell</DropdownMenuItem>
                                                    <DropdownMenuItem>View Chart</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                 <div>
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline">Recent Transactions</CardTitle>
                             <CardDescription>Your latest account activity.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {transactionData.map((tx, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", tx.type === 'Buy' ? 'bg-green-100' : tx.type === 'Sell' ? 'bg-red-100' : 'bg-blue-100')}>
                                                {tx.type === 'Buy' && <TrendingUp className="h-4 w-4 text-green-600"/>}
                                                {tx.type === 'Sell' && <TrendingDown className="h-4 w-4 text-red-600"/>}
                                                {tx.type === 'Deposit' && <ArrowRight className="h-4 w-4 text-blue-600"/>}
                                            </div>
                                            <div>
                                                <p className="font-medium">{tx.type} {tx.asset}</p>
                                                <p className="text-sm text-muted-foreground">{tx.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn("font-medium", tx.type === 'Buy' && 'text-green-600', tx.type === 'Sell' && 'text-red-600')}>
                                                {tx.type === 'Buy' ? '+' : tx.type === 'Sell' ? '-' : ''} {tx.amount}
                                            </p>
                                            {tx.value && <p className="text-sm text-muted-foreground">{tx.value}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
