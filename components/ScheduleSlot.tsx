import type { ScheduleSlotModel } from '@/lib/trip'
import { useDroppable } from '@dnd-kit/core'

export default function ScheduleSlot({ slot }: { slot: ScheduleSlotModel }) {
  const { setNodeRef } = useDroppable({
    id: slot.id,
  })
  return (
    <div
      ref={setNodeRef}
      className="mb-2 min-h-48 min-w-20 rounded-md border border-dashed border-gray-200 bg-gray-50/80 px-2 py-2 text-xs text-gray-600 capitalize"
    >
      {slot.attractions.length > 0 ? ` · ${slot.attractions.length} items` : ''}
    </div>
  )
}
