import { Metadata } from 'next';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import RefundPolicy from '@/components/refund-policy';
import { handleSignIn, handleSignOut } from '@/app/actions/auth';
import { getRefundPolicyTranslations } from '@/app/translations/RefundPolicyTranslations';

export const runtime = 'edge';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const translations = await getRefundPolicyTranslations();

  return {
    title: translations.refundPolicy.title,
    description: translations.refundPolicy.billing,
    openGraph: {
      title: translations.refundPolicy.title,
      description: translations.refundPolicy.billing,
      url: `https://shadcnkit.com/${locale}/refund-policy`,
      siteName: 'ShadcnKit',
      images: [
        {
          url: 'https://shadcnkit.com/ShadcnKit.svg',
          width: 1200,
          height: 630,
          alt: 'ShadcnKit Refund Policy',
        }
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.refundPolicy.title,
      description: translations.refundPolicy.billing,
      images: ['https://shadcnkit.com/ShadcnKit.svg'],
    },
    keywords: ['ShadcnKit', 'Refund Policy', 'UI components', 'React', 'Tailwind CSS'],
  };
}

export default async function RefundPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);
  const translations = await getRefundPolicyTranslations();

  const onSignIn = async () => {
    'use server';
    await handleSignIn();
  };

  const onSignOut = async () => {
    'use server'; 
    await handleSignOut();
  };

  return ( 
    <RefundPolicy
      translations={translations}
      locale={locale}
      isAuthenticated={isAuthenticated}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
    />
  );
}