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
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { UserDialog, type AdminUser } from './user-dialog';
import { useToast } from '@/hooks/use-toast';
import { roles } from './roles';
import { initialUsers } from './users';


export function UserTable() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();

  const handleSaveUser = (user: AdminUser) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === user.id ? user : u));
      toast({ title: 'User Updated', description: `${user.name}'s details have been updated.` });
    } else {
      const newUser = { ...user, id: `usr_${Date.now()}` };
      setUsers(prevUsers => [newUser, ...prevUsers]);
      toast({ title: 'User Added', description: `${user.name} has been added to the system.` });
    }
    setEditingUser(null);
  };
  
  const handleEdit = (user: AdminUser) => {
      setEditingUser(user);
      setIsDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (userId: string) => {
      const userName = users.find(u => u.id === userId)?.name;
      setUsers(users.filter(u => u.id !== userId));
      toast({ variant: 'destructive', title: `User Deleted`, description: `${userName} has been removed from the system.` });
  }

  const handleSetStatus = (userId: string, status: AdminUser['status']) => {
      setUsers(users.map(u => u.id === userId ? {...u, status} : u));
      const userName = users.find(u => u.id === userId)?.name;
      toast({ title: `Status Updated`, description: `${userName}'s status has been set to ${status}.` });
  }

  const getRoleName = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.name || roleId;
  }
  
  const getStatusBadgeVariant = (status: AdminUser['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800';
      case 'Inactive':
      default:
        return 'secondary';
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>Internal User Management</CardTitle>
            <CardDescription>
              Onboard, manage roles, and set permissions for your team.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2" />
            Add New User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                </TableCell>
                <TableCell>
                    <Badge variant="outline">{getRoleName(user.role)}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={getStatusBadgeVariant(user.status)}>
                        {user.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem onClick={() => handleEdit(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                       <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Active')} disabled={user.status === 'Active'}>
                              Mark as Active
                            </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Pending Approval')} disabled={user.status === 'Pending Approval'}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Suspended')} disabled={user.status === 'Suspended'}>
                              Mark as Suspended
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSetStatus(user.id, 'Inactive')} disabled={user.status === 'Inactive'}>
                              Mark as Inactive
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                       </DropdownMenuSub>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)} disabled={user.role === 'super-admin'}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <UserDialog 
            isOpen={isDialogOpen} 
            setIsOpen={setIsDialogOpen}
            onSave={handleSaveUser}
            user={editingUser}
        />
    </Card>
  );
}