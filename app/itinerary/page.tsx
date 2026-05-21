'use client'
import TravelCard from '@/app/itinerary/components/TravelCard'
import { useTripStore, Attraction } from '@/server/store/useTripStore'
import RecommendationPanel from '@/app/itinerary/components/RecommendationPanel'
import DaySchedulePanel from '@/app/itinerary/components/DaySchedulePanel'
import { arrayMove } from '@dnd-kit/sortable'
import { pointerWithin } from '@dnd-kit/core'
import { useState } from 'react'
import PageHeader from '@/app/itinerary/components/Header'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
} from '@dnd-kit/core'

function findDayByOverId(
  daySchedules: { id: string; attractions: { id: string }[] }[],
  overId: string,
) {
  return (
    daySchedules.find((d) => d.id === overId) ??
    daySchedules.find((d) => d.attractions.some((a) => a.id === overId))
  )
}

export default function ItineraryPage() {
  const {
    days,
    city,
    attractions,
    daySchedules,
    addAttractionToDay,
    reorderDayAttractions,
    removeAttractionFromDay,
  } = useTripStore()
  const [activeDayId, setActiveDayId] = useState<string | null>(null)
  const [activeAttraction, setActiveAttraction] = useState<Attraction | null>(
    null,
  )

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveAttraction(null)
    setActiveDayId(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const sourceDay = daySchedules.find((d) =>
      d.attractions.some((a) => a.id === activeId),
    )

    const targetDay = findDayByOverId(daySchedules, overId)
    if (!targetDay) return

    // 從左邊推薦清單拖過來
    if (!sourceDay) {
      const attraction = active.data.current as Attraction
      addAttractionToDay(targetDay.id, attraction)
      return
    }

    // 同一天內排序
    if (sourceDay.id === targetDay.id) {
      const oldIndex = sourceDay.attractions.findIndex((a) => a.id === activeId)
      const newIndex = targetDay.attractions.findIndex((a) => a.id === overId)
      if (oldIndex !== newIndex) {
        const newAttractions = arrayMove(
          sourceDay.attractions,
          oldIndex,
          newIndex,
        )
        reorderDayAttractions(sourceDay.id, newAttractions)
      }
      return
    }

    // 跨天移動
    const attraction = sourceDay.attractions.find((a) => a.id === activeId)
    if (attraction) {
      removeAttractionFromDay(sourceDay.id, attraction.id)
      addAttractionToDay(targetDay.id, attraction)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveAttraction(event.active.data.current as Attraction)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    if (!over) {
      setActiveDayId(null)
      return
    }
    const targetDay = findDayByOverId(daySchedules, over.id as string)
    setActiveDayId(targetDay?.id ?? null)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-[#f0f4f8]">
        <PageHeader city={city} days={days} />
        <div className="flex min-h-0 min-w-0 flex-1">
          <RecommendationPanel attractions={attractions} />
          <DaySchedulePanel
            days={days}
            daySchedules={daySchedules}
            activeDayId={activeDayId ?? ''}
          />
        </div>
      </div>
      <DragOverlay>
        {activeAttraction ? (
          <TravelCard
            trip={activeAttraction}
            className="opacity-50 rotate-3 scale-105 border border-green-300 rounded-lg"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
