
import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function PrivacyPage() {
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
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          <p>Last updated: {lastUpdated}</p>
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">1. Collecting and Using Your Personal Data</h2>
          <h3 className="font-headline text-xl font-bold mt-4 mb-2 text-foreground">Types of Data Collected</h3>
          <p><strong>Personal Data:</strong> While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City, Usage Data.</p>
          <p><strong>Usage Data:</strong> Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
          
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">2. Use of Your Personal Data</h2>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
            <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
            <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
            <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
          </ul>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">3. Retention of Your Personal Data</h2>
          <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">4. Disclosure of Your Personal Data</h2>
          <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">5. Security of Your Personal Data</h2>
          <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
          
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">6. Children's Privacy</h2>
          <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">7. Links to Other Websites</h2>
          <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">8. Changes to this Privacy Policy</h2>
          <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>

          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, You can contact us:</p>
          <ul>
            <li>By email: legal@digitaladdress.com</li>
          </ul>
        </article>
      </main>
    </div>
  );
}
