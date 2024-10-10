'use client';
import React from 'react';
import DashboardLayout from '@/components/layout';

interface MainProps {
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  userEmail: string;
  locale: string;
  translations: {
    title: string;
    description: string;
    brandText: string;
    adminDashboardWelcome: string;
    yourRole: string;
  };
  userRole: string;
} 

export default function Main({ 
  isAuthenticated,
  onSignIn,   
  onSignOut,
  userEmail,
  translations,
  locale,
  userRole, 
}: MainProps) {
  return (
    <DashboardLayout 
      title={translations.title}
      description={translations.description}
      isAuthenticated={isAuthenticated}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      userEmail={userEmail}
      brandText={translations.brandText}
      locale={locale}
      userRole={userRole}
    >
      <div className={`h-full w-full ${locale === 'ar' ? 'font-arabic' : 'font-inter'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{translations.adminDashboardWelcome}</h1>
          <p className="text-lg text-gray-800 dark:text-gray-200">{translations.yourRole}: <span className="font-bold">{userRole}</span></p>
        </div>
      </div>
    </DashboardLayout>
  );
}