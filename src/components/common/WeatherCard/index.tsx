import { type FC } from 'react';
import cx from 'classnames';
import WeatherDetails from '../WeatherDetails';
import WeatherMainInfo from '../WeatherMainInfo';
import type { CurrentWeatherDataType } from '../../../types/weather';

const WeatherCard: FC<{ weather: CurrentWeatherDataType }> = ({ weather }) => {
  const setBackgroundColor = (country: string) => {
    if (country === 'US' || country === 'CA') {
      return 'bg-light-lavender';
    }

    return 'bg-light-beige';
  };

  return (
    <div
      className={cx(
        setBackgroundColor(weather.sys.country),
        'w-[350px] relative p-3 rounded shadow-md'
      )}
      key={weather.id}
    >
      <WeatherMainInfo weather={weather} />
      <WeatherDetails weather={weather} />
    </div>
  );
};
export default WeatherCard;
