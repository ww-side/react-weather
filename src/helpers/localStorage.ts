import type { City } from '../types/localStorageCity';

export const getCitiesFromLocalStorage = () => {
  const storedCities = localStorage.getItem('cities');
  return storedCities ? JSON.parse(storedCities) : [];
};

export const updateLocalStorageCities = (newCity: City): void => {
  const storedCities = localStorage.getItem('cities');
  const cities: City[] = storedCities ? JSON.parse(storedCities) : [];

  cities.push({
    id: newCity.id,
    lat: newCity.lat,
    lon: newCity.lon,
  });
  localStorage.setItem('cities', JSON.stringify(cities));
};

export const deleteCityFromLocalStorage = (cityId: number): void => {
  const storedCities = localStorage.getItem('cities');
  if (storedCities) {
    const cities: City[] = JSON.parse(storedCities);
    const updatedCities = cities.filter(city => city.id !== cityId);
    localStorage.setItem('cities', JSON.stringify(updatedCities));
  }
};
