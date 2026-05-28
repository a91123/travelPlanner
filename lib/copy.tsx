import type { DaySchedule } from '@/lib/trip'
import type { Translations } from '@/lib/i18n'
import toast from 'react-hot-toast'

export function copyTripToClipboard(
  city: string,
  daySchedules: DaySchedule[],
  t: Translations,
) {
  const text = daySchedules
    .map((day) => {
      const attractions = day.attractions
        .map((a) => `  ${a.arrivalTime || '--:--'} ${a.name}（${a.duration} ${t.hours}）`)
        .join('\n')
      return `${t.formatDay(day.day)}\n${attractions || `  ${t.noAttractionsScheduled}`}`
    })
    .join('\n\n')

  const fullText = `${t.tripTitle(city)}\n${'='.repeat(20)}\n\n${text}`
  navigator.clipboard.writeText(fullText)
  toast.success(t.copySuccess)
}
