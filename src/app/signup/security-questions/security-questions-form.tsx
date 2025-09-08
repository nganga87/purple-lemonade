'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { individualSecurityQuestions } from './questions';

// Form schema and types
const formSchema = z.object({
  selectedQuestions: z.array(z.string()).length(3, "Select exactly 3 questions"),
  answers: z.record(z.string().min(1, "Answer is required")),
});

type FormValues = z.infer<typeof formSchema>;

export default function SecurityQuestionsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedQuestions: [],
      answers: {},
    },
  });

  useEffect(() => {
    // Simulate progress for demo purposes
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(100);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save security questions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">All Set!</h2>
        <p className="text-muted-foreground mb-6">Your security questions have been saved successfully.</p>
        <div className="w-full max-w-md">
          <Progress value={100} className="h-2" />
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="mb-6 text-center">
          <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-primary" />
          <h2 className="text-2xl font-bold">Security Questions</h2>
          <p className="text-muted-foreground mt-2">
            Select and answer 3 security questions to help secure your account.
          </p>
          <div className="mt-4 w-full">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="selectedQuestions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Select 3 Questions</FormLabel>
                    <div className="space-y-2 mt-2">
                      {individualSecurityQuestions.map((question) => (
                        <FormField
                          key={question}
                          control={form.control}
                          name="selectedQuestions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={question}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(question)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, question])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== question)
                                          );
                                    }}
                                    disabled={field.value?.length >= 3 && !field.value?.includes(question)}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {question}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <AnimatePresence>
              {form.watch('selectedQuestions')?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <h3 className="font-medium">Your Answers</h3>
                  {form.watch('selectedQuestions').map((question) => (
                    <FormField
                      key={question}
                      control={form.control}
                      name={`answers.${question}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-normal">{question}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your answer" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Questions'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
