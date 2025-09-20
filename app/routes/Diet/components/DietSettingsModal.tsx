import { useCallback, useEffect, useState } from 'react'
import { Modal, Stack } from '@mantine/core'
import { isSupportedLangauge, type SupportedLanguage } from '@shared/types/i18n'
import { detectLanguage } from '@utils/languageDetection'

import { useI18n } from './DietI18nProvider'
import DietSettingsActions from './DietSettingsActions'
import DietSettingsForm from './DietSettingsForm'
import { LANGUAGE_STORAGE_KEY, LOW_CARB_STORAGE_KEY, SOUND_STORAGE_KEY } from '~/utils/constant'

interface DietSettingsModalProps {
  opened: boolean
  onClose: () => void
}

interface SettingsState {
  language: SupportedLanguage
  soundEnabled: boolean
  lowCarbEnabled: boolean
}

const loadSettingsFromStorage = (): SettingsState => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  const storedSound = localStorage.getItem(SOUND_STORAGE_KEY)
  const storedLowCarb = localStorage.getItem(LOW_CARB_STORAGE_KEY)

  const language = isSupportedLangauge(storedLanguage) ? storedLanguage : detectLanguage()
  const soundEnabled = storedSound !== null ? storedSound === 'true' : false
  const lowCarbEnabled = storedLowCarb !== null ? storedLowCarb === 'true' : false

  return { language, soundEnabled, lowCarbEnabled }
}

const saveSettingsToStorage = (settings: SettingsState) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, settings.language)
  localStorage.setItem(SOUND_STORAGE_KEY, settings.soundEnabled.toString())
  localStorage.setItem(LOW_CARB_STORAGE_KEY, settings.lowCarbEnabled.toString())
}

const initialState: SettingsState = {
  language: 'en',
  soundEnabled: false,
  lowCarbEnabled: false,
}

export default function DietSettingsModal({ opened, onClose }: DietSettingsModalProps) {
  const [currentSettings, setCurrentSettings] = useState<SettingsState>(initialState)
  const [tempSettings, setTempSettings] = useState<SettingsState>(initialState)
  const { formatMessage } = useI18n()

  useEffect(() => {
    const settings = loadSettingsFromStorage()
    setCurrentSettings(settings)
    setTempSettings(settings)
  }, [])

  useEffect(() => {
    if (opened) {
      setTempSettings(currentSettings)
    }
  }, [opened, currentSettings])

  const handleApply = useCallback(() => {
    const hasLanguageChanged = tempSettings.language !== currentSettings.language
    const hasSoundChanged = tempSettings.soundEnabled !== currentSettings.soundEnabled
    const hasLowCarbChanged = tempSettings.lowCarbEnabled !== currentSettings.lowCarbEnabled

    if (hasLanguageChanged || hasSoundChanged || hasLowCarbChanged) {
      setCurrentSettings(tempSettings)
      saveSettingsToStorage(tempSettings)

      if (hasLanguageChanged) {
        window.location.reload()
      }
    }

    onClose()
  }, [tempSettings, currentSettings, onClose])

  const handleClose = useCallback(() => {
    setTempSettings(currentSettings)
    onClose()
  }, [currentSettings, onClose])

  const handleSettingsChange = useCallback((newSettings: SettingsState) => {
    setTempSettings(newSettings)
  }, [])

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={formatMessage('settings')}
      size="sm"
      withCloseButton={false}
    >
      <Stack gap="xl">
        <DietSettingsForm
          settings={tempSettings}
          onSettingsChange={handleSettingsChange}
        />
        <DietSettingsActions
          onApply={handleApply}
          onClose={handleClose}
        />
      </Stack>
    </Modal>
  )
}
