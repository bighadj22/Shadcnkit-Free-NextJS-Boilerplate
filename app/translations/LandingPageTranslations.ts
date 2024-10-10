import { getTranslations } from 'next-intl/server';

export interface LandingPageTranslations {
  hero: {
    badge: string;
    title: string;
    description: string;
    exploreDashboard: string;
    startForFree: string;
    browsePricingPlans: string;
  };
  navbar: {
    dashboard: string;
    features: string;
    login: string;
    getStartedForFree: string;
    signOut: string;
    documentation: string;

  };
  footer: {
    pricing: string;
    account: string;
    refundPolicy: string;
    privacyPolicy: string; 
    termsOfService: string;
    blog: string;
  };

  blogCardsSection: {
    title: string;
    subtitle: string;
    checkoutPosts: string;
  };
}

export async function getLandingPageTranslations(): Promise<LandingPageTranslations> {
  const heroT = await getTranslations('Hero');
  const navbarT = await getTranslations('NavbarFixed');
  const footerT = await getTranslations('FooterWebsite');
  const blogCardsSectionT = await getTranslations('BlogCardsSection');

  return {
    hero: {
      badge: heroT('badge'),
      title: heroT('title'),
      description: heroT('description'),
      exploreDashboard: heroT('exploreDashboard'),
      startForFree: heroT('startForFree'),
      browsePricingPlans: heroT('browsePricingPlans'),
    },
    navbar: {
      dashboard: navbarT('dashboard'),
      features: navbarT('features'),
      login: navbarT('login'),
      getStartedForFree: navbarT('getStartedForFree'),
      signOut: navbarT('signOut'),
      documentation: navbarT('documentation'),

    },
    footer: {
      pricing: footerT('pricing'),
      account: footerT('account'),
      refundPolicy: footerT('refundPolicy'),
      privacyPolicy: footerT('privacyPolicy'),
      termsOfService: footerT('termsOfService'),
      blog: footerT('blog'),
    },
    blogCardsSection: {
      title: blogCardsSectionT('title'),
      subtitle: blogCardsSectionT('subtitle'),
      checkoutPosts: blogCardsSectionT('checkoutPosts'),
    },
  };
}