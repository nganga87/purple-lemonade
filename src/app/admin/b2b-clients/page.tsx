
'use client';

import React from 'react';
import { ClientTable } from './client-table';
import { AppLayout } from '@/components/layout/app-layout';

export default function B2bClientsPage() {
  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <ClientTable />
      </main>
    </AppLayout>
  );
}
