import './css/CardList.scss'
import Card from '../../components/Card'

// 卡片列表
const CardList = ({ cardList }) => {
  return cardList.map((item) => (
    <div className="content-wrap" key={item.name}>
      <a name={item.name} className="anchor-point"></a>
      <div className="tab-title">
        <h2>
          <div className="iconfont icon-label"></div>
          {item.title}
        </h2>
      </div>
      {item.children.map((child) => (
        <div key={child.title}>
          <div className="tab-smalltitle">
            <h3>
              <div className={`iconfont icon-${child.icon}`}></div>
              {child.title}
            </h3>
          </div>
          <div className="tab-content">
            {child.children.map((child) => (
              <Card {...child} key={child.title} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ))
}

export default CardList
