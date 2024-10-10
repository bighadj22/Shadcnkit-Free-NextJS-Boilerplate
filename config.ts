export const locales = ['en', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];