'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTripStore } from '@/server/store/useTripStore'
import { useI18n } from '@/lib/i18n'
import type { Attraction } from '@/lib/trip'

const CATEGORIES = ['food', 'culture', 'nature', 'adventure'] as const

export default function AddAttractionModal({
  onClose,
}: {
  onClose: () => void
}) {
  const { addCustomAttraction } = useTripStore()
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [category, setCategory] = useState<string>('food')
  const [duration, setDuration] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return

    const newAttraction: Attraction = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category,
      duration: duration || '1-2 hours',
      rating: 0,
      image: '',
    }

    addCustomAttraction(newAttraction)
    onClose()
  }

  return (
    // 背景遮罩
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal 本體 */}
      <div
        className="bg-white rounded-2xl p-6 w-96 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t.addCustomTitle}</h3>
          <button
            onClick={onClose}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            {t.attractionNameRequired}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.attractionNamePlaceholder}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {t.category}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'py-2 rounded-lg border-2 text-sm transition-colors cursor-pointer',
                  category === cat
                    ? 'border-teal-500 text-teal-500 bg-teal-50'
                    : 'border-gray-200 text-gray-500',
                )}
              >
                {t.categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            {t.suggestedDuration}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder={t.durationPlaceholder}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500"
            />
            <span className="text-sm text-gray-500">{t.hours}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {t.add}
          </button>
        </div>
      </div>
    </div>
  )
}
