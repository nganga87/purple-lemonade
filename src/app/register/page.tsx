'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { RegistrationOptions, type RegistrationChoice } from './registration-options';
import { AddTenantForm } from './add-tenant-form';
import { AddFamilyMemberForm } from './add-family-member-form';
import { AppLayout } from '@/components/layout/app-layout';
import { RegisterForm } from './register-form';
import { RegisterCompanyForm } from './register-company-form';

export default function RegisterPage() {
  const [choice, setChoice] = useState<RegistrationChoice | null>(null);

  const handleResetChoice = () => {
    setChoice(null);
  };

  const renderContent = () => {
    switch (choice) {
      case 'new-property':
        return <RegisterForm onBack={handleResetChoice} />;
      case 'new-company':
        return <RegisterCompanyForm onBack={handleResetChoice} />;
      case 'add-tenant':
        return <AddTenantForm onBack={handleResetChoice} />;
      case 'add-family-member':
        return <AddFamilyMemberForm onBack={handleResetChoice} />;
      default:
        return <RegistrationOptions onChoice={setChoice} />;
    }
  };

  return (
    <AppLayout>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {renderContent()}
      </main>
    </AppLayout>
  );
}
