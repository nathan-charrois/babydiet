import { type PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router'

const GA_ID = 'G-8QLTBYFK95'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function initGA() {
  if (window.gtag) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  window.gtag = gtag

  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

export function DietAnalyticsProvider({ children }: PropsWithChildren) {
  const location = useLocation()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    if (!window.gtag) return

    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    })
  }, [location])

  return <>{children}</>
}
