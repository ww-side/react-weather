import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import tempScaleStore from '../../../store/tempScale';

const TemperatureScaleSwitch: FC<{
  temperature: number;
}> = observer(({ temperature }) => {
  const { isCelsius, setIsCelsius, convertTemperature } = tempScaleStore;

  return (
    <div className="flex">
      <p className="text-[44px]">
        {isCelsius
          ? convertTemperature(temperature, true)
          : convertTemperature(temperature, false)}
      </p>
      <div>
        <button
          className={!isCelsius ? 'text-light-gray' : ''}
          onClick={() => setIsCelsius(true)}
          disabled={isCelsius}
        >
          °C
        </button>
        <span className="mx-2">|</span>
        <button
          className={isCelsius ? 'text-light-gray' : ''}
          onClick={() => setIsCelsius(false)}
          disabled={!isCelsius}
        >
          °F
        </button>
      </div>
    </div>
  );
});

export default TemperatureScaleSwitch;
