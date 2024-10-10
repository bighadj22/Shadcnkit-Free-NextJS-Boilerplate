import { FooterWebsite } from '@/components/footer/FooterWebsite';
import Hero from '@/components/landing/Hero';
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { handleSignIn, handleSignOut } from '@/app/actions/auth';
import BlogCardsSection from "@/components/landing/Blog-cards-section";
import { getLandingPageTranslations } from '@/app/translations/LandingPageTranslations'; 
import TestimonialSection from '@/components/landing/Testimonials';
import Features from '@/components/landing/Features';

export const runtime = 'edge';

export default async function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);
  const translations = await getLandingPageTranslations();

  return (
    <div className="relative bg-background text-foreground dark:bg-card dark:text-card-foreground">
      <div className="relative flex h-full min-h-screen flex-col items-center">
        <NavbarFixed 
          isAuthenticated={isAuthenticated}  
          onSignIn={handleSignIn}
          onSignOut={handleSignOut} 
          translations={translations.navbar}
          locale={locale}
        />
        <main className="flex w-full flex-col items-center justify-center">
          <Hero 
            translations={translations.hero} 
            locale={locale} 
            isAuthenticated={isAuthenticated}  
            onSignIn={handleSignIn} 
          />
          <Features translations={translations.features} />
    
          <TestimonialSection translations={translations.testimonials} />
          
          <BlogCardsSection  
            translations={translations.blogCardsSection} 
            locale={locale} 
          />
        </main>
        <FooterWebsite translations={translations.footer} locale={locale} />
      </div>
    </div>
  );
}