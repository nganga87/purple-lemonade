// src/app/signup/security-questions/page.tsx
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

export default function SecurityQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedQuestions: [],
      answers: {},
    },
  });

  const selectedQuestions = form.watch('selectedQuestions');
  const progress = Math.min(100, (selectedQuestions.length / 3) * 100);

  useEffect(() => {
    // Validate user session
    const userId = searchParams.get('userId');
    if (!userId) {
      toast({
        title: "Session expired",
        description: "Please complete the signup process again",
        variant: "destructive",
      });
      router.push('/signup');
      return;
    }
    setIsLoading(false);
  }, [searchParams, router, toast]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/users/security-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: searchParams.get('userId'),
          questions: data.selectedQuestions.map((q, i) => ({
            question: q,
            answer: data.answers[i],
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to save security questions');
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save security questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingFallback />;
  if (isSuccess) return <SuccessScreen />;

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Security Questions</h1>
          <p className="text-muted-foreground">
            Select and answer 3 security questions
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progress</span>
                    <span>{selectedQuestions.length}/3 selected</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-4">
                  {individualSecurityQuestions.map((question, index) => (
                    <FormField
                      key={question}
                      control={form.control}
                      name="selectedQuestions"
                      render={({ field }) => {
                        const isSelected = field.value?.includes(question);
                        const answerFieldName = `answers.${index}`;

                        return (
                          <motion.div
                            layout
                            className={`rounded-lg border p-4 transition-colors ${
                              isSelected ? 'border-primary/30 bg-primary/5' : 'border-border'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={(checked) => {
                                    const newSelection = checked
                                      ? [...(field.value || []), question]
                                      : field.value?.filter((q) => q !== question) || [];
                                    field.onChange(newSelection);
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-2 flex-1">
                                <FormLabel className="text-base font-normal">
                                  {question}
                                </FormLabel>
                                {isSelected && (
                                  <FormField
                                    control={form.control}
                                    name={answerFieldName}
                                    render={({ field: answerField }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            placeholder="Your answer"
                                            {...answerField}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      }}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || selectedQuestions.length !== 3}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save and Continue'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="container mx-auto max-w-2xl p-4 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function SuccessScreen() {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-12"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">All Set!</h2>
        <p className="text-muted-foreground">
          Your security questions have been saved successfully.
        </p>
      </div>
      <Button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </Button>
    </motion.div>
  );
}