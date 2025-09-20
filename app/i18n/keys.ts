// Define all language keys as a const array
export const LANGUAGE_KEYS = [
  // Error messages
  'error_saving_preferences',
  'try_again',

  // Loading messages
  'saving_preferences',

  // Form actions
  'submit',
  'reset',

  // Results
  'no_result_yet',
  'next_meal',

  // Titles
  'baby_diet_preferences',
  'mommy_diet_preferences',

  // Slider labels
  'arrow_symbol',

  // Settings modal
  'settings',
  'language',
  'play_sounds',
  'low_carb',
  'apply',
  'close',

  // Meal library
  'meal_library',
  'no_meals_saved',
  'saved_on',
] as const

export type LanguageKey = typeof LANGUAGE_KEYS[number]
