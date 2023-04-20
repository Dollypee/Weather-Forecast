import React from 'react'

const TemperatureCard = ({ image, location, Content1, Content2 }) => {
  return (
    <div className='lg:w-[50%] bg-card p-4'>
      <div className='flex items-center justify-end pt-6 pr-6 space-x-3'>
        <img src={image} alt="location marker" />
        <h3 className='text-right text-white'>{location}</h3>
      </div>

      <div className='flex flex-col py-0'>
        {Content1}
        {Content2}
      </div>
    </div>
  )
}

export default TemperatureCard