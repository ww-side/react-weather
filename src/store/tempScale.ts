import { makeAutoObservable } from 'mobx';

interface TempScaleModel {
  isCelsius: boolean;
  setIsCelsius(value: boolean): void;
  convertTemperature(temp: number, toCelsius: boolean): string;
}

class TempScale implements TempScaleModel {
  isCelsius = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsCelsius = (value: boolean) => {
    this.isCelsius = value;
  };

  convertTemperature = (temp: number, toCelsius: boolean) => {
    if (toCelsius) {
      return (temp - 273.15).toFixed(0);
    } else {
      return (1.8 * (temp - 273) + 32).toFixed(0);
    }
  };
}

const tempScaleStore = new TempScale();

export default tempScaleStore;
