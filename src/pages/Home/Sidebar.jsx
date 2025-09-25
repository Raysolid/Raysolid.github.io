import './css/Sidebar.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = ({ menuList, setOpen }) => {
  const [close, setClose] = useState(true)
  // 切换侧边栏
  const toggleSidebar = () => {
    setClose(!close)
    setOpen(close)
  }
  // 搜索
  const search = (e) => {
    if (e.key === 'Enter') {
      window.open(`https://www.baidu.com/s?wd=${e.target.value}`, '_blank')
    }
  }
  // 点击菜单
  const handleMenuClick = (path) => {
    if (path === '/') {
      return
    }
    const anchorPoint = document.querySelector(
      `.anchor-point[name="${path.substr(1)}"]`
    )
    anchorPoint.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`sidebar-nav ${close ? 'close' : ''}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="src/assets/homebg/headpic.jpg" />
          </span>
          <div className="text logo-text logo">
            <Link to="/">
              <img src="src/assets/logo.png" width={120} />
            </Link>
          </div>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li className="search-box" onClick={() => setClose(false)}>
            <i className="iconfont icon-search icon"></i>
            <input
              type="text"
              placeholder="搜索一下"
              id="search-input"
              autoComplete="off"
              onKeyDown={search}
            />
          </li>
          <ul className="menu-links">
            {menuList.map((item) => (
              <li
                className="nav-link"
                key={item.name}
                onClick={() => handleMenuClick(item.path)}
              >
                <Link to={item.path}>
                  <i className={`iconfont ${item.icon} icon`}></i>
                  <span className="text nac-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom-content">
          <li className="toggle-switch" onClick={toggleSidebar}>
            <i
              className={`iconfont ${
                close ? 'icon-arrow-right' : 'icon-arrow-left'
              } icon`}
            ></i>
            <span className="toggle-text text">收起</span>
          </li>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
