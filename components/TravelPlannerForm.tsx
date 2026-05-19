'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getAttractionRecommendations } from '@/server/api/gemini'
import { useRouter } from 'next/navigation'
import { useTripStore } from '@/server/store/useTripStore'
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
  const preferences = [
    {
      id: 'food',
      label: 'Food',
      icon: Utensils,
      description: 'Local cuisine & restaurants',
    },
    {
      id: 'culture',
      label: 'Culture',
      icon: Landmark,
      description: 'Museums & heritage sites',
    },
    {
      id: 'nature',
      label: 'Nature',
      icon: TreePine,
      description: 'Parks & scenic views',
    },
    {
      id: 'adventure',
      label: 'Adventure',
      icon: Mountain,
      description: 'Thrilling experiences',
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
      toast.error('Please enter a city name')
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
    } catch (error) {
      setLoading(false)
      toast.error('Failed to generate itinerary')
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-lg mt-8"
    >
      {/* 城市輸入 */}

      <label
        htmlFor="city"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Where do you want to go?
      </label>
      <div className="mb-6 relative">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 transform -translate-y-1/2 text-gray-400" />
        <input
          id="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
            if (e.target.value.length > 0) {
              setCityError(false)
            }
          }}
          type="text"
          placeholder="Enter city name..."
          className={cn(
            'w-full h-12 px-4 pl-12 border border-gray-200 rounded-xl text-base outline-none focus:border-teal-500',
            cityError ? 'border-red-500' : '',
          )}
        />
      </div>
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        How many days?
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
        <div className="w-16 h-12 flex items-center justify-center bg-white border border-[#ded7d7] rounded-lg font-semibold text-lg text-[#0d9488] shadow-sm">
          {days}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
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
                'p-4 hover:border-[#0d9488] relative py-12 cursor-pointer bg-white border-2 border-[#ded7d7] rounded-lg flex flex-col items-center justify-center gap-2',
                isSelected ? 'border-[#0d9488]' : '',
              )}
            >
              {isSelected && (
                <Check className="absolute top-2 right-2 bg-[#0d9488] text-white rounded-full p-1" />
              )}
              <Icon
                className={cn(
                  'h-12 w-12 p-2 text-[#525f5e] bg-gray-200 rounded-full',
                  isSelected ? 'bg-[#0d9488] text-white' : 'text-[#525f5e]',
                )}
              />
              <span
                className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-[#0d9488]' : 'text-[#525f5e]',
                )}
              >
                {preference.label}
              </span>
              <span className="text-xs text-gray-500">
                {preference.description}
              </span>
            </button>
          )
        })}
      </div>
      <button
        disabled={loading}
        className={cn(
          'flex justify-center w-full items-center gap-2 cursor-pointer hover:bg-[#0d9488]/90 transition-colors duration-300 bg-[#0d9488] text-white py-4 rounded-lg text-center',
          loading ? 'opacity-50 cursor-not-allowed' : '',
        )}
      >
        <Plane className="h-6 w-6" />
        {loading ? 'Generating...' : 'Start Planning'}
      </button>
    </form>
  )
}
