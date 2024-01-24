import axios from 'axios';

class WeatherService {
  async getCityWeather(lat: number, lon: number) {
    try {
      return await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8a8db88bf9636c42b1fd0e47cb65b225`
        )
        .then(res => res.data);
    } catch (err: any) {
      console.log(err);
    }
  }
}

const weatherService = new WeatherService();

export default weatherService;
