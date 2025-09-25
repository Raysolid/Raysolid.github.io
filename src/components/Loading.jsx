import { useState, useEffect, useRef } from 'react'
import './css/Loading.scss'

const Loading = ({ isActive = true }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const loaderRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (isActive && !isVisible) {
      // 显示加载动画并开始进入动画
      setIsVisible(true)
      // 延迟一点开始动画确保DOM已渲染
      setTimeout(() => setIsAnimating(true), 10)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    if (!isActive && isVisible) {
      // 开始退出动画
      setIsAnimating(false)

      // 设置超时在动画结束后隐藏组件
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isActive, isVisible])

  // 如果不可见且不活跃，则不渲染任何内容
  if (!isVisible && !isActive) {
    return null
  }

  return (
    <div
      className={`mask ${isAnimating ? 'active' : 'exiting'}`}
      ref={loaderRef}
    >
      <div className="loading">
        {Array(36)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="dot"></div>
          ))}
      </div>
    </div>
  )
}

export default Loading
