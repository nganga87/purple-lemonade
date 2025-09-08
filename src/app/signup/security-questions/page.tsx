// src/app/signup/security-questions/page.tsx
'use client';

import { Suspense } from 'react';
import SecurityQuestionsForm from './security-questions-form';

export default function SecurityQuestionsPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="h-16 w-16 rounded-full bg-muted animate-pulse mb-4" />
          <div className="h-8 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-64 bg-muted rounded mb-6" />
          <div className="w-full max-w-md h-2 bg-muted rounded" />
        </div>
      }>
        <SecurityQuestionsForm />
      </Suspense>
    </div>
  );
}