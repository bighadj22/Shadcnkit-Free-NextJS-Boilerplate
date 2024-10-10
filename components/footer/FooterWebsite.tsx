'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import LanguageAwareText from '@/components/LanguageAwareText';

interface FooterWebsiteProps {
  translations: {
    pricing: string;
    account: string;
    refundPolicy: string;
    privacyPolicy: string;
    termsOfService: string;
    blog: string;
  };
  locale: string;
}

export function FooterWebsite({ translations, locale }: FooterWebsiteProps) {
  const isArabic = locale === 'ar';
  const { theme } = useTheme();

  return (
    <div className="relative z-[3] flex flex-col items-center justify-between px-5 pb-[50px] xl:px-0">
      <div className="flex h-[1px] w-full max-w-[1170px] bg-zinc-200 dark:bg-zinc-800" />
      <div className="mx-auto mt-20 flex w-full max-w-full flex-col justify-between md:mt-12 lg:flex-row xl:w-[1170px] xl:max-w-[1170px]">
        <div className="my-auto mb-5 max-w-full lg:mb-0 lg:w-[21%] xl:max-w-max xl:pl-0">
          <Link href={`/${locale}`} className="flex items-center justify-center">
            <div className={`flex items-center justify-center`}>
              <Image
                src="/D-logo.svg"
                alt="shadcnkit Logo"
                width={30}
                height={30}
              />
              <h5 className={`ml-2 text-2xl font-bold leading-5 text-zinc-950 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                <LanguageAwareText>shadcnkit</LanguageAwareText>
              </h5>
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center justify-center text-center md:flex-row xl:w-[unset]">
          <div className="mx-auto mb-5 mt-5 flex flex-col items-center justify-center lg:mb-[unset] lg:mr-0 lg:items-end lg:justify-end">
            <div className="my-auto flex flex-col md:flex-row">
              <a
                href={`/${locale}/dashboard`} 
                className={`mb-5 mr-0 text-sm font-medium text-zinc-950 dark:text-white md:mb-0 md:mr-10 ${isArabic ? 'font-arabic' : ''}`}
              >
                <LanguageAwareText>{translations.account}</LanguageAwareText>
              </a>
              <Link href={`/${locale}/blog`} className={`mb-5 mr-0 text-sm font-medium text-zinc-950 dark:text-white md:mb-0 md:mr-10 ${isArabic ? 'font-arabic' : ''}`}>
                <LanguageAwareText>{translations.blog}</LanguageAwareText>
              </Link>
              <Link href={`/${locale}/refund-policy`} className={`mb-5 mr-0 text-sm font-medium text-zinc-950 dark:text-white md:mb-0 md:mr-10 ${isArabic ? 'font-arabic' : ''}`}>
                <LanguageAwareText>{translations.refundPolicy}</LanguageAwareText>
              </Link>
              <Link href={`/${locale}/privacy-policy`} className={`mb-5 mr-0 text-sm font-medium text-zinc-950 dark:text-white md:mb-0 md:mr-10 ${isArabic ? 'font-arabic' : ''}`}>
                <LanguageAwareText>{translations.privacyPolicy}</LanguageAwareText>
              </Link>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}