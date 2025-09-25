import './css/Header.scss'
import { Link } from 'react-router-dom'
import { useSettingStore } from '/src/store'

const Header = () => {
  // 设置菜单栏
  const { setIsOpen } = useSettingStore()
  const openSetting = () => {
    setIsOpen(true)
  }

  return (
    <header className="navbar">
      <ul className="nav-menu">
        <Link to="/">
          <li className="nav-logo">
            <img src="/src/assets/logo.png" alt="" />
          </li>
        </Link>
        <li className="nav-user">
          <Link title="设置" onClick={openSetting}>
            <i className="iconfont icon-setting"></i>
          </Link>
          <Link to="/userlogin" title="用户">
            <i className="iconfont icon-user"></i>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
