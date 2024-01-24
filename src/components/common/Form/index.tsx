import { ChangeEvent, type FC, useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import weatherStore from '../../../store/weather';
import weatherService from '../../../services/WeatherService';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { observer } from 'mobx-react-lite';

const Form: FC = observer(() => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { weathers, addWeather } = weatherStore;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=8a8db88bf9636c42b1fd0e47cb65b225`
      );

      const { coord, id } = res.data;

      if (weathers.some(weather => weather.id === id)) {
        return toast.error('This city already have in the weather list.');
      }

      const cityWeather = await weatherService.getCityWeather(
        coord.lat,
        coord.lon
      );

      addWeather(cityWeather);
      setInputValue('');
    } catch (err) {
      console.error('City not found:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex gap-3 justify-center mt-[131px]">
      <Input
        value={inputValue}
        placeholder="Type a city..."
        onChange={handleInputChange}
      />
      <Button type="button" onClick={handleButtonClick} disabled={isLoading}>
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
