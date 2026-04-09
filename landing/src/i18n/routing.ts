import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'tr', 'ar', 'ru', 'de', 'fa'],
  // Used when no locale matches
  defaultLocale: 'en',
});
