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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';
import type { AdminUser } from '../../admin/user-management/user-dialog';

const USER_STORAGE_KEY = 'addressChainAdminUsers';

const securityQuestions = [
  "What was your first pet's name?",
  "What is the name of the city where you were born?",
  "What is your mother's maiden name?",
  "What was the make of your first car?",
  "What is the name of your favorite childhood friend?",
  "What was the name of your elementary school?",
];

const formSchema = z.object({
  question1: z.string().min(1, 'Please select a question.'),
  answer1: z.string().min(1, 'Answer is required.'),
  question2: z.string().min(1, 'Please select a question.'),
  answer2: z.string().min(1, 'Answer is required.'),
  question3: z.string().min(1, 'Please select a question.'),
  answer3: z.string().min(1, 'Answer is required.'),
}).refine(data => data.question1 !== data.question2 && data.question1 !== data.question3 && data.question2 !== data.question3, {
  message: "Each question must be unique.",
  path: ["question3"], // Show error on the last question field for simplicity
});

type FormValues = z.infer<typeof formSchema>;

export default function SecurityQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(searchParams.get('userId'));
  }, [searchParams]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
      question3: '',
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

      users[userIndex].securityQuestions = [values.question1, values.question2, values.question3];
      users[userIndex].securityAnswers = [values.answer1.toLowerCase(), values.answer2.toLowerCase(), values.answer3.toLowerCase()];

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

  const renderQuestionSet = (id: 1 | 2 | 3) => {
      const questionKey = `question${id}` as const;
      const answerKey = `answer${id}` as const;

      return (
          <div className="space-y-4 rounded-md border p-4">
              <FormField
                  control={form.control}
                  name={questionKey}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Question {id}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select a question..." />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  {securityQuestions.map((q, i) => (
                                      <SelectItem key={i} value={q}>{q}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name={answerKey}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Answer {id}</FormLabel>
                          <FormControl>
                              <Input placeholder="Your secret answer" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
          </div>
      );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-body p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold">Digital Address</span>
        </Link>
      </div>

       <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary"/>
            </div>
          <CardTitle className="font-headline text-2xl">Set Up Your Security Questions</CardTitle>
          <CardDescription>This will help you recover your account if you forget your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                {renderQuestionSet(1)}
                {renderQuestionSet(2)}
                {renderQuestionSet(3)}

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
