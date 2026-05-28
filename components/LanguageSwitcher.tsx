'use client'

import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        type="button"
        onClick={() => setLocale('zh')}
        className={cn(
          'text-sm px-2 py-0.5 rounded-full transition-colors',
          locale === 'zh'
            ? 'bg-teal-500 text-white'
            : 'text-gray-500 hover:text-gray-700',
        )}
      >
        中文
      </button>
      <span className="text-gray-300 select-none">|</span>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={cn(
          'text-sm px-2 py-0.5 rounded-full transition-colors',
          locale === 'en'
            ? 'bg-teal-500 text-white'
            : 'text-gray-500 hover:text-gray-700',
        )}
      >
        EN
      </button>
    </div>
  )
}
