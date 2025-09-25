import './css/GridBox.scss'

const GridBox = () => {
  return (
    <div className="grid-layout">
      <div className="grid-box">
        {[...Array(9)].map((_, index) => (
          <div className="grid-item" key={index}></div>
        ))}
      </div>
    </div>
  )
}

export default GridBox
