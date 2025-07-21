
'use client';

import React from 'react';
import { AdminLayout } from '../admin-layout';
import { UserTable } from './user-table';

export default function UserManagementPage() {
  return (
    <AdminLayout active="users">
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <UserTable />
      </main>
    </AdminLayout>
  );
}
