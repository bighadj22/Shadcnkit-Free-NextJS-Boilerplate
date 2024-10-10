import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import LanguageAwareText from '@/components/LanguageAwareText';

export const runtime = "edge";

export default function NotFound() {
  const locale = 'en'; // Default to English, or use a function to determine the locale

  return (
    <NextIntlClientProvider locale={locale}>
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8 max-w-[200px] mx-auto">
            <Image
              src="/D-logo.svg"
              alt="404 Page Not Found"
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
          <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            404
          </h1>
          <div className="mb-8">
            <LanguageAwareText>
              <h2 className="text-xl text-gray-600 dark:text-gray-400">
                This page could not be found.
              </h2>
            </LanguageAwareText>
          </div>
          <Link href="/">
            <button className="rounded-lg bg-green-500 px-6 py-3 text-base font-medium text-white hover:bg-green-600 transition-colors">
              <LanguageAwareText>Go back home</LanguageAwareText>
            </button>
          </Link>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}