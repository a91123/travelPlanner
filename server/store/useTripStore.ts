import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  type Attraction,
  type DaySchedule,
  buildEmptyDaySchedules,
} from '@/lib/trip'

export type { Attraction, DaySchedule }

interface TripStore {
  city: string
  days: number
  attractions: Attraction[]
  daySchedules: DaySchedule[]
  setTrip: (city: string, days: number, attractions: Attraction[]) => void
  addAttractionToDay: (dayId: string, attraction: Attraction) => void
  removeAttractionFromRecommendation: (id: string) => void
  removeAttractionFromDay: (dayId: string, attractionId: string) => void
  reorderDayAttractions: (dayId: string, attractions: Attraction[]) => void
}

type PersistedTrip = Partial<TripStore> & {
  /** @deprecated 舊版 localStorage 欄位名 */
  scheduleSlots?: DaySchedule[]
}

export const useTripStore = create<TripStore>()(
  persist<TripStore, [], [], PersistedTrip>(
    (set) => ({
      city: '',
      days: 0,
      attractions: [],
      daySchedules: [],
      setTrip: (city, days, attractions) =>
        set({
          city,
          days,
          attractions,
          daySchedules: buildEmptyDaySchedules(days),
        }),
      removeAttractionFromRecommendation: (id: string) => {
        set((state) => ({
          attractions: state.attractions.filter((a) => a.id !== id),
        }))
      },
      addAttractionToDay: (dayId: string, attraction: Attraction) => {
        set((state) => ({
          daySchedules: state.daySchedules.map((day) =>
            day.id === dayId
              ? { ...day, attractions: [...day.attractions, attraction] }
              : day,
          ),
          attractions: state.attractions.filter((a) => a.id !== attraction.id),
        }))
      },
      removeAttractionFromDay: (dayId: string, attractionId: string) => {
        set((state) => {
          const day = state.daySchedules.find((d) => d.id === dayId)
          const attraction = day?.attractions.find((a) => a.id === attractionId)
          return {
            daySchedules: state.daySchedules.map((d) =>
              d.id === dayId
                ? {
                    ...d,
                    attractions: d.attractions.filter(
                      (a) => a.id !== attractionId,
                    ),
                  }
                : d,
            ),
            attractions: attraction
              ? [...state.attractions, attraction]
              : state.attractions,
          }
        })
      },
      reorderDayAttractions: (dayId: string, attractions: Attraction[]) => {
        set((state) => ({
          daySchedules: state.daySchedules.map((day) =>
            day.id === dayId ? { ...day, attractions } : day,
          ),
        }))
      },
    }),
    {
      name: 'trip-storage',
      merge: (persisted, current) => {
        const p = persisted as PersistedTrip
        const daySchedules =
          p.daySchedules ?? p.scheduleSlots ?? current.daySchedules
        return { ...current, ...p, daySchedules }
      },
    },
  ),
)
