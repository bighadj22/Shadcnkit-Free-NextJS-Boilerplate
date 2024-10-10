import { getTranslations } from 'next-intl/server';

export interface BlogTranslations {
  blog: {
    seeAllPosts: string;
    publishedOn: string;
  };
  navbar: {
    dashboard: string;
    documentation: string;
    faqs: string;
    login: string;
    getStartedForFree: string;
    signOut: string;
  };
  footer: {
    pricing: string;
    account: string;
    refundPolicy: string;
    privacyPolicy: string;
    termsOfService: string;
    blog: string;
  };
}

export async function getBlogTranslations(): Promise<BlogTranslations> {
  const blogT = await getTranslations('Blog');
  const navbarT = await getTranslations('NavbarFixed');
  const footerT = await getTranslations('FooterWebsite');

  return {
    blog: {
      seeAllPosts: blogT('seeAllPosts'),
      publishedOn: blogT('publishedOn')
    },
    navbar: {
      dashboard: navbarT('dashboard'),
      documentation: navbarT('documentation'),
      faqs: navbarT('faqs'),
      login: navbarT('login'),
      getStartedForFree: navbarT('getStartedForFree'),
      signOut: navbarT('signOut'),
    },
    footer: {
      pricing: footerT('pricing'),
      account: footerT('account'),
      refundPolicy: footerT('refundPolicy'),
      privacyPolicy: footerT('privacyPolicy'),
      termsOfService: footerT('termsOfService'),
      blog: footerT('blog'),
    }
  };
}