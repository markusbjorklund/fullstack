import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({
    location: {},
    current: {}
  });
  const api_key = process.env.REACT_APP_API_KEY
  const rootUrl = `http://api.weatherstack.com`
  const capitalWeatherUrl = `${rootUrl}/current?access_key=${api_key}&query=${capital}`

  useEffect(() => {
    axios
      .get(capitalWeatherUrl)
      .then(response => {
        setWeather(response.data)
      })
  }, [capitalWeatherUrl])

  return (
    <>
      <h3>Weather in {weather.location.name}</h3>
      <p><b>Temperature:</b> {weather.current.temperature} celcius</p>
      <img src={weather.current.weather_icons} alt='icon' />
      <p><b>Wind:</b> {Math.round(weather.current.wind_speed/3.6)} m/s, direction {weather.current.wind_dir}</p>
    </>
  )
}

export default Weather