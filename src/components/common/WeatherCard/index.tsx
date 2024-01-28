import { type FC } from 'react';
import cx from 'classnames';
import WeatherDetails from '../WeatherDetails';
import WeatherMainInfo from '../WeatherMainInfo';
import TemperatureGraph from '../TemperatureGraph';
import type { CurrentWeatherDataType } from '../../../types/weather';

const WeatherCard: FC<{ weather: CurrentWeatherDataType[] }> = ({
  weather,
}) => {
  const setBackgroundColor = (country: string) => {
    if (country === 'US' || country === 'CA') {
      return 'bg-light-lavender';
    }

    return 'bg-light-beige';
  };

  return (
    <section className="flex flex-wrap gap-8">
      {weather.map(item => (
        <div
          className={cx(
            setBackgroundColor(item.sys.country),
            'w-[350px] relative p-3 rounded shadow-md'
          )}
          key={item.id}
        >
          <WeatherMainInfo weather={item} />
          <TemperatureGraph cityId={item.id} />
          <WeatherDetails weather={item} />
        </div>
      ))}
    </section>
  );
};
export default WeatherCard;
