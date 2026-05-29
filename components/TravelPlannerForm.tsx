'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getAttractionRecommendations } from '@/lib/api/gemini'
import { useRouter } from 'next/navigation'
import { useTripStore } from '@/store/useTripStore'
import { useI18n } from '@/lib/i18n'
import toast from 'react-hot-toast'
import {
  MapPin,
  Calendar,
  Utensils,
  Landmark,
  TreePine,
  Mountain,
  Plane,
  Check,
} from 'lucide-react'

export default function TravelPlannerForm() {
  const { t } = useI18n()
  const preferences = [
    { id: 'food', label: t.food, icon: Utensils, description: t.foodDesc },
    {
      id: 'culture',
      label: t.culture,
      icon: Landmark,
      description: t.cultureDesc,
    },
    {
      id: 'nature',
      label: t.nature,
      icon: TreePine,
      description: t.natureDesc,
    },
    {
      id: 'adventure',
      label: t.adventure,
      icon: Mountain,
      description: t.adventureDesc,
    },
  ]
  const router = useRouter()
  const { setTrip } = useTripStore()
  const [city, setCity] = useState('')
  const [days, setDays] = useState(1)
  const [cityError, setCityError] = useState(false)
  const [categories, setCategories] = useState<string[]>(['food'])
  const [loading, setLoading] = useState(false)

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    )
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!city) {
      toast.error(t.enterCityError)
      setCityError(true)
      return
    }
    setLoading(true)
    try {
      const recommendations = await getAttractionRecommendations(
        city,
        days,
        categories,
      )
      setLoading(false)
      setTrip(city, days, recommendations.attractions)
      router.push('/itinerary')
    } catch {
      setLoading(false)
      toast.error(t.generateError)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-md"
    >
      {/* 目的地 */}
      <label
        htmlFor="city"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {t.whereToGo}
      </label>
      <div className="mb-6 relative">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          id="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
            if (e.target.value.length > 0) setCityError(false)
          }}
          type="text"
          placeholder={t.cityPlaceholder}
          className={cn(
            'w-full h-12 px-4 pl-12 border rounded-xl text-base outline-none focus:border-teal-500 transition-colors',
            cityError ? 'border-red-400' : 'border-gray-200',
          )}
        />
      </div>

      {/* 天數 */}
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-gray-400" />
        {t.howManyDays}
      </label>
      <div className="flex items-center gap-4 mb-8">
        <input
          type="range"
          min="1"
          max="14"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#0d9488]"
        />
        <div className="w-16 h-10 flex items-center justify-center bg-teal-50 border border-teal-200 rounded-lg font-bold text-lg text-teal-600">
          {days}
        </div>
      </div>

      {/* 偏好類型 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {preferences.map((preference) => {
          const isSelected = categories.includes(preference.id)
          const Icon = preference.icon
          return (
            <button
              type="button"
              disabled={loading}
              onClick={() => toggleCategory(preference.id)}
              key={preference.id}
              className={cn(
                'relative py-6 px-4 cursor-pointer bg-white border-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all hover:border-teal-400',
                isSelected
                  ? 'border-teal-500 bg-teal-50/40'
                  : 'border-gray-200',
              )}
            >
              {isSelected && (
                <Check className="absolute top-2 right-2 h-4 w-4 bg-teal-500 text-white rounded-full p-0.5" />
              )}
              <Icon
                className={cn(
                  'h-8 w-8 p-1.5 rounded-full',
                  isSelected
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-500',
                )}
              />
              <span
                className={cn(
                  'text-sm font-semibold',
                  isSelected ? 'text-teal-600' : 'text-gray-700',
                )}
              >
                {preference.label}
              </span>
              <span className="text-xs text-gray-400 text-center leading-snug">
                {preference.description}
              </span>
            </button>
          )
        })}
      </div>

      {/* 送出 */}
      <button
        disabled={loading}
        className={cn(
          'flex justify-center w-full items-center gap-2 cursor-pointer bg-teal-600 hover:bg-teal-700 transition-colors text-white py-3.5 rounded-xl font-medium',
          loading ? 'opacity-50 cursor-not-allowed' : '',
        )}
      >
        <Plane className="h-5 w-5" />
        {loading ? t.generating : t.startPlanning}
      </button>
    </form>
  )
}
