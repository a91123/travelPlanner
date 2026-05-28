'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Locale = 'zh' | 'en'

export interface Translations {
  appTitle: string
  appSubtitle: string
  appDescription: string
  whereToGo: string
  cityPlaceholder: string
  howManyDays: string
  generating: string
  startPlanning: string
  enterCityError: string
  generateError: string
  food: string
  foodDesc: string
  culture: string
  cultureDesc: string
  nature: string
  natureDesc: string
  adventure: string
  adventureDesc: string
  back: string
  days: string
  saveTrip: string
  aiRecommendations: string
  dragAttractions: string
  addCustomAttraction: string
  noSchedule: string
  formatDay: (n: number) => string
  categoryLabel: (cat: string) => string
  addCustomTitle: string
  attractionName: string
  attractionNameRequired: string
  attractionNamePlaceholder: string
  category: string
  suggestedDuration: string
  durationPlaceholder: string
  hours: string
  cancel: string
  add: string
}

const translations: Record<Locale, Translations> = {
  zh: {
    appTitle: '旅行規劃師',
    appSubtitle: '輕鬆規劃你的旅行',
    appDescription: '輸入目的地和你的興趣，AI 幫你推薦景點、排出專屬行程。',
    whereToGo: '你想去哪裡？',
    cityPlaceholder: '輸入城市名稱...',
    howManyDays: '旅行天數？',
    generating: '生成中...',
    startPlanning: '開始規劃',
    enterCityError: '請輸入城市名稱',
    generateError: '行程生成失敗',
    food: '美食',
    foodDesc: '在地美食與餐廳',
    culture: '文化',
    cultureDesc: '博物館與文化古蹟',
    nature: '自然',
    natureDesc: '公園與自然景觀',
    adventure: '冒險',
    adventureDesc: '刺激體驗',
    back: '返回',
    days: '天',
    saveTrip: '儲存行程',
    aiRecommendations: 'AI 推薦景點',
    dragAttractions: '將景點拖曳至行程',
    addCustomAttraction: '新增自訂景點',
    noSchedule: '尚無行程，請先從首頁規劃旅行。',
    formatDay: (n) => `第 ${n} 天`,
    categoryLabel: (cat) =>
      ({ food: '美食', culture: '文化', nature: '自然', adventure: '冒險' })[
        cat
      ] ?? cat,
    addCustomTitle: '新增自訂景點',
    attractionName: '景點名稱',
    attractionNameRequired: '景點名稱 *',
    attractionNamePlaceholder: '輸入景點名稱',
    category: '分類',
    suggestedDuration: '建議停留時間',
    durationPlaceholder: '例如：1-2',
    hours: '小時',
    cancel: '取消',
    add: '新增',
  },
  en: {
    appTitle: 'Travel Planner',
    appSubtitle: 'Plan Your Perfect Trip',
    appDescription:
      "Tell us where you want to go and what you love, and we'll create a personalized itinerary just for you.",
    whereToGo: 'Where do you want to go?',
    cityPlaceholder: 'Enter city name...',
    howManyDays: 'How many days?',
    generating: 'Generating...',
    startPlanning: 'Start Planning',
    enterCityError: 'Please enter a city name',
    generateError: 'Failed to generate itinerary',
    food: 'Food',
    foodDesc: 'Local cuisine & restaurants',
    culture: 'Culture',
    cultureDesc: 'Museums & heritage sites',
    nature: 'Nature',
    natureDesc: 'Parks & scenic views',
    adventure: 'Adventure',
    adventureDesc: 'Thrilling experiences',
    back: 'Back',
    days: 'days',
    saveTrip: 'Save trip',
    aiRecommendations: 'AI Recommendations',
    dragAttractions: 'Drag attractions to your schedule',
    addCustomAttraction: 'Add custom attraction',
    noSchedule: 'No schedule yet. Plan your trip from the home page.',
    formatDay: (n) => `Day ${n}`,
    categoryLabel: (cat) => cat.charAt(0).toUpperCase() + cat.slice(1),
    addCustomTitle: 'Add Custom Attraction',
    attractionName: 'Attraction Name',
    attractionNameRequired: 'Attraction Name *',
    attractionNamePlaceholder: 'Enter attraction name',
    category: 'Category',
    suggestedDuration: 'Suggested Duration',
    durationPlaceholder: 'e.g. 1-2',
    hours: 'hours',
    cancel: 'Cancel',
    add: 'Add',
  },
}

interface I18nContextType {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh')
  return (
    <I18nContext.Provider
      value={{ locale, t: translations[locale], setLocale }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
