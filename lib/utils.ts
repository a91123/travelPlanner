import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ItineraryAttraction } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Gemini returns `{ attractions: [...] }`; storage may also be a bare array. */
export function normalizeItineraryPayload(
  parsed: unknown,
): ItineraryAttraction[] | null {
  if (parsed == null) return null
  if (Array.isArray(parsed)) return parsed as ItineraryAttraction[]
  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    'attractions' in parsed
  ) {
    const list = (parsed as { attractions: unknown }).attractions
    if (Array.isArray(list)) return list as ItineraryAttraction[]
  }
  return null
}

export function setLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage<T>(key: string): T | null {
  return JSON.parse(localStorage.getItem(key) || 'null')
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearLocalStorage() {
  localStorage.clear()
}
