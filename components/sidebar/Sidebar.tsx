import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Links from './Links';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { IRoute } from '@/types';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowRightOnRectangle, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

export interface SidebarProps {
  routes: IRoute[];
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  userEmail: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userRole: string;
}

function Sidebar({
  routes,
  isAuthenticated,
  onSignIn,
  onSignOut,
  userEmail,
  open,
  setOpen,
  isCollapsed,
  onToggleCollapse,
  userRole
}: SidebarProps) {
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const { theme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await onSignOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const truncateEmail = (email: string) => {
    const [username] = email.split('@');
    return username;
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-[80px]' : 'w-[300px]'}
        ${isArabic ? 'font-arabic' : ''}
        xl:translate-x-0
      `}
    >
      <div className="h-full w-full overflow-hidden bg-background dark:bg-card">
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            <div className={`flex items-center justify-between mb-8 ${isCollapsed ? 'flex-col' : ''}`}>
              <div className={`flex items-center ${isCollapsed ? 'justify-center mb-4' : 'justify-center w-full'}`}>
                <Image
                  src="/D-logo.svg"
                  alt="shadcnkit Logo"
                  width={30}
                  height={30}
                />
                {!isCollapsed && (
                  <h5 className="ml-2 text-2xl font-bold leading-5 text-foreground dark:text-card-foreground">
                    shadcnkit
                  </h5>
                )}
              </div>
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:flex hidden ml-2"
                  onClick={onToggleCollapse}
                >
                  {isCollapsed ? <TbLayoutSidebarRightCollapseFilled /> : <TbLayoutSidebarLeftCollapseFilled />}
                </Button>
              )}
            </div>
            <div className="mb-8 h-px bg-border dark:bg-border opacity-50" />
            <ul className="space-y-2">
              <Links routes={routes} locale={locale} isCollapsed={isCollapsed} userRole={userRole} />
            </ul>
          </div>
          {isCollapsed ? (
            <div className="mt-auto flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mb-4"
                onClick={onToggleCollapse}
              >
                <TbLayoutSidebarRightCollapseFilled />
              </Button>
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:bg-background hover:dark:bg-card"
                  onClick={handleSignOut}
                >
                  <HiOutlineArrowRightOnRectangle
                    className="h-4 w-4 stroke-2 text-foreground dark:text-card-foreground"
                  />
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-auto">
              <div className="mt-4 flex w-full items-center rounded-lg bg-muted p-4 dark:bg-card">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="font-bold dark:text-card-foreground">
                    {userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="ml-3 flex-grow truncate text-sm font-semibold leading-none text-foreground dark:text-card-foreground">
                  {truncateEmail(userEmail)}
                </p>
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    className="ml-2 flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:bg-background hover:dark:bg-card"
                    onClick={handleSignOut}
                  >
                    <HiOutlineArrowRightOnRectangle
                      className="h-4 w-4 stroke-2 text-foreground dark:text-card-foreground"
                    />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="ml-2 flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:bg-background hover:dark:bg-card"
                    onClick={onSignIn}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;