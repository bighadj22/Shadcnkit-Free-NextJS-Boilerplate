import { getLogtoContext } from '@logto/next/server-actions';  
import { logtoConfig } from '@/app/logto';
import { redirect } from 'next/navigation'; 
import { Toaster } from 'react-hot-toast';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';

export function generateStaticParams() {
  return ['en', 'ar'].map(locale => ({locale})); 
}

export default async function DashboardLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  unstable_setRequestLocale(locale); 

  const messages = await getMessages();
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    redirect(`/${locale}`); 
  }
 
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
      <Toaster position="top-center" />
    </NextIntlClientProvider>
  );
}