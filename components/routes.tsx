import { IRoute } from '@/types';
import {
  HiOutlineHome,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineCog,
} from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export const routes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
  },
  
  {
    name: 'Admin',
    path: '/dashboard/admin',
    icon: <HiOutlineCog className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: true,
    adminOnly: true,
  },
];

export const getTranslatedRoutes = (): IRoute[] => { 
  const t = useTranslations('Routes');
  const locale = useLocale();
  return routes.map((route) => ({
    ...route,
    name: t(route.name.toLowerCase()),
    path: `/${locale}${route.path}`,
    items: route.items ? route.items.map((item) => ({
      ...item,
      name: t(item.name.toLowerCase()),
      path: `/${locale}${item.path}`,
    })) : undefined,
  }));
};