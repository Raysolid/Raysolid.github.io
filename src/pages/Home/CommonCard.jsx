import './css/CardList.scss'
import Card from '../../components/Card'
import { useState } from 'react'

// 常用卡片
const CommonCard = ({ title, name, menuList, cardList }) => {
  // 当前选中类别
  const [currentCard, setCurrentCard] = useState('yingshi')

  return (
    <div className="content-wrap">
      <a name={name} className="anchor-point"></a>
      <div className="tab-title">
        <h2>
          <div className="iconfont icon-label"></div>
          {title}
        </h2>
      </div>
      <div className="tab">
        <div className="silder-menu">
          {menuList.map((item) => (
            <input
              id={item.id}
              type="radio"
              name="tabmenu"
              className="silder-select"
              onClick={() => {
                setCurrentCard(item.id)
              }}
              key={item.id}
            />
          ))}

          <div className="buttons">
            {menuList.map((item) => (
              <label htmlFor={item.id} key={item.id}>
                <div>{item.name}</div>
              </label>
            ))}
            <div className="block"></div>
          </div>
        </div>
      </div>

      {Object.keys(cardList).map((item) => (
        <div
          className={`tab-content ${item === currentCard ? '' : 'hide'}`}
          id="tab"
          key={item}
        >
          {cardList[item].children.map((card) => (
            <Card {...card} key={card.title} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default CommonCard
