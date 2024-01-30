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
    <div className="flex justify-between px-2.5">
      {data.map(item => (
        <span className="text-light-gray text-[12px]" key={uuid()}>
          {item[dataKey]}
        </span>
      ))}
    </div>
  );
};

export default LabelGraph;
