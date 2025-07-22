
'use client';

import React, { useState } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';
import { OnboardingDialog, Client } from './onboarding-dialog';
import { useToast } from '@/hooks/use-toast';
import { initialClients } from './clients';

export function ClientTable() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toast } = useToast();

  const handleSaveClient = (client: Client) => {
    if (editingClient) {
      // Update existing client
      setClients(clients.map(c => c.id === client.id ? client : c));
      toast({ title: 'Client Updated', description: `${client.companyName} has been updated.` });
    } else {
      // Add new client
      const newClient = { ...client, id: `cli_${Date.now()}` };
      setClients([newClient, ...clients]);
      toast({ title: 'Client Added', description: `${client.companyName} is now pending review.` });
    }
    setEditingClient(null);
  };
  
  const handleEdit = (client: Client) => {
      setEditingClient(client);
      setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingClient(null);
    setIsDialogOpen(true);
  };

  const handleSetStatus = (clientId: string, status: 'Active' | 'Rejected') => {
      setClients(clients.map(c => c.id === clientId ? {...c, status} : c));
      const clientName = clients.find(c => c.id === clientId)?.companyName;
      toast({ title: `Client ${status}`, description: `${clientName} has been marked as ${status.toLowerCase()}.` });
  }

  const handleDelete = (clientId: string) => {
      const clientName = clients.find(c => c.id === clientId)?.companyName;
      setClients(clients.filter(c => c.id !== clientId));
      toast({ variant: 'destructive', title: `Client Deleted`, description: `${clientName} has been removed.` });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>B2B Client Management</CardTitle>
            <CardDescription>
              Onboard, review, and manage your business clients.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2" />
            Add New Client
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Onboarded Since</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.companyName}</TableCell>
                <TableCell>
                    <Badge variant={
                        client.status === 'Active' ? 'default' : client.status === 'Rejected' ? 'destructive' : 'secondary'
                    } className={
                        client.status === 'Active' ? 'bg-green-100 text-green-800' : client.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                    }>
                        {client.status}
                    </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{client.plan}</Badge>
                </TableCell>
                <TableCell>{client.contactName}</TableCell>
                <TableCell>{client.onboardedSince}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       {client.status === 'Pending Review' && (
                           <>
                                <DropdownMenuItem onClick={() => handleSetStatus(client.id, 'Active')}>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleSetStatus(client.id, 'Rejected')}>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Reject
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                           </>
                       )}
                       <DropdownMenuItem onClick={() => handleEdit(client)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(client.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <OnboardingDialog 
            isOpen={isDialogOpen} 
            setIsOpen={setIsDialogOpen}
            onSave={handleSaveClient}
            client={editingClient}
        />
    </Card>
  );
}
