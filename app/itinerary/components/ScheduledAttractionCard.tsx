import type { Attraction } from '@/lib/trip'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function ScheduledAttractionCard({
  attraction,
  className,
  onRemove,
}: {
  className?: string
  attraction: Attraction
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
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'flex gap-2 items-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm mb-2 relative',
        className,
      )}
    >
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
          推薦停留時間: {attraction.duration}
        </p>
        <p className="text-sm font-medium truncate">{attraction.name}</p>
      </div>
    </div>
  )
}
