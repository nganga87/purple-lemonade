import { KeyRound, Mail, Lock } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
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
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>Log in to manage your digital addresses.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>
            <div className="grid gap-2">
               <label htmlFor="password">Password</label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            <Button asChild type="submit" className="w-full mt-2">
              <Link href="/dashboard">Log In</Link>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/register" className="font-semibold text-primary underline-offset-4 hover:underline">
                  Sign Up
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
