import { useCallback } from 'react'
import { Button, Stack, Text } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietStep } from './DietStepContext'

export default function DietError() {
  const { setActiveStep } = useDietStep()
  const { formatMessage } = useI18n()

  const handleClickTryAgain = useCallback(() => {
    setActiveStep('initialize')
  }, [setActiveStep])

  return (
    <Stack align="center" py="xl">
      <Text ta="center" mb="md">{formatMessage('error_text')}</Text>
      <Button onClick={handleClickTryAgain} radius="lg">{formatMessage('try_again')}</Button>
    </Stack>
  )
}
