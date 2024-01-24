import { ChangeEvent, type FC } from 'react';

const Input: FC<{
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="bg-white rounded shadow outline-none px-1 py-2 w-[569px]"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
