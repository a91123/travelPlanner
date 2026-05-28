'use client'

import { Compass } from 'lucide-react'
import TravelPlannerForm from '../components/TravelPlannerForm'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useI18n } from '@/lib/i18n'

export default function Home() {
  const { t } = useI18n()
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f0f4f8] px-4 pb-16">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <header className="flex flex-col items-center gap-3 mt-16 mb-6">
        <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Compass className="h-9 w-9 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          {t.appTitle}
        </h1>
      </header>

      <section className="text-center mb-8 max-w-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          {t.appSubtitle}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          {t.appDescription}
        </p>
      </section>

      <TravelPlannerForm />
    </main>
  )
}
