import { useState, useEffect, useRef, useCallback } from 'react'
import './css/Swiper.scss'

// 图片数据
const banners = [
  { url: 'https://img.picgo.net/2025/06/15/lt-banner069fa91139db96dd5f.jpg' },
  { url: 'https://img.picgo.net/2025/06/15/lt-banner025ed4e2ed6584e1a5.jpg' },
  { url: 'https://img.picgo.net/2025/06/15/lt-banner04342803afa40f8bec.jpg' },
  { url: 'https://img.picgo.net/2025/06/15/lt-banner07af448bf08c4bddad.jpg' },
  {
    url: 'https://img.picgo.net/2025/06/15/db0dd70c86c2088dfd1783080c9db8eb429c32d6a5b1785acb4c0ee0.jpg'
  }
]

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef(null)
  const slideBoxRef = useRef(null)
  const bannerCount = banners.length

  // 处理索引边界
  const safeSetCurrentIndex = useCallback(
    (newIndex) => {
      setCurrentIndex((prev) => {
        if (newIndex < 0) return bannerCount - 1
        if (newIndex >= bannerCount) return 0
        return newIndex
      })
    },
    [bannerCount]
  )

  // 停止自动轮播
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // 开始自动轮播
  const startTimer = useCallback(() => {
    stopTimer()
    timerRef.current = setInterval(() => {
      safeSetCurrentIndex(currentIndex + 1)
    }, 5000)
  }, [currentIndex, safeSetCurrentIndex, stopTimer])

  // 处理左右按钮点击
  const handlePrev = useCallback(() => {
    safeSetCurrentIndex(currentIndex - 1)
  }, [currentIndex, safeSetCurrentIndex])

  const handleNext = useCallback(() => {
    safeSetCurrentIndex(currentIndex + 1)
  }, [currentIndex, safeSetCurrentIndex])

  // 计算要显示的索引
  const getDisplayIndexes = useCallback(() => {
    let leftIndex = currentIndex - 1
    let rightIndex = currentIndex + 1

    if (currentIndex === 0) {
      leftIndex = bannerCount - 1
    }
    if (currentIndex === bannerCount - 1) {
      rightIndex = 0
    }

    return { leftIndex, currentIndex, rightIndex }
  }, [currentIndex, bannerCount])

  // 初始化自动轮播和清理
  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [startTimer, stopTimer])

  // 处理鼠标悬停暂停/继续轮播
  useEffect(() => {
    const slideBox = slideBoxRef.current
    if (!slideBox) return

    const handleMouseEnter = () => stopTimer()
    const handleMouseLeave = () => startTimer()

    slideBox.addEventListener('mouseenter', handleMouseEnter)
    slideBox.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      slideBox.removeEventListener('mouseenter', handleMouseEnter)
      slideBox.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [startTimer, stopTimer])

  // 获取当前显示的索引
  const { leftIndex, rightIndex } = getDisplayIndexes()

  return (
    <div className="swiper">
      <div className="slide-box" ref={slideBoxRef}>
        <div className="swiper-box">
          {banners.map((banner, index) => {
            // 决定当前项的类名
            let className = 'swiper-item'
            if (index === leftIndex) className += ' left'
            if (index === currentIndex) className += ' middle'
            if (index === rightIndex) className += ' right'

            // 决定点击事件
            let onClick = undefined
            if (index === leftIndex) onClick = handlePrev
            else if (index === rightIndex) onClick = handleNext

            return (
              <div key={index} className={className} onClick={onClick}>
                <img src={banner.url} alt="" />
              </div>
            )
          })}
        </div>

        <button
          className="slide-left-btn iconfont icon-arrow-left"
          onClick={handlePrev}
        ></button>

        <button
          className="slide-right-btn iconfont icon-arrow-right"
          onClick={handleNext}
        ></button>

        <div className="pagination-box">
          {banners.map((_, index) => (
            <span
              key={index}
              className={index === currentIndex ? 'chose' : ''}
              onMouseOver={() => safeSetCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Swiper
