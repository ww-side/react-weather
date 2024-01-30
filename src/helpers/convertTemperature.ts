export const convertTemperature = (temp: number, toCelsius: boolean) => {
  if (toCelsius) {
    return (temp - 273.15).toFixed(0).toString();
  } else {
    return ((temp - 273.15) * (9 / 5) + 32).toFixed(0).toString();
  }
};
