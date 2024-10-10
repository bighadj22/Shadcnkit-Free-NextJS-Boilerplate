"use client";

import React from 'react';
import BlogCardSection from "@/components/blog/blog-card-section";
import { Separator } from "@/components/ui/separator";
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { FooterWebsite } from '@/components/footer/FooterWebsite';
import LanguageAwareText from '@/components/LanguageAwareText';
import { Locale } from '@/config';
import { useTheme } from 'next-themes';

interface BlogClientProps {
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  translations: {
    blog: {
      blogTitle: string;
      checkoutPosts: string;
    };
    navbar: any;
    footer: any;
  };
  locale: Locale;
}

const BlogClient: React.FC<BlogClientProps> = ({
  isAuthenticated,
  onSignIn,
  onSignOut,
  translations,
  locale
}) => {
  const isArabic = locale === 'ar';
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="relative w-full flex-col overflow-hidden bg-background dark:bg-card">
      <NavbarFixed 
        isAuthenticated={isAuthenticated}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        translations={translations.navbar} 
        locale={locale}
      />
      <div className="z-[1] mx-auto w-full max-w-[1200px] pb-[60px] pt-[120px] md:pt-[180px] md:pb-[100px] px-4">
        <div className='flex flex-col items-center justify-center mt-[2rem] mb-[4rem] w-full'>
          <div className='flex flex-col items-center justify-center w-full gap-2 mb-8 text-center'>
            <h1 className={`scroll-m-20 text-4xl font-bold tracking-tight text-foreground dark:text-card-foreground ${isArabic ? 'font-arabic' : ''}`}>
              <LanguageAwareText>{translations.blog.blogTitle}</LanguageAwareText>
            </h1>
            <Separator className="my-4 w-1/2 mx-auto" />
          </div>
          <BlogCardSection 
            translations={{
              checkoutPosts: translations.blog.checkoutPosts
            }}
            locale={locale}
            centerText={true}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      <FooterWebsite translations={translations.footer} locale={locale} />
    </div>
  );
};

export default BlogClient;
