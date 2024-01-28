import { type FC } from 'react';
import { v4 as uuid } from 'uuid';

type ListDataType = {
  date: string;
  temperature: string;
  [key: string]: string;
};

const LabelGraph: FC<{ data: ListDataType[]; dataKey: string }> = ({
  data,
  dataKey,
}) => {
  return (
    <div className="flex justify-between">
      {data.map(item => (
        <span className="text-light-gray text-sm" key={uuid()}>
          {item[dataKey]}
        </span>
      ))}
    </div>
  );
};

export default LabelGraph;
