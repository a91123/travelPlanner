export async function getAttractionRecommendations(
  city: string,
  days: number,
  preferences: string[],
) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city, days, preferences }),
  })

  return response.json()
}