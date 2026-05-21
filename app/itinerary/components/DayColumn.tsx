import type { DaySchedule } from '@/lib/trip'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export const DayColumn = ({
  day,
  children,
  isOver,
}: {
  day: DaySchedule
  children: React.ReactNode
  isOver: boolean
}) => {
  const { setNodeRef } = useDroppable({ id: day.id })
  return (
    <div
      ref={setNodeRef}
      className={cn(
        'border border-gray-300 rounded-md p-2 flex flex-col flex-1 transition-colors',
        isOver && 'bg-teal-50 border-teal-400',
      )}
      style={{ height: 'calc(100vh - 140px)' }}
    >
      {children}
    </div>
  )
}
