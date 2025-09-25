import './css/Header.scss'
import { Link, useLocation } from 'react-router-dom'

const navList = [
  {
    name: '首页',
    icon: 'icon-home',
    path: '/'
  },
  {
    name: '收藏',
    icon: 'icon-tool',
    path: '/home'
  },
  {
    name: '搜索',
    icon: 'icon-search',
    path: '/search'
  }
]

const Header = () => {
  const path = useLocation().pathname

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <i className="iconfont icon-cat"></i>
          <div className="logo"></div>
        </Link>
      </div>
      <div className="header-right">
        <ul>
          {navList.map((item) => (
            <li key={item.path} className={item.path === path ? 'active' : ''}>
              <Link to={item.path}>
                <i className={`iconfont ${item.icon}`}></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
