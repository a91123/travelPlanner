'use client'

import { useI18n } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        type="button"
        onClick={() => setLocale('zh')}
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          locale === 'zh'
            ? 'bg-[#0d9488] text-white'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        中文
      </button>
      <span className="text-gray-300 select-none">|</span>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          locale === 'en'
            ? 'bg-[#0d9488] text-white'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  )
}
