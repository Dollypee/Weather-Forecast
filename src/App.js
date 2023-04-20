import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { locationMarker, sunriseIcon, sunRainbow, rainfallIcon, humidityIcon, windIcon, temperatureRectangle, temperatureRect } from './assets/images';
import WeatherData from './assets/data/weatherdata';
import WeatherCard from './components/weather-card';
import Forecast from './components/forecast';
import TemperatureCard from './components/temeperature-card';


function App() {

  const [location, setLocation] = useState('');

  const [data, setData] = useState({});
  const [rain, setRain] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
    if (location.length > 2) {

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=5`

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.map(result => ({
            label: result.display_name,
            value: {
              lat: result.lat,
              lon: result.lon
            }
          }));
          setSuggestions(results);
        })
        .catch(error => console.log(error));
    } else {
      setSuggestions([]);
    }
  }, [location]);



  const successCallback = (position) => {
    setLatitude(position?.coords?.latitude);
    setLongitude(position?.coords?.longitude);
  };

  const errorCallback = (error) => {
    console.error(error);
  };



  const getTime = (value) => {
    const date = new Date(value);
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const formattedTime2 = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    return date.getMinutes() === 0 ? formattedTime2 : formattedTime;
  }


  useEffect(() => {
    if (location === '') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,rain,weathercode,windspeed_10m,dewpoint_2m&daily=sunrise,sunset,rain_sum&current_weather=true&timezone=auto`

    const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=rain_sum&forecast_days=14&timezone=auto`

    axios.get(url).then((response) => {
      setData(response.data);
    })

    axios.get(url2).then((response) => {
      setRain(response.data);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longitude, latitude])

  const searchLocation = (event) => {
    if (event?.key && event.key === 'Enter') {

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=5`

      axios.get(url).then((response) => {
        setLongitude(response.data[0]?.lon);
        setLatitude(response.data[0]?.lat);
      })
    }
    if (!event.key && event) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=5`

      axios.get(url).then((response) => {
        setLongitude(response.data[0]?.lon);
        setLatitude(response.data[0]?.lat);
      })
    }
  }

  const getWeatherIcon = (weathercode) => {
    return WeatherData?.find(x => x.id === weathercode)?.icon
  }
  const getWeatherDescription = (weathercode) => {
    return WeatherData?.find(x => x.id === weathercode)?.description
  }


  const getNextRain = () => {
    return rain?.daily?.rain_sum.findIndex(rain => rain > 0)
  }

  const getDayOfWeek = (date) => {
    const dateValue = new Date(date);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return date?.includes('T') ? `${daysOfWeek[dateValue.getDay()]}` : `${daysOfWeek[dateValue.getDay()]} ${date}`;
  }

  const getClosestIndex = (value) => {
    const datetimeArray =
      data?.hourly.time.map((x) =>
        new Date(x)
      )
      ;

    const closestIndex = datetimeArray.findIndex(datetime => {
      const datetimeDiff = Math.abs(datetime.getTime() - (value ? new Date(value).getTime() : new Date().getTime()));
      const closestDiff = Math.min(...datetimeArray.map(datetime => Math.abs(datetime.getTime() - (value ? new Date(value).getTime() : new Date().getTime()))));
      return datetimeDiff === closestDiff;
    });

    return closestIndex;
  }

  const forecastData = [
    {
      day: "Today",
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.current_weather?.weathercode)}@2x.png`,
      tempSunrise: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0])],
      tempSunSet: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunset[0])],
      imageRect: temperatureRectangle
    },
    {
      day: getDayOfWeek(data?.daily?.sunrise[1]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex()])}@2x.png`,
      tempSunrise: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[1])],
      tempSunSet: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunset[1])],
      imageRect: temperatureRect
    },
    {
      day: getDayOfWeek(data?.daily?.sunrise[2]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex()])}@2x.png`,
      tempSunrise: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[2])],
      tempSunSet: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunset[2])],
      imageRect: temperatureRect
    },
    {
      day: getDayOfWeek(data?.daily?.sunrise[3]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex()])}@2x.png`,
      tempSunrise: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[3])],
      tempSunSet: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunset[3])],
      imageRect: temperatureRect
    },
    {
      day: getDayOfWeek(data?.daily?.sunrise[4]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex()])}@2x.png`,
      tempSunrise: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[4])],
      tempSunSet: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunset[4])],
      imageRect: temperatureRect
    }
  ]
  const hourlyData = [
    {
      time: "Now",
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex()])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex()]
    },
    {
      time: getTime(data?.daily?.sunrise[0]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0])])}@2x.png`,
      temperature: "Sunrise"
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 1]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 1])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 1]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 2]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 2])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 2]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 3]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 3])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 3]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 4]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 4])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 4]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 5]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 5])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 5]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 6]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 6])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 6]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 7]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 7])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 7]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 8]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 8])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 8]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 9]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 9])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 9]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 10]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 10])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 10]
    },
    {
      time: getTime(data?.hourly?.time[getClosestIndex(data?.daily?.sunrise[0]) + 11]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunrise[0]) + 11])}@2x.png`,
      temperature: data?.hourly?.temperature_2m[getClosestIndex(data?.daily?.sunrise[0]) + 11]
    },
    {
      time: getTime(data?.daily?.sunset[0]),
      image: `https://openweathermap.org/img/wn/${getWeatherIcon(data?.hourly?.weathercode[getClosestIndex(data?.daily?.sunset[0])])}@2x.png`,
      temperature: "Sunset"
    },
  ]


  return (
    <div>
      

      <div className="lg:w-1/5 flex lg:justify-end justify-center px-6 lg:px-0 items-center relative lg:ml-auto pt-9 lg:pr-12">

        <div className="absolute pl-10 lg:pl-3 w-10 inset-y-0 left-0 items-center py-12 pointer-events-none">
          <svg
            className="w-5 h-5 text-[#CCCCCC]"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type={'text'}
          placeholder={'Search location'}
          name={'location'}
          id={'location'}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          className="py-3 pl-10 text-sm rounded-lg focus:outline-none w-full bg-transparent search-input"
        />

      </div>
      <ul className='lg:w-1/5 flex flex-col justify-center px-6 lg:px-0 lg:justify-end items-center relative ml-auto lg:pr-12  text-white'>
        {suggestions.map((suggestion, i) => (
          <li key={i}>
            <button
              onClick={() => {
                setLocation(suggestion.label);
                setSuggestions([]);
                searchLocation(suggestion.label);
              }}
            >
              {suggestion.label}
            </button>
          </li>
        ))}
      </ul>

      


      <div className='lg:max-w-[75vw] mx-auto lg:pt-20 flex flex-col lg:flex-row lg:items-stretch lg:justify-center lg:space-x-9 p-6 lg:p-0 space-y-6 lg:space-y-0'>
        
        {/* Temperature Summary Card */}
        <TemperatureCard
          image={locationMarker}
          location={location}
          Content1={
            <div>
              <img src={`https://openweathermap.org/img/wn/${getWeatherIcon(data?.current_weather?.weathercode)}@2x.png`} alt="Weather icon" className='' />
            </div>
          }
          Content2={
            <div className='pl-4 pb-4 text-white'>
              <h1 className='text-[38px]'>{(data?.current_weather?.temperature)}<sup>{data?.hourly_units?.temperature_2m}</sup></h1>
              <div className='flex items-center'>
                <img src={`https://openweathermap.org/img/wn/${getWeatherIcon(data?.current_weather?.weathercode)}@2x.png`} alt="Weather icon" className='w-[31.85px] h-[40px]' />
                <h3>{getWeatherDescription(data?.current_weather?.weathercode)}</h3>

              </div>
            </div>
          }
        />

        {/* Sunset & Sunrise */}
        <WeatherCard
          image={sunriseIcon}
          alt={"sunrise Icon"}
          text="SUNRISE"
          Content1={
            <h2 className='pt-4 text-white text-[32px]'>
              {getTime(data?.daily?.sunrise[0])}
            </h2>
          }
          Content2={
            <img src={sunRainbow} alt="sun rainbow" className="pt-6" />
          }
          Content3={
            <h3 className='pt-6 pb-4 text-white'>
              Sunset: {getTime(data?.daily?.sunset[0])}
            </h3>
          }
        />

        {/* Rainfall */}
        <WeatherCard
          image={rainfallIcon}
          alt={"rainfall icon"}
          text={"RAINFALL"}
          Content1={
            <div className='pt-4 flex flex-col'>
              <h2 className='text-white text-[32px]'>
                {data?.daily?.rain_sum[0]}{data?.daily_units?.rain_sum}
              </h2>
              <span className='text-white text-[12px]'>in last 24h</span>
            </div>
          }
          Content2={
            <h3 className='pt-14 pb-4 text-white'>
              Next expected is {rain?.daily?.rain_sum[getNextRain()]}{rain?.daily_units?.rain_sum} on {getDayOfWeek(rain?.daily?.time[getNextRain()])}
            </h3>
          }
        />
      </div>

      <div className='lg:max-w-[75vw] lg:mx-auto mx-6 pt-8 px-6 mt-8 flex flex-col bg-card'>
        <h3 className='w-full text-white border-forecast pb-2 mb-5'>CONDITION THROUGHOUT TODAY</h3>
        <div className="flex lg:flex-row flex-col">
        {hourlyData?.map((data, i) => (
          <div className='flex lg:flex-col items-center justify-between mr-3 pb-4 text-white'>
            <h3>{data.time}</h3>
          <img src={data.image} alt="" />
            <span>{data.temperature} { data.temperature === 'Sunrise' || data.temperature === 'Sunset' ? '' : '°'}</span>
          </div>
          
        ))}
        </div>
      </div>
      
      
      <div className='lg:max-w-[75vw] mx-auto lg:pt-20 flex flex-col lg:flex-row lg:items-stretch lg:justify-center lg:space-x-9 p-6 lg:p-0 space-y-6 lg:space-y-0 pb-16 lg:pb-16'>
        
        {/* Forecast Data */}
        <div className='lg:w-[50%] bg-card-forecast pt-8 px-6'>
          <h3 className='w-full text-white border-forecast pb-2 mb-5'>5-DAY FORECAST</h3>

          {forecastData?.map((data, i) => (
            <Forecast
              day={data.day}
              image={data.image}
              tempSunrise={data.tempSunrise}
              tempSunSet={data.tempSunSet}
              imageRect={data.imageRect}
            />
          ))}

        </div>

        {/* Humidity Data */}
        <WeatherCard
          image={humidityIcon}
          alt={"humidity Icon"}
          text={"HUMIDITY"}
          Content1={
            <h2 className='pt-4 text-white text-[32px]'>
              {data?.hourly?.relativehumidity_2m[getClosestIndex()]}{data?.hourly_units?.relativehumidity_2m}
            </h2>
          }
          Content2={
            <h3 className='pt-24 pb-4 text-white'>
              The dew point is {data?.hourly?.dewpoint_2m[getClosestIndex()]}{data?.hourly_units?.dewpoint_2m} right now.
            </h3>}
        />

        {/* Wind Data */}
        <WeatherCard
          image={windIcon}
          alt={"wind icon"}
          text="WIND"
          Content1={
            <h2 className='pt-4 text-white text-[32px]'>
              {data?.hourly?.windspeed_10m[getClosestIndex()]}{data?.hourly_units?.windspeed_10m}
            </h2>
          }
          Content2={
            <h3 className='pt-24 pb-4 text-white'>
              Time Now: {getTime(new Date())}
            </h3>
          }
        />
      </div>
    </div>
  );
}

export default App;
