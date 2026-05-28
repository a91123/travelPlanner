'use client'

import { Compass } from 'lucide-react'
import TravelPlannerForm from '../components/TravelPlannerForm'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useI18n } from '@/lib/i18n'

export default function Home() {
  const { t } = useI18n()
  return (
    <main className="min-h-screen flex flex-col p-8 bg-[#f0f4f8] items-center">
      <header className="relative flex items-center justify-center mb-6 pt-16 font-bold font-serif w-full max-w-xl">
        <div className="flex items-center">
          <Compass className="h-12 w-12 p-2 bg-[#0d9488] rounded-xl text-white mr-4" />
          <h1 className="text-4xl font-bold">Travel Planner</h1>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pt-16">
          <LanguageSwitcher />
        </div>
      </header>
      <section>
        <h2 className="text-2xl font-bold text-center mb-3">{t.appSubtitle}</h2>
        <h3 className="text-lg text-center">{t.appDescription}</h3>
      </section>
      <TravelPlannerForm />
    </main>
  )
}
