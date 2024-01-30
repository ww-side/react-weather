import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import WeatherCard from '../WeatherCard';
import weatherStore from '../../../store/weather';
import weatherService from '../../../services/WeatherService';
import {
  getCitiesFromLocalStorage,
  updateLocalStorageCities,
} from '../../../helpers/localStorage';
import type { City } from '../../../types/localStorageCity';

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

      const existingCity = currentWeathers.find(
        city => city.id === currentWeatherData.id
      );

      if (!existingCity) {
        addCurrentWeather(currentWeatherData);
        addWeekWeather(weekWeatherData);
      }

      const cities = getCitiesFromLocalStorage();

      const existingCityInLocalStorage = cities.find(
        (city: City) => city.id === currentWeatherData.id
      );

      if (!existingCityInLocalStorage) {
        updateLocalStorageCities({
          id: currentWeatherData.id,
          lat: currentWeatherData.coord.lat,
          lon: currentWeatherData.coord.lon,
        });
      }
    } catch (error) {
      console.error('Error getting weather data:', error);
    }
  };

  const handleGeolocation = (position: GeolocationPosition) => {
    const cities = getCitiesFromLocalStorage();

    const existingCity = cities.find(
      (city: City) =>
        city.lon === Number(position.coords.longitude.toFixed(4)) &&
        city.lat === Number(position.coords.latitude.toFixed(4))
    );

    if (!existingCity) {
      getWeather(position.coords.latitude, position.coords.longitude);
    }
  };

  const fetchWeatherDataForCities = async (cities: City[]) => {
    for (const city of cities) {
      await getWeather(city.lat, city.lon);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeolocation);
    }

    const cities = getCitiesFromLocalStorage();

    if (cities) {
      fetchWeatherDataForCities(cities);
    }
  }, []);

  return (
    <div className="mt-[122px]">
      {currentWeathers.length === 0 ? (
        <p className="text-center text-lg">
          {t('noCities', 'No cities have been tracked yet')}
        </p>
      ) : (
        <section className="flex flex-wrap gap-8">
          {currentWeathers.map(item => (
            <WeatherCard key={item.id} weather={item} />
          ))}
        </section>
      )}
    </div>
  );
});

export default WeatherList;
