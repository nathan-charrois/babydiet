import { isSupportedLangauge, type SupportedLanguage } from '@shared/types/i18n'

import { LANGUAGE_STORAGE_KEY } from './constant'

export function detectLanguage(): SupportedLanguage {
  if (typeof localStorage !== 'undefined') {
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (isSupportedLangauge(language)) {
      return language
    }
  }

  return 'en'
}
