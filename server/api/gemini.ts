import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export async function getAttractionRecommendations(
  city: string,
  days: number,
  preferences: string[],
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' })

  const prompt = `
    推薦我去${city}旅遊${days}天的景點。
    我的興趣是：${preferences.join('、')}。
    請推薦${days * 3}個景點，每個景點包含：
    - name: 景點名稱
    - category: 分類（food/culture/nature/adventure其中一個）
    - description: 一句話介紹
    - duration: 建議停留時間（例如：1-2 hours）
    - image: 景點照片URL (如果沒有照片，請使用https://picsum.photos/seed/${name}/200/200)
    - id: 景點ID (隨機生成)
    只回傳JSON格式，不要其他文字：
    {"attractions": [...]}
  `

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
