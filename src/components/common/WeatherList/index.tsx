import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import WeatherCard from '../WeatherCard';
import weatherStore from '../../../store/weather';
import weatherService from '../../../services/WeatherService';

const WeatherList = observer(() => {
  const { currentWeathers, addCurrentWeather, addWeekWeather } = weatherStore;

  const getWeather = async (lat: number, lon: number) => {
    try {
      const currentWeatherData = await weatherService.getCurrentCityWeather(
        lat,
        lon
      );
      const weekWeatherData = await weatherService.getWeekCityWeather(lat, lon);

      addCurrentWeather(currentWeatherData);
      addWeekWeather(weekWeatherData);
    } catch (error) {
      console.error('Error getting weather data:', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  return (
    <div className="mt-[122px]">
      {currentWeathers.length === 0 ? (
        <p>No cities have been tracked yet</p>
      ) : (
        <WeatherCard weather={currentWeathers} />
      )}
    </div>
  );
});

export default WeatherList;
