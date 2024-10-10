"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import BlogCard from '@/components/blog/blog-card';
import { blogs } from '@/app/content/article';
import Particles from "@/components/ui/particles";
import { useTheme } from 'next-themes';

interface BlogCardsSectionProps {
  translations: {
    title: string;
    subtitle: string;
    checkoutPosts: string;
  };
  locale: string;
}

export default function BlogCardsSection({ translations, locale }: BlogCardsSectionProps) {
  const isArabic = locale === 'ar';
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");
  
  // Get the last 3 articles
  const lastThreeBlogs = blogs.slice(-3);

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className={`relative z-[2] flex w-full flex-col items-center bg-cover pt-5 pb-5 ${isArabic ? 'rtl' : 'ltr'} mt-5 overflow-hidden`}>
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        staticity={50}
        ease={50}
        color={particleColor}
      />
      <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center justify-center gap-5 px-4 md:px-10 xl:px-0 relative z-10">
        <AnimatedGradientText className={`mx-auto mb-2.5 w-max px-4 py-2 text-zinc-950 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
          {translations.subtitle}
        </AnimatedGradientText>
        <h1 className={`mx-auto text-center text-3xl font-extrabold leading-[38px] text-zinc-950 dark:text-white md:text-[48px] md:leading-[60px] xl:text-6xl xl:leading-[70px] ${isArabic ? 'font-arabic' : ''}`}>
          {translations.title}
        </h1>
        <div className='w-full max-w-[1200px] mx-auto  md:pt-[60px]'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {lastThreeBlogs.map((blog) => (
              <Link href={`/${locale}${blog?.link}`} key={blog?.id} className="block w-full">
                <BlogCard 
                  title={blog?.name[locale as 'en' | 'ar']}
                  description={blog?.description[locale as 'en' | 'ar']}
                  image={blog?.image}
                  isArabic={isArabic}
                />
              </Link>
            ))}
          </div>
        </div>
        <Link href={`/${locale}/blog`} className={`mt-8 text-primary hover:underline ${isArabic ? 'font-arabic' : ''}`}>
          {translations.checkoutPosts}
        </Link>
      </div>
    </div>
  );
}