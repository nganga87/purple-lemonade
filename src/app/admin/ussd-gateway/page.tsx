
'use client';

import React, { useState } from 'react';
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
import { BarChart, CheckCircle2, History, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const mockSessions = [
    { id: 'SESS_1', phone: '+254712345678', lastAction: 'MainMenu', status: 'Active', timestamp: '2024-08-20 10:30 AM' },
    { id: 'SESS_2', phone: '+254787654321', lastAction: 'EnterAddress', status: 'Active', timestamp: '2024-08-20 10:28 AM' },
    { id: 'SESS_3', phone: '+254722222222', lastAction: 'ConfirmRegistration', status: 'Completed', timestamp: '2024-08-20 10:25 AM' },
    { id: 'SESS_4', phone: '+254733333333', lastAction: 'MainMenu', status: 'TimedOut', timestamp: '2024-08-20 10:20 AM' },
];

export default function UssdGatewayPage() {
    const { toast } = useToast();
    const [welcomeMessage, setWelcomeMessage] = useState('Welcome to Digital Address. Reply with:\n1. Register Address\n2. View My Addresses');
    const [sessionTimeout, setSessionTimeout] = useState('120');

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "USSD gateway settings have been updated successfully.",
        });
    };

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions (24h)</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-muted-foreground">+15.2% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11,987</div>
              <p className="text-xs text-muted-foreground">95.5% success rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Live sessions right now</p>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Live USSD Session Logs</CardTitle>
                <CardDescription>A real-time stream of user interactions with the USSD service.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Last Action</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockSessions.map((session) => (
                        <TableRow key={session.id}>
                            <TableCell className="font-mono">{session.phone}</TableCell>
                            <TableCell>{session.lastAction}</TableCell>
                            <TableCell>
                                <Badge variant={session.status === 'Active' ? 'default' : session.status === 'Completed' ? 'secondary' : 'destructive'}
                                className={session.status === 'Active' ? 'bg-blue-100 text-blue-800' : session.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                                >
                                    {session.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{session.timestamp}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>USSD Gateway Configuration</CardTitle>
                <CardDescription>Manage the text and behavior of your USSD service menus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="welcome-message">Main Menu / Welcome Message</Label>
                    <Textarea 
                        id="welcome-message" 
                        value={welcomeMessage} 
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        rows={4}
                        placeholder="CON Welcome to Digital Address..."
                    />
                    <p className="text-xs text-muted-foreground">Use 'CON' for menus that expect a response, and 'END' for final messages.</p>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (seconds)</Label>
                    <Input 
                        id="session-timeout" 
                        type="number" 
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        className="max-w-xs"
                    />
                     <p className="text-xs text-muted-foreground">Time in seconds before an inactive USSD session is automatically terminated.</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4"/>
                    Save Configuration
                </Button>
            </CardFooter>
        </Card>
      </main>
    </AppLayout>
  );
}
