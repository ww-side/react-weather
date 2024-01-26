import { Trans, useTranslation } from 'react-i18next';
import { type FC, useState } from 'react';
import dateformat from 'dateformat';
import TemperatureScaleSwitch from '../TemperatureScaleSwitch';
import type { WeatherDataType } from '../../../types/weather';

const WeatherDetails: FC<{ weather: WeatherDataType }> = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const { t } = useTranslation();

  const convertTemperature = (temp: number, toCelsius: boolean) => {
    if (toCelsius) {
      return (temp - 273.15).toFixed(0);
    } else {
      return (1.8 * (temp - 273) + 32).toFixed(0);
    }
  };

  const getUniqueDates = (dates: number[]) => {
    const uniqueDates: string[] = [];
    dates.forEach(date => {
      const formattedDate = dateformat(new Date(date * 1000), 'dd.mm');
      if (!uniqueDates.includes(formattedDate)) {
        uniqueDates.push(formattedDate);
      }
    });
    return uniqueDates;
  };

  return (
    <>
      <div className="flex text-light-gray justify-between text-[12px]">
        {getUniqueDates(weather.list.map(date => date.dt)).map(uniqueDate => (
          <div className="cursor-pointer" key={uniqueDate}>
            {uniqueDate}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-end mt-[20px]">
        <div>
          <TemperatureScaleSwitch
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            temperature={weather.list[0]?.main.temp}
          />
          <p className="text-light-gray text-sm">
            <Trans
              i18nKey="feelsLike"
              defaults="Feels like: <bold>{{temperature}}</bold>"
              values={{
                temperature: isCelsius
                  ? convertTemperature(weather.list[0]?.main.feels_like, true)
                  : convertTemperature(weather.list[0]?.main.feels_like, false),
                unit: isCelsius ? '°C' : '°F',
              }}
              components={{ bold: <strong /> }}
            />
          </p>
        </div>
        <div className="text-right text-sm font-medium">
          <Trans
            i18nKey="wind"
            default="Wind: <el>{{windSpeed}} m/s</el>"
            values={{
              windSpeed: weather.list[0]?.wind.speed,
            }}
            components={{
              el: <span className="text-apricot-orange" />,
            }}
          />
          <p>
            {t('humidity')}:{' '}
            <span className="text-apricot-orange">
              {weather.list[0]?.main.humidity}%
            </span>
          </p>
          <Trans
            i18nKey="pressure"
            default="Pressure: <el>{{pressureValue}}Pa</el>"
            values={{
              pressureValue: weather.list[0]?.main.pressure,
            }}
            components={{
              el: <span className="text-apricot-orange" />,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
