import type { LanguageKey } from './keys'

export const ru: Record<LanguageKey, string> = {
  // Error messages
  error_saving_preferences: 'Что-то пошло не так!',
  try_again: 'Хорошо',

  // Loading messages
  saving_preferences: 'Сохранение ваших предпочтений...',

  // Form actions
  submit: 'Отправить',
  reset: 'Сбросить',

  // Results
  no_result_yet: 'Пока нет результатов',
  next_meal: 'Следующий прием пищи',

  // Title
  baby_diet_preferences: 'питании малыша',
  mommy_diet_preferences: 'питание мамы',

  // Slider labels
  arrow_symbol: '↔',

  // Settings modal
  settings: 'Настройки',
  language: 'Язык',
  play_sounds: 'Воспроизводить звуки',
  low_carb: 'Низкоуглеводный',
  apply: 'Применить',
  close: 'Закрыть',

  // Meal library
  meal_library: 'Библиотека блюд',
  no_meals_saved: 'Пока нет сохраненных блюд',
  saved_on: 'Сохранено',
} as const

export type RuKeys = keyof typeof ru
