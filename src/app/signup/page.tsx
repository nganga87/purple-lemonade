'use client';

import { Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import type { AdminUser } from '../admin/user-management/user-dialog';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const signupSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (values: SignupFormValues) => {
    setIsLoading(true);

    if (typeof window !== 'undefined') {
      try {
        const existingUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
        const existingUsers: AdminUser[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

        if (existingUsers.some(user => user.email === values.email)) {
            toast({
                variant: "destructive",
                title: "Account already exists",
                description: "An account with this email address already exists. Please log in.",
            });
            setIsLoading(false);
            return;
        }

        const newUser: AdminUser = {
            id: `usr_${Date.now()}`,
            name: values.name,
            email: values.email,
            password: values.password,
            role: 'support-agent',
            status: 'Pending Approval',
            permissions: [],
            securityQuestions: [],
            securityAnswers: [],
        };

        const updatedUsers = [newUser, ...existingUsers];
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
        
        toast({
          title: "Account Created!",
          description: "Next, please set up your security questions.",
        });

        setTimeout(() => {
          router.push(`/signup/security-questions?userId=${newUser.id}`);
        }, 1000);

      } catch (error) {
        console.error("Failed to update user list in storage:", error);
        toast({
            variant: "destructive",
            title: "Sign-up failed",
            description: "An unexpected error occurred. Please try again later.",
        });
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
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Join the future of address verification.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="John Doe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                     <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input type="email" placeholder="name@digitaladdress.com" className="pl-10" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" {...field} />
                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" {...field} />
                         <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </Form>
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
