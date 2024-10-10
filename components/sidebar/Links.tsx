'use client';

import NavLink from '@/components/link/NavLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IRoute } from '@/types';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback, useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
  locale: string;
  isCollapsed: boolean;
  userRole: string;
  [x: string]: any;
}

export function SidebarLinks(props: SidebarLinksProps) {
  const pathname = usePathname();
  const { routes, locale, isCollapsed, userRole } = props;
  const isArabic = locale === 'ar';
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280); // xl breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeRoute = useCallback(
    (routePath: string) => {
      return pathname === (routePath.startsWith('/') ? routePath : `/${routePath}`);
    },
    [pathname],
  );

  const createLinks = (routes: IRoute[], isNested = false) => {
    return routes.map((route, key) => {
      if (route.adminOnly && userRole !== 'admin') {
        return null;
      }

      if (isDesktop && !isCollapsed && route.collapse && route.items) {
        return (
          <Accordion key={key} type="single" collapsible>
            <AccordionItem value={route.name} className="border-none">
              <AccordionTrigger className="py-3 px-8 hover:no-underline">
                <div className="flex items-center">
                  <div className="text mr-3 mt-1.5">{route.icon}</div>
                  <p className="mr-auto text-sm font-medium">{route.name}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="mt-2 ml-4 space-y-2">
                  {createLinks(route.items, true)}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }

      const isActive = activeRoute(route.path);

      return (
        <div key={key}>
          <div
            className={`flex w-full max-w-full items-center justify-between rounded-lg py-3 ${
              isCollapsed ? 'px-2' : isNested ? 'pl-12' : 'pl-8'
            } ${
              isActive
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                : 'text-foreground dark:text-card-foreground'
            } ${isArabic ? 'font-arabic' : ''}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`flex w-full items-center ${isCollapsed ? 'justify-center' : ''}`}>
                    <NavLink
                      href={route.layout ? route.layout + route.path : route.path}
                      styles={{ width: '100%' }}
                    >
                      <div className={`w-full items-center ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className={`flex w-full items-center ${isCollapsed ? 'justify-center' : ''}`}>
                          <div className={`text ${isCollapsed ? 'mr-0' : 'mr-3'} mt-1.5`}>
                            {route.icon}
                          </div>
                          {!isCollapsed && (
                            <p className={`mr-auto text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                              {route.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent>{route.name}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
          {(!isDesktop || isCollapsed) && route.items && createLinks(route.items, true)}
        </div>
      );
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;