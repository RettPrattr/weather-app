import React, { useState, useEffect } from 'react';
import '../styles/WeatherTable.scss'
import convertData from '../utils/convertData';
import getCorrectWord from '../utils/getCorrectWord';
import TemperatureChart from './TemperatureChart';

const WeatherTable = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isShowChart, setShowChart] = useState(false)


  const handlerCategory = () => {
    setShowChart(!isShowChart)
  }

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));

    fetchWeatherDataForYear(55.7558, 37.6173, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
  }, []);

  const fetchWeatherDataForYear = async (latitude, longitude, startDate, endDate) => {
    const url = new URL('https://archive-api.open-meteo.com/v1/era5');
    url.search = new URLSearchParams({
      latitude,
      longitude,
      start_date: startDate,
      end_date: endDate,
      hourly: 'temperature_2m,rain',
    });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const processedData = convertData(data.hourly);
      setWeatherData(processedData);
    } catch (error) {
      console.error('Fetching weather data failed:', error);
    }
  };

  return (
      <div className="WeatherTable">
          <h1>Средние показатели погоды</h1>
          <div className="categories">
              <div onClick={() => handlerCategory()} className={"review" + (!isShowChart && ' active ')}>
                <h2>Обзор</h2>
              </div>
              <div onClick={() => handlerCategory()} className={"chart" + (isShowChart && ' active ')}>
                <h2>Графики</h2>
              </div>
          </div>
        {isShowChart ? <TemperatureChart weatherData={weatherData} /> : <table className='table'>
            <thead>
                <tr>
                <th>Месяц</th>
                <th>Мин. / Макс. (°С) </th>
                <th>Средняя (°С)</th>
                <th>Дождь</th>
                </tr>
            </thead>
            <tbody>
                {weatherData.map((monthData, index) => (
                <tr key={index}>
                    <td>{monthData.name}</td>
                    <td>{`${monthData.temperature_min.toFixed(1)}°`} / {`${monthData.temperature_max.toFixed(1)}°`}</td> {/* Самый низкий и самый высокий показатели за месяц */}
                    <td>{`${monthData.temperature_avg.toFixed(1)}°`}</td> {/* Средняя температура за месяц */}
                    <td>{`${monthData.rainy_days} ${getCorrectWord(monthData.rainy_days)}`}</td>
                </tr>
                ))}
            </tbody>
            </table>}
      </div>
  );
};


  
  

  

export default WeatherTable;
