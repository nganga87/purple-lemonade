
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppLayout } from '@/components/layout/app-layout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockCompanies = [
  { id: 'GL', name: 'Global Logistics', symbol: 'GLOG', price: 125.4, change: 1.25, changePercent: 1.01 },
  { id: 'ESN', name: 'E-Shop Now', symbol: 'ESHP', price: 88.2, change: -0.75, changePercent: -0.84 },
  { id: 'QC', name: 'Quick Couriers', symbol: 'QCR', price: 45.9, change: 2.1, changePercent: 4.78 },
  { id: 'FV', name: 'Future Ventures', symbol: 'FVEN', price: 210.0, change: -5.5, changePercent: -2.56 },
];

const generateChartData = () => {
  const data = [];
  let price = 120 + Math.random() * 10;
  for (let i = 0; i < 30; i++) {
    price += (Math.random() - 0.5) * 5;
    data.push({ name: `Day ${i + 1}`, price: parseFloat(price.toFixed(2)) });
  }
  return data;
};

const generateOrderBookData = (isBuy: boolean) => {
    const data = [];
    let price = 125.4 + (isBuy ? -0.1 : 0.1) * (Math.random() * 5);
    for (let i = 0; i < 10; i++) {
        price += (isBuy ? -0.05 : 0.05) * (Math.random());
        const size = Math.floor(Math.random() * 500) + 50;
        data.push({ price: price.toFixed(2), size, total: (price * size).toFixed(2) });
    }
    return data;
}

const generateTradeHistory = () => {
    const data = [];
    for (let i = 0; i < 15; i++) {
        const type: 'buy' | 'sell' = Math.random() > 0.5 ? 'buy' : 'sell';
        const price = 125.4 + (Math.random() - 0.5) * 1;
        const amount = Math.floor(Math.random() * 200) + 10;
        data.push({ time: new Date(Date.now() - i * 5000).toLocaleTimeString(), type, price: price.toFixed(2), amount });
    }
    return data;
};

const userPortfolio = [
    { symbol: 'GLOG', shares: 150, avgCost: 110.5, marketValue: 18810 },
    { symbol: 'ESHP', shares: 50, avgCost: 90.0, marketValue: 4410 },
]

function OrderForm({ side, onSubmit }: { side: 'Buy' | 'Sell', onSubmit: () => void }) {
    const [orderType, setOrderType] = useState('market');
    return (
        <div className="p-4 space-y-4">
            <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                    <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-4">
                {orderType !== 'market' && (
                    <div className="space-y-1">
                        <label className="text-xs">Price (USD)</label>
                        <Input type="number" placeholder="Price" />
                    </div>
                )}
                <div className="space-y-1 col-span-2">
                    <label className="text-xs">Amount (Shares)</label>
                    <Input type="number" placeholder="Amount" />
                </div>
            </div>
            <Button className={`w-full ${side === 'Buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`} onClick={onSubmit}>
                {side}
            </Button>
        </div>
    );
}

function OrderBookTable({ title, data, colorClass }: { title: string, data: any[], colorClass: string }) {
    return (
        <div>
            <h3 className="p-2 font-semibold text-sm">{title}</h3>
            <Table>
                 <TableHeader>
                    <TableRow>
                        <TableHead>Price (USD)</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((order, i) => (
                        <TableRow key={i}>
                            <TableCell className={colorClass}>{order.price}</TableCell>
                            <TableCell>{order.size}</TableCell>
                            <TableCell className="text-right">{order.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default function ShareMarketPage() {
  const [selectedCompany, setSelectedCompany] = useState(mockCompanies[0]);
  const [chartData, setChartData] = useState(generateChartData());
  const [orderBook, setOrderBook] = useState({ bids: generateOrderBookData(true), asks: generateOrderBookData(false) });
  const [tradeHistory, setTradeHistory] = useState(generateTradeHistory());
  const { toast } = useToast();

  const handlePlaceOrder = (side: 'Buy' | 'Sell') => {
      toast({
          title: 'Order Placed',
          description: `${side} order for ${selectedCompany.symbol} has been successfully placed.`
      });
  }

  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel: Instrument List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Instruments</CardTitle>
                <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search shares..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCompanies.map(c => (
                       <TableRow 
                         key={c.id} 
                         onClick={() => setSelectedCompany(c)} 
                         className={`cursor-pointer ${selectedCompany.id === c.id ? 'bg-secondary' : ''}`}
                       >
                         <TableCell>
                           <div className="font-bold">{c.symbol}</div>
                           <div className="text-xs text-muted-foreground">{c.name}</div>
                         </TableCell>
                         <TableCell className="text-right">
                            <div className={`font-semibold ${c.change > 0 ? 'text-green-600' : 'text-red-600'}`}>{c.price.toFixed(2)}</div>
                         </TableCell>
                       </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel: Chart and Order Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                                <img src={`https://placehold.co/32x32.png?text=${selectedCompany.symbol.charAt(0)}`} alt={selectedCompany.name} className="h-8 w-8 rounded-full" />
                                {selectedCompany.name} ({selectedCompany.symbol})
                            </CardTitle>
                             <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-3xl font-bold">{selectedCompany.price.toFixed(2)}</p>
                                <p className={`flex items-center gap-1 font-semibold ${selectedCompany.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {selectedCompany.change > 0 ? <ArrowUp className="h-4 w-4"/> : <ArrowDown className="h-4 w-4"/>}
                                    {selectedCompany.change.toFixed(2)} ({selectedCompany.changePercent.toFixed(2)}%)
                                </p>
                            </div>
                        </div>
                         <div className="flex gap-2">
                            <Button variant="outline" size="sm">1D</Button>
                            <Button variant="outline" size="sm">5D</Button>
                            <Button variant="outline" size="sm">1M</Button>
                            <Button variant="outline" size="sm">6M</Button>
                            <Button variant="outline" size="sm">1Y</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px] w-full p-0">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#priceGradient)" strokeWidth={2}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Tabs defaultValue="buy">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy">
                    <OrderForm side="Buy" onSubmit={() => handlePlaceOrder('Buy')} />
                  </TabsContent>
                   <TabsContent value="sell">
                     <OrderForm side="Sell" onSubmit={() => handlePlaceOrder('Sell')} />
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>

          {/* Right Panel: Order Book and Trade History */}
           <div className="lg:col-span-1">
            <Tabs defaultValue="order-book" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="order-book">Order Book</TabsTrigger>
                <TabsTrigger value="trade-history">Trade History</TabsTrigger>
              </TabsList>
              <TabsContent value="order-book">
                <Card>
                    <CardContent className="p-0">
                        <OrderBookTable title="Bids" data={orderBook.bids} colorClass="text-green-500" />
                        <OrderBookTable title="Asks" data={orderBook.asks} colorClass="text-red-500" />
                    </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="trade-history">
                 <Card>
                    <CardContent className="p-0">
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tradeHistory.map((trade, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="text-xs">{trade.time}</TableCell>
                                        <TableCell className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>{trade.price}</TableCell>
                                        <TableCell className="text-right">{trade.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                 </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Shares</TableHead>
                            <TableHead>Avg. Cost</TableHead>
                            <TableHead>Market Value</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userPortfolio.map(p => (
                            <TableRow key={p.symbol}>
                                <TableCell className="font-semibold">{p.symbol}</TableCell>
                                <TableCell>{p.shares}</TableCell>
                                <TableCell>${p.avgCost.toFixed(2)}</TableCell>
                                <TableCell>${p.marketValue.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Trade</Button>
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
