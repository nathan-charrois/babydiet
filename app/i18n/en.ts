import type { LanguageKey } from './keys'

export const en: Record<LanguageKey, string> = {
  // Error messages
  error_text: 'Something went wrong!',
  try_again: 'Try again',

  // Loading messages
  spinner_text: 'Generating your meal...',

  // Form actions
  submit: 'Submit',
  reset: 'Reset',

  // Results
  no_result_yet: 'No results yet',
  next_meal: 'Next Meal',

  // Title
  baby_diet_preferences: 'Baby Diet Preferences',
  mommy_diet_preferences: 'Mommy Diet Preferences',

  // Slider labels
  arrow_symbol: '↔',

  // Settings modal
  settings: 'Settings',
  language: 'Language',
  play_sounds: 'Play sounds',
  play_sounds_desc: 'The user interface creates sounds.',
  low_carb: 'Low carbohydrates',
  low_carb_desc: 'Generated meals contain less than 50mg of carbohydrates.',
  low_acid: 'Low acid',
  low_acid_desc: 'Generated meals contain low acidity for sensitive stomachs.',
  apply: 'Apply',
  close: 'Close',

  // Meal library
  meal_library: 'Meal Library',
  no_meals_saved: 'No meals saved yet',
  saved_on: 'Saved on',
} as const

export type EnKeys = keyof typeof en
