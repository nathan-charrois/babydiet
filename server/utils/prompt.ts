export interface Preferences {
  [key: string]: number
}

/**
 * Build a single preference string based on key and level
 *
 * @param key preference range (e.g., "hot-cold")
 * @param level preference level (0-20)
 */
const buildPreference = (key: string, level: number): string => {
  const isPreferenceTypeRange = key.includes('-')

  if (isPreferenceTypeRange) {
    return buildRangePreference(key, level)
  }
  else {
    return buildBooleanPreference(key, level)
  }
}

/**
 * Build a preference string for range type preferences
 *
 * @param key preference range (e.g., "hot-cold")
 * @param level preference level (0-20)
 */
const buildRangePreference = (key: string, level: number): string => {
  let descriptor = ''
  let strength = 0

  if (level <= 10) {
    descriptor = key.split('-')[0]
    strength = 10 - level
  }
  else {
    descriptor = key.split('-')[1]
    strength = level - 10
  }

  return `Meal is ${descriptor} (${strength}/10)`
}

/**
 * Build a preference string for boolean type preferences
 *
 * @param key preference range (e.g., "veggie_boost")
 * @param level preference level (0-20)
 */
const buildBooleanPreference = (key: string, level: number): string => {
  const parsedKey = key.replaceAll('_', ' ')

  if (level) {
    return `Meal is ${parsedKey}`
  }
  else {
    return ''
  }
}

/**
 * Convert preferences object to a comma-separated string of all preferences
 *
 * @param preferences object containing preference categories and their levels
 */
const buildPreferencesString = (preferences: Preferences): string => {
  return Object.entries(preferences)
    .map(([key, level]) => buildPreference(key, level))
    .join(', ')
}

/**
 * Convert low carb boolean to a string
 *
 * @param lowCarb boolean if meal should be low carbs
 */
const buildLowCarbString = (lowCarb: boolean): string => {
  if (!lowCarb) {
    return ''
  }

  return 'Meal must contain low carbohydrates (less than 50mg)'
}

/**
 * Convert low acid boolean to a string
 *
 * @param lowAcid boolean if meal should be low carbs
 */
const buildLowAcidString = (lowAcid: boolean): string => {
  if (!lowAcid) {
    return ''
  }

  return 'Meal must be low acidity (GERD Safe)'
}

/**
 * Build the complete prompt for meal generation
 *
 * @param preferences key-pair of submitted preferences
 * @param language language code string
 * @param theme currently selected theme
 * @param lowCarb meal should have low carbohydrates ingredients
 * @param lowAcid meal should contain low acid ingredients
 */
export const buildMealPrompt = (preferences: Preferences, language: string, theme: string, lowCarb: boolean, lowAcid: boolean): string => {
  if (theme === 'baby') {
    return buildMealPromptForBaby(preferences, language, lowCarb, lowAcid)
  }

  return buildMealPromptForMommy(preferences, language, lowCarb, lowAcid)
}

/**
 * Build meal prompt for baby
 *
 * @param preferences key-pair of submitted preferences
 * @param language language code string
 * @param lowCarb meal should have low carbohydrates ingredients
 * @param lowAcid meal should contain low acid ingredients
 */
export const buildMealPromptForBaby = (preferences: Preferences, language: string, lowCarb: boolean, lowAcid: boolean): string => {
  const preferencesString = buildPreferencesString(preferences)
  const lowCarbString = buildLowCarbString(lowCarb)
  const lowAcidString = buildLowAcidString(lowAcid)

  return `
    You are a creative chef specializing in fun and unique meals for toddlers.

    Rules:
    - Meal title is a maximum of 8 words.
    - Meal title should not include words from the preferences.
    - Ingredients should be healthy and suitable for toddlers.
    - Language code is provided for localization.
    - ${lowCarbString}
    - ${lowAcidString}

    Banned Food:
    - Pancakes

    Banned Ingredients:
    - Honey
    - Pepper
    - Salt and Pepper
    - Lemon
    - Lemon Juice

    Preferences:
    ${preferencesString}

    Language Code:
    ${language}
  `
}

/**
 * Build meal prompt for mommy
 *
 * @param preferences key-pair of submitted preferences
 * @param language language code string
 * @param lowCarb meal should have low carbohydrates ingredients
 * @param lowAcid meal should contain low acid ingredients
 */
export const buildMealPromptForMommy = (preferences: Preferences, language: string, lowCarb: boolean, lowAcid: boolean): string => {
  const preferencesString = buildPreferencesString(preferences)
  const lowCarbString = buildLowCarbString(lowCarb)
  const lowAcidString = buildLowAcidString(lowAcid)

  return `
    You are a creative chef specializing in safe and healthy meals for pregnant women.

    Rules:
    - Meal title is a maximum of 8 words.
    - Meal title should not include words from the preferences.
    - Ingredients should be healthy and safe for pregnant women.
    - Language code is provided for localization.
    - ${lowCarbString}
    - ${lowAcidString}

    Banned ingredients:
    - Tomatoes
    - Garlic
    - Pepper
    - Salt and Pepper
    - Lemon
    - Lemon Juice
    - Lime Juice

    Preferences:
    ${preferencesString}

    Language Code:
    ${language}
  `
}

/**
 * Build the prompt for meal image generation
 *
 * @param title generated meal title
 * @param ingredients generated meal ingredients
 * @param theme currently selected theme
 */
export const buildImagePrompt = (title: string, ingredients: string[], theme: string): string => {
  if (theme === 'baby') {
    return buildImagePromptForBaby(title, ingredients)
  }

  return buildImagePromptForMommy(title, ingredients)
}

/**
 * Build meal image prompt for baby
 *
 * @param title generated meal title
 * @param ingredients generated meal ingredients
 */
export const buildImagePromptForBaby = (title: string, ingredients: string[]): string => {
  return `
    Generate a cartoon-style image of a meal for toddlers.

    Rules:
    - Image must have a transparent background.
    - Meal must be served on a plate, leaf, bowl, or in a cup.
    - Do not include text.
    - Include colourful elements.

    Meal Title:
    ${title}

    Ingredients:
    ${ingredients.join(', ')}
  `
}

/**
 * Build meal image prompt for mommy
 *
 * @param title generated meal title
 * @param ingredients generated meal ingredients
 */
export const buildImagePromptForMommy = (title: string, ingredients: string[]): string => {
  return `
    Generate a cartoon-style image of a meal for pregnant women.

    Rules:
    - Image must have a transparent background.
    - Meal must be served on a plate, leaf, bowl, or in a cup.
    - Do not include text.
    - Include purple coloured elements.

    Meal Title:
    ${title}

    Ingredients:
    ${ingredients.join(', ')}
  `
}
