
'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { AdminUser } from '../admin/user-management/user-dialog';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
});

const securitySchema = z.object({
  answer: z.string().min(1, 'An answer is required.'),
});

const passwordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters.'),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match.",
  path: ["confirmNewPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<{ question: string, answer: string } | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  });
  
  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: { answer: '' },
  });
  
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' },
  });

  useEffect(() => {
    if (step === 3) {
      passwordForm.reset({ newPassword: '', confirmNewPassword: '' });
    }
  }, [step, passwordForm]);

  const handleEmailSubmit = (values: EmailFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const storedUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
        const users: AdminUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const user = users.find(u => u.email === values.email);

        if (user && user.securityQuestions && user.securityQuestions.length > 0) {
          setCurrentUser(user);
          const questionIndex = Math.floor(Math.random() * user.securityQuestions.length);
          setCurrentQuestion({
            question: user.securityQuestions[questionIndex],
            answer: user.securityAnswers![questionIndex],
          });
          setStep(2);
        } else {
          toast({ variant: 'destructive', title: 'Not Found', description: 'No user found with that email or security questions are not set up.' });
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not process your request.' });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSecuritySubmit = (values: SecurityFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      if (values.answer.toLowerCase() === currentQuestion?.answer) {
          setStep(3);
      } else {
          toast({ variant: 'destructive', title: 'Incorrect Answer', description: 'The security answer is not correct.'})
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handlePasswordSubmit = (values: PasswordFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const storedUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
        let users: AdminUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const userIndex = users.findIndex(u => u.id === currentUser?.id);
        if (userIndex !== -1) {
          users[userIndex].password = values.newPassword;
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
          toast({ title: "Password Reset Successful", description: "You can now log in with your new password." });
          setStep(4);
        } else {
          throw new Error("User not found during password update.");
        }
      } catch (e) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to update password.' });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary font-body p-4">
      <div className="absolute top-4 left-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold">Digital Address</span>
          </Link>
      </div>

      <Card className="w-full max-w-md shadow-xl">
        {step === 1 && (
            <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Reset Your Password</CardTitle>
                        <CardDescription>Enter your email address to begin the recovery process.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <Label>Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        )}

        {step === 2 && (
            <Form {...securityForm}>
                 <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Security Question</CardTitle>
                        <CardDescription>Answer your security question to continue.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-md bg-secondary border">
                            <p className="text-sm font-medium">{currentQuestion?.question}</p>
                        </div>
                        <FormField
                            control={securityForm.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                <Label>Your Answer</Label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your answer" className="pl-10" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                         <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Verify
                        </Button>
                    </CardFooter>
                 </form>
            </Form>
        )}

        {step === 3 && (
            <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Set New Password</CardTitle>
                        <CardDescription>Enter and confirm your new password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>New Password</Label>
                                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={passwordForm.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Confirm New Password</Label>
                                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Reset Password
                        </Button>
                    </CardFooter>
                 </form>
            </Form>
        )}
        
        {step === 4 && (
            <>
              <CardHeader className="items-center text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2"/>
                <CardTitle className="font-headline text-2xl">Password Reset!</CardTitle>
                <CardDescription>Your password has been successfully updated.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button asChild className="w-full">
                     <Link href="/login">Return to Log In</Link>
                 </Button>
              </CardContent>
            </>
        )}
      </Card>
    </div>
  );
}
