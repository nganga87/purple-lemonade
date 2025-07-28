'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dailyUsageData = [
  { day: 'Mon', calls: 4000 },
  { day: 'Tue', calls: 3000 },
  { day: 'Wed', calls: 2000 },
  { day: 'Thu', calls: 2780 },
  { day: 'Fri', calls: 1890 },
  { day: 'Sat', calls: 2390 },
  { day: 'Sun', calls: 3490 },
];

const endpointUsageData = [
  { endpoint: '/v1/verify', calls: 45231, successRate: '99.8%', avgLatency: '120ms' },
  { endpoint: '/v1/lookup/{nftId}', calls: 89045, successRate: '99.9%', avgLatency: '85ms' },
  { endpoint: '/v1/report', calls: 1023, successRate: '98.5%', avgLatency: '550ms' },
];

export default function ApiUsagePage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Daily API Usage</CardTitle>
          <CardDescription>Your API call volume for the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calls" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle>Usage by Endpoint</CardTitle>
                    <CardDescription>
                        A breakdown of your API calls by endpoint for the current billing cycle.
                    </CardDescription>
                </div>
                 <Button variant="outline">
                    <Download className="mr-2" />
                    Export Report
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Total Calls</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Avg. Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpointUsageData.map(row => (
                <TableRow key={row.endpoint}>
                  <TableCell className="font-mono">{row.endpoint}</TableCell>
                  <TableCell>{row.calls.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">{row.successRate}</TableCell>
                  <TableCell>{row.avgLatency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
