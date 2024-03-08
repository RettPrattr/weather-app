import React from 'react'
import WeatherTable from '../components/WeatherTable'
import '../styles/Home.scss'

const Home = () => {
  return (
    <div className='Home'>
      <div className="container">
        <WeatherTable />
      </div>
    </div>
  )
}

export default Home
