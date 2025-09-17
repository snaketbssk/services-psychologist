// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    //interpolation: {
    //  escapeValue: false // not needed for react as it escapes by default
    //},
    // Disable language detection from the URL
    localeDetection: false
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development'

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
}
