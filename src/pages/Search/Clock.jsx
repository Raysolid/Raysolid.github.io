import './css/clock.scss'
import { useState, useEffect } from 'react'

const Clock = () => {
  // 当前时间
  const [time, setTime] = useState(new Date())
  // 冒号闪烁
  const [showDot, setShowDot] = useState(true)

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
      setShowDot(!showDot)
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <li className="nav-time">
      <div className="time">
        <div className="hour">{String(time.getHours()).padStart(2, '0')}</div>
        <div className={`dot ${showDot ? '' : 'invisible'}`}>:</div>
        <div className="min">{String(time.getMinutes()).padStart(2, '0')}</div>
      </div>
    </li>
  )
}

export default Clock
