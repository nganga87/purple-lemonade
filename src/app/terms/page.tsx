
import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Digital Address</span>
          </Link>
          <Link href="/register">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">Get Started</button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container max-w-screen-lg py-8 md:py-12">
        <article className="prose prose-lg max-w-none text-muted-foreground">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">Terms and Conditions</h1>
          <p>Last updated: {lastUpdated}</p>
          <p>Please read these terms and conditions carefully before using Our Service.</p>
          
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">1. Interpretation and Definitions</h2>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">2. Acknowledgment</h2>
          <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
          <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
          <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">3. User Accounts</h2>
          <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
          <p>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">4. Intellectual Property</h2>
          <p>The Service and its original content, features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">5. Termination</h2>
          <p>We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
          <p>Upon termination, Your right to use the Service will cease immediately.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">6. Limitation of Liability</h2>
          <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">7. Governing Law</h2>
          <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
          
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">8. Changes to These Terms and Conditions</h2>
          <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">9. Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
          <ul>
            <li>By email: legal@digitaladdress.com</li>
          </ul>
        </article>
      </main>
    </div>
  );
}
