export interface Attraction {
  id: string
  name: string
  category: string
  duration: string
  rating: number
  image: string
  arrivalTime?: string
}

export type ScheduleSlotModel = {
  id: string
  day: number
  attractions: Attraction[]
}

export function buildEmptyScheduleSlots(days: number): ScheduleSlotModel[] {
  if (days < 1) return []
  return Array.from({ length: days }, (_, dayIndex) => ({
    id: `day-${dayIndex + 1}`,
    day: dayIndex + 1,
    attractions: [],
  }))
}