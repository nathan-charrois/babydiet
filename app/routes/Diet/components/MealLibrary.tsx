import { useMemo, useState } from 'react'
import { LibrariesIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@mantine/core'
import { useDidUpdate } from '@mantine/hooks'

import { useI18n } from './DietI18nProvider'
import { useMealLibrary } from './MealLibraryContext'
import MealLibraryDialog from './MealLibraryDialog'
import { useIsMobile } from '~/hooks/useIsMobile'
import { playButtonSound, playSuccessSound } from '~/utils/sound'

export default function MealLibrary() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { count } = useMealLibrary()
  const { formatMessage } = useI18n()
  const isMobile = useIsMobile()

  useDidUpdate(
    () => { playSuccessSound() },
    [count],
  )

  const handleOpenDialog = () => {
    playButtonSound()
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const mealLibraryButtonLabel = useMemo(() => {
    return isMobile ? '' : formatMessage('meal_library')
  }, [isMobile])

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        leftSection={<HugeiconsIcon icon={LibrariesIcon} size="24" />}
        size="xs"
      >
        {mealLibraryButtonLabel}
      </Button>
      <MealLibraryDialog
        opened={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  )
}
