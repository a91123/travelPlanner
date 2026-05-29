'use client'

import type { Attraction } from '@/lib/trip'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTripStore } from '@/store/useTripStore'
import { useI18n } from '@/lib/i18n'
import { useState } from 'react'
import { FileText } from 'lucide-react'
export default function ScheduledAttractionCard({
  attraction,
  className,
  onRemove,
  slotId,
}: {
  className?: string
  attraction: Attraction
  slotId: string
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: attraction.id,
    data: attraction,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  const { updateArrivalTime, updateAttractionNote } = useTripStore()
  const { t } = useI18n()
  const [showNote, setShowNote] = useState(false)
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'rounded-lg border cursor-grab border-gray-200 bg-white p-2 shadow-sm mb-2 relative',
        className,
      )}
    >
      {/* 上半部：圖片 + 資訊 + 按鈕 */}
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="absolute top-0 right-0 cursor-pointer hover:bg-gray-100 rounded-full p-1"
          onClick={onRemove}
        >
          <X className="w-5 h-5 p-1 rounded-full" />
        </button>
        <img
          src={
            attraction.image ||
            `https://picsum.photos/seed/${encodeURIComponent(attraction.name)}/120/120`
          }
          alt={attraction.name}
          className="w-20 h-20 rounded-md object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">
            {attraction.isCustom ? t.estimatedDuration : t.suggestedDuration}:{' '}
            {attraction.duration} {t.hours}
          </p>
          <p className="text-sm font-medium truncate">{attraction.name}</p>
          <p className="text-xs text-gray-500">
            {t.arrivalTime}:
            <input
              type="text"
              placeholder="--:--"
              value={attraction.arrivalTime || ''}
              onChange={(e) =>
                updateArrivalTime(slotId, attraction.id, e.target.value)
              }
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-500 outline-none cursor-text w-12 ml-2"
            />
          </p>
        </div>
        <button
          onClick={() => setShowNote(!showNote)}
          onPointerDown={(e) => e.stopPropagation()}
          className="self-end mb-1"
        >
          <FileText
            className={cn(
              'w-4 h-4 cursor-pointer',
              showNote ? 'text-teal-500' : 'text-gray-400',
            )}
          />
        </button>
      </div>

      {/* 下半部：備注輸入框 */}
      {showNote && (
        <textarea
          value={attraction.note || ''}
          onChange={(e) =>
            updateAttractionNote(slotId, attraction.id, e.target.value)
          }
          onPointerDown={(e) => e.stopPropagation()}
          placeholder="輸入備注..."
          className="w-full text-xs text-gray-500 border border-gray-200 rounded p-2 mt-2 resize-none outline-none focus:border-teal-500"
          rows={2}
        />
      )}
    </div>
  )
}
