import './css/Bottom.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Dreamer from '/src/utils/dream-msg.min.js'

const Bottom = () => {
  // 古诗词
  const [word, setWord] = useState('')

  // 复制古诗词
  const copyWord = () => {
    navigator.clipboard.writeText(word)
    Dreamer.success('复制成功，祝您生活愉快！', 2000)
  }

  useEffect(() => {
    // 获取古诗词
    const getWord = async () => {
      const result = await axios.get(
        'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2'
      )
      setWord(result.data.data.content)
    }
    getWord()
  }, [])

  return (
    <div className="bottom">
      <div className="gushi">
        <span
          className="jinrishici"
          id="jinrishici-sentence"
          onClick={() => copyWord()}
        >
          {word}
        </span>
      </div>
      <div className="copyright-text">
        Copyright © 2023
        <Link to="/" title=":D小站" rel="home">
          :D小站
        </Link>
        &nbsp;
      </div>
    </div>
  )
}

export default Bottom
