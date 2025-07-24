
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { AppLayout } from '@/components/layout/app-layout';
import { initialFeedback, type Feedback } from './data';
import { analyzeFeedback, type AnalyzeFeedbackInput, type AnalyzeFeedbackOutput } from '@/ai/flows/analyze-feedback';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function FeedbackPage() {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>(initialFeedback);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeFeedbackOutput | null>(null);
  const { toast } = useToast();

  const handleOpenDialog = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setAnalysisResult(null);
  };
  
  const handleCloseDialog = () => {
    setSelectedFeedback(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFeedback) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const input: AnalyzeFeedbackInput = {
        category: selectedFeedback.category,
        subject: selectedFeedback.subject,
        message: selectedFeedback.message,
        userContext: {
          name: selectedFeedback.user.name,
          email: selectedFeedback.user.email,
          accountTier: selectedFeedback.user.accountTier,
        }
      };
      const result = await analyzeFeedback(input);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getPriorityBadge = (priority: AnalyzeFeedbackOutput['priority']) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="destructive" className="bg-red-700">{priority}</Badge>;
      case 'High':
        return <Badge variant="destructive">{priority}</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-500 text-black">{priority}</Badge>;
      case 'Low':
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  }

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>User Feedback Inbox</CardTitle>
            <CardDescription>
              Review and analyze incoming support tickets and feedback from users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbackItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.user.name}</div>
                      <div className="text-sm text-muted-foreground">{item.user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">{item.subject}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(item)}>
                        View & Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && handleCloseDialog()}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline">{selectedFeedback?.subject}</DialogTitle>
              <DialogDescription>
                From: {selectedFeedback?.user.name} ({selectedFeedback?.user.email})
                <Badge variant="secondary" className="ml-2">{selectedFeedback?.user.accountTier}</Badge>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto px-1 pr-4">
              <div>
                <h4 className="font-semibold mb-2">User's Message</h4>
                <p className="text-sm text-muted-foreground p-4 bg-secondary rounded-md whitespace-pre-wrap">
                  {selectedFeedback?.message}
                </p>
              </div>

              {analysisResult && (
                <div>
                  <h4 className="font-semibold mb-2">AI Analysis</h4>
                   <div className="p-4 rounded-lg border bg-secondary/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Priority</span>
                            {getPriorityBadge(analysisResult.priority)}
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Summary</p>
                            <p className="text-sm font-medium">{analysisResult.summary}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground mb-1">AI Category</p>
                            <p className="text-sm font-medium">{analysisResult.autoCategory}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground mb-1">Suggested Action</p>
                            <p className="text-sm font-medium">{analysisResult.suggestedAction}</p>
                        </div>
                   </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>Close</Button>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                {analysisResult ? 'Re-analyze' : 'Analyze with AI'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </AppLayout>
  );
}
