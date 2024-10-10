"use client"

import React from 'react';
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { FooterWebsite } from '@/components/footer/FooterWebsite';
import InnerContent from '@/components/layout/innerContent';
import LanguageAwareText from '@/components/LanguageAwareText';

interface PrivacyPolicyProps {
  translations: any;
  locale: string;
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
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
            <LanguageAwareText>{translations.privacyPolicy.title}</LanguageAwareText>            </h1>
          </div>
        </div> 

        {/* Privacy Policy Content */}
        <div className={`mx-auto max-w-[800px] px-5 md:px-0 dark:text-white ${isArabic ? 'text-right' : ''}`}>
          <InnerContent>
            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{isArabic ? 'المقدمة' : 'Introduction'}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.privacyPolicy.introduction}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.definitionsTitle}</LanguageAwareText>
            </h2>
            <div className={`mb-10 ${isArabic ? 'text-right' : ''}`} dangerouslySetInnerHTML={{ __html: translations.privacyPolicy.definitions }}></div>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.infoWeCollectTitle}</LanguageAwareText>
            </h2>
            <div className={`mb-10 ${isArabic ? 'text-right' : ''}`} dangerouslySetInnerHTML={{ __html: translations.privacyPolicy.infoWeCollect }}></div>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.howWeUseTitle}</LanguageAwareText>
            </h2>
            <div className={`mb-10 ${isArabic ? 'text-right' : ''}`} dangerouslySetInnerHTML={{ __html: translations.privacyPolicy.howWeUse }}></div>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.dataSecurityTitle}</LanguageAwareText>
            </h2>
            <div className={`mb-10 ${isArabic ? 'text-right' : ''}`} dangerouslySetInnerHTML={{ __html: translations.privacyPolicy.dataSecurity }}></div>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.yourChoicesTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.privacyPolicy.yourChoices}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.cookiesTitle}</LanguageAwareText>
            </h2>
            <div className={`mb-10 ${isArabic ? 'text-right' : ''}`} dangerouslySetInnerHTML={{ __html: translations.privacyPolicy.cookies }}></div>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.childPrivacyTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.privacyPolicy.childPrivacy}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.changesTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.privacyPolicy.changes}</LanguageAwareText>
            </p>

            <h2 className={`mb-5 text-2xl font-bold`}>
              <LanguageAwareText>{translations.privacyPolicy.contactUsTitle}</LanguageAwareText>
            </h2>
            <p className={`mb-10`}>
              <LanguageAwareText>{translations.privacyPolicy.contactUs}</LanguageAwareText>
            </p>
          </InnerContent>
        </div>
      </div>

      <FooterWebsite translations={translations.footer} locale={locale} />
    </div>
  );
};

export default PrivacyPolicy;