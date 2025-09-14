import type { MetaArgs } from 'react-router'

import './index.css'

import DietError from './components/DietError'
import DietForm from './components/DietForm'
import DietInit from './components/DietInit'
import DietProviders from './components/DietProviders'
import DietResult from './components/DietResult'
import DietResultFooter from './components/DietResultFooter'
import DietSpinner from './components/DietSpinner'
import DietStep from './components/DietStep'
import { DietThemeProvider } from './components/DietThemeContext'
import DietTitle from './components/DietTitle'
import Application from '~/components/Layout/Application'

export function meta({}: MetaArgs) {
  return [
    { title: 'Baby Diet' },
    { name: 'description', content: 'Generate a unique meal for your baby' },
  ]
}

export default function Diet() {
  return (
    <DietThemeProvider>
      <DietProviders>
        <Application footer={<DietResultFooter />}>
          <DietStep step="initialize">
            <DietInit />
          </DietStep>
          <DietStep step="form">
            <DietTitle />
            <DietForm />
          </DietStep>
          <DietStep step="loading">
            <DietSpinner />
          </DietStep>
          <DietStep step="result">
            <DietResult />
          </DietStep>
          <DietStep step="error">
            <DietError />
          </DietStep>
        </Application>
      </DietProviders>
    </DietThemeProvider>
  )
}
