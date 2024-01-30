import { type FC } from 'react';
import dateformat from 'dateformat';
import { Area, AreaChart } from 'recharts';
import { observer } from 'mobx-react-lite';
import LabelGraph from '../../ui/LabelGraph';
import useWeatherStyles from '../../../hooks/useWeatherStyles';
import { convertTemperature } from '../../../helpers/convertTemperature';
import weatherStore from '../../../store/weather';
import type { List } from '../../../types/weather';

const TemperatureGraph: FC<{
  cityId: number;
  isCelsius: boolean;
}> = observer(({ cityId, isCelsius }) => {
  const { weekWeathers } = weatherStore;

  const filterListByTime = (list: List[], targetTime: string) => {
    const filteredList = list.filter(
      item => item.dt_txt.split(' ')[1] === targetTime
    );

    return filteredList.map(item => ({
      date: dateformat(item.dt_txt.split(' ')[0], 'dd.mm'),
      temperature: isCelsius
        ? convertTemperature(item.main.temp, true)
        : convertTemperature(item.main.temp, false),
    }));
  };

  const selectedCity = weekWeathers.filter(item => item.city.id === cityId);

  const data = filterListByTime(
    selectedCity[0].list,
    selectedCity[0].list[0].dt_txt.split(' ')[1]
  );

  const { graphFillGradient } = useWeatherStyles(selectedCity[0].city.country);

  return (
    <div className="my-5">
      <LabelGraph data={data} dataKey="temperature" />
      <AreaChart width={320} height={60} data={data}>
        <defs>
          <linearGradient id="beigeGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFA25B" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#FFF4F4" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="lavanderGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#5B8CFF" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#FFF4F4" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <Area
          dataKey="temperature"
          fill={graphFillGradient}
          stroke="transparent"
          type="monotone"
        />
      </AreaChart>
      <LabelGraph data={data} dataKey="date" />
    </div>
  );
});

export default TemperatureGraph;
