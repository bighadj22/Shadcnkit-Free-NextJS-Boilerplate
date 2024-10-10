"use client"

import React from 'react';
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { FooterWebsite } from '@/components/footer/FooterWebsite';
import InnerContent from '@/components/layout/innerContent';  
import LanguageAwareText from '@/components/LanguageAwareText';

interface RefundPolicyProps {
  translations: any;
  locale: string;
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({
  translations,
  locale,
  isAuthenticated,
  onSignIn,
  onSignOut
}) => {
  const isArabic = locale === 'ar';

  return (
    <div className={`relative w-full flex-col overflow-hidden bg-white bg-cover pt-[120px] dark:bg-zinc-950 md:pt-[220px] ${isArabic ? 'font-arabic' : ''}`} id="pricing">
      <NavbarFixed  
        translations={translations.navbar}
        locale={locale} 
        isAuthenticated={isAuthenticated}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <div className={`z-[1] mx-auto max-w-full pb-[60px] md:max-w-full md:pb-[100px] xl:max-w-[1170px] ${isArabic ? 'text-right' : ''}`}>
        {/* Title Section */}
        <div className="mb-20 w-full flex-col px-5 md:px-0">
          <div className="flex flex-col items-center justify-center px-5 text-start md:px-10 xl:px-0">
            <h1 className={`w-full text-center text-[28px] font-extrabold leading-[38px] text-zinc-950 dark:text-white md:w-[90%] md:text-[40px] md:leading-[50px] lg:w-[64%] xl:w-[70%] xl:text-[48px] xl:leading-[60px] 2xl:w-[60%]`}>
              <LanguageAwareText>{translations.refundPolicy.title}</LanguageAwareText>
            </h1>
          </div>
        </div>

        {/* Refund Policy Content */}
        <div className="mx-auto max-w-[800px] px-5 md:px-0 dark:text-white">
          <InnerContent>
            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.refundPolicy.billingTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.refundPolicy.billing}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.refundPolicy.refundsTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.refundPolicy.refunds}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.refundPolicy.cancellationTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.refundPolicy.cancellation}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.refundPolicy.emailsTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.refundPolicy.emails}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.refundPolicy.conditionsTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.refundPolicy.conditions}</LanguageAwareText>
            </p>
          </InnerContent>
        </div>
      </div>

      <FooterWebsite translations={translations.footer} locale={locale} />
    </div>
  );
};

export default RefundPolicy;