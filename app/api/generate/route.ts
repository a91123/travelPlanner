import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
    const { city, days, preferences } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

    const prompt = `
    推薦我去${city}旅遊${days}天的景點。
    我的興趣是：${preferences.join('、')}。
    請推薦${days * 3}個景點，每個景點包含：
    - name: 景點名稱
    - category: 分類（food/culture/nature/adventure其中一個）
    - description: 一句話介紹
    - duration: 建議停留小時數（只回傳數字，例如：1-2）
    - image: 景點照片URL (如果沒有照片，請使用https://picsum.photos/seed/景點名稱/200/200)
    - id: 景點ID (隨機生成)
    只回傳JSON格式，不要其他文字：
    {"attractions": [...]}
  `

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)

    return NextResponse.json(data)
}