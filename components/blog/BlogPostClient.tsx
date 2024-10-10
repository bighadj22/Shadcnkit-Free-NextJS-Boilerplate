"use client";

import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import PageWrapper from '@/components/wrapper/page-wrapper';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { Locale } from '@/config';
import LanguageAwareText from '@/components/LanguageAwareText';
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { FooterWebsite } from '@/components/footer/FooterWebsite';

import DotPattern from "@/components/ui/dot-pattern";

interface BlogPostClientProps {
  blog: any;
  locale: Locale;
  translations: {
    blog: any;
    navbar: any;
    footer: any;
  };
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({
  blog,
  locale,
  translations,
  isAuthenticated,
  onSignIn,
  onSignOut
}) => {
  const isArabic = locale === 'ar';

  const transformNode = (node: any) => {
    if (node.type === "tag" && node.name === "p") {
      let className = `leading-7 text-base text-foreground dark:text-card-foreground mt-6 ${isArabic ? 'text-right' : ''}`;
      if (node.attribs.class) {
        className = `${node.attribs.class} ${className}`;
      }
      node.attribs.class = className;
    }

    if (node.type === "tag" && node.name === "img") {
      node.attribs.class = "w-full h-auto rounded-lg shadow-md my-4";
      node.attribs.width = "800";
      node.attribs.height = "400";
      return (
        <Image
          src={node.attribs.src}
          alt={node.attribs.alt}
          width={800}
          height={400}
          className="w-full h-auto rounded-lg shadow-md my-4"
        />
      );
    }

    if (node.type === "tag" && node.name === "a") {
      node.attribs.class = "font-medium text-primary dark:text-primary-foreground underline underline-offset-4";
      node.attribs.target = "_blank";
      node.attribs.rel = "noopener noreferrer";
    }

    if (node.type === "tag" && node.name === "h1") {
      node.attribs.class = `scroll-m-20 text-3xl font-bold tracking-tight text-foreground dark:text-card-foreground ${isArabic ? 'text-right' : ''}`;
    }

    if (node.type === "tag" && node.name === "h2") {
      node.attribs.class = `mt-10 scroll-m-20 text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent ${isArabic ? 'text-right' : ''}`;
    }

    if (node.type === "tag" && node.name === "h3") {
      node.attribs.class = `mt-8 scroll-m-20 text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent ${isArabic ? 'text-right' : ''}`;
    }

    if (node.type === "tag" && (node.name === "ul" || node.name === "ol")) {
      const listType = node.name === "ul" ? "list-disc" : "list-decimal";
      node.attribs.class = `my-4 ${isArabic ? 'pr-6 mr-4' : 'pl-6 ml-4'} ${listType} text-foreground dark:text-card-foreground ${isArabic ? 'text-right' : ''} [&>li::marker]:text-transparent [&>li::marker]:bg-gradient-to-r [&>li::marker]:from-primary [&>li::marker]:to-ring [&>li::marker]:bg-clip-text`;
    }

    if (node.type === "tag" && node.name === "li") {
      node.attribs.class = `mt-2 text-foreground dark:text-card-foreground ${isArabic ? 'text-right' : ''}`;
    }

    if (node.type === "tag" && node.name === "code") {
      if (!node.parent || node.parent.name !== "pre") {
        node.attribs.class = "relative rounded px-2 bg-muted dark:bg-muted-foreground font-mono text-sm font-medium text-foreground dark:text-card-foreground";
      }
    }
    
    if (node.type === "tag" && node.name === "pre") {
      node.attribs.class = `mb-4 mt-6 overflow-x-auto px-4 rounded border bg-muted dark:bg-muted-foreground text-foreground dark:text-card-foreground ${isArabic ? 'text-right' : ''}`;
      const codeNode = node.children.find((child: any) => child.name === "code");
      if (codeNode) {
        codeNode.attribs.class = "relative rounded p-0 font-mono text-sm";
      }
    }

    if (node.type === "tag" && node.name === "pre") {
      node.attribs.class = `mb-4 mt-6 overflow-x-auto px-4 rounded border bg-muted dark:bg-muted-foreground text-foreground dark:text-card-foreground ${isArabic ? 'text-right' : ''}`;
      const codeNode = node.children.find((child: any) => child.name === "code");
      if (codeNode) {
        codeNode.attribs.class = "relative rounded p-0 font-mono text-sm";
      }
    }
  };

  return (
    <div className="relative w-full flex-col overflow-hidden bg-background dark:bg-card">
      <NavbarFixed 
        isAuthenticated={isAuthenticated}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        translations={translations.navbar}
        locale={locale}
      />
      <PageWrapper>
        <div className="container max-w-3xl mx-auto pt-40 md:pt-42">
      
          <article className="mt-8">
            <div>
              <p className="block text-sm text-muted-foreground">
                <LanguageAwareText>{translations.blog.publishedOn}</LanguageAwareText> {new Date(blog?.created_at).toLocaleDateString(locale)}
              </p>
            </div>
            <div className={`mt-4 text-foreground dark:text-card-foreground ${isArabic ? 'rtl' : 'ltr'}`}>
              <style jsx global>{`
                .rtl ul, .rtl ol {
                  padding-right: 1.5rem;
                  padding-left: 0;
                }
                .rtl ul {
                  list-style-type: disc;
                  list-style-position: outside;
                }
                .rtl ol {
                  list-style-type: decimal;
                  list-style-position: outside;
                }
                .rtl li {
                  direction: rtl;
                  text-align: right;
                }
                .rtl li::marker {
                  unicode-bidi: isolate;
                  font-variant-numeric: tabular-nums;
                  text-align: right;
                }
              `}</style>
              <LanguageAwareText>
                {ReactHtmlParser(blog?.article, {
                  transform: transformNode
                })}
              </LanguageAwareText>
            </div>
            
       {/* Author Card with Dot Pattern */}
<div className="mt-12 p-6 bg-muted dark:bg-muted rounded-lg shadow-md relative overflow-hidden" style={{ direction: 'ltr', textAlign: 'left' }}>
  <div className="flex items-center relative z-10">
    <Image
      src="/blog/me.svg"  
      alt="Bilal Mansouri"
      width={64}
      height={64}
      className="rounded-full mr-4"
    />
    <div>
      <h3 className="text-lg font-semibold text-foreground dark:text-card-foreground">Bilal Mansouri</h3>
      <p className="text-sm text-muted-foreground dark:text-muted-foreground">Indie Maker and Founder of Shadcnkit</p>
    </div>
  </div>
  <DotPattern
    width={20}
    height={20}
    cx={1}
    cy={1}
    cr={1}
    className={cn(
      "[mask-image:radial-gradient(circle_at_center,white,transparent)]",
      "opacity-50 dark:opacity-30 absolute inset-0"
    )}
  />
</div>

            <hr className="mt-12 border-border" />
            <div className="flex justify-center py-6 lg:py-10">
              <Link href={`/${locale}/blog`} className={cn(buttonVariants({ variant: "ghost" }), "rounded text-foreground dark:text-card-foreground")}>
                {locale === 'ar' ? <ChevronRight className="ml-2 h-4 w-4" /> : <ChevronLeft className="mr-2 h-4 w-4" />}
                <p className="text-sm">
                  <LanguageAwareText>{translations.blog.seeAllPosts}</LanguageAwareText>
                </p>
              </Link>
            </div>
          </article>
        </div>
      </PageWrapper>
      <FooterWebsite translations={translations.footer} locale={locale} />
    </div>
  );
};

export default BlogPostClient;