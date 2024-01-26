import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import dateformat from 'dateformat';
import type { WeatherDataType } from '../../../types/weather';
import weatherStore from '../../../store/weather';

const WeatherMainInfo: FC<{ weather: WeatherDataType }> = observer(
  ({ weather }) => {
    const { deleteWeather } = weatherStore;

    return (
      <>
        <span
          className="absolute top-0 right-1 cursor-pointer"
          onClick={() => deleteWeather(weather.city.id)}
        >
          x
        </span>
        <div className="flex justify-between items-center">
          <p className="font-medium">
            {weather.city.name}, {weather.city.country}
          </p>
          <div className="pr-2.5 text-light-gray flex items-center gap-1">
            <img
              className="w-[36px] h-[36px]"
              src={`http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
              alt="weather-icon"
            />
            {weather.list[0]?.weather[0].main}
          </div>
        </div>
        <div className="text-lg">
          {dateformat(weather.list[0]?.dt_txt, 'ddd, d mmmm, HH:MM')}
        </div>
      </>
    );
  }
);

export default WeatherMainInfo;
