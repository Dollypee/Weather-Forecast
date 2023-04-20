import React from 'react'

const Forecast = ({day, image, tempSunrise, tempSunSet,imageRect }) => {
  return (
    <div className='flex items-center justify-between mb-3'>
      <h3 className='text-white'>{ day}</h3>
      <img src={image} alt="Weather Icon" className="md:w-[25px] md:h-[25px] " />
      <div className="flex space-x-2 text-white">
        <span>
          {tempSunrise}°       
        </span>
        <img src={imageRect} alt="temperature rectangle" />
        <span>
          {tempSunSet}°
        </span>
      </div>
  </div>
  )
}

export default Forecast