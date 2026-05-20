import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  type Attraction,
  type ScheduleSlotModel,
  buildEmptyScheduleSlots
} from '@/lib/trip'

export type { Attraction, ScheduleSlotModel }

interface TripStore {
  city: string
  days: number
  attractions: Attraction[]
  scheduleSlots: ScheduleSlotModel[]
  setTrip: (city: string, days: number, attractions: Attraction[]) => void
  setScheduleSlots: (slots: ScheduleSlotModel[]) => void
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      city: '',
      days: 0,
      attractions: [],
      scheduleSlots: [],
      setTrip: (city, days, attractions) =>
        set({
          city,
          days,
          attractions,
          scheduleSlots: buildEmptyScheduleSlots(days),
        }),
      setScheduleSlots: (scheduleSlots) => set({ scheduleSlots }),
    }),
    {
      name: 'trip-storage',
    },
  ),
)
