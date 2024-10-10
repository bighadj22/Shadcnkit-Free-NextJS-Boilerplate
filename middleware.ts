import createMiddleware from 'next-intl/middleware';
import {locales} from './config';

export default createMiddleware({
  locales,
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(ar|en|fr)/:path*']
};