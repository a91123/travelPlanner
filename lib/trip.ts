export interface Attraction {
  id: string
  name: string
  category: string
  duration: string
  rating: number
  image: string
}

export const SCHEDULE_PERIODS = ['morning', 'afternoon', 'evening'] as const

export type SchedulePeriod = (typeof SCHEDULE_PERIODS)[number]

export type ScheduleSlotModel = {
  id: string
  day: number
  period: SchedulePeriod
  attractions: Attraction[]
}

export function buildEmptyScheduleSlots(days: number): ScheduleSlotModel[] {
  if (days < 1) return []
  return Array.from({ length: days }, (_, dayIndex) =>
    SCHEDULE_PERIODS.map((period) => ({
      id: `day-${dayIndex + 1}-${period}`,
      day: dayIndex + 1,
      period,
      attractions: [],
    })),
  ).flat()
}

export function groupSlotsByDay(
  slots: ScheduleSlotModel[],
): Record<number, ScheduleSlotModel[]> {
  const byDay: Record<number, ScheduleSlotModel[]> = {}
  for (const slot of slots) {
    if (!byDay[slot.day]) {
      byDay[slot.day] = []
    }
    byDay[slot.day].push(slot)
  }
  return byDay
}
