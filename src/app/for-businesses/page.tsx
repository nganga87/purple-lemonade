import { ArrowRight, Globe, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function ForBusinessesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
             <Link
              href="/exchange"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Marketplace
            </Link>
            <Link
              href="/for-businesses"
              className="font-bold text-primary transition-colors hover:text-foreground/80"
            >
              For Businesses
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-secondary py-12 md:py-24">
            <div className="container">
                 <div className="mx-auto max-w-2xl text-center">
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Power Your Business with Verified Addresses</h1>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                        Integrate our API to verify addresses, prevent fraud, and streamline logistics with the most reliable location data available.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card>
                        <CardHeader className="items-center text-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                             <ArrowLeftRight className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">E-commerce & Retail</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Reduce failed deliveries and cart abandonment by validating addresses at checkout in real-time.
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center text-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                            <TrendingUp className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">Logistics & Delivery</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Optimize routes and ensure first-time delivery success with pin-point accurate, verified location data.
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center text-center">
                           <div className="p-3 rounded-full bg-primary/10 mb-2">
                            <Globe className="h-8 w-8 text-primary"/>
                           </div>
                           <CardTitle className="font-headline">Finance & KYC</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Meet regulatory requirements and onboard users faster with undeniable proof-of-residence verification.
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-12 text-center">
                    <Button size="lg">
                        Get API Keys
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Address. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary">Terms of Service</Link>
            <Link href="/" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
