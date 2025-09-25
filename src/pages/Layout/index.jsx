import './css/index.scss'
import Loading from '/src/components/Loading'
import ToolBtn from '/src/components/ToolBtn'
import Banner from './Banner'
import Swiper from './Swiper'
import GridBox from './GridBox'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Layout = () => {
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')

  useEffect(() => {
    // 获取一言
    const getText = async () => {
      const result = await axios.get('https://v1.hitokoto.cn/')
      setText(result.data.hitokoto)
    }
    getText()
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div>
      <Loading isActive={loading} />
      <ToolBtn />
      <div className="layout">
        <Banner text={text} />
        <div className="container">
          <Swiper />
          <GridBox />
        </div>
      </div>
    </div>
  )
}

export default Layout
