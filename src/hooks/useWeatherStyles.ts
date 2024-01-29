const useWeatherStyles = (country: string) => {
  const isNorthAmerican = country === 'US' || country === 'CA';

  const textColor = isNorthAmerican ? 'text-azure' : 'text-apricot-orange';
  const graphFillGradient = isNorthAmerican
    ? 'url(#lavanderGradient)'
    : 'url(#beigeGradient)';
  const graphStroke = isNorthAmerican ? '#5B8CFF' : '#FFA25B';

  return {
    textColor,
    graphFillGradient,
    graphStroke,
  };
};

export default useWeatherStyles;
