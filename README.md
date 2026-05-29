# 🌏 Wanderlust - AI 旅遊行程規劃工具

一個結合 AI 推薦與拖曳互動的旅遊行程規劃工具。輸入目的地，AI 自動推薦景點，用拖曳方式排出專屬行程。

## 🔗 Demo

👉 [https://travel-planner-xi-three.vercel.app](https://travel-planner-xi-three.vercel.app)

## ✨ 功能

- 🤖 **AI 景點推薦** - 輸入城市、天數、旅遊喜好，Gemini AI 自動推薦景點
- 🖱️ **拖曳排程** - 將景點拖曳到每天的行程欄位
- ⏰ **自訂抵達時間** - 為每個景點設定抵達時間
- ✏️ **新增自訂景點** - 不只靠 AI，也可以自己新增景點
- 💾 **行程持久化** - 重新整理後行程仍然保留

## 🛠️ 技術棧

- **Framework**: Next.js 15 + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + persist
- **Drag & Drop**: dnd-kit
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 🚀 本地執行

```bash
# 安裝套件
npm install

# 設定環境變數
cp .env.example .env.local
# 填入你的 GEMINI_API_KEY

# 啟動開發伺服器
npm run dev
```

## 📸 截圖

<img width="1512" height="792" alt="截圖 2026-05-28 上午11 29 02" src="https://github.com/user-attachments/assets/9734bfc1-62e1-46c8-824a-1711fd26c1f7" />
