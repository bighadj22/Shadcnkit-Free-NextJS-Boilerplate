import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import BlogClient from '@/components/blog/BlogClient';
import { handleSignIn, handleSignOut } from '@/app/actions/auth';
import { Locale } from '@/config';
import { getBlogPageTranslations } from '@/app/translations/BlogPageTranslations';  

export const runtime = 'edge';

export default async function BlogPage({ params: { locale } }: { params: { locale: Locale } }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  // Fetch translations using the new function
  const translations = await getBlogPageTranslations();

  const onSignIn = async () => {
    'use server';
    await handleSignIn();
  };
  
  const onSignOut = async () => {
    'use server';
    await handleSignOut();
  };

  return ( 
    <BlogClient
      isAuthenticated={isAuthenticated}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      translations={translations}
      locale={locale}
    />
  );
}