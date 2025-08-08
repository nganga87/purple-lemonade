
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Loader2, CheckCircle, PackageCheck, Copy, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

type ShareClass = {
  id: string;
  name: string;
  shares: string;
  isMinted: boolean;
};

export default function TokenizeSharesPage() {
  const [shareClasses, setShareClasses] = useState<ShareClass[]>([
    { id: `sc_${Date.now()}`, name: 'Founders', shares: '1000000', isMinted: false },
  ]);
  const [isMinting, setIsMinting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddClass = () => {
    setShareClasses(prev => [
      ...prev,
      { id: `sc_${Date.now()}`, name: '', shares: '', isMinted: false },
    ]);
  };

  const handleRemoveClass = (id: string) => {
    setShareClasses(prev => prev.filter(sc => sc.id !== id));
  };

  const handleClassChange = (id: string, field: 'name' | 'shares', value: string) => {
    setShareClasses(prev =>
      prev.map(sc => (sc.id === id ? { ...sc, [field]: value } : sc))
    );
  };
  
  const handleMint = async (id: string) => {
      const shareClass = shareClasses.find(sc => sc.id === id);
      if (!shareClass || !shareClass.name || !shareClass.shares) {
          toast({ variant: 'destructive', title: 'Error', description: 'Share class name and number of shares cannot be empty.' });
          return;
      }

      setIsMinting(id);
      // Simulate API call to a blockchain service
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShareClasses(prev => prev.map(sc => sc.id === id ? {...sc, isMinted: true} : sc));
      toast({
          title: 'Minting Successful!',
          description: `Successfully minted ${shareClass.shares} shares for the ${shareClass.name} class.`
      });
      setIsMinting(null);
  }
  
  const totalShares = shareClasses.reduce((acc, sc) => acc + (parseInt(sc.shares, 10) || 0), 0);

  return (
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Tokenize Company Shares</CardTitle>
                <CardDescription>
                    Create and mint share classes for your company. These will be represented as tradable tokens on the blockchain, tied to your verified Digital Address.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {shareClasses.map((shareClass, index) => (
                <div key={shareClass.id} className="p-4 border rounded-lg bg-secondary/50 space-y-4 relative">
                    <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor={`class-name-${index}`}>Share Class Name</Label>
                        <Input
                        id={`class-name-${index}`}
                        placeholder="e.g., Founders, Series A, Employee Pool"
                        value={shareClass.name}
                        onChange={e => handleClassChange(shareClass.id, 'name', e.target.value)}
                        disabled={shareClass.isMinted}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={`shares-count-${index}`}>Number of Shares</Label>
                        <Input
                        id={`shares-count-${index}`}
                        type="number"
                        placeholder="e.g., 1,000,000"
                        value={shareClass.shares}
                        onChange={e => handleClassChange(shareClass.id, 'shares', e.target.value)}
                        disabled={shareClass.isMinted}
                        />
                    </div>
                    </div>
                    {shareClass.isMinted ? (
                        <div className="flex items-center gap-2 text-green-600">
                           <CheckCircle className="h-5 w-5"/>
                           <p className="font-semibold">This class has been minted.</p>
                        </div>
                    ) : (
                         <Button onClick={() => handleMint(shareClass.id)} disabled={isMinting !== null}>
                            {isMinting === shareClass.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                            {isMinting === shareClass.id ? 'Minting...' : 'Mint Share Class'}
                        </Button>
                    )}

                    {shareClasses.length > 1 && !shareClass.isMinted && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveClass(shareClass.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    )}
                </div>
                ))}

                <Button variant="outline" onClick={handleAddClass} disabled={isMinting !== null}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Share Class
                </Button>

                <Separator />

                <div className="p-4 rounded-lg bg-secondary border">
                    <h4 className="font-semibold text-lg">Summary</h4>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-muted-foreground">Total Shares to be Minted:</p>
                        <p className="font-bold text-xl">{totalShares.toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
             <CardFooter>
                 <div className="p-4 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <h4 className="font-bold flex items-center gap-2"><PackageCheck /> Next Steps</h4>
                    <p className="text-sm mt-1 text-primary/90">Once minted, you can proceed to the 'Distribution' page to allocate these tokens to founder wallets, employee vesting contracts, or list them on the marketplace for a Security Token Offering (STO).</p>
                </div>
             </CardFooter>
            </Card>
        </div>
      </main>
  );
}
