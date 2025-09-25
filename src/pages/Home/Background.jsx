import './css/background.scss'

// 动态背景
const Background = () => {
  return (
    <div className="bg">
      <div className="banner-wrap scenes-ready">
        <div id="stage">
          <div className="space"></div>
          <div className="mountains">
            <div className="mountain mountain-1"></div>
            <div className="mountain mountain-2"></div>
            <div className="mountain mountain-3"></div>
          </div>
          <div className="bear"></div>
        </div>
      </div>
    </div>
  )
}

export default Background
