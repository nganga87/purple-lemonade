'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ShieldQuestion, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { AdminUser } from '../admin/user-management/user-dialog';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

const securitySchema = z.object({
  answer1: z.string().min(1, "Answer is required."),
  answer2: z.string().min(1, "Answer is required."),
  answer3: z.string().min(1, "Answer is required."),
});

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;


export default function ResetPasswordPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailForm = useForm<EmailFormValues>({ 
      resolver: zodResolver(emailSchema),
      defaultValues: { email: '' },
    });
    const securityForm = useForm<SecurityFormValues>({ 
      resolver: zodResolver(securitySchema),
      defaultValues: { answer1: '', answer2: '', answer3: '' },
    });
    const passwordForm = useForm<PasswordFormValues>({ 
      resolver: zodResolver(passwordSchema),
      defaultValues: { password: '', confirmPassword: '' },
    });

    const handleEmailSubmit = (values: EmailFormValues) => {
        setIsLoading(true);
        setTimeout(() => {
            try {
                const usersRaw = localStorage.getItem(USER_STORAGE_KEY);
                const users: AdminUser[] = usersRaw ? JSON.parse(usersRaw) : [];
                const foundUser = users.find(u => u.email === values.email);
                
                if (foundUser) {
                    if (foundUser.securityQuestions && foundUser.securityQuestions.length === 3) {
                      setCurrentUser(foundUser);
                      setStep(2);
                    } else {
                       toast({ variant: "destructive", title: "No Security Questions", description: "This account has no security questions set up. Please contact support." });
                    }
                } else {
                    toast({ variant: "destructive", title: "User Not Found", description: "No account found with that email address." });
                }
            } catch (e) {
                 toast({ variant: "destructive", title: "Error", description: "Could not process your request." });
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleSecuritySubmit = (values: SecurityFormValues) => {
        setIsLoading(true);
        if (!currentUser?.securityAnswers) {
            toast({ variant: "destructive", title: "Error", description: "Security answers not found for this user." });
            setIsLoading(false);
            return;
        }

        const correctAnswers = currentUser.securityAnswers;
        const userAnswers = Object.values(values).map(a => a.toLowerCase());

        setTimeout(() => {
             if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers.map(a => a.toLowerCase()))) {
                toast({ title: "Security Questions Passed", description: "You can now reset your password." });
                setStep(3);
            } else {
                toast({ variant: "destructive", title: "Incorrect Answers", description: "One or more answers were incorrect. Please try again." });
            }
            setIsLoading(false);
        }, 1500);
    };

    const handlePasswordSubmit = (values: PasswordFormValues) => {
        setIsLoading(true);
        if (!currentUser) return;

        setTimeout(() => {
          try {
            const usersRaw = localStorage.getItem(USER_STORAGE_KEY);
            let users: AdminUser[] = usersRaw ? JSON.parse(usersRaw) : [];
            const userIndex = users.findIndex(u => u.id === currentUser.id);

            if (userIndex !== -1) {
              users[userIndex].password = values.password;
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
              toast({ title: "Password Reset Successful", description: "You can now log in with your new password." });
              setStep(4);
            } else {
              toast({ variant: 'destructive', title: "Error", description: "Could not find user to update."});
            }
          } catch(e) {
            toast({ variant: 'destructive', title: "Error", description: "Failed to save new password."});
          }
          setIsLoading(false);
        }, 1000);
    };

    const securityQuestions = currentUser?.securityQuestions || [];
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                     <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="grid gap-4">
                           <FormField
                                control={emailForm.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="you@example.com" className="pl-10" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Continue
                            </Button>
                        </form>
                    </Form>
                )
            case 2:
                 return (
                     <Form {...securityForm}>
                        <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)} className="grid gap-4">
                            <div className="p-2 bg-secondary rounded-md text-center text-sm">
                                <p>Answering questions for: <span className="font-semibold">{currentUser?.email}</span></p>
                            </div>
                            <FormField control={securityForm.control} name="answer1" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{securityQuestions[0]}</FormLabel>
                                    <FormControl><Input placeholder="Your answer" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={securityForm.control} name="answer2" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{securityQuestions[1]}</FormLabel>
                                    <FormControl><Input placeholder="Your answer" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={securityForm.control} name="answer3" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{securityQuestions[2]}</FormLabel>
                                    <FormControl><Input placeholder="Your answer" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify Answers
                            </Button>
                        </form>
                    </Form>
                )
            case 3:
                return (
                     <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="grid gap-4">
                             <FormField control={passwordForm.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                          <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10" {...field} />
                                          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                          </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                          <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10" {...field} />
                                          <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                              {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                          </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                )
            case 4:
                return (
                    <div className="text-center space-y-4">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <p>Your password has been successfully reset.</p>
                        <Button className="w-full" onClick={() => router.push('/login')}>Return to Log In</Button>
                    </div>
                )
        }
    }

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
          <CardTitle className="font-headline text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your email address to begin."}
            {step === 2 && "Answer your security questions to continue."}
            {step === 3 && "Please enter a new password for your account."}
             {step === 4 && "Process complete."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        {step < 4 && (
            <CardFooter className="flex justify-center">
                <Button variant="link" asChild>
                    <Link href="/login">Back to Log In</Link>
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
