'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'; 
import { RiRobot2Line } from "react-icons/ri";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineShieldCheck,
  HiStar,
  HiLanguage,
} from 'react-icons/hi2';
import { IoMenuOutline } from 'react-icons/io5';
import Link from 'next/link';
import LanguageAwareText from '@/components/LanguageAwareText';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/config';
import Image from 'next/image';

// Define props interface
interface NavbarFixedProps { 
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  translations: {
    dashboard: string;
    login: string;
    getStartedForFree: string;
    signOut: string;
    documentation: string;
    language?: string;
  };
  locale: string;
}

export default function NavbarFixed({ 
  isAuthenticated, 
  onSignIn, 
  onSignOut, 
  translations,
  locale
}: NavbarFixedProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const isArabic = locale === 'ar';
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  const locales = [
    { code: 'en', name: 'English', flag: '/usa.png' },
    { code: 'ar', name: 'العربية', flag: '/algeria.png' },
    { code: 'fr', name: 'Français', flag: '/france.png' },
  ];

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', changeNavbar);
  
    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await onSignIn();
    } catch (error) {
      // Handle sign in error
    } 
  }; 

  const handleSignOut = async () => {
    try {
      await onSignOut();
    } catch (error) {
      // Handle sign out error  
    }
  };

  const handleLanguageChange = (newLocale: string) => {
    setSelectedLocale(newLocale);
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed left-[50%] top-0 z-[49] mx-auto flex w-full translate-x-[-50%] translate-y-0 flex-col items-center bg-background text-foreground dark:bg-card dark:text-card-foreground xl:justify-center">
      {/* Top banner section - Updated with centered text, sparkles, and glow effect */}
      <div className="w-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 animate-glow">
        <div className="flex justify-center items-center py-3 px-4">
          <Link href="https://shadcnkit.com" className="text-center group transition-all duration-300 ease-in-out">
            <p className={`text-xs font-medium text-foreground dark:text-card-foreground group-hover:text-primary transition-colors duration-300 ${isArabic ? 'font-arabic' : ''}`}>
              <LanguageAwareText>
                ✨ Get the full-stack, production-ready ShadcnKit Pro for just $49! ✨
              </LanguageAwareText>
            </p>
          </Link>
        </div>
      </div>

      {/* Main navbar section */}
      <div className="mb-0 flex w-[calc(100vw_-_4%)] flex-row items-center justify-between gap-[40px] py-5 sm:px-6 md:w-[calc(100vw_-_4%)] md:px-2.5 lg:w-[100vw] lg:px-3 xl:w-[calc(100vw_-_250px)] xl:pl-3 2xl:w-[1200px]">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src="/D-logo.svg"
              alt="shadcnkit Logo"
              width={30}
              height={30}
            />
            <h5 className={`ml-2 text-2xl font-bold leading-5 text-foreground dark:text-card-foreground font-jakarta ${isArabic ? 'font-arabic' : ''}`}>
              shadcnkit
            </h5>
          </div>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center">
          <Link href={`/${locale}/dashboard`} className={`my-auto mr-[30px] hidden text-sm font-medium leading-[0px] text-foreground dark:text-card-foreground lg:block ${isArabic ? 'font-arabic' : ''}`}>
            <LanguageAwareText>{translations.dashboard}</LanguageAwareText>
          </Link>
        
          <Link href={`https://docs.shadcnkit.com`} className={`my-auto mr-[30px] hidden text-sm font-medium leading-[0px] text-foreground dark:text-card-foreground lg:block ${isArabic ? 'font-arabic' : ''}`}> 
            <LanguageAwareText>{translations.documentation}</LanguageAwareText>
          </Link>
       

          {/* Mobile menu */} 
          <div className="flex items-center lg:hidden">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline" 
                  className="me-2 flex min-h-10 min-w-10 cursor-pointer rounded-full border-border p-0 text-xl text-foreground dark:border-border dark:text-card-foreground z-50"
                >
                  <HiLanguage className="h-4 w-4 stroke-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-border dark:border-border">
                {locales.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className={`flex cursor-pointer items-center ${
                      selectedLocale === lang.code ? 'bg-primary text-primary-foreground' : ''
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      width={24}
                      height={24}
                      className="mr-2 h-4 w-4 rounded-full"
                    />
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              className="me-2 flex min-h-10 min-w-10 cursor-pointer rounded-full border-border p-0 text-xl text-foreground dark:border-border dark:text-card-foreground z-50"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'light' ? (
                <HiOutlineMoon className="h-4 w-4 stroke-2" />
              ) : (
                <HiOutlineSun className="h-5 w-5 stroke-2" />
              )}
            </Button>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex min-h-10 min-w-10 cursor-pointer rounded-full border-border p-0 text-xl text-foreground dark:border-border dark:text-card-foreground z-50">
                  <IoMenuOutline className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[80] w-56 border-border dark:border-border">
                <DropdownMenuItem>
                  <Link href={`/${locale}/dashboard`} className={`text-md my-auto mr-[30px] font-medium text-foreground dark:text-card-foreground ${isArabic ? 'font-arabic' : ''}`}>
                    <LanguageAwareText>{translations.dashboard}</LanguageAwareText>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {isAuthenticated ? (
                    <Button onClick={handleSignOut} className={isArabic ? 'font-arabic' : ''}>
                      <LanguageAwareText>{translations.signOut}</LanguageAwareText>
                    </Button>
                  ) : (
                    <Button onClick={handleSignIn} className={isArabic ? 'font-arabic' : ''}>
                      <LanguageAwareText>{translations.login}</LanguageAwareText>
                    </Button>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border dark:bg-border" />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                   
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop authentication buttons, Theme toggle, and Language switcher */}
        <div className="hidden items-center lg:flex">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ms-3 flex min-h-10 min-w-10 cursor-pointer rounded-full border-border p-0 text-xl text-foreground dark:border-border dark:text-card-foreground"
              >
                <HiLanguage className="h-4 w-4 stroke-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-border dark:border-border">
              {locales.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className={`flex cursor-pointer items-center ${
                    selectedLocale === lang.code ? 'bg-primary text-primary-foreground' : ''
                  }`}onClick={() => handleLanguageChange(lang.code)}
                  >
                    <Image
                      src={lang.flag}
                      alt={lang.name}
                      width={24}
                      height={24}
                      className="mr-2 h-4 w-4 rounded-full"
                    />
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
  
            {/* Theme Toggle */}
            <Button
              variant="outline"
              className="ms-3 flex min-h-10 min-w-10 cursor-pointer rounded-full border-border p-0 text-xl text-foreground dark:border-border dark:text-card-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'light' ? (
                <HiOutlineMoon className="h-4 w-4 stroke-2" />
              ) : (
                <HiOutlineSun className="h-5 w-5 stroke-2" />
              )}
            </Button>
  
            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <Button variant="outline" className={`ms-3 py-6 dark:text-card-foreground ${isArabic ? 'font-arabic' : ''}`} onClick={handleSignOut}>
                <LanguageAwareText>{translations.signOut}</LanguageAwareText>  
              </Button>
            ) : (
              <>
                <Button variant="outline" className={`ms-3 py-6 dark:text-card-foreground ${isArabic ? 'font-arabic' : ''}`} onClick={handleSignIn}>
                  <LanguageAwareText>{translations.login}</LanguageAwareText>
                </Button>
                <Button className={`ms-3 py-6 dark:text-card-foreground ${isArabic ? 'font-arabic' : ''}`} onClick={handleSignIn}>
                  <LanguageAwareText>{translations.getStartedForFree}</LanguageAwareText>
                </Button>  
              </>
            )}
          </div>
        </div>
      </div>
    );
  }