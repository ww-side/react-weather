export const convertTemperature = (temp: number, toCelsius: boolean) => {
  if (toCelsius) {
    return Math.round(temp - 273.15).toString();
  } else {
    return Math.round((temp - 273.15) * (9 / 5) + 32).toString();
  }
};
