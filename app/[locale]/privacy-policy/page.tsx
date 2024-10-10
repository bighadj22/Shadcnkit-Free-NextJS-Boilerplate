import { Metadata } from 'next';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import PrivacyPolicy from '@/components/privacy-policy';
import { handleSignIn, handleSignOut } from '@/app/actions/auth';
import { getPrivacyPolicyTranslations } from '@/app/translations/PrivacyPolicyTranslations';

export const runtime = 'edge';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const translations = await getPrivacyPolicyTranslations();

  return {
    title: translations.privacyPolicy.title,
    description: translations.privacyPolicy.introduction,
    openGraph: {
      title: translations.privacyPolicy.title,
      description: translations.privacyPolicy.introduction,
      url: `https://shadcnkit.com/${locale}/privacy-policy`,
      siteName: 'ShadcnKit',
      images: [
        {
          url: 'https://shadcnkit.com/ShadcnKit.svg',
          width: 1200,
          height: 630,
          alt: 'ShadcnKit Privacy Policy',
        }
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.privacyPolicy.title,
      description: translations.privacyPolicy.introduction,
      images: ['https://shadcnkit.com/ShadcnKit.svg'],
    },
    keywords: ['ShadcnKit', 'Privacy Policy', 'UI components', 'React', 'Tailwind CSS'],
  };
}

export default async function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);
  const translations = await getPrivacyPolicyTranslations();

  const onSignIn = async () => {
    'use server'; 
    await handleSignIn();
  };

  const onSignOut = async () => {
    'use server';
    await handleSignOut();  
  };

  return (
    <PrivacyPolicy 
      translations={translations} 
      locale={locale} 
      isAuthenticated={isAuthenticated}
      onSignIn={onSignIn}  
      onSignOut={onSignOut}
    />
  );
}