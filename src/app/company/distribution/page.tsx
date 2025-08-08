'use client';

import React from 'react';
import CompanyLayout from '../layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, DollarSign, Package, PieChart, ArrowRight, BarChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, Pie, Cell, Tooltip } from 'recharts';

const capTableData = [
  { class: 'Founders Shares', minted: '1,000,000', treasury: '800,000', distributed: '200,000', value: '$1,000,000' },
  { class: 'Series A', minted: '500,000', treasury: '500,000', distributed: '0', value: '$750,000' },
  { class: 'Employee Pool', minted: '250,000', treasury: '250,000', distributed: '0', value: '$250,000' },
];

const chartData = [
    { name: 'Founders', value: 1000000 },
    { name: 'Series A', value: 500000 },
    { name: 'Employee Pool', value: 250000 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function DistributionPage() {

    return (
        <CompanyLayout>
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Tokenized Value</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$2,000,000</div>
                            <p className="text-xs text-muted-foreground">Based on last funding round</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Shares Minted</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,750,000</div>
                            <p className="text-xs text-muted-foreground">Across all share classes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Share Classes</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Active on cap table</p>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Capitalization Table</CardTitle>
                            <CardDescription>
                                Overview of your company's tokenized equity.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Share Class</TableHead>
                                        <TableHead>Minted</TableHead>
                                        <TableHead>In Treasury</TableHead>
                                        <TableHead>Distributed</TableHead>
                                        <TableHead>Est. Value</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {capTableData.map((row) => (
                                        <TableRow key={row.class}>
                                            <TableCell><Badge variant="outline">{row.class}</Badge></TableCell>
                                            <TableCell>{row.minted}</TableCell>
                                            <TableCell>{row.treasury}</TableCell>
                                            <TableCell>{row.distributed}</TableCell>
                                            <TableCell>{row.value}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="outline">
                                                    Distribute <ArrowRight className="ml-2 h-4 w-4"/>
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
                            <CardTitle>Share Class Breakdown</CardTitle>
                            <CardDescription>Visual distribution of minted shares.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[250px]">
                           <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        nameKey="name"
                                        label={(entry) => `${entry.name} (${(entry.percent * 100).toFixed(0)}%)`}
                                    >
                                        {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                 <div className="flex justify-end">
                    <Button variant="outline">
                        <Download className="mr-2"/>
                        Download Full Cap Table (CSV)
                    </Button>
                </div>
            </main>
        </CompanyLayout>
    );
}
