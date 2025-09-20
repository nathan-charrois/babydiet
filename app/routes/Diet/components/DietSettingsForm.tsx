import { useCallback } from 'react'
import { Checkbox, Divider, NativeSelect, Stack } from '@mantine/core'
import { isSupportedLangauge, type SupportedLanguage } from '@shared/types/i18n'

import { useI18n } from './DietI18nProvider'

const LANGUAGE_OPTIONS = [
  { value: 'en' as const, label: 'English' },
  { value: 'ru' as const, label: 'Русский' },
] as const

interface SettingsState {
  language: SupportedLanguage
  soundEnabled: boolean
  lowCarbEnabled: boolean
  lowAcidEnabled: boolean
}

interface DietSettingsFormProps {
  settings: SettingsState
  onSettingsChange: (settings: SettingsState) => void
}

export default function DietSettingsForm({ settings, onSettingsChange }: DietSettingsFormProps) {
  const { formatMessage } = useI18n()

  const handleSoundToggle = useCallback((soundEnabled: boolean) => {
    onSettingsChange({ ...settings, soundEnabled })
  }, [settings, onSettingsChange])

  const handleLowCarbToggle = useCallback((lowCarbEnabled: boolean) => {
    onSettingsChange({ ...settings, lowCarbEnabled })
  }, [settings, onSettingsChange])

  const handleLowAcidToggle = useCallback((lowAcidEnabled: boolean) => {
    onSettingsChange({ ...settings, lowAcidEnabled })
  }, [settings, onSettingsChange])

  const handleLanguageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.currentTarget.value

    if (isSupportedLangauge(language)) {
      onSettingsChange({ ...settings, language })
    }
  }, [settings, onSettingsChange])

  return (
    <Stack gap="lg">
      <Divider />
      <NativeSelect
        label={formatMessage('language')}
        value={settings.language}
        onChange={handleLanguageChange}
        data={LANGUAGE_OPTIONS}
      />
      <Divider my="sm" />
      <Checkbox
        label={formatMessage('play_sounds')}
        description={formatMessage('play_sounds_desc')}
        checked={settings.soundEnabled}
        onChange={event => handleSoundToggle(event.currentTarget.checked)}
      />
      <Checkbox
        label={formatMessage('low_carb')}
        description={formatMessage('low_carb_desc')}
        checked={settings.lowCarbEnabled}
        onChange={event => handleLowCarbToggle(event.currentTarget.checked)}
      />
      <Checkbox
        label={formatMessage('low_acid')}
        checked={settings.lowAcidEnabled}
        description={formatMessage('low_acid_desc')}
        onChange={event => handleLowAcidToggle(event.currentTarget.checked)}
      />
      <Divider />
    </Stack>
  )
}
