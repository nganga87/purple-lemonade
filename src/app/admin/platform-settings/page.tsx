
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  ShieldCheck,
  KeyRound,
  Globe,
  Save,
  Link as LinkIcon,
  Bug,
  PlusCircle,
  Trash2,
  CandlestickChart,
  ShoppingCart,
  PackagePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/layout/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import useFeatureFlags from '@/hooks/use-feature-flags';

type DebugToken = {
    id: string;
    token: string;
    status: 'Active' | 'Revoked';
    createdDate: string;
};

const initialDebugTokens: DebugToken[] = [
    { id: 'dt_1', token: 'debug_xxxxxxxxxxxx_1234', status: 'Active', createdDate: '2024-08-20' },
    { id: 'dt_2', token: 'debug_xxxxxxxxxxxx_5678', status: 'Revoked', createdDate: '2024-07-15' },
];

export default function PlatformSettingsPage() {
  const { toast } = useToast();
  
  // State for Domain & DNS settings
  const [domainRegistrar, setDomainRegistrar] = React.useState('Google Domains');
  const [domainExpiry, setDomainExpiry] = React.useState('2025-10-26');
  const [dnsProvider, setDnsProvider] = React.useState('Google Cloud DNS');
  const [paymentMethod, setPaymentMethod] = React.useState('Corporate Visa **** 1234');
  const [debugTokens, setDebugTokens] = React.useState<DebugToken[]>(initialDebugTokens);

  const { featureFlags, setFeatureFlag } = useFeatureFlags();


  const handleSaveDomainSettings = () => {
    // In a real app, you would send this data to a secure backend.
    console.log('Saving Domain Settings:', { domainRegistrar, domainExpiry, dnsProvider, paymentMethod });
    toast({
      title: 'Settings Saved',
      description: 'Domain & DNS settings have been updated.',
    });
  };
  
  const handleGenerateToken = () => {
    const newToken: DebugToken = {
        id: `dt_${Date.now()}`,
        token: `debug_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 6)}`,
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
    };
    setDebugTokens(prev => [newToken, ...prev]);
    toast({
        title: 'Debug Token Generated',
        description: `New token ${newToken.token} has been created.`,
    });
  }
  
  const handleRevokeToken = (tokenId: string) => {
      setDebugTokens(prev => prev.map(t => t.id === tokenId ? {...t, status: 'Revoked'} : t));
      toast({
        variant: 'destructive',
        title: 'Token Revoked',
        description: `The selected debug token has been revoked.`,
    });
  }

  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* General Settings Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" /> General Settings
              </CardTitle>
              <CardDescription>
                Configure global platform details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input
                  id="platform-name"
                  defaultValue="Digital Address"
                  placeholder="Your Platform Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Public Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="support@digitaladdress.com"
                  placeholder="support@example.com"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save General Settings
              </Button>
            </CardFooter>
          </Card>

          {/* Security Settings Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Security & Access
              </CardTitle>
              <CardDescription>
                Manage security policies for administrators and users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="mfa-required">
                    Require MFA for Admins
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce Multi-Factor Authentication for all team members.
                  </p>
                </div>
                <Switch id="mfa-required" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="session-timeout">
                    Admin Session Timeout (minutes)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out admins after a period of inactivity.
                  </p>
                </div>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue={60}
                  className="w-24"
                />
              </div>
            </CardContent>
             <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Security Policies
              </Button>
            </CardFooter>
          </Card>

          {/* Feature Flags Card */}
          <Card className="lg:col-span-3">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5" /> Feature Flags
                </CardTitle>
                <CardDescription>
                    Enable or disable major platform modules in real-time.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <Label htmlFor="address-marketplace-flag">Address NFT Marketplace</Label>
                            <p className="text-sm text-muted-foreground">Toggle the `/exchange` page for buying/selling Address NFTs.</p>
                        </div>
                    </div>
                    <Switch id="address-marketplace-flag" checked={featureFlags.addressMarketplace} onCheckedChange={(checked) => setFeatureFlag('addressMarketplace', checked)} />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                        <CandlestickChart className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <Label htmlFor="share-market-flag">CryptoShare Market</Label>
                            <p className="text-sm text-muted-foreground">Toggle the `/share-market` page for trading company shares.</p>
                        </div>
                    </div>
                    <Switch id="share-market-flag" checked={featureFlags.shareMarket} onCheckedChange={(checked) => setFeatureFlag('shareMarket', checked)} />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                        <PackagePlus className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <Label htmlFor="tokenization-flag">Company Share Tokenization</Label>
                            <p className="text-sm text-muted-foreground">Toggle the `/company` portal for tokenizing shares.</p>
                        </div>
                    </div>
                    <Switch id="tokenization-flag" checked={featureFlags.tokenization} onCheckedChange={(checked) => setFeatureFlag('tokenization', checked)} />
                </div>
            </CardContent>
          </Card>
          
           {/* API Keys Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" /> API Keys & Integrations
              </CardTitle>
              <CardDescription>
                Manage third-party service API keys and blockchain settings. Use test keys for beta/staging environments.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Service Keys</h4>
                  <div className="space-y-2">
                    <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
                    <Input id="google-maps-api-key" type="password" defaultValue="AIzaSy_xxxxxxxxxxxxxxxxxxx"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-api-key">Stripe API Key (Test)</Label>
                    <Input id="stripe-api-key" type="password" placeholder="sk_test_..."/>
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Blockchain</h4>
                   <div className="space-y-2">
                    <Label htmlFor="nft-contract-address">Address NFT Smart Contract</Label>
                    <Input id="nft-contract-address" defaultValue="0x..."/>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="rpc-endpoint">RPC Endpoint URL</Label>
                    <Input id="rpc-endpoint" defaultValue="https://sepolia.infura.io/v3/..."/>
                  </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Integration Settings
              </Button>
            </CardFooter>
          </Card>

          {/* Domain & DNS Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" /> Domain & DNS Management
              </CardTitle>
              <CardDescription>
                Manage domain registrar and DNS provider details.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Domain Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="domain-registrar">Domain Registrar</Label>
                    <Input 
                      id="domain-registrar" 
                      value={domainRegistrar}
                      onChange={(e) => setDomainRegistrar(e.target.value)}
                      placeholder="e.g., Google Domains"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain-expiry">Domain Expiry Date</Label>
                    <Input 
                      id="domain-expiry" 
                      type="date" 
                      value={domainExpiry}
                      onChange={(e) => setDomainExpiry(e.target.value)}
                    />
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Provider Details</h4>
                   <div className="space-y-2">
                    <Label htmlFor="dns-provider">DNS Provider</Label>
                    <Input 
                      id="dns-provider" 
                      value={dnsProvider}
                      onChange={(e) => setDnsProvider(e.target.value)}
                      placeholder="e.g., AWS Route 53"
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Input 
                      id="payment-method" 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
               </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDomainSettings}>
                <Save className="mr-2 h-4 w-4" /> Save Domain Settings
              </Button>
            </CardFooter>
          </Card>
          
          {/* Developer Settings Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" /> Developer Settings
              </CardTitle>
              <CardDescription>
                Manage debug tokens for development and testing purposes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-muted-foreground">Debug Tokens</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {debugTokens.map(token => (
                        <TableRow key={token.id}>
                            <TableCell className="font-mono">{token.token}</TableCell>
                            <TableCell>
                                <Badge variant={token.status === 'Active' ? 'default' : 'destructive'} className={token.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                                    {token.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{token.createdDate}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleRevokeToken(token.id)} disabled={token.status === 'Revoked'}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleGenerateToken}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate New Token
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </AppLayout>
  );
}
