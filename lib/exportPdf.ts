import jsPDF from 'jspdf'
import type { DaySchedule } from '@/lib/trip'

export function exportTripPdf(city: string, days: number, daySchedules: DaySchedule[]) {
    const doc = new jsPDF()

    // 標題
    doc.setFontSize(20)
    doc.text(`${city} ${days}天行程`, 20, 20)

    let y = 40  // 目前寫到哪一行

    daySchedules.forEach((day) => {
        // Day 標題
        doc.setFontSize(14)
        doc.text(`Day ${day.day}`, 20, y)
        y += 8

        if (day.attractions.length === 0) {
            doc.setFontSize(10)
            doc.text('尚未安排景點', 30, y)
            y += 6
        } else {
            day.attractions.forEach((attraction) => {
                doc.setFontSize(10)
                const time = attraction.arrivalTime ? `${attraction.arrivalTime} ` : ''
                doc.text(`• ${time}${attraction.name}（${attraction.duration} hours）`, 30, y)
                y += 6
            })
        }

        y += 4  // 每天之間的間距

        // 如果快到底部，換新頁
        if (y > 270) {
            doc.addPage()
            y = 20
        }
    })

    doc.save(`${city}-行程.pdf`)
}