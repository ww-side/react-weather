import { type FC } from 'react';
import cx from 'classnames';
import WeatherDetails from '../WeatherDetails';
import WeatherMainInfo from '../WeatherMainInfo';
import type { WeatherDataType } from '../../../types/weather';

const WeatherCard: FC<{ weathers: WeatherDataType[] }> = ({ weathers }) => {
  const setBackgroundColor = (country: string) => {
    if (country === 'US' || country === 'CA') {
      return 'bg-light-lavender';
    }

    return 'bg-light-beige';
  };

  return (
    <section className="flex flex-wrap gap-8">
      {weathers.map(weather => (
        <div
          className={cx(
            setBackgroundColor(weather.city.country),
            'w-[350px] relative p-3 rounded shadow-md'
          )}
          key={weather.city.id}
        >
          <WeatherMainInfo weather={weather} />
          <WeatherDetails weather={weather} />
        </div>
      ))}
    </section>
  );
};
export default WeatherCard;
