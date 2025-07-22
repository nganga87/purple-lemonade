
'use client';

import React, { useState } from 'react';
import { AdminLayout } from '../admin-layout';
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
  Bell,
  Save,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function PlatformSettingsPage() {
  const { toast } = useToast();
  
  // State for Domain & DNS settings
  const [domainRegistrar, setDomainRegistrar] = useState('Namecheap');
  const [domainExpiry, setDomainExpiry] = useState('2025-10-26');
  const [dnsProvider, setDnsProvider] = useState('Cloudflare');
  const [paymentMethod, setPaymentMethod] = useState('Corporate Visa **** 1234');

  const handleSaveDomainSettings = () => {
    // In a real app, you would send this data to a secure backend.
    console.log('Saving Domain Settings:', { domainRegistrar, domainExpiry, dnsProvider, paymentMethod });
    toast({
      title: 'Settings Saved',
      description: 'Domain & DNS settings have been updated.',
    });
  };

  return (
    <AdminLayout active="platform-settings">
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
          
           {/* API Keys Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" /> API Keys & Integrations
              </CardTitle>
              <CardDescription>
                Manage third-party service API keys and blockchain settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h4 className="font-semibold text-muted-foreground">Service Keys</h4>
                  <div className="space-y-2">
                    <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
                    <Input id="google-maps-api-key" type="password" defaultValue="AIzaSy..."/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-api-key">Stripe API Key</Label>
                    <Input id="stripe-api-key" type="password" defaultValue="sk_live_..."/>
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
                    <Input id="rpc-endpoint" defaultValue="https://mainnet.infura.io/v3/..."/>
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
        </div>
      </main>
    </AdminLayout>
  );
}
