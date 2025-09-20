import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type DietMeal } from '@shared/types/context'

import { MEAL_LIBRARY_STORAGE_KEY } from '~/utils/constant'

interface MealLibraryContextType {
  meals: DietMeal[]
  count: number
  addToLibrary: (meal: Omit<DietMeal, 'id' | 'dateSaved'>) => void
  removeFromLibrary: (id: string) => void
}

const MealLibraryContext = createContext<MealLibraryContextType | undefined>(undefined)

const createThumbnail = async (base64: string) => {
  const thumb = new Image()
  thumb.src = base64
  await thumb.decode()

  const scale = Math.min(1, 200 / thumb.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(thumb.width * scale)
  canvas.height = Math.round(thumb.height * scale)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not create canvas context')
  }

  ctx.drawImage(thumb, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/png', 0.75)
}

export function MealLibraryProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<DietMeal[]>([])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedMeals = localStorage.getItem(MEAL_LIBRARY_STORAGE_KEY)
      const parsedMeals = savedMeals ? JSON.parse(savedMeals) : []

      if (Array.isArray(parsedMeals)) {
        setMeals(parsedMeals)
      }
    }
  }, [])

  const addToLibrary = useCallback(async (mealData: Omit<DietMeal, 'id' | 'dateSaved'>) => {
    const newMeal: DietMeal = {
      ...mealData,
      id: crypto.randomUUID(),
      dateSaved: new Date().toISOString(),
      image: await createThumbnail(mealData.image),
    }

    try {
      setMeals((prevMeals) => {
        const newMeals = [...prevMeals, newMeal]
        localStorage.setItem(MEAL_LIBRARY_STORAGE_KEY, JSON.stringify(newMeals))
        return newMeals
      })
    }
    catch (e) {
      console.error(`Error settings localStorage ${MEAL_LIBRARY_STORAGE_KEY}`, e)
    }
  }, [])

  const removeFromLibrary = useCallback((id: string) => {
    setMeals((prevMeals) => {
      const newMeals = prevMeals.filter(meal => meal.id !== id)
      localStorage.setItem(MEAL_LIBRARY_STORAGE_KEY, JSON.stringify(newMeals))
      return newMeals
    })
  }, [])

  return (
    <MealLibraryContext.Provider value={{
      meals,
      count: meals.length,
      addToLibrary,
      removeFromLibrary,
    }}
    >
      {children}
    </MealLibraryContext.Provider>
  )
}

export function useMealLibrary() {
  const context = useContext(MealLibraryContext)
  if (!context) {
    throw new Error('useMealLibrary must be used within a MealLibraryProvider')
  }
  return context
}
