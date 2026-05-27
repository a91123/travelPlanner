import { Sparkles } from 'lucide-react'
import TravelCard from './TravelCard'
import { Attraction } from '@/server/store/useTripStore'
import AddAttractionModal from './AddAttractionModal'
import { useState, useRef } from 'react'
const RecommendationPanel = ({
  attractions,
}: {
  attractions: Attraction[]
}) => {
  const [showModal, setShowModal] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

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
      <div className="p-4 overflow-y-auto flex-1" ref={listRef}>
        {attractions.map((trip) => (
          <TravelCard
            className="mb-4 cursor-pointer"
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-teal-500 hover:text-teal-500 transition-colors cursor-pointer"
        >
          <span className="text-lg">+</span>
          <span className="text-sm">新增自訂景點</span>
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <AddAttractionModal
          onClose={() => {
            setShowModal(false)
            setTimeout(() => scrollToBottom(), 100)
          }}
        />
      )}
    </aside>
  )
}

export default RecommendationPanel
