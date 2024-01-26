import { type Dispatch, type FC, type SetStateAction } from 'react';

const TemperatureScaleSwitch: FC<{
  isCelsius: boolean;
  setIsCelsius: Dispatch<SetStateAction<boolean>>;
  temperature: number;
}> = ({ temperature, isCelsius, setIsCelsius }) => {
  const convertTemperature = (temp: number, toCelsius: boolean) => {
    if (toCelsius) {
      return (temp - 273.15).toFixed(0);
    } else {
      return (1.8 * (temp - 273) + 32).toFixed(0);
    }
  };

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
