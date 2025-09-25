import './css/Banner.scss'
import Header from '/src/components/Header'
import { useEffect, useState } from 'react'

const Banner = ({ text }) => {
  const [textIndex, setTextIndex] = useState(1)
  const [backward, setBackward] = useState(false)

  // 向下滚动
  const scrollDown = () => {
    window.scrollTo({ top: window.scrollY + 850, behavior: 'smooth' })
  }

  useEffect(() => {
    let timer = null
    if (textIndex < text.length && !backward) {
      timer = setTimeout(() => {
        setTextIndex((prev) => prev + 1)
      }, 150)
    } else if (textIndex > 0 && backward) {
      timer = setTimeout(() => {
        setTextIndex((prev) => prev - 1)
      }, 80)
    } else if (textIndex === text.length && !backward) {
      setTimeout(() => {
        setBackward(true)
      }, 1000)
    } else if (textIndex === 0 && backward) {
      setTimeout(() => {
        setBackward(false)
      }, 500)
    }
    return () => clearTimeout(timer)
  }, [text, textIndex, backward])

  return (
    <div className="banner">
      <div className="top-nav">
        <Header />
      </div>
      <div className="typewriter">
        <p className="typewriter-text">{text.slice(0, textIndex)}</p>
        <span className="typewriter-cursor"></span>
      </div>
      <div className="scroll-down" onClick={scrollDown}>
        <i className="iconfont icon-down"></i>
      </div>
    </div>
  )
}

export default Banner
