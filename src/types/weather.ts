export type WeekWeatherDataType = {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
};

export type CurrentWeatherDataType = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: CurrentSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type List = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: WeekSys;
  dt_txt: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type WeekSys = {
  pod: string;
};

type CurrentSys = {
  country: string;
  sunrise: number;
  sunset: number;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lat: number;
  lon: number;
};
