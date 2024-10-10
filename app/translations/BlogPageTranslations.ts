import { getTranslations } from 'next-intl/server';

export interface BlogPageTranslations {
  blog: {
    blogTitle: string;
    viewOnGithub: string;
    checkoutPosts: string;
  };
  navbar: {
    dashboard: string;
    documentation: string;
    login: string;
    getStartedForFree: string;
    signOut: string;
  };
  footer: {
    account: string;
    refundPolicy: string;
    privacyPolicy: string;
    termsOfService: string;
    blog: string;
  };
}

export async function getBlogPageTranslations(): Promise<BlogPageTranslations> {
  const blogT = await getTranslations('Blog');
  const navbarT = await getTranslations('NavbarFixed');
  const footerT = await getTranslations('FooterWebsite');

  return {
    blog: {
      blogTitle: blogT('blogTitle'),
      viewOnGithub: blogT('viewOnGithub'),
      checkoutPosts: blogT('checkoutPosts')
    },
    navbar: {
      dashboard: navbarT('dashboard'),
      documentation: navbarT('documentation'),
      login: navbarT('login'),
      getStartedForFree: navbarT('getStartedForFree'),
      signOut: navbarT('signOut'),
    },
    footer: {
      account: footerT('account'),
      refundPolicy: footerT('refundPolicy'),
      privacyPolicy: footerT('privacyPolicy'),
      termsOfService: footerT('termsOfService'),
      blog: footerT('blog'),
    }
  };
}