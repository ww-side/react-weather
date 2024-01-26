import { ChangeEvent, type FC, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { observer } from 'mobx-react-lite';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import weatherStore from '../../../store/weather';
import weatherService from '../../../services/WeatherService';

const Form: FC = observer(() => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [autoCompleteValues, setAutoCompleteValues] = useState<string[]>([]);

  const { weathers, addWeather } = weatherStore;

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
        `http://api.openweathermap.org/data/2.5/weather?q=${inputValue.trim()}&appid=8a8db88bf9636c42b1fd0e47cb65b225`
      );

      const { coord, id } = res.data;

      if (weathers.some(weather => weather.city.id === id)) {
        return toast.error('This city already have in the weather list.');
      }

      const cityWeather = await weatherService.getCityWeather(
        coord.lat,
        coord.lon
      );

      addWeather(cityWeather);

      const updatedAutoCompleteValues = [...autoCompleteValues, inputValue];
      setAutoCompleteValues(updatedAutoCompleteValues);
      localStorage.setItem(
        'autoCompleteValues',
        JSON.stringify(updatedAutoCompleteValues)
      );

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
        placeholder="Type a city..."
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
          'Add'
        )}
      </Button>
    </form>
  );
});

export default Form;
