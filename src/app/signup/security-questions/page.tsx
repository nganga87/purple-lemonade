

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, ShieldCheck } from 'lucide-react';
import type { AdminUser } from '../../admin/user-management/user-dialog';
import { individualSecurityQuestions, companySecurityQuestions } from './questions';
import { Skeleton } from '@/components/ui/skeleton';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const formSchema = z.object({
  selectedQuestions: z.array(z.string()).refine(value => value.length === 3, {
    message: "You must select exactly 3 questions.",
  }),
  answer1: z.string().optional(),
  answer2: z.string().optional(),
  answer3: z.string().optional(),
}).refine(data => {
    const selectedCount = data.selectedQuestions.length;
    if (selectedCount < 3) return true; // Don't validate answers until 3 questions are selected
    return (
        (selectedCount > 0 ? data.answer1 && data.answer1.length > 0 : true) &&
        (selectedCount > 1 ? data.answer2 && data.answer2.length > 0 : true) &&
        (selectedCount > 2 ? data.answer3 && data.answer3.length > 0 : true)
    );
}, {
    message: "Please provide an answer for each selected question.",
    path: ["answer1"], 
});

type FormValues = z.infer<typeof formSchema>;

function SecurityQuestionsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<'individual' | 'company'>('individual');
  
  const allSecurityQuestions = accountType === 'company' ? companySecurityQuestions : individualSecurityQuestions;

  useEffect(() => {
    setUserId(searchParams.get('userId'));
    setAccountName(searchParams.get('name'));
    const type = searchParams.get('accountType');
    if (type === 'company') {
      setAccountType('company');
    } else {
      setAccountType('individual');
    }
  }, [searchParams]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedQuestions: [],
      answer1: '',
      answer2: '',
      answer3: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!userId) {
        toast({ variant: 'destructive', title: 'Error', description: 'No user ID found. Please start over.'});
        return;
    }

    setIsLoading(true);
    try {
      const existingUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
      let users: AdminUser[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const userIndex = users.findIndex(u => u.id === userId);

      if (userIndex === -1) {
         toast({ variant: 'destructive', title: 'Error', description: 'User not found.'});
         setIsLoading(false);
         return;
      }
      
      const answersArray = [values.answer1, values.answer2, values.answer3].filter(Boolean).map(a => a!.toLowerCase());

      users[userIndex].securityQuestions = values.selectedQuestions;
      users[userIndex].securityAnswers = answersArray;

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));

      // Set the newly created user as the logged-in user
      localStorage.setItem('loggedInUserName', users[userIndex].name || 'User');


      toast({
        title: "Security Questions Saved!",
        description: "You're all set. Redirecting you to the portal...",
      });

      setTimeout(() => {
        router.push('/register');
      }, 1500);

    } catch (error) {
      console.error("Failed to save security questions:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your security questions.' });
      setIsLoading(false);
    }
  };

  const selectedQuestions = form.watch('selectedQuestions');

  return (
    <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary"/>
            </div>
          <CardTitle className="font-headline text-2xl">Set Up Your Security Questions</CardTitle>
          <CardDescription>
            Choose exactly 3 questions for <span className="font-semibold text-primary">{accountName || 'your account'}</span>. This will help you recover your account if you forget your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="selectedQuestions"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                           {allSecurityQuestions.map((question) => {
                             const isChecked = field.value?.includes(question);
                             const checkedIndex = isChecked ? field.value.indexOf(question) : -1;
                             
                             return (
                               <div key={question} className="space-y-2 rounded-md border p-4">
                                   <div className="flex flex-row items-start space-x-3 space-y-0">
                                       <FormControl>
                                           <Checkbox
                                           checked={isChecked}
                                           onCheckedChange={(checked) => {
                                               const currentSelection = field.value || [];
                                               const newSelection = checked
                                                   ? [...currentSelection, question]
                                                   : currentSelection.filter((value) => value !== question);

                                               if (newSelection.length <= 3) {
                                                   field.onChange(newSelection);
                                               } else {
                                                   toast({
                                                       variant: 'destructive',
                                                       title: 'Limit Reached',
                                                       description: 'You can only select up to 3 questions.'
                                                   })
                                               }
                                           }}
                                           />
                                       </FormControl>
                                       <FormLabel className="font-normal">{question}</FormLabel>
                                   </div>
                                    {isChecked && checkedIndex !== -1 && (
                                        <FormField
                                            control={form.control}
                                            name={`answer${checkedIndex + 1}` as 'answer1' | 'answer2' | 'answer3'}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Your secret answer" {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                           )})}
                           <FormMessage />
                        </FormItem>
                    )}
                />
              <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save and Continue'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  )
}

function LoadingFallback() {
  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader className="text-center">
        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-full max-w-md mx-auto mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
           <div key={i} className="space-y-2 rounded-md border p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            </div>
        ))}
        <Skeleton className="h-10 w-full mt-4" />
      </CardContent>
    </Card>
  )
}

export default function SecurityQuestionsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-body p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold">Digital Address</span>
        </Link>
      </div>
      <Suspense fallback={<LoadingFallback />}>
        <SecurityQuestionsForm />
      </Suspense>
    </div>
  );
}
