import React from 'react'

const WeatherCard = ({image, alt, text, Content1, Content2, Content3}) => {
  return (
    <div className='lg:w-[23%] bg-card p-4'>
      <div className='pt-6 flex space-x-3 text-white items-center'>
        <img src={image} alt={alt} />
        <h3 className='text-weather-heading'>{text}</h3>
      </div>
      {Content1}
      {Content2}
      {Content3}
    </div>
  )
}

export default WeatherCard