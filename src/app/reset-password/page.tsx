'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ShieldQuestion, Loader2, CheckCircle } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

const securitySchema = z.object({
  question1: z.string().min(1, "Answer is required."),
  question2: z.string().min(1, "Answer is required."),
  question3: z.string().min(1, "Answer is required."),
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

const mockSecurityQuestions = {
    'john.doe@example.com': ["What was your first pet's name?", "What city were you born in?", "What is your mother's maiden name?"],
    'robertsnalo@digitaladdress.com': ["What was your first pet's name?", "What city were you born in?", "What is your mother's maiden name?"],
    'default': ["Security question 1?", "Security question 2?", "Security question 3?"],
};

const mockUserAnswers = {
    'john.doe@example.com': ["buddy", "anytown", "smith"],
    'robertsnalo@digitaladdress.com': ["buddy", "nairobi", "muthoni"],
};

export default function ResetPasswordPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const emailForm = useForm<EmailFormValues>({ 
      resolver: zodResolver(emailSchema),
      defaultValues: { email: '' },
    });
    const securityForm = useForm<SecurityFormValues>({ 
      resolver: zodResolver(securitySchema),
      defaultValues: { question1: '', question2: '', question3: '' },
    });
    const passwordForm = useForm<PasswordFormValues>({ 
      resolver: zodResolver(passwordSchema),
      defaultValues: { password: '', confirmPassword: '' },
    });

    const handleEmailSubmit = (values: EmailFormValues) => {
        setIsLoading(true);
        // Simulate checking if user exists
        setTimeout(() => {
            setUserEmail(values.email);
            setStep(2);
            setIsLoading(false);
        }, 1000);
    };

    const handleSecuritySubmit = (values: SecurityFormValues) => {
        setIsLoading(true);
        const correctAnswers = mockUserAnswers[userEmail as keyof typeof mockUserAnswers] || [];
        const userAnswers = Object.values(values);

        // Simulate checking answers
        setTimeout(() => {
             if (JSON.stringify(userAnswers.map(a => a.toLowerCase())) === JSON.stringify(correctAnswers)) {
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
        // Simulate password change
        setTimeout(() => {
            toast({ title: "Password Reset Successful", description: "You can now log in with your new password." });
            setStep(4);
            setIsLoading(false);
        }, 1000);
    };

    const securityQuestions = mockSecurityQuestions[userEmail as keyof typeof mockSecurityQuestions] || mockSecurityQuestions.default;
    
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
                                    <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <FormControl>
                                        <Input placeholder="you@example.com" className="pl-10" {...field} />
                                    </FormControl>
                                    </div>
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
                                <p className="font-semibold">{userEmail}</p>
                            </div>
                            <FormField control={securityForm.control} name="question1" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{securityQuestions[0]}</FormLabel>
                                    <FormControl><Input placeholder="Your answer" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={securityForm.control} name="question2" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{securityQuestions[1]}</FormLabel>
                                    <FormControl><Input placeholder="Your answer" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={securityForm.control} name="question3" render={({ field }) => (
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
                                     <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <FormControl><Input type="password" placeholder="••••••••" className="pl-10" {...field} /></FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <FormControl><Input type="password" placeholder="••••••••" className="pl-10" {...field} /></FormControl>
                                    </div>
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