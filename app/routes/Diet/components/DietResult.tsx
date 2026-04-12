import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Container, Stack, Text, Title, Transition } from '@mantine/core'

import { useI18n } from './DietI18nProvider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'

const Circle = () => (
  <svg width="400" height="400">
    <circle cx="200" cy="200" r="200" fill="lightblue" />
  </svg>
)

export default function DietResult() {
  const { setActiveStep } = useDietStep()
  const { result } = useDietResult()
  const { formatMessage } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClickNextMeal = useCallback(() => {
    setActiveStep('initialize')
  }, [setActiveStep])

  if (!result) {
    return (
      <Stack align="center" py="xl">
        <Text>{formatMessage('no_result_yet')}</Text>
      </Stack>
    )
  }

  const ingredientsTextList = useMemo(() => {
    if (result.ingredients.length === 1) {
      return result.ingredients[0]
    }

    return result.ingredients.slice(0, -1).join(', ') + ' and ' + result.ingredients.slice(-1)
  }, [result.ingredients])

  return (
    <Stack align="center" py="xl">
      <Container mb="md" className="meal-layer-container">
        <div className="meal-layer-base meal-layer">
          <img src={result.image} alt={result.title} className="meal-image" />
        </div>
      </Container>
      <Stack mt="md" mb="md" align="center" mx="xl" justify="center">
        <Transition mounted={mounted} transition="fade-up" duration={300} timingFunction="ease-out">
          {styles => (
            <>
              <Title style={styles} size="lg" ta="center">
                {result.title}
              </Title>
              <Text style={styles} size="sm" opacity={0.7} ta="center">
                {ingredientsTextList}
              </Text>
            </>
          )}
        </Transition>
      </Stack>
      <Transition mounted={mounted} transition="fade" duration={600} timingFunction="ease-out">
        {styles => (
          <Button style={styles} onClick={handleClickNextMeal} variant="primary">
            {formatMessage('next_meal')}
          </Button>
        )}
      </Transition>
    </Stack>
  )
}
