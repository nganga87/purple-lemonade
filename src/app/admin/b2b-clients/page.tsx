
'use client';

import React from 'react';
import { AdminLayout } from '../admin-layout';
import { ClientTable } from './client-table';

export default function B2bClientsPage() {
  return (
    <AdminLayout active="clients">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <ClientTable />
      </main>
    </AdminLayout>
  );
}
