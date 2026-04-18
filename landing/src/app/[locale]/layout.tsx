import type { ReactNode } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import MarketsProvider from '../providers/MarketsProvider';
import { localeMessages } from '../../lib/localeMessages';
import { routing } from '../../i18n/routing';

export const revalidate = 3600; // Cache for 1 hour

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = localeMessages[locale as keyof typeof localeMessages];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MarketsProvider>{children}</MarketsProvider>
    </NextIntlClientProvider>
  );
}


