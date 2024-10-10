"use client"
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import LanguageAwareText from '@/components/LanguageAwareText';
import Link from 'next/link';
import { TextGenerateEffect } from "../ui/text-generate-effect";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import Particles from "@/components/ui/particles";
import { FaGithub } from "react-icons/fa";


interface HeroProps {
  translations: {
    badge: string;
    title: string;
    description: string;
    exploreDashboard: string;
    startForFree: string;
    browsePricingPlans: string;
  };
  locale: string;
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
}

export default function Hero({ translations, locale, isAuthenticated, onSignIn }: HeroProps) {
  const isArabic = locale === 'ar';
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const handleSignIn = async () => {
    try {
      await onSignIn();
    } catch (error) {
      // Handle sign in error
    }
  };

  return (
    <div className="relative mx-auto mt-20 md:mt-12 flex w-[96vw] flex-col content-center items-center rounded-xl 
      bg-background dark:bg-card md:mt-[90px] md:rounded-3xl lg:mt-[103px] 2xl:w-[94vw] overflow-hidden pb-5">
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        staticity={50}
        ease={50}
        color={particleColor}
      />
      <div className="flex w-full relative z-10">
        <div className="3xl:pt-[200px] mb-0 flex w-[stretch] max-w-full flex-row content-center items-center justify-between pt-20 lg:pt-[120px]">
          <div className="mx-auto flex w-full flex-col text-center">
            <AnimatedGradientText className={`mx-auto mb-2.5 w-max px-4 py-2 text-foreground dark:text-card-foreground ${isArabic ? 'font-arabic' : ''}`}>
              <LanguageAwareText>{translations.badge}</LanguageAwareText>
            </AnimatedGradientText>
            <h1 className={`3xl:text-6xl z-[40] mx-auto mb-6 mt-4 max-w-[94%] text-3xl font-bold leading-[36px] text-foreground dark:text-card-foreground md:max-w-[70%] md:text-[50px] md:leading-[60px] lg:max-w-[76%] lg:text-[50px] lg:leading-[68px] xl:max-w-[60%] 2xl:max-w-[48%] 2xl:text-[50px] 2xl:leading-[68px] ${isArabic ? 'font-arabic' : ''}`}>
              <TextGenerateEffect
                words={translations.title}
                className="inline-block w-full"
                filter={false}
              />
            </h1>
            <h5 className={`mb-8 w-[96%] self-center text-base font-normal leading-8 text-foreground dark:text-muted-foreground md:mb-10 md:w-[82%] lg:w-[62%] xl:w-[50%] xl:text-lg xl:leading-[32px] 2xl:w-[44%] 2xl:text-lg 2xl:leading-[32px] ${isArabic ? 'font-arabic' : ''}`}>
              <LanguageAwareText>{translations.description}</LanguageAwareText>
            </h5>
            <div className="mx-auto flex items-center justify-center mb-8">
              {isAuthenticated ? (
                <Link href={`/${locale}/dashboard`} className="me-2 md:me-5">
                  <Button className={`mb-6 flex items-center justify-center px-4 py-7 text-sm font-medium md:mb-0 ${isArabic ? 'font-arabic' : ''}`}>
                    <LanguageAwareText>{translations.exploreDashboard}</LanguageAwareText>
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className={`me-2 md:me-5 mb-6 flex items-center justify-center px-4 py-7 text-sm font-medium md:mb-0 ${isArabic ? 'font-arabic' : ''}`}
                >
                  <LanguageAwareText>{translations.startForFree}</LanguageAwareText>
                </Button>
              )}
              <Link href={`/${locale}/pricing`}>
                <Button
                  variant="outline"
                  className={`mb-6 flex items-center justify-center px-4 py-7 text-sm font-medium dark:text-card-foreground md:mb-0 ${isArabic ? 'font-arabic' : ''}`}
                >
                  <FaGithub className="mr-2 h-4 w-4" />  {/* Added GitHub icon */}
                  <LanguageAwareText>{translations.browsePricingPlans}</LanguageAwareText>
                </Button>
              </Link>
            </div>
            <div className="w-full max-w-4xl mx-auto mt-8">
              <HeroVideoDialog
                className="dark:hidden block"
                animationStyle="top-in-bottom-out"
                videoSrc="https://customer-k1zhtsbwvhqzs7d1.cloudflarestream.com/8db9e620a8baa2a2c70023267cadc34a/watch"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Hero Video"
              />
              <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="top-in-bottom-out"
                videoSrc="https://customer-k1zhtsbwvhqzs7d1.cloudflarestream.com/8db9e620a8baa2a2c70023267cadc34a/watch"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}