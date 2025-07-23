
'use client';

import React from 'react';
import { UserTable } from './user-table';
import { AppLayout } from '@/components/layout/app-layout';

export default function UserManagementPage() {
  return (
    <AppLayout nav="admin">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <UserTable />
      </main>
    </AppLayout>
  );
}
