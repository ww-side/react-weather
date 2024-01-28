import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import dateformat from 'dateformat';
import weatherStore from '../../../store/weather';
import type { CurrentWeatherDataType } from '../../../types/weather';

const WeatherMainInfo: FC<{ weather: CurrentWeatherDataType }> = observer(
  ({ weather }) => {
    const { deleteCurrentWeather, deleteWeekWeather } = weatherStore;

    const handleClickDelete = () => {
      deleteCurrentWeather(weather.id);
      deleteWeekWeather(weather.id);
    };

    return (
      <>
        <span
          className="absolute top-0 right-1 cursor-pointer"
          onClick={handleClickDelete}
        >
          x
        </span>
        <div className="flex justify-between items-center">
          <p className="font-medium">
            {weather.name}, {weather.sys.country}
          </p>
          <div className="pr-2.5 text-light-gray flex items-center gap-1">
            <img
              className="w-[36px] h-[36px]"
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather-icon"
            />
            {weather.weather[0].main}
          </div>
        </div>
        <div className="text-lg">
          {dateformat(new Date(), 'ddd, d mmmm, HH:MM')}
        </div>
      </>
    );
  }
);

export default WeatherMainInfo;
