
import { ArrowRight, KeyRound, Mail } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">AddressChain</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
             <Link
              href="/exchange"
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Marketplace
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
        <section className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Secure Your Digital Address on the Blockchain
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              AddressChain provides a revolutionary way to manage and verify
              physical addresses using the power of AI and blockchain technology.
              Prevent fraud, streamline deliveries, and own your address like never before.
            </p>
            <div className="w-full max-w-md space-y-4">
              <p className="font-semibold">Get started now:</p>
              <div className="grid gap-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    required
                  />
                </div>
                <Link href="/register">
                  <Button className="w-full">
                    Create My Digital Address
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full min-h-[400px]">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Hero image showing a modern house with a digital lock"
              fill
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="modern house digital"
            />
            <div className="absolute -bottom-8 -right-8 w-48 rounded-lg bg-card p-4 shadow-lg border">
                <KeyRound className="h-8 w-8 text-accent mb-2"/>
                <h3 className="font-headline font-semibold">Address NFT</h3>
                <p className="text-sm text-muted-foreground">Your address, secured as a unique digital asset on the blockchain.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex items-center justify-between py-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AddressChain. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary">Terms of Service</Link>
            <Link href="/" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
