export type SupportedLanguage = 'en' | 'ru'

export const isSupportedLangauge = (
  language: unknown,
): language is SupportedLanguage => {
  return language === 'en' || language === 'ru'
}
