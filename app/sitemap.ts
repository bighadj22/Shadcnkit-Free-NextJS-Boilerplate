import { blogs } from "@/app/content/article";
import { locales, Locale } from "@/config";

// Define types for blog posts and sitemap entries
type BlogPost = {
  slug: string;
  created_at: string;
};

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export default async function sitemap(): Promise<SitemapEntry[]> {

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  const blogPostsEntries: SitemapEntry[] = [];
  
  // Generate sitemap entries for blog posts in all locales
  locales.forEach((locale: Locale) => {
    blogs.forEach((post: BlogPost) => {
      blogPostsEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.created_at || new Date().toISOString(),
        changeFrequency: "weekly" as const,
      });
    });
  });

  const staticPagesEntries: SitemapEntry[] = [];
  
  // Generate sitemap entries for static pages in all locales
  locales.forEach((locale: Locale) => {
    staticPagesEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    });
  });

  // Combine and return all sitemap entries
  return [...staticPagesEntries, ...blogPostsEntries];
}