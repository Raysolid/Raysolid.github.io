import ToolBtn from '../../components/ToolBtn'
import Sidebar from './Sidebar'
import Header from '../../components/Header'
import Background from './Background'
import CommonCard from './CommonCard'
import CardList from './CardList'
import './css/index.scss'
import { useState, useEffect } from 'react'
import menuList from '../../api/menuList.json'
import cardData from '../../api/commonCard.json'
import cardList from '../../api/cardList.json'

const Home = () => {
  // 侧边栏
  const [open, setOpen] = useState(false)
  // 主题
  const [theme, setTheme] = useState('light')
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    // 根据当前时间调整显示模式
    let hours = new Date().getHours()
    if (hours > 18 || hours < 6) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div className="home-container">
      <Sidebar menuList={menuList} setOpen={setOpen} />
      <div className={`content ${open ? 'open' : ''}`}>
        <Header />
        <Background />
        <div className="home-content">
          <CommonCard {...cardData} />
          <CardList cardList={cardList} />
        </div>
      </div>
      <div className="cursor-dot"></div>
      <ToolBtn>
        {/* 切换深浅主题 */}
        <div className="toggle-theme" onClick={changeTheme}>
          <span
            className={`iconfont icon theme ${
              theme === 'light' ? 'icon-dark-circle' : 'icon-light-circle'
            }`}
          ></span>
        </div>
      </ToolBtn>
    </div>
  )
}

export default Home
