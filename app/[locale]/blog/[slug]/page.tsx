import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { blogs } from '@/app/content/article';
import { getBlogs } from '@/app/content/functions/get-blog-slug'; 
import { Locale, locales } from '@/config';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { handleSignIn, handleSignOut } from '@/app/actions/auth';
import { Metadata } from 'next';
import { getBlogTranslations } from '@/app/translations/BlogTranslations'; 

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }): Promise<Metadata> {
  try {
    const locale = params.locale as Locale;
    const response = getBlogs(params?.slug, locale);

    if (!response || response.length === 0) {
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist"
      };
    }

    const blog = response[0];
    const imageUrl = new URL(blog.image, 'https://shadcnkit.com').toString();

    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          }
        ],
        type: 'article',
        publishedTime: blog.created_at,
        authors: ['ShadcnKit Team'],
        url: `https://shadcnkit.com/${locale}/blog/${blog.slug}`,
        siteName: 'ShadcnKit',
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.description,
        images: [imageUrl],
      },
      keywords: [...blog.keywords, 'ShadcnKit', 'UI components', 'React', 'Tailwind CSS'],
      authors: [{ name: 'ShadcnKit Team' }],
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: "Error",
      description: "An error occurred while fetching the page content"
    };
  }
}

export async function generateStaticParams() {
  return blogs.flatMap(blog => 
    locales.map(locale => ({
      slug: blog.slug || blog.name.en.toLowerCase().replace(/ /g, '-'),
      locale
    }))
  );
}

export default async function BlogPost({ params }: { params: { slug: string, locale: string } }) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  const locale = params.locale as Locale;
  const blog = getBlogs(params?.slug, locale)[0];

  // Fetch translations using the new function
  const translations = await getBlogTranslations();

  const onSignIn = async () => {
    'use server';
    await handleSignIn();
  };
  
  const onSignOut = async () => {
    'use server';
    await handleSignOut();
  };

  return (
    <BlogPostClient
      blog={blog}
      locale={locale}
      translations={translations}
      isAuthenticated={isAuthenticated}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
    />
  );
}