import { makeAutoObservable } from 'mobx';
import type {
  CurrentWeatherDataType,
  WeekWeatherDataType,
} from '../types/weather';

interface WeatherModel {
  currentWeathers: CurrentWeatherDataType[];
  weekWeathers: WeekWeatherDataType[];
  addCurrentWeather(weather: CurrentWeatherDataType): void;
  deleteCurrentWeather(id: number): void;
}

class Weather implements WeatherModel {
  currentWeathers: CurrentWeatherDataType[] = [];
  weekWeathers: WeekWeatherDataType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCurrentWeather = (weather: CurrentWeatherDataType) => {
    this.currentWeathers.push(weather);
  };

  addWeekWeather = (weather: WeekWeatherDataType) => {
    this.weekWeathers.push(weather);
  };

  deleteCurrentWeather = (id: number) => {
    this.currentWeathers = this.currentWeathers.filter(
      weather => weather.id !== id
    );
  };

  deleteWeekWeather = (id: number) => {
    this.weekWeathers = this.weekWeathers.filter(
      weather => weather.city.id !== id
    );
  };
}

const weatherStore = new Weather();

export default weatherStore;
