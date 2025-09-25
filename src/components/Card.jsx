import './css/Card.scss'

const Card = ({ title, url, icon, description }) => {
  return (
    <div className="url-card">
      <a href={url} target="_blank">
        <div className="card-body">
          <div className="card-logo">
            <img src={icon} />
          </div>
          <div className="card-info">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Card
