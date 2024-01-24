import cx from 'classnames';
import { type FC, type ReactNode } from 'react';

const Button: FC<{
  children: ReactNode;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, type, onClick, disabled }) => {
  const buttonClasses = cx(
    'bg-azure hover:bg-azure-light transition ease-in-out duration-300 w-[112px] h-[40px] font-light text-white shadow rounded flex justify-center items-center',
    { 'cursor-not-allowed': disabled }
  );

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
