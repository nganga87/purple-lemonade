'use client';

import React from 'react';
import CompanyLayout from '../layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function DistributionPage() {

    return (
        <CompanyLayout>
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Share Distribution</CardTitle>
                            <CardDescription>
                                This page is under construction. Here you will be able to manage the distribution of your newly minted share tokens.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center py-12">
                            <p className="text-muted-foreground">Distribution management tools will be available here soon.</p>
                            <Button variant="outline" className="mt-4">
                                <Download className="mr-2"/>
                                Download Cap Table (CSV)
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </CompanyLayout>
    )
}
