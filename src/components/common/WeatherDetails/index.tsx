import { Trans, useTranslation } from 'react-i18next';
import { type FC, useState } from 'react';
import TemperatureScaleSwitch from '../TemperatureScaleSwitch';
import TemperatureGraph from '../TemperatureGraph';
import useWeatherStyles from '../../../hooks/useWeatherStyles';
import { convertTemperature } from '../../../helpers/convertTemperature';
import type { CurrentWeatherDataType } from '../../../types/weather';

const WeatherDetails: FC<{
  weather: CurrentWeatherDataType;
}> = ({ weather }) => {
  const { t } = useTranslation();
  const [isCelsius, setIsCelsius] = useState(true);
  const { textColor } = useWeatherStyles(weather.sys.country);

  return (
    <>
      <TemperatureGraph cityId={weather.id} isCelsius={isCelsius} />
      <div className="flex justify-between items-end mt-[20px]">
        <div>
          <TemperatureScaleSwitch
            temperature={weather.main.temp}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
          />
          <p className="text-light-gray text-sm">
            <Trans
              i18nKey="weatherDetails.feelsLike"
              values={{
                temperature: isCelsius
                  ? convertTemperature(weather.main.feels_like, true)
                  : convertTemperature(weather.main.feels_like, false),
                unit: isCelsius ? '°C' : '°F',
              }}
              components={{ bold: <strong /> }}
            />
          </p>
        </div>
        <div className="text-right text-sm font-medium">
          <Trans
            i18nKey="weatherDetails.wind"
            values={{
              windSpeed: weather.wind.speed,
            }}
            components={{
              el: <span className={textColor} />,
            }}
          />
          <p>
            {t('weatherDetails.humidity')}:{' '}
            <span className={textColor}>{weather.main.humidity}%</span>
          </p>
          <Trans
            i18nKey="weatherDetails.pressure"
            values={{
              pressureValue: weather.main.pressure,
            }}
            components={{
              el: <span className={textColor} />,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
