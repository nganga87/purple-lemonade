'use client';

import { Mail, Lock, User } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import type { AdminUser } from '../admin/user-management/user-dialog';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      if (name) {
        localStorage.setItem('loggedInUserName', name);
      }
      
      const newUser: Omit<AdminUser, 'id'> = {
          name: name,
          email: email,
          role: 'support-agent', // Default role for new sign-ups
          status: 'Pending Approval',
          permissions: [],
      };

      try {
        const existingUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
        const existingUsers: AdminUser[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
        const updatedUsers = [{ ...newUser, id: `usr_${Date.now()}`}, ...existingUsers];
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Failed to update user list in storage:", error);
      }
    }
    router.push('/register');
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-body p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold">Digital Address</span>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Join the future of address verification.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSignUp}>
            <div className="grid gap-2">
              <label htmlFor="name">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="pl-10" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
                  Log In
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}