import { useCallback, useMemo, useState } from 'react'
import { Settings01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import DietSettingsModal from './DietSettingsModal'
import { useIsMobile } from '~/hooks/useIsMobile'
import { playButtonSound } from '~/utils/sound'

export default function DietSettings() {
  const [opened, setOpened] = useState(false)
  const { formatMessage } = useI18n()
  const isMobile = useIsMobile()

  const handleOpenSettings = useCallback(() => {
    playButtonSound()
    setOpened(true)
  }, [setOpened])

  const handleCloseSettings = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  const settingsButtonLabel = useMemo(() => {
    return isMobile ? '' : formatMessage('settings')
  }, [isMobile])

  return (
    <>
      <Button
        onClick={handleOpenSettings}
        leftSection={<HugeiconsIcon icon={Settings01Icon} />}
        size="xs"
      >
        {settingsButtonLabel}
      </Button>

      <DietSettingsModal
        opened={opened}
        onClose={handleCloseSettings}
      />
    </>
  )
}
