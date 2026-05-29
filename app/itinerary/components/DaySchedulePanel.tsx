import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { DaySchedule } from '@/lib/trip'
import ScheduledAttractionCard from './ScheduledAttractionCard'
import { DayColumn } from './DayColumn'
import { useTripStore } from '@/store/useTripStore'
import { useI18n } from '@/lib/i18n'

const DaySchedulePanel = ({
  days,
  daySchedules,
  activeDayId,
}: {
  days: number
  daySchedules: DaySchedule[]
  activeDayId: string
}) => {
  const { removeAttractionFromDay } = useTripStore()
  const { t } = useI18n()
  return (
    <main className="flex min-h-0 min-w-0 flex-1 gap-4 overflow-x-auto overflow-y-auto overscroll-x-contain scroll-smooth p-4">
      {days < 1 ? (
        <p className="text-sm text-gray-500">{t.noSchedule}</p>
      ) : (
        daySchedules.map((day) => (
          <div key={day.id} className="w-72 shrink-0 snap-start scroll-mt-4">
            <h3 className="mb-2 font-semibold text-sm">
              {t.formatDay(day.day)}
            </h3>
            <DayColumn day={day} isOver={activeDayId === day.id}>
              <div className="flex-1 overflow-y-auto gap-2 flex flex-col mb-2 px-2">
                <SortableContext
                  items={day.attractions.map((a) => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {day.attractions.map((attraction) => (
                    <ScheduledAttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      slotId={day.id}
                      onRemove={() =>
                        removeAttractionFromDay(day.id, attraction.id)
                      }
                    />
                  ))}
                </SortableContext>
              </div>
            </DayColumn>
          </div>
        ))
      )}
    </main>
  )
}
export default DaySchedulePanel
