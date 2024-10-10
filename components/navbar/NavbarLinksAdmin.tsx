'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineInformationCircle,
  HiOutlineArrowRightOnRectangle,
  HiUser, 
} from 'react-icons/hi2';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations, useLocale } from 'next-intl';

// Define props interface
interface AdminNavbarLinksProps {
  onOpen: () => void;
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  [x: string]: any;
} 

export default function AdminNavbarLinks({ 
  onOpen,
  isAuthenticated,
  onSignIn,
  onSignOut,
  ...props
}: AdminNavbarLinksProps) {
  const router = useRouter(); 
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('NavbarAdminLinks');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  // Effect to handle component mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Handle sign out
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await onSignOut();
      router.push('/'); // Redirect to home page after sign out
    } catch (error) {

    }
  };

  return (
    <div className="relative flex min-w-max max-w-max flex-grow items-center justify-around gap-1 rounded-lg md:px-2 md:py-2 md:pl-3 xl:gap-2">
      {/* Menu button for mobile */}
      <Button
        variant="outline"
        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10 xl:hidden"
        onClick={onOpen}
      >
        <FiAlignJustify className="h-4 w-4" />
      </Button>
      
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Theme toggle button */}
      <Button
        variant="outline"
        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? (
          <HiOutlineMoon className="h-4 w-4 stroke-2" />
        ) : (
          <HiOutlineSun className="h-5 w-5 stroke-2" />
        )}
      </Button>
    </div>
  );
}