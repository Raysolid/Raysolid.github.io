import './css/Weather.scss'
import { useState, useEffect } from 'react'
import { useSettingStore } from '/src/store'
import axios from 'axios'

const Weather = ({ cityName }) => {
  const { showWeather } = useSettingStore()
  const [temperature, setTemperature] = useState(0)
  const [city, setCity] = useState('未知')
  const [weather, setWeather] = useState('晴')
  const weaImg = {
    晴: 'qing.svg',
    多云: 'yun.svg',
    阴: 'yin.svg',
    雾: 'wu.svg',
    小雨: 'yu.svg',
    中雨: 'yu.svg',
    大雨: 'yu.svg',
    暴雨: 'yu.svg',
    小雪: 'xue.svg',
    中雪: 'xue.svg',
    大雪: 'xue.svg',
    暴雪: 'xue.svg'
  }

  useEffect(() => {
    const apiKey = 'SfZzyR5iTS3jFTztG'
    // 获取天气信息
    const getWeatherInfo = async () => {
      let weatherData = JSON.parse(sessionStorage.getItem('weatherData'))
      if (weatherData) {
        setCity(weatherData.city)
        setTemperature(weatherData.temperature)
        setWeather(weatherData.weather)
        return
      }

      let cityName = (
        await axios.get('https://ipapi.co/json/')
      ).data.city.toLowerCase()
      // cityName = 'shenzhen'
      weatherData = await axios.get(
        `https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=${cityName}&language=zh-Hans`
      )

      const { location, now } = weatherData.data.results[0]
      setCity(location.name)
      setTemperature(now.temperature)
      setWeather(now.text)
      sessionStorage.setItem(
        'weatherData',
        JSON.stringify({
          city: location.name,
          temperature: now.temperature,
          weather: now.text
        })
      )
    }
    getWeatherInfo()
  }, [cityName])

  if (!showWeather) {
    return null
  }

  return (
    <div className="weather">
      <div className="weather-content">
        <div className="left">
          <h3 className="weather-tem">
            <span>{temperature}</span>°
          </h3>
          <div className="weather-info">
            <div className="weather-city">{city}</div>
            <span className="tap"> | </span>
            <div className="weather-wea">{weather}</div>
          </div>
        </div>
        <div className="right">
          <div className="weather-img">
            <img
              src={`/src/assets/bookmark/weather/${weaImg[weather]}`}
              alt="weather"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
