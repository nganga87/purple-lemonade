'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { AdminUser } from '../admin/user-management/user-dialog';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      try {
        const usersRaw = localStorage.getItem(USER_STORAGE_KEY);
        const users: AdminUser[] = usersRaw ? JSON.parse(usersRaw) : [];
        
        const foundUser = users.find(
          user => user.email === values.email && user.password === values.password
        );

        setTimeout(() => {
          if (foundUser) {
            localStorage.setItem('loggedInUserName', foundUser.name);
            toast({
              title: "Login Successful",
              description: `Welcome back, ${foundUser.name}!`,
            });
            router.push('/dashboard');
          } else {
            toast({
              variant: 'destructive',
              title: "Login Failed",
              description: "Invalid email or password. Please try again.",
            });
          }
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Failed to process login:", error);
        toast({ variant: 'destructive', title: "An Error Occurred" });
        setIsLoading(false);
      }
    }
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
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                     <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/reset-password" passHref>
                          <Button variant="link" className="px-0 text-xs h-auto">Forgot Password?</Button>
                      </Link>
                    </div>
                     <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
                  Sign Up
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
