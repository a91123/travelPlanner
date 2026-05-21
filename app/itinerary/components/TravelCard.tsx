import { cn } from '@/lib/utils'
import Image from 'next/image'
import type { Attraction } from '@/server/store/useTripStore'
import { Clock } from 'lucide-react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
type TravelCardProps = {
  trip: Attraction
  className?: string
}

export default function TravelCard({ trip, className }: TravelCardProps) {
  const CATEGORY_BADGE: Record<string, string> = {
    food: 'bg-amber-500/80 text-white ring-1 ring-inset ring-amber-300/30',
    culture: 'bg-indigo-500/80 text-white ring-1 ring-inset ring-indigo-300/30',
    nature: 'bg-teal-500/80 text-white ring-1 ring-inset ring-teal-300/30',
    adventure: 'bg-rose-500/80 text-white ring-1 ring-inset ring-rose-300/30',
  }
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: trip.id,
      data: trip,
    })
  const badgeClass =
    CATEGORY_BADGE[trip.category] ??
    'bg-slate-500 text-white ring-1 ring-inset ring-slate-600/30'
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-300 flex bg-white shadow-sm overflow-hidden',
        className,
        isDragging && 'opacity-0',
      )}
      {...attributes}
      {...listeners}
      style={{ translate: CSS.Transform.toString(transform) }}
      ref={setNodeRef}
    >
      <img
        src={trip.image || `https://picsum.photos/seed/${trip.name}/200/200`}
        alt={trip.name}
        style={{ width: '80px', height: '80px' }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{trip.name}</h3>
        <p className="text-sm text-gray-500 flex items-center">
          <span
            className={cn(
              'inline-flex items-center mr-2 rounded-full px-2 py-0.5 text-xs font-medium capitalize',
              badgeClass,
            )}
          >
            {trip.category}
          </span>{' '}
          <Clock className="w-3 h-3 mr-1 inline-block text-xs text-gray-500" />{' '}
          <span className="text-xs text-gray-500">{trip.duration}</span>
        </p>
      </div>
    </div>
  )
}
