import { Trans, useTranslation } from 'react-i18next';
import { type FC } from 'react';
import TemperatureScaleSwitch from '../TemperatureScaleSwitch';
import { CurrentWeatherDataType } from '../../../types/weather';
import { observer } from 'mobx-react-lite';
import tempScaleStore from '../../../store/tempScale';

const WeatherDetails: FC<{ weather: CurrentWeatherDataType }> = observer(
  ({ weather }) => {
    const { t } = useTranslation();
    const { isCelsius, convertTemperature } = tempScaleStore;

    const textColor =
      weather.sys.country === 'US' ? 'text-azure' : 'text-apricot-orange';

    return (
      <>
        <div className="flex justify-between items-end mt-[20px]">
          <div>
            <TemperatureScaleSwitch temperature={weather.main.temp} />
            <p className="text-light-gray text-sm">
              <Trans
                i18nKey="feelsLike"
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
              i18nKey="wind"
              values={{
                windSpeed: weather.wind.speed,
              }}
              components={{
                el: <span className={textColor} />,
              }}
            />
            <p>
              {t('humidity')}:{' '}
              <span className={textColor}>{weather.main.humidity}%</span>
            </p>
            <Trans
              i18nKey="pressure"
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
  }
);

export default WeatherDetails;
