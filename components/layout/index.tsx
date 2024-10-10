'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/NavbarAdmin';
import { routes } from '@/components/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { IRoute } from '@/types';
import { getTranslatedRoutes } from '@/components/routes'; 

interface Props {  
  children: React.ReactNode;
  title: string;
  description: string;
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  userEmail: string;
  brandText?: string;
  locale?: string;
  userRole: string;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState<boolean>(false);
  const translatedRoutes = getTranslatedRoutes();

  useEffect(() => {
    const updateActiveRoute = () => {
      if (routes && routes.length > 0) {
        setActiveNavbar(getActiveNavbar(routes, pathname));
      }
    };
    updateActiveRoute();
  }, [pathname]);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex bg-background text-foreground dark:bg-card dark:text-card-foreground">
      <Toaster />
      <Sidebar 
        routes={translatedRoutes} 
        open={open}
        setOpen={() => setOpen(!open)}
        isAuthenticated={props.isAuthenticated} 
        onSignIn={props.onSignIn}
        onSignOut={props.onSignOut}
        userEmail={props.userEmail}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        userRole={props.userRole} 
      />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'xl:ml-[80px]' : 'xl:ml-[300px]'}`}>
        <main className="mx-2.5 md:pr-2">
          <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
            {props.children}
          </div>
          <Navbar 
            onOpen={() => setOpen(!open)}
            secondary={activeNavbar}
            userDetails={{ email: props.userEmail }}
            isAuthenticated={props.isAuthenticated}
            onSignIn={props.onSignIn}
            onSignOut={props.onSignOut}
            brandText={props.brandText}
            locale={props.locale}
            isCollapsed={isCollapsed}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;