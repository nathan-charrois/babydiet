import { Loader, Stack, Text } from '@mantine/core'

import { useI18n } from './DietI18nProvider'

export default function DietSpinner() {
  const { formatMessage } = useI18n()

  return (
    <Stack align="center" py="xl">
      <Loader size="lg" />
      <Text mt="md" ta="center">{formatMessage('spinner_text')}</Text>
    </Stack>
  )
}
