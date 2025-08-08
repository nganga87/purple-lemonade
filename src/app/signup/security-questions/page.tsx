
'use client';

import React, { useState, useEffect } from 'react';
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

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const individualSecurityQuestions = [
  "What was your first pet's name?",
  "What is the name of the city where you were born?",
  "What is your mother's maiden name?",
  "What was the make of your first car?",
  "What is the name of your favorite childhood friend?",
  "What was the name of your elementary school?",
];

const companySecurityQuestions = [
    "What is the company's incorporation city?",
    "What was the last name of the company's first CEO?",
    "What is the company's primary bank name?",
    "What was the year the company was founded?",
    "What is the street name of the first office address?",
    "What is the company's tax identification number?",
];

const formSchema = z.object({
  selectedQuestions: z.array(z.string()).refine(value => value.length === 3, {
    message: "You must select exactly 3 questions.",
  }),
  answers: z.record(z.string()),
}).refine(data => {
    // Ensure every selected question has a non-empty answer
    return data.selectedQuestions.every(q => data.answers[q] && data.answers[q].length > 0);
}, {
    message: "Please provide an answer for each selected question.",
    path: ["answers"], // This error isn't easily displayed, but the logic is sound.
});

type FormValues = z.infer<typeof formSchema>;

export default function SecurityQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<'individual' | 'company'>('individual');
  
  const allSecurityQuestions = accountType === 'company' ? companySecurityQuestions : individualSecurityQuestions;

  const generateDefaultAnswers = () => {
    const allQuestions = [...individualSecurityQuestions, ...companySecurityQuestions];
    return allQuestions.reduce((acc, q) => {
        acc[q] = '';
        return acc;
    }, {} as Record<string, string>);
  };

  useEffect(() => {
    setUserId(searchParams.get('userId'));
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
      answers: generateDefaultAnswers(),
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
      
      const answersArray = values.selectedQuestions.map(q => values.answers[q].toLowerCase());

      users[userIndex].securityQuestions = values.selectedQuestions;
      users[userIndex].securityAnswers = answersArray;

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-body p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold">Digital Address</span>
        </Link>
      </div>

       <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary"/>
            </div>
          <CardTitle className="font-headline text-2xl">Set Up Your Security Questions</CardTitle>
          <CardDescription>Choose exactly 3 questions. This will help you recover your account if you forget your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="selectedQuestions"
                    render={() => (
                        <FormItem className="space-y-4">
                           {allSecurityQuestions.map((question, index) => (
                               <FormField
                                key={index}
                                control={form.control}
                                name="selectedQuestions"
                                render={({ field }) => (
                                    <div className="space-y-2 rounded-md border p-4">
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(question)}
                                                onCheckedChange={(checked) => {
                                                    const newSelection = checked
                                                        ? [...field.value, question]
                                                        : field.value?.filter((value) => value !== question);

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
                                        </FormItem>
                                        {field.value?.includes(question) && (
                                            <FormField
                                                control={form.control}
                                                name={`answers.${question}`}
                                                render={({field: answerField}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Your secret answer" {...answerField}/>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>
                                )}
                               />
                           ))}
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
    </div>
  );
}
