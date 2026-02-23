import { getRequestConfig, } from 'next-intl/server';
import { createNavigation } from 'next-intl/navigation';
export const localePrefix = 'always'; // Default
export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale || 'en'; // Fallback to 'en' if undefined

    // Ensure locale is valid
    const validLocale = ['ar', 'en'].includes(locale) ? locale : 'en';

    return {
        locale: validLocale,
        messages: (await import(`./translations/${validLocale}.json`)).default,
    }
})
export const locales = ['ar', 'en'] as const
export const defaultLocale = 'en';
export const { Link, redirect, usePathname, useRouter, } =
    createNavigation({ locales });