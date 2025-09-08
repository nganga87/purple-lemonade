'use client';

import React, { useState, useEffect } from 'react';
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2, KeyRound, ShieldQuestion } from 'lucide-react';
import { UserDialog, type AdminUser } from './user-dialog';
import { useToast } from '@/hooks/use-toast';
import { roles } from './roles';
// Removed localStorage seeding; now using PostgreSQL-backed API endpoints
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export function UserTable() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isSecurityDialogOpen, setIsSecurityDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [selectedUserForSecurity, setSelectedUserForSecurity] = useState<AdminUser | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data as AdminUser[]);
      } catch (e) {
        console.error('Failed to load users:', e);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load users from server.' });
      }
    };
    load();
  }, []);

  const refreshUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data as AdminUser[]);
    } catch (e) {
      console.error('Failed to refresh users:', e);
    }
  };

  const handleSaveUser = (user: AdminUser) => {
    const save = async () => {
      try {
        if (editingUser && user.id) {
          const res = await fetch(`/api/admin/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });
          if (!res.ok) throw new Error('Failed to update user');
          toast({ title: 'User Updated', description: `${user.name}'s details have been updated.` });
        } else {
          const payload = { ...user };
          // Ensure required fields for API
          if (!('password' in payload) || !payload.password) {
            (payload as any).password = 'Temp#12345'; // placeholder; real app should invite user to set password
          }
          const res = await fetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error('Failed to add user');
          toast({ title: 'User Added', description: `${user.name} has been added to the system.` });
        }
        await refreshUsers();
        setEditingUser(null);
      } catch (e) {
        console.error(e);
        toast({ variant: 'destructive', title: 'Save Failed', description: 'Could not save user.' });
      }
    };
    void save();
  };
  
  const handleEdit = (user: AdminUser) => {
      setEditingUser(user);
      setIsUserDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingUser(null);
    setIsUserDialogOpen(true);
  };
  
  const handleDelete = (userId: string) => {
      const doDelete = async () => {
        try {
          const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete');
          await refreshUsers();
          const userName = users.find(u => u.id === userId)?.name;
          toast({ variant: 'destructive', title: `User Deleted`, description: `${userName} has been removed from the system.` });
        } catch (e) {
          console.error(e);
          toast({ variant: 'destructive', title: 'Delete Failed', description: 'Could not delete user.' });
        }
      };
      void doDelete();
  }

  const handleSetStatus = (userId: string, status: AdminUser['status']) => {
      const doUpdate = async () => {
        try {
          const res = await fetch(`/api/admin/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          });
          if (!res.ok) throw new Error('Failed to update status');
          await refreshUsers();
          const userName = users.find(u => u.id === userId)?.name;
          toast({ title: `Status Updated`, description: `${userName}'s status has been set to ${status}.` });
        } catch (e) {
          console.error(e);
          toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not update status.' });
        }
      };
      void doUpdate();
  }

  const handleViewSecurityQuestions = (user: AdminUser) => {
      setSelectedUserForSecurity(user);
      setIsSecurityDialogOpen(true);
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
    <>
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
              <TableHead>Phone Number</TableHead>
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
                <TableCell className="text-muted-foreground">{user.phone || 'N/A'}</TableCell>
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
                       <DropdownMenuItem onClick={() => handleEdit(user)}>
                            <KeyRound className="mr-2 h-4 w-4" />
                            Reset Password
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleViewSecurityQuestions(user)}>
                            <ShieldQuestion className="mr-2 h-4 w-4" />
                            View Security
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
    </Card>

    <UserDialog 
      isOpen={isUserDialogOpen} 
      setIsOpen={setIsUserDialogOpen}
      onSave={handleSaveUser}
      user={editingUser}
    />
    
    <Dialog open={isSecurityDialogOpen} onOpenChange={setIsSecurityDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Security Questions for {selectedUserForSecurity?.name}</DialogTitle>
          <DialogDescription>
            These are the questions the user selected for account recovery.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            {(selectedUserForSecurity?.securityQuestions?.length ?? 0) > 0 ? (
                 selectedUserForSecurity?.securityQuestions?.map((question, index) => (
                    <div key={index} className="space-y-1">
                        <p className="font-semibold text-sm">{`Question ${index + 1}: ${question}`}</p>
                        <p className="text-muted-foreground text-sm p-2 bg-secondary rounded-md">{`Answer: ••••••••`}</p>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground text-center py-4">No security questions set for this user.</p>
            )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsSecurityDialogOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
