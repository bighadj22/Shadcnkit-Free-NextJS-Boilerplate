import { getTranslations } from 'next-intl/server';

export interface PrivacyPolicyTranslations {

  navbar: {
    dashboard: string;
    features: string;
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
 
  privacyPolicy: {
    title: string;
    lastUpdated: string;
    introduction: string;
    definitionsTitle: string;
    definitions: { term: string; definition: string }[];
    infoWeCollectTitle: string;
    infoWeCollect: string[];
    howWeUseTitle: string;
    howWeUse: string[];
    dataSecurityTitle: string;
    dataSecurity: string[];
    yourChoicesTitle: string;
    yourChoices: string;
    cookiesTitle: string;
    cookies: string[];
    childPrivacyTitle: string;
    childPrivacy: string;
    changesTitle: string;
    changes: string;
    contactUsTitle: string;
    contactUs: string;
  };
}

export async function getPrivacyPolicyTranslations(): Promise<PrivacyPolicyTranslations> {

  const navbarT = await getTranslations('NavbarFixed');
  const footerT = await getTranslations('FooterWebsite');
  const privacyPolicyT = await getTranslations('PrivacyPolicy');

  return {

    navbar: {
      dashboard: navbarT('dashboard'),
      features: navbarT('features'),
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
    },
 
    privacyPolicy: {
      title: privacyPolicyT('title'),
      lastUpdated: privacyPolicyT('lastUpdated'),
      introduction: privacyPolicyT('introduction'),
      definitionsTitle: privacyPolicyT('definitionsTitle'),
      definitions: privacyPolicyT.raw('definitions'),
      infoWeCollectTitle: privacyPolicyT('infoWeCollectTitle'),
      infoWeCollect: privacyPolicyT.raw('infoWeCollect'),
      howWeUseTitle: privacyPolicyT('howWeUseTitle'),
      howWeUse: privacyPolicyT.raw('howWeUse'),
      dataSecurityTitle: privacyPolicyT('dataSecurityTitle'),
      dataSecurity: privacyPolicyT.raw('dataSecurity'),
      yourChoicesTitle: privacyPolicyT('yourChoicesTitle'),
      yourChoices: privacyPolicyT('yourChoices'),
      cookiesTitle: privacyPolicyT('cookiesTitle'),
      cookies: privacyPolicyT.raw('cookies'),
      childPrivacyTitle: privacyPolicyT('childPrivacyTitle'),
      childPrivacy: privacyPolicyT('childPrivacy'),
      changesTitle: privacyPolicyT('changesTitle'),
      changes: privacyPolicyT('changes'),
      contactUsTitle: privacyPolicyT('contactUsTitle'),
      contactUs: privacyPolicyT('contactUs'),
    }
  };
}