import { create } from 'zustand'

const useSettingStore = create((set) => ({
  // 是否打开侧边栏
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  // 背景图片
  wallpapers: JSON.parse(localStorage.getItem('wallpapers')) || [
    'https://img.picgo.net/2025/04/23/bookmark-bg140feb7b99082ca78.jpg',
    'https://img.picgo.net/2025/04/23/bookmark-bg3126e6f95b47f6339.png',
    'https://img.picgo.net/2025/04/23/bookmark-bg4e25a8217387a1091.jpg',
    'https://img.picgo.net/2025/06/15/wallhaven-jxm1mw9b02f675124475e3.jpg',
    'https://img.picgo.net/2025/06/15/wallhaven-ly9qzq1b8e30c84b5f2d9c.jpg',
    'https://img.picgo.net/2025/04/23/bookmark-bg54d8d3720ac61119b.jpg',
    'https://img.picgo.net/2025/04/23/bookmark-bg20dbb4cb5c6028010.jpg',
    'https://img.picgo.net/2025/04/23/bookmark-bg6aca986a93f3dabe4.png'
  ],
  setWallpapers: (wallpapers) => set({ wallpapers }),
  // 当前背景图片
  currentIndex: parseInt(localStorage.getItem('currentIndex')) || 0,
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  // 天气卡片
  showWeather: true,
  setShowWeather: (showWeather) => set({ showWeather })
}))

export { useSettingStore }
