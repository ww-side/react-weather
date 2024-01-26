import { makeAutoObservable } from 'mobx';
import type { WeatherDataType } from '../types/weather';

interface WeatherModel {
  weathers: WeatherDataType[];
  addWeather(weather: WeatherDataType): void;
  deleteWeather(id: number): void;
}

class Weather implements WeatherModel {
  weathers: WeatherDataType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addWeather = (weather: WeatherDataType) => {
    this.weathers.push(weather);
  };

  deleteWeather = (id: number) => {
    this.weathers = this.weathers.filter(weather => weather.city.id !== id);
  };
}

const weatherStore = new Weather();

export default weatherStore;
