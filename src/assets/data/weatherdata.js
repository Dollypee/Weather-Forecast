const now = new Date();
const currentHour = now.getHours();

const WeatherData = [
  {
    id: 95,
    name: 'Thunderstorm',
    description: 'Thunderstorm',
    icon: '11d'
  },
  {
    id: 96,
    name: 'Thunderstorm',
    description: 'Thunderstorm with slight hail',
    icon: '11d'
  },
  {
    id: 99,
    name: 'Thunderstorm',
    description: 'Thunderstorm with heavy hail',
    icon: '11d'
  },
  {
    id: 0,
    name: 'Clear Sky',
    description: 'Clear Sky',
    icon: (currentHour >= 6 && currentHour < 18) ? '01d' : '01n'
  },
  {
    id: 1,
    name: 'Mainly Clear',
    description: 'Mainly Clear',
    icon: (currentHour >= 6 && currentHour < 18) ? '01d' : '01n'
  },
  {
    id: 2,
    name: 'Partly Cloudy',
    description: 'Partly Cloudy',
    icon: (currentHour >= 6 && currentHour < 18) ? '04d' : '04n'
  },
  {
    id: 3,
    name: 'Overcast Cloud',
    description: 'Overcast Cloud',
    icon: (currentHour >= 6 && currentHour < 18) ? '04d' : '04n'
  },
  {
    id: 45,
    name: 'Fog',
    description: 'Fog',
    icon: '50d'
  },
  {
    id: 48,
    name: 'Depositing Rime Fog',
    description: 'Depositing Rime Fog',
    icon: '50d'
  },
  {
    id: 51,
    name: 'Drizzle',
    description: 'Drizzle Light Intensity',
    icon: '09d'
  },
  {
    id: 53,
    name: 'Drizzle',
    description: 'Drizzle Moderate Intensity',
    icon: '09d'
  },
  {
    id: 55,
    name: 'Drizzle',
    description: 'Drizzle Heavy Intesity',
    icon: '09d'
  },
  {
    id: 56,
    name: 'Freezing Drizzle',
    description: 'Freezing Drizzle Light Intensity',
    icon: '09d'
  },
  {
    id: 57,
    name: 'Freezing Drizzle',
    description: 'Freezing Drizzle Dense Intensity',
    icon: '09d'
  },
  {
    id: 61,
    name: 'Rain',
    description: 'Slight Rain',
    icon: (currentHour >= 6 && currentHour < 18) ? '10d' : '10n'
  },
  {
    id: 63,
    name: 'Rain',
    description: 'Moderate Rain',
    icon: (currentHour >= 6 && currentHour < 18) ? '10d' : '10n'
  },
  {
    id: 65,
    name: 'Rain',
    description: 'Heavy Rain',
    icon: (currentHour >= 6 && currentHour < 18) ? '10d' : '10n'
  },
  {
    id: 66,
    name: 'Freezing Rain',
    description: 'Freezing Rain Light Intensity',
    icon: '13d'
  },
  {
    id: 67,
    name: 'Freezing Rain',
    description: 'Freezing Rain Heavy Intesity',
    icon: '13d'
  },
  {
    id: 71,
    name: 'Snow',
    description: 'Snow Fall Light',
    icon: '13d'
  },
  {
    id: 73,
    name: 'Snow',
    description: 'Snow Fall Moderate',
    icon: '13d'
  },
  {
    id: 75,
    name: 'Snow',
    description: 'Snow Fall Heavy',
    icon: '13d'
  },
  {
    id: 77,
    name: 'Snow',
    description: 'Snow Grains',
    icon: '13d'
  },
  {
    id: 85,
    name: 'Snow',
    description: 'Snow Showers Slight',
    icon: '13d'
  },
  {
    id: 86,
    name: 'Snow',
    description: 'Snow Showers Heavy',
    icon: '13d'
  },
  {
    id: 80,
    name: 'Rain',
    description: 'Rain Showers Slight',
    icon: '09d'
  }, {
    id: 81,
    name: 'Rain',
    description: 'Rain Showers Moderate',
    icon: '09d'
  }, {
    id: 82,
    name: 'Rain',
    description: 'Rain Showers Heavy',
    icon: '09d'
  },
]

export default WeatherData;
