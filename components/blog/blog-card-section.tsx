import Link from 'next/link'
import BlogCard from './blog-card'
import { blogs } from '@/app/content/article'
import { Separator } from '@/components/ui/separator' 
import LanguageAwareText from '@/components/LanguageAwareText'

// Remove the import of Locale from @/config
// import { Locale } from '@/config'

interface BlogCardSectionProps {
  translations: {
    checkoutPosts: string;
  };
  locale: string;  // Changed from Locale to string
  centerText?: boolean;
  isDarkMode: boolean;
}

export default function BlogCardSection({ translations, locale, centerText = false, isDarkMode }: BlogCardSectionProps) {
  const isArabic = locale === 'ar';
  return (
    <div className='w-full max-w-[1200px] mx-auto'>
      <div className={`flex flex-col items-${centerText ? 'center' : 'start'} justify-center w-full mb-6 gap-2`}>
        {/* You can add content here if needed */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs?.map((blog) => (
          <Link href={`/${locale}${blog?.link}`} key={blog?.id} className="block w-full">
            <BlogCard 
              title={<LanguageAwareText>{blog?.name[locale as 'en' | 'ar']}</LanguageAwareText>}
              description={<LanguageAwareText>{blog?.description[locale as 'en' | 'ar']}</LanguageAwareText>}
              image={blog?.image}
              isArabic={isArabic}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}