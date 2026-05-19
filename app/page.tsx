import { Compass } from 'lucide-react'
import TravelPlannerForm from '../components/TravelPlannerForm'
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-8 bg-[#f0f4f8] items-center">
      <header className="flex items-center justify-center mb-6 pt-16 font-bold font-serif">
        <Compass className="h-12 w-12 p-2 bg-[#0d9488] rounded-xl text-white mr-4" />
        <h1 className="text-4xl font-bold">Travel Planner</h1>
      </header>
      <section>
        <h2 className="text-2xl font-bold text-center mb-3">
          Plan Your Perfect Trip
        </h2>
        <h3 className="text-lg text-center">
          Tell us where you want to go and what you love, and we&apos;ll create
          a personalized itinerary just for you.
        </h3>
      </section>
      <TravelPlannerForm />
    </main>
  )
}
