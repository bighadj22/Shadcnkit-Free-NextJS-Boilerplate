'use client';

import React from 'react';
import Statistics from '@/components/main/cards/Statistics';
import DashboardLayout from '@/components/layout';
import { FaBook, FaComments, FaUserGraduate } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

interface MainProps {
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  userEmail: string;
  locale: string;
  translations: {
    title: string;
    description: string;
    statistics: {
      totalNotes: string;
      totalTasks: string;
      totalFolders: string;
      activeUsers: string;  // New field
    };
    brandText: string;
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
  const cardStyle = "bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-lg shadow-lg relative overflow-hidden flex-1 w-full mb-5";
  const iconStyle = "flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white mb-2";

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
        <div className="flex flex-col md:flex-row md:flex-wrap md:gap-5">
          <div className={cardStyle}>
            <Statistics  
              icon={
                <div className={iconStyle}>
                  <FaBook className="h-5 w-5" />
                </div>
              }
              title={translations.statistics.totalNotes}
              value="15"
            />
          </div>
          <div className={cardStyle}>
            <Statistics
              icon={
                <div className={iconStyle}>
                  <MdAssignment className="h-5 w-5" />
                </div>
              }
              title={translations.statistics.totalTasks}
              value="7"
            />
          </div>
          <div className={cardStyle}>
            <Statistics
              icon={
                <div className={iconStyle}>
                  <FaComments className="h-5 w-5" />
                </div>
              }
              title={translations.statistics.totalFolders}
              value="3"
            />
          </div>
          <div className={cardStyle}>
            <Statistics
              icon={
                <div className={iconStyle}>
                  <FaUserGraduate className="h-5 w-5" />
                </div>
              }
              title={translations.statistics.activeUsers}
              value="42"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}