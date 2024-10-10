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
  features: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
      feature: string;
      learnMore: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    testimonials: Array<{
      name: string;
      company: string;
      testimonial: string;
    }>;
  };
}

export async function getLandingPageTranslations(): Promise<LandingPageTranslations> {
  const heroT = await getTranslations('Hero');
  const navbarT = await getTranslations('NavbarFixed');
  const footerT = await getTranslations('FooterWebsite');
  const blogCardsSectionT = await getTranslations('BlogCardsSection');
  const featuresT = await getTranslations('Features');
  const testimonialsT = await getTranslations('Testimonials');

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
    features: {
      title: featuresT('title'),
      subtitle: featuresT('subtitle'),
      cards: [
        {
          title: featuresT('cards.0.title'),
          description: featuresT('cards.0.description'),
          feature: featuresT('cards.0.feature'),
          learnMore: featuresT('cards.0.learnMore'),
        },
        {
          title: featuresT('cards.1.title'),
          description: featuresT('cards.1.description'),
          feature: featuresT('cards.1.feature'),
          learnMore: featuresT('cards.1.learnMore'),
        },
        {
          title: featuresT('cards.2.title'),
          description: featuresT('cards.2.description'),
          feature: featuresT('cards.2.feature'),
          learnMore: featuresT('cards.2.learnMore'),
        },
        {
          title: featuresT('cards.3.title'),
          description: featuresT('cards.3.description'),
          feature: featuresT('cards.3.feature'),
          learnMore: featuresT('cards.3.learnMore'),
        },
        {
          title: featuresT('cards.4.title'),
          description: featuresT('cards.4.description'),
          feature: featuresT('cards.4.feature'),
          learnMore: featuresT('cards.4.learnMore'),
        },
        {
          title: featuresT('cards.5.title'),
          description: featuresT('cards.5.description'),
          feature: featuresT('cards.5.feature'),
          learnMore: featuresT('cards.5.learnMore'),
        },
        {
          title: featuresT('cards.6.title'),
          description: featuresT('cards.6.description'),
          feature: featuresT('cards.6.feature'),
          learnMore: featuresT('cards.6.learnMore'),
        },
      ],
    },
    testimonials: {
      title: testimonialsT('title'),
      subtitle: testimonialsT('subtitle'),
      testimonials: [
        {
          name: testimonialsT('testimonials.0.name'),
          company: testimonialsT('testimonials.0.company'),
          testimonial: testimonialsT('testimonials.0.testimonial'),
        },
        {
          name: testimonialsT('testimonials.1.name'),
          company: testimonialsT('testimonials.1.company'),
          testimonial: testimonialsT('testimonials.1.testimonial'),
        },
        {
          name: testimonialsT('testimonials.2.name'),
          company: testimonialsT('testimonials.2.company'),
          testimonial: testimonialsT('testimonials.2.testimonial'),
        },
        {
          name: testimonialsT('testimonials.3.name'),
          company: testimonialsT('testimonials.3.company'),
          testimonial: testimonialsT('testimonials.3.testimonial'),
        },
        {
          name: testimonialsT('testimonials.4.name'),
          company: testimonialsT('testimonials.4.company'),
          testimonial: testimonialsT('testimonials.4.testimonial'),
        },
        {
          name: testimonialsT('testimonials.5.name'),
          company: testimonialsT('testimonials.5.company'),
          testimonial: testimonialsT('testimonials.5.testimonial'),
        },
      ],
    },
  };
}