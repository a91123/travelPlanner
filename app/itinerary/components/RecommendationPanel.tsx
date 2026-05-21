import { Sparkles } from 'lucide-react'
import TravelCard from './TravelCard'
import { Attraction } from '@/server/store/useTripStore'
const RecommendationPanel = ({
  attractions,
}: {
  attractions: Attraction[]
}) => {
  return (
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
  )
}

export default RecommendationPanel
