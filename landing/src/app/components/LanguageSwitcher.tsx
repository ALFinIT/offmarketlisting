'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageSwitcher');

  const languages = [
    { code: 'en', name: t('english') },
    { code: 'tr', name: t('turkish') },
    { code: 'ar', name: t('arabic'), rtl: true },
    { code: 'ru', name: t('russian') },
    { code: 'de', name: t('german') },
    { code: 'fa', name: t('persian'), rtl: true },
  ];

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="language-switcher">
      <select
        value={locale}
        onChange={(e) => switchLanguage(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}