
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
import { Globe, CheckCircle2, History, MoreHorizontal, Search, Loader2 } from 'lucide-react';
import { AdminLayout } from '../admin-layout';
import { countries } from '@/lib/countries';
import { Input } from '@/components/ui/input';
import { findAddressByClue, type FindAddressByClueOutput } from '@/ai/flows/find-address-by-clue';
import { useToast } from '@/hooks/use-toast';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FindAddressByClueOutput | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults(null);
    try {
      const results = await findAddressByClue({ clue: searchQuery });
      setSearchResults(results);
       if (results.foundAddresses.length === 0) {
        toast({
          title: "No Results Found",
          description: "The search query did not match any records.",
        });
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const filteredActivities = useMemo(() => {
    if (selectedCountry === 'ALL') {
      return allValidationActivities;
    }
    return allValidationActivities.filter(activity => activity.address.endsWith(`, ${selectedCountry}`));
  }, [selectedCountry]);
  
   const getStatusBadge = (status: 'Verified' | 'Pending' | 'Compromised' | 'Rejected') => {
    switch (status) {
      case 'Verified':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Compromised':
        return <Badge variant="destructive">Compromised</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }

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
                <CardTitle>Identity Search</CardTitle>
                <CardDescription>
                    In an emergency, find a user's address with any clue (name, ID, phone, etc.).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Enter a name, email, address fragment, phone, or ID number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                        {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Search
                    </Button>
                </div>
            </CardContent>
            {isSearching && (
              <CardFooter>
                  <p className="text-sm text-muted-foreground">Searching immutable records...</p>
              </CardFooter>
            )}
             {searchResults && searchResults.foundAddresses.length > 0 && (
                <CardContent>
                    <h3 className="font-semibold mb-2">Search Results</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Owner</TableHead>
                                <TableHead>Physical Address</TableHead>
                                <TableHead>NFT ID</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {searchResults.foundAddresses.map(result => (
                                <TableRow key={result.nftId}>
                                    <TableCell>{result.ownerName}</TableCell>
                                    <TableCell>{result.physicalAddress}</TableCell>
                                    <TableCell className="font-mono">{result.nftId}</TableCell>
                                    <TableCell>{getStatusBadge(result.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <CardTitle>Validation Activity Log</CardTitle>
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
                      {getStatusBadge(activity.status as 'Verified' | 'Pending' | 'Rejected')}
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
