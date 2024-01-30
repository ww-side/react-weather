const useWeatherStyles = (country: string) => {
  const isNorthAmerican = country === 'US' || country === 'CA';

  const textColor = isNorthAmerican ? 'text-azure' : 'text-apricot-orange';
  const graphFillGradient = isNorthAmerican
    ? 'url(#lavanderGradient)'
    : 'url(#beigeGradient)';

  return {
    textColor,
    graphFillGradient,
  };
};

export default useWeatherStyles;
