'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Share } from 'lucide-react'
import { copyTripToClipboard } from '@/lib/copy'
import { useTripStore } from '@/store/useTripStore'
import { useI18n } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const Header = ({ city, days }: { city: string; days: number }) => {
  const { daySchedules } = useTripStore()
  const { t } = useI18n()
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex min-h-0 min-w-0 flex-1 items-center gap-2">
        <Link href="/">
          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center gap-2 border-r border-gray-300 pr-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 font-bold" />
            {t.back}
          </button>
        </Link>
        <div className="flex min-w-0 items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-[#0d9488]" />
          <span className="truncate text-sm font-semibold font-sans">
            {city}
          </span>
          <Calendar className="h-4 w-4 shrink-0 text-gray-500" />
          <span className="shrink-0 text-sm font-sans">
            {days} {t.days}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <button
          onClick={() => copyTripToClipboard(city, daySchedules, t)}
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-[#0d9488] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#0d9488]/90"
        >
          <Share className="h-4 w-4 text-white" />
          {t.saveTrip}
        </button>
      </div>
    </header>
  )
}

export default Header
