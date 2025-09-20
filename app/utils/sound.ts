import { SOUND_STORAGE_KEY } from './constant'

let buttonSound: HTMLAudioElement | null = null
let slideUpSound: HTMLAudioElement | null = null
let slideDownSound: HTMLAudioElement | null = null
let successSound: HTMLAudioElement | null = null
let babySound: HTMLAudioElement | null = null
let themeSound: HTMLAudioElement | null = null

const isSoundEnabled = (): boolean => {
  if (typeof localStorage === 'undefined') return false
  if (typeof Audio === 'undefined') return false

  const storedSound = localStorage.getItem(SOUND_STORAGE_KEY)
  return storedSound !== null ? storedSound === 'true' : false
}

const getButtonSound = (): HTMLAudioElement => {
  if (!buttonSound) {
    buttonSound = new Audio('/sounds/click-button.wav')
    buttonSound.volume = 0.60
  }

  return buttonSound
}

const getSlideUpSound = (): HTMLAudioElement => {
  if (!slideUpSound) {
    slideUpSound = new Audio('/sounds/drag-slider-up.wav')
    slideUpSound.volume = 0.20
  }

  return slideUpSound
}

const getSlideDownSound = (): HTMLAudioElement => {
  if (!slideDownSound) {
    slideDownSound = new Audio('/sounds/drag-slider-down.wav')
    slideDownSound.volume = 0.20
  }

  return slideDownSound
}

const getSuccessSound = (): HTMLAudioElement => {
  if (!successSound) {
    successSound = new Audio('/sounds/result-success.wav')
    successSound.volume = 0.50
  }

  return successSound
}

const getBabySound = (): HTMLAudioElement => {
  if (!babySound) {
    babySound = new Audio('/sounds/click-baby.wav')
    babySound.volume = 0.60
  }

  return babySound
}

const getThemeSound = (): HTMLAudioElement => {
  if (!themeSound) {
    themeSound = new Audio('/sounds/switch-theme.wav')
    themeSound.volume = 0.50
  }

  return themeSound
}

export const playSuccessSound = () => {
  if (isSoundEnabled()) {
    const audio = getSuccessSound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}

export const playButtonSound = () => {
  if (isSoundEnabled()) {
    const audio = getButtonSound()
    audio.currentTime = 0.05
    audio.play()
  }

  return null
}

export const playSlideUpSound = () => {
  if (isSoundEnabled()) {
    const audio = getSlideUpSound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}

export const playSlideDownSound = () => {
  if (isSoundEnabled()) {
    const audio = getSlideDownSound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}

export const playBabySound = () => {
  if (isSoundEnabled()) {
    const audio = getBabySound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}

export const playThemeSound = () => {
  if (isSoundEnabled()) {
    const audio = getThemeSound()
    audio.currentTime = 0
    audio.play()
  }

  return null
}
