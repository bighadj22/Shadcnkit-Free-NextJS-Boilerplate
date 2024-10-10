import { blogs } from "../article";
import { Locale, locales } from "@/config";

export function getAllBlogSlugs() {
  return blogs.flatMap(blog => 
    locales.map(locale => ({
      slug: blog.slug || blog.name[locale as Locale].toLowerCase().replace(/ /g, '-'),
      locale: locale
    }))
  );
}