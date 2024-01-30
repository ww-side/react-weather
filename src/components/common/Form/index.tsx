import { ChangeEvent, type FC, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { observer } from 'mobx-react-lite';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import {
  getCitiesFromLocalStorage,
  updateLocalStorageCities,
} from '../../../helpers/localStorage';
import weatherStore from '../../../store/weather';
import weatherService from '../../../services/WeatherService';
import type { City } from '../../../types/localStorageCity';

const Form: FC = observer(() => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [autoCompleteValues, setAutoCompleteValues] = useState<string[]>([]);
  const { t } = useTranslation();

  const { currentWeathers, addCurrentWeather, addWeekWeather } = weatherStore;

  useEffect(() => {
    const storedValues = localStorage.getItem('autoCompleteValues');
    if (storedValues) {
      setAutoCompleteValues(JSON.parse(storedValues));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${inputValue.trim()}&appid=${
          process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
        }`
      );

      const { coord, id } = res.data;

      if (currentWeathers.some(weather => weather.id === id)) {
        return toast.error('This city already have in the weather list.');
      }

      const cities = getCitiesFromLocalStorage();

      const existingCity = cities.find((city: City) => city.id === id);
      if (!existingCity) {
        updateLocalStorageCities({ id, lat: coord.lat, lon: coord.lon });
      }

      const currentCityWeather = await weatherService.getCurrentCityWeather(
        coord.lat,
        coord.lon
      );

      const weekCityWeather = await weatherService.getWeekCityWeather(
        coord.lat,
        coord.lon
      );

      addCurrentWeather(currentCityWeather);
      addWeekWeather(weekCityWeather);

      if (!autoCompleteValues.includes(inputValue)) {
        const updatedAutoCompleteValues = [...autoCompleteValues, inputValue];
        setAutoCompleteValues(updatedAutoCompleteValues);
        localStorage.setItem(
          'autoCompleteValues',
          JSON.stringify(updatedAutoCompleteValues)
        );
      }

      setInputValue('');
    } catch (err) {
      toast.error('City not found');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex gap-3 justify-center mt-[131px]"
      onSubmit={e => handleButtonClick(e)}
    >
      <Input
        value={inputValue}
        placeholder={t('form.placeholder')}
        onChange={handleInputChange}
        autoCompleteValues={autoCompleteValues}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#ffffff"
            secondaryColor="#ffffff"
            ariaLabel="oval-loading"
          />
        ) : (
          t('form.add')
        )}
      </Button>
    </form>
  );
});

export default Form;
