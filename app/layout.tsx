import { PropsWithChildren } from 'react';
import Script from 'next/script';
import '@/styles/globals.css';
import { ThemeProvider } from '@/app/theme-provider';
import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('Layout');
  return {
    metadataBase: new URL('https://shadcnkit.com'),
    title: {
      default: t('title'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
    keywords: ['shadcnkit', 'UI components', 'React', 'Tailwind CSS'],
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url: `https://shadcnkit.com/${locale}`,
      siteName: t('siteName'),
      images: [
        {
          url: '/ShadcnKit.svg',
          width: 1200,
          height: 630,
          alt: t('logoAlt'),
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/ShadcnKit.svg'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/ShadcnKit.svg',
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children, params: { locale } }: PropsWithChildren<{ params: { locale: string } }>) {
  const facebookPixelId = process.env.FACEBOOK_PIXEL_ID;

  return (
    <html lang={locale}>
      <head>
        <Script id="microsoft-clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nd085s33rz");
          `}
        </Script>
        {facebookPixelId && (
          <>
            <Script id="meta-pixel-script" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${facebookPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main id="skip">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}