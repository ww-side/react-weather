import { type FC } from 'react';
import dateformat from 'dateformat';
import { Area, AreaChart } from 'recharts';
import { observer } from 'mobx-react-lite';
import LabelGraph from '../../ui/LabelGraph';
import type { List } from '../../../types/weather';
import weatherStore from '../../../store/weather';
import tempScaleStore from '../../../store/tempScale';

const TemperatureGraph: FC<{
  cityId: number;
}> = observer(({ cityId }) => {
  const { weekWeathers } = weatherStore;
  const { isCelsius, convertTemperature } = tempScaleStore;

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

  const graphFillGradient =
    selectedCity[0].city.country === 'US'
      ? 'url(#lavanderGradient)'
      : 'url(#beigeGradient)';
  const graphStroke =
    selectedCity[0].city.country === 'US' ? '#5B8CFF' : '#FFA25B';

  return (
    <div className="my-5">
      <LabelGraph data={data} dataKey="temperature" />
      <AreaChart width={320} height={50} data={data}>
        <defs>
          <linearGradient id="beigeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFA25B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFF4F4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="lavanderGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5B8CFF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFF4F4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          dataKey="temperature"
          fill={graphFillGradient}
          points={[]}
          stroke={graphStroke}
          type="monotone"
        />
      </AreaChart>
      <LabelGraph data={data} dataKey="date" />
    </div>
  );
});

export default TemperatureGraph;
