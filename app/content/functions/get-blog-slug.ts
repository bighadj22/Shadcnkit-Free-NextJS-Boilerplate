import { blogs } from "@/app/content/article";
import { Locale } from "@/config";

export function getBlogs(slugs: string | string[], locale: Locale) {
  let filteredBlogs = blogs;

  if (slugs && slugs.length > 0) {
    const slugArray = Array.isArray(slugs) ? slugs : [slugs];
    filteredBlogs = blogs.filter(blog =>
      slugArray.includes(blog.slug) || 
      slugArray.includes(blog.name[locale].toLowerCase().replace(/ /g, '-'))
    );
  }

  return filteredBlogs.map(blog => ({
    ...blog,
    name: blog.name[locale],
    description: blog.description[locale],
    title: blog.title[locale],
    article: blog.article[locale],
  }));
}