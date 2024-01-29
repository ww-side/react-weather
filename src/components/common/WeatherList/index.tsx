import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import WeatherCard from '../WeatherCard';
import weatherStore from '../../../store/weather';
import weatherService from '../../../services/WeatherService';

const WeatherList = observer(() => {
  const { currentWeathers, addCurrentWeather, addWeekWeather } = weatherStore;
  const { t } = useTranslation();

  const getWeather = async (lat: number, lon: number) => {
    try {
      const currentWeatherData = await weatherService.getCurrentCityWeather(
        lat,
        lon
      );
      const weekWeatherData = await weatherService.getWeekCityWeather(lat, lon);

      const storedCities = localStorage.getItem('cities');
      const cities = storedCities ? JSON.parse(storedCities) : [];

      const existingCity = cities.find(
        (city: any) => city.id === currentWeatherData.id
      );

      if (!existingCity) {
        cities.push({
          id: currentWeatherData.id,
          lat: currentWeatherData.coord.lat,
          lon: currentWeatherData.coord.lon,
        });
        localStorage.setItem('cities', JSON.stringify(cities));
      }

      addCurrentWeather(currentWeatherData);
      addWeekWeather(weekWeatherData);
    } catch (error) {
      console.error('Error getting weather data:', error);
    }
  };

  useEffect(() => {
    const storedCities = localStorage.getItem('cities');
    const cities = storedCities ? JSON.parse(storedCities) : [];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const existingCity = cities.find(
          (city: any) =>
            city.lon === Number(position.coords.longitude.toFixed(4)) &&
            city.lat === Number(position.coords.latitude.toFixed(4))
        );

        if (!existingCity) {
          getWeather(position.coords.latitude, position.coords.longitude);
        }
      });
    }

    if (cities) {
      const fetchWeatherData = async () => {
        for (const city of cities) {
          await getWeather(city.lat, city.lon);
        }
      };

      fetchWeatherData();
    }
  }, []);

  return (
    <div className="mt-[122px]">
      {currentWeathers.length === 0 ? (
        <p className="text-center text-lg">
          {t('noCities', 'No cities have been tracked yet')}
        </p>
      ) : (
        <WeatherCard weather={currentWeathers} />
      )}
    </div>
  );
});

export default WeatherList;
