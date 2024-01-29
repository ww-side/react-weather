export const convertTemperature = (temp: number, toCelsius: boolean) => {
  if (toCelsius) {
    return Math.round(temp - 273.15).toString();
  } else {
    return Math.round(1.8 * (temp - 273) + 32).toString();
  }
};
