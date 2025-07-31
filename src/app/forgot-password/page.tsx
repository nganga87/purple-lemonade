'use client';

import { Mail } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast({
                title: "Password Reset Link Sent",
                description: `If an account with ${email} exists, a password reset link has been sent.`,
            });
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
          <CardTitle className="font-headline text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email and we'll send you a link to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    className="pl-10" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Link href="/login" passHref>
                <Button variant="link">Back to Log In</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
