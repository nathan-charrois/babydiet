import { useCallback } from 'react'
import { Button, Group } from '@mantine/core'

import { useI18n } from './DietI18nProvider'

interface DietSettingsActionsProps {
  onApply: () => void
  onClose: () => void
}

export default function DietSettingsActions({ onApply, onClose }: DietSettingsActionsProps) {
  const { formatMessage } = useI18n()

  const handleApply = useCallback(() => {
    onApply()
  }, [onApply])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Group justify="flex-end" gap="sm">
      <Button onClick={handleApply} variant="primary">
        {formatMessage('apply')}
      </Button>
      <Button onClick={handleClose} variant="secondary">
        {formatMessage('close')}
      </Button>
    </Group>
  )
}
