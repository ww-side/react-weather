import axios from 'axios';

class WeatherService {
  async getCurrentCityWeather(lat: number, lon: number) {
    try {
      return await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
        )
        .then(res => res.data);
    } catch (err: any) {
      console.log(err);
    }
  }

  async getWeekCityWeather(lat: number, lon: number) {
    try {
      return await axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
        )
        .then(res => res.data);
    } catch (err: any) {
      console.log(err);
    }
  }
}

const weatherService = new WeatherService();

export default weatherService;
