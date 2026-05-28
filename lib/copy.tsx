import type { DaySchedule } from '@/lib/trip'
import toast from 'react-hot-toast'
export function copyTripToClipboard(city: string, daySchedules: DaySchedule[]) {
  const text = daySchedules
    .map((day) => {
      const attractions = day.attractions
        .map(
          (a) =>
            `  ${a.arrivalTime || '--:--'} ${a.name}（${a.duration} hours）`,
        )
        .join('\n')
      return `Day ${day.day}\n${attractions || '  尚未安排景點'}`
    })
    .join('\n\n')

  const fullText = `${city}行程\n${'='.repeat(20)}\n\n${text}`
  navigator.clipboard.writeText(fullText)

  // 提示複製成功
  toast.success('行程已複製到剪貼簿！')
}
