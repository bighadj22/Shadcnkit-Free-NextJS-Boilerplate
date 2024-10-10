'use client';
import React, { useState, useEffect } from 'react';
import AdminNavbarLinks from './NavbarLinksAdmin';
import { isWindowAvailable } from '@/utils/navigation';

interface NavbarAdminProps {
  secondary: boolean;
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onOpen: () => void; 
  userDetails: { email: string };
  brandText?: string;
  locale?: string; 
  isCollapsed: boolean; 
}

const NavbarAdmin: React.FC<NavbarAdminProps> = ({
  secondary,
  isAuthenticated,
  onSignIn,
  onSignOut,
  onOpen,
  userDetails,
  brandText,
  locale, 
  isCollapsed 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const isArabic = locale === 'ar';

  useEffect(() => {
    const changeNavbar = () => {
      if (isWindowAvailable() && window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    if (isWindowAvailable()) {
      window.addEventListener('scroll', changeNavbar);
    }
    return () => {
      if (isWindowAvailable()) {
        window.removeEventListener('scroll', changeNavbar);
      }
    }; 
  }, []);

  return (
    <nav
      className={`fixed right-3 top-3 z-[0] flex ${
        isCollapsed ? 'w-0' : 'w-[calc(100vw_-_6%)]' // {{ edit_3 }}
      } flex-row items-center justify-between rounded-lg ${
        secondary ? 'bg-white/30 dark:bg-navy-800/30' : 'bg-transparent'
      } py-2 backdrop-blur-xl transition-all dark:bg-transparent md:right-[30px] md:top-4 md:w-[calc(100vw_-_8%)] md:p-2 lg:w-[calc(100vw_-_6%)] xl:top-[20px] xl:w-[calc(100vw_-_365px)] 2xl:w-[calc(100vw_-_380px)] ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className={`ml-[6px] ${isCollapsed ? 'hidden' : ''}`}> {/* {{ edit_3 }} */}
        {brandText && (
          <p className={`text-md shrink capitalize text-zinc-950 dark:text-white md:text-3xl ${isArabic ? 'font-arabic' : ''}`}>
            <span className="font-bold capitalize hover:text-zinc-950 dark:hover:text-white">
              {brandText}
            </span>
          </p>
        )}
      </div>
      <div className="w-[154px] min-w-max md:ml-auto md:w-[unset]">
        <AdminNavbarLinks 
          onOpen={onOpen}
          isAuthenticated={isAuthenticated}
          onSignIn={onSignIn}
          onSignOut={onSignOut}
          userDetails={userDetails}
        />
      </div>
    </nav>
  );
};

export default NavbarAdmin;