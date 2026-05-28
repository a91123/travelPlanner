export interface Attraction {
  id: string
  name: string
  category: string
  duration: string
  rating: number
  image: string
  arrivalTime?: string
  isCustom?: boolean
  note?: string
}

/** 單日行程欄（右側一欄 Day N） */
export type DaySchedule = {
  id: string
  day: number
  attractions: Attraction[]
}

export function buildEmptyDaySchedules(days: number): DaySchedule[] {
  if (days < 1) return []
  return Array.from({ length: days }, (_, dayIndex) => ({
    id: `day-${dayIndex + 1}`,
    day: dayIndex + 1,
    attractions: [],
  }))
}
