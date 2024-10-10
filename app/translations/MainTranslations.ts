import { getTranslations } from 'next-intl/server';

export interface MainTranslations { 
  title: string;
  description: string;
  statistics: {
    totalNotes: string;
    totalTasks: string;
    totalFolders: string;
    activeUsers: string; 
  };
  manage: string;
  brandText: string;
  adminDashboardWelcome: string;
  yourRole: string;
}

export async function getMainTranslations(): Promise<MainTranslations> {
  const t = await getTranslations('Main');
  return {
    title: t('title'),
    description: t('description'),
    statistics: {
      totalNotes: t('statistics.totalNotes'),
      totalTasks: t('statistics.totalTasks'),
      totalFolders: t('statistics.totalFolders'),
      activeUsers: t('statistics.activeUsers')  
    },
    manage: t('manage'),
    brandText: t('brandText'),
    adminDashboardWelcome: t('adminDashboardWelcome'),
    yourRole: t('yourRole')
  };
}