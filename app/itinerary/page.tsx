'use client'
import Link from 'next/link'
import TravelCard from '@/components/TravelCard'
import ScheduleSlot from '@/components/ScheduleSlot'
import { groupSlotsByDay } from '@/lib/trip'
import { Calendar, ArrowLeft, MapPin, Share, Sparkles } from 'lucide-react'
import { useTripStore, Attraction } from '@/server/store/useTripStore'
import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
export default function ItineraryPage() {
  const { days, city, attractions, scheduleSlots } = useTripStore()
  const slotsByDay = groupSlotsByDay(scheduleSlots)
  const [activeAttraction, setActiveAttraction] = useState<Attraction | null>(null)
  const handleDragEnd = (event: DragEndEvent) => {
    console.log('drag end')
    setActiveAttraction(null)
    console.log(event)
  }
  const handleDragStart = (event: DragStartEvent) => {
    setActiveAttraction(event.active.data.current as Attraction)
    console.log('drag start')
    console.log(event)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-[#f0f4f8]">
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex min-h-0 min-w-0 flex-1 items-center gap-2">
            <Link href="/">
              <button
                type="button"
                className="flex shrink-0 cursor-pointer items-center gap-2 border-r border-gray-300 pr-2 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 font-bold" />
                Back
              </button>
            </Link>
            <div className="flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#0d9488]" />
              <span className="truncate text-sm font-semibold font-sans">
                {city}
              </span>
              <Calendar className="h-4 w-4 shrink-0 text-gray-500" />
              <span className="shrink-0 text-sm font-sans">{days} days</span>
            </div>
          </div>
          <button
            type="button"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-[#0d9488] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#0d9488]/90"
          >
            <Share className="h-4 w-4 text-white" />
            Save trip
          </button>
        </header>
        <div className="flex min-h-0 min-w-0 flex-1">
          <aside className="flex min-h-0 w-80 flex-col border-r border-gray-300 bg-white">
            <div className="border-b border-gray-300 p-4">
              <div className="flex gap-2 font-bold text-[#0d9488]">
                <Sparkles className="h-5 w-5" />
                <h2 className="font-semibold">AI Recommendations</h2>
              </div>
              <span className="text-sm text-gray-500">
                Drag attractions to your schedule
              </span>
            </div>
            <div className="p-4 overflow-y-auto">
              {attractions.map((trip) => (
                <TravelCard
                  className="mb-4 cursor-pointer"
                  key={trip.id}
                  trip={trip}
                />
              ))}
            </div>
          </aside>
          <main className="flex min-h-0 min-w-0 flex-1 gap-4 overflow-x-auto overflow-y-auto overscroll-x-contain scroll-smooth p-4">
            {days < 1 ? (
              <p className="text-sm text-gray-500">
                尚無行程，請先從首頁規劃旅行。
              </p>
            ) : (
              Array.from({ length: days }, (_, index) => {
                const dayNum = index + 1
                const slotsForDay = slotsByDay[dayNum] ?? []
                return (
                  <div
                    key={dayNum}
                    className="w-72 shrink-0 snap-start scroll-mt-4"
                  >
                    <h3 className="mb-2 text-lg font-semibold">Day {dayNum}</h3>
                    {slotsForDay.map((slot) => (
                      <ScheduleSlot key={slot.id} slot={slot} />
                    ))}
                  </div>
                )
              })
            )}
          </main>
        </div>
      </div>
      <DragOverlay>
        {activeAttraction ? (
          <TravelCard trip={activeAttraction} className="opacity-50 rotate-3 scale-105" />
        ) : null}
      </DragOverlay>
    </DndContext >
  )
}