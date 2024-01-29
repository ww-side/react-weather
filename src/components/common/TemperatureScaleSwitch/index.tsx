import { type Dispatch, type FC, type SetStateAction } from 'react';
import { convertTemperature } from '../../../helpers/convertTemperature';

const TemperatureScaleSwitch: FC<{
  temperature: number;
  isCelsius: boolean;
  setIsCelsius: Dispatch<SetStateAction<boolean>>;
}> = ({ temperature, isCelsius, setIsCelsius }) => {
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
};

export default TemperatureScaleSwitch;
