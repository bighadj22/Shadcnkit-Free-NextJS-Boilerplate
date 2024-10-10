import { getTranslations } from 'next-intl/server';

export interface RefundPolicyTranslations {

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

  refundPolicy: {
    title: string;
    billingTitle: string;
    billing: string;
    refundsTitle: string;
    refunds: string;
    cancellationTitle: string;
    cancellation: string;
    emailsTitle: string;
    emails: string;
    conditionsTitle: string;
    conditions: string;
  };
}

export async function getRefundPolicyTranslations(): Promise<RefundPolicyTranslations> {

  const navbarT = await getTranslations('NavbarFixed');
  const footerT = await getTranslations('FooterWebsite');
  const refundPolicyT = await getTranslations('RefundPolicy');

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
  
    refundPolicy: {
      title: refundPolicyT('title'),
      billingTitle: refundPolicyT('billingTitle'),
      billing: refundPolicyT('billing'),
      refundsTitle: refundPolicyT('refundsTitle'),
      refunds: refundPolicyT('refunds'),
      cancellationTitle: refundPolicyT('cancellationTitle'),
      cancellation: refundPolicyT('cancellation'),
      emailsTitle: refundPolicyT('emailsTitle'),
      emails: refundPolicyT('emails'),
      conditionsTitle: refundPolicyT('conditionsTitle'),
      conditions: refundPolicyT('conditions'),
    }
  };
}