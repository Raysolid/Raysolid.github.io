import './css/ToolBtn.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ToolBtn = ({ children }) => {
  // 滚动到一定位置显示回到顶部按钮
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 250)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="tool-btn">
      {/* 回到顶部 */}
      <div
        className={`iconfont ${showScrollToTop ? 'show' : 'hide'}`}
        onClick={scrollToTop}
      >
        <span className="icon">&#xe785;</span>
      </div>
      {/* 跳转搜索页 */}
      <div className="iconfont">
        <Link to="/search">
          <span className="icon">&#xe63e;</span>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default ToolBtn
