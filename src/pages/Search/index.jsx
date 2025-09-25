import './css/index.scss'
import Header from './Header'
import Clock from './Clock'
import SearchInput from './SearchInput'
import Bottom from './Bottom'
import Weather from './Weather'
import Setting from './Setting'
import { useSettingStore } from '../../store'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Search = () => {
  const [isSwitching, setIsSwitching] = useState(false)
  const { wallpapers, currentIndex, setCurrentIndex } = useSettingStore()

  // 切换壁纸
  const switchWallpaper = () => {
    if (isSwitching) return
    setIsSwitching(true)
    const nextIndex = (currentIndex + 1) % wallpapers.length
    setCurrentIndex(nextIndex)
    localStorage.setItem('currentIndex', nextIndex)
    setTimeout(() => {
      setIsSwitching(false)
    }, 1000)
  }

  useEffect(() => {
    // 预加载图片
    wallpapers.forEach((url) => {
      new Image().src = url
    })
  }, [wallpapers])

  return (
    <div className="search-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={`current-${currentIndex}`}
          className="wallpaper"
          style={{ backgroundImage: `url(${wallpapers[currentIndex]})` }}
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`next-${currentIndex}`}
          className="wallpaper"
          style={{
            backgroundImage: `url(${
              wallpapers[(currentIndex + 1) % wallpapers.length]
            })`
          }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <Header />
      <div className="search">
        <Clock />
        <SearchInput />
      </div>
      <Bottom />
      <Weather />
      <Setting switchWallpaper={switchWallpaper} />
    </div>
  )
}

export default Search
