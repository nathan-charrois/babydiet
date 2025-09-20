import { useCallback } from 'react'
import { Image } from '@mantine/core'
import { useForm } from '@mantine/form'
import { type PostPreferencesResponse } from '@shared/types/api'
import { fetchData } from '@utils/fetchUtils'
import { playBabySound, playButtonSound, playSlideDownSound, playSlideUpSound } from '@utils/sound'

import DietFormActions from './DietFormActions'
import DietFormChip from './DietFormChip'
import { useDietForm } from './DietFormContext'
import DietFormLayout from './DietFormLayout'
import DietFormSlider from './DietFormSlider'
import { useDietResult } from './DietResultContext'
import { useDietStep } from './DietStepContext'
import { useDietTheme } from './DietThemeContext'
import { useMealLibrary } from './MealLibraryContext'
import { useAnimationTrigger } from '~/hooks/useAnimationTrigger'
import { LOW_ACID_KEY, LOW_CARB_STORAGE_KEY } from '~/utils/constant'

function ClickableImage() {
  const { theme } = useDietTheme()

  const { ref, handleTriggerAnimation } = useAnimationTrigger({
    className: 'animate-headShake',
    playSound: () => playBabySound(),
  })

  if (theme === 'baby') {
    return <Image src="/images/baby.png" onClick={handleTriggerAnimation} ref={ref} />
  }

  return <Image src="/images/mommy.png" onClick={handleTriggerAnimation} ref={ref} />
}

export default function DietForm() {
  const { initialValues, preferencesByType, setPreference, validate } = useDietForm()
  const { setActiveStep } = useDietStep()
  const { addResult } = useDietResult()
  const { addToLibrary } = useMealLibrary()
  const { theme } = useDietTheme()
  const form = useForm({ initialValues, validate })

  const [firstPreference, ...restPreferences] = preferencesByType.range

  const handleOnSlideEnd = useCallback(
    (key: string) => (val: number) => {
      setPreference(key, typeof val === 'number' ? val : 0)
      form.setFieldValue(key, val)

      if (form.values[key] < val) {
        playSlideUpSound()
      }
      else if (form.values[key] > val) {
        playSlideDownSound()
      }
      else {
        playButtonSound()
      }
    },
    [setPreference, form.setFieldValue],
  )

  const handleOnButtonEnd = useCallback(
    (key: string) => (val: number) => {
      setPreference(key, typeof val === 'number' ? val : 0)
      form.setFieldValue(key, val)

      playButtonSound()
    },
    [setPreference, form.setFieldValue],
  )

  const handleSubmit = async (formValues: typeof initialValues) => {
    playButtonSound()
    setActiveStep('loading')

    const storedLowCarb = localStorage.getItem(LOW_CARB_STORAGE_KEY)
    const lowCarb = storedLowCarb !== null ? storedLowCarb === 'true' : false

    const storedLowAcid = localStorage.getItem(LOW_ACID_KEY)
    const lowAcid = storedLowCarb !== null ? storedLowAcid === 'true' : false

    try {
      const response = await fetchData<PostPreferencesResponse>({
        url: `/preferences`,
        method: 'POST',
        body: {
          ...formValues,
          theme,
          lowCarb,
          lowAcid,
        },
      })

      addResult(response)

      addToLibrary({
        name: response.title,
        ingredients: response.ingredients,
        image: response.image,
      })

      setActiveStep('result')
    }
    catch {
      setActiveStep('error')
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
      <DietFormLayout
        slotOne={(
          <DietFormSlider
            key={firstPreference.key}
            labelStart={firstPreference.labelStart}
            labelEnd={firstPreference.labelEnd}
            iconStart={firstPreference.iconStart}
            iconEnd={firstPreference.iconEnd}
            id={firstPreference.key}
            value={form.values[firstPreference.key]}
            min={firstPreference.min}
            max={firstPreference.max}
            onChangeEnd={handleOnSlideEnd(firstPreference.key)}
          />
        )}
        slotTwo={restPreferences.map(pref => (
          <DietFormSlider
            key={pref.key}
            labelStart={pref.labelStart}
            labelEnd={pref.labelEnd}
            iconStart={pref.iconStart}
            iconEnd={pref.iconEnd}
            id={pref.key}
            min={pref.min}
            max={pref.max}
            value={form.values[pref.key]}
            onChangeEnd={handleOnSlideEnd(pref.key)}
          />
        ))}
        slotThree={preferencesByType.boolean.map(pref => (
          <DietFormChip
            key={pref.key}
            label={pref.label}
            id={pref.key}
            icon={pref.icon}
            value={form.values[pref.key]}
            onChange={handleOnButtonEnd(pref.key)}
          />
        ))}
        image={<ClickableImage />}
        actions={<DietFormActions />}
      />
    </form>
  )
}
