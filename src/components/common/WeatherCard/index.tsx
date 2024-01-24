import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';
import type { WeatherDataType } from '../../../types/weather';
import weatherStore from '../../../store/weather';

const WeatherCard: FC<{ weathers: WeatherDataType[] }> = observer(
  ({ weathers }) => {
    const { deleteWeather } = weatherStore;

    const setBackgroundColor = (country: string) => {
      if (country === 'US' || 'CA') {
        return 'bg-light-lavender';
      }

      return 'bg-light-beige';
    };

    return (
      <section className="flex flex-wrap gap-8">
        {weathers.map(weather => (
          <div
            className={cx(
              setBackgroundColor(weather.sys.country),
              'w-max relative p-3 rounded'
            )}
            key={weather.id}
          >
            <span
              className="absolute top-0 right-1 cursor-pointer"
              onClick={() => deleteWeather(weather.id)}
            >
              x
            </span>
            <p>City: {weather.name}</p>
            <p>Temperature: {weather.main.temp}</p>
          </div>
        ))}
      </section>
    );
  }
);

export default WeatherCard;
