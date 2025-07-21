
'use client';

import React, { useState, useMemo } from 'react';
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
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, CheckCircle2, History, MoreHorizontal } from 'lucide-react';
import { AdminLayout } from '../admin-layout';
import { countries } from '@/lib/countries';

const allValidationActivities = [
  { id: 'VAL-001', address: '123 Main St, Anytown, US', date: '2024-08-15', status: 'Verified', validator: 'ValidatorCorp' },
  { id: 'VAL-002', address: '456 Oak Ave, Springfield, US', date: '2024-08-14', status: 'Pending', validator: 'N/A' },
  { id: 'VAL-003', address: '10 Downing St, London, GB', date: '2024-08-12', status: 'Verified', validator: 'UKVerify' },
  { id: 'VAL-004', address: '221B Baker St, London, GB', date: '2024-08-11', status: 'Rejected', validator: 'UKVerify' },
  { id: 'VAL-005', address: '789 Pine Ln, Lakeside, US', date: '2024-08-10', status: 'Verified', validator: 'ValidatorCorp' },
  { id: 'VAL-006', address: '1600 Amphitheatre Pkwy, Mountain View, US', date: '2024-08-09', status: 'Pending', validator: 'N/A' },
  { id: 'VAL-007', address: 'Brandenburg Gate, Berlin, DE', date: '2024-08-08', status: 'Verified', validator: 'DEPrüfung' },
];

export default function AddressAuditPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');

  const filteredActivities = useMemo(() => {
    if (selectedCountry === 'ALL') {
      return allValidationActivities;
    }
    return allValidationActivities.filter(activity => activity.address.endsWith(`, ${selectedCountry}`));
  }, [selectedCountry]);

  return (
    <AdminLayout active="audit">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verified Addresses</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254,890</div>
              <p className="text-xs text-muted-foreground">+5,210 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Validation</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,432</div>
              <p className="text-xs text-muted-foreground">78 new today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries Active</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">+2 since last quarter</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle>Validation Activity</CardTitle>
                    <CardDescription>
                    {selectedCountry === 'ALL' ? 'Global overview of recent address validations.' : `Showing activities for ${countries.find(c => c.code === selectedCountry)?.name}.`}
                    </CardDescription>
                </div>
                <div className="w-full md:w-64">
                    <Select onValueChange={setSelectedCountry} value={selectedCountry}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Countries</SelectItem>
                            {countries.map(country => (
                                <SelectItem key={country.code} value={country.code}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Validator</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.address}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                          activity.status === 'Verified' ? 'default' : activity.status === 'Rejected' ? 'destructive' : 'secondary'
                      } className={
                          activity.status === 'Verified' ? 'bg-green-100 text-green-800' : activity.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                      }>
                          {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.validator}</TableCell>
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
      </main>
    </AdminLayout>
  );
}
