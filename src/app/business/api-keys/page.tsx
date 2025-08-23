
'use client';

import React, { useState } from 'react';
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
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  PlusCircle,
  Copy,
  Trash2,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ApiKey = {
  id: string;
  name: string;
  key: string;
  status: 'Active' | 'Revoked';
  createdDate: string;
  lastUsed: string;
};

const initialKeys: ApiKey[] = [
  {
    id: 'key_1',
    name: 'Default Production Key',
    key: '',
    status: 'Active',
    createdDate: '2024-05-10',
    lastUsed: '2024-08-19',
  },
  {
    id: 'key_2',
    name: 'Staging Environment Key',
    key: '',
    status: 'Active',
    createdDate: '2024-06-15',
    lastUsed: '2024-08-18',
  },
  {
    id: 'key_3',
    name: 'Old Integration Key',
    key: '',
    status: 'Revoked',
    createdDate: '2023-01-20',
    lastUsed: '2024-05-09',
  },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(initialKeys);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: 'API Key Copied', description: 'The key has been copied to your clipboard.' });
  };

  const toggleRevealKey = (keyId: string) => {
    setRevealedKey(prev => (prev === keyId ? null : keyId));
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage your API keys for accessing the Digital Address services.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2" />
            Create New Key
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map(apiKey => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">
                        {revealedKey === apiKey.id
                          ? apiKey.key
                          : `${apiKey.key.slice(0, 8)}...${apiKey.key.slice(-4)}`}
                      </span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleRevealKey(apiKey.id)}>
                        {revealedKey === apiKey.id ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={apiKey.status === 'Active' ? 'default' : 'destructive'} className={apiKey.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{apiKey.createdDate}</TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleCopyKey(apiKey.key)}>
                          <Copy className="mr-2" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2" />
                          Revoke Key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
