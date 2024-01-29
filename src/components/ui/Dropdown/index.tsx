import { type FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type Options = {
  value: string;
  label: string;
};

const Dropdown: FC<{
  options: Options[];
  onChange: (value: string) => void;
}> = ({ options, onChange }) => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (code: string) => {
    onChange(code);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="cursor-pointer text-light-gray mr-5"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {options.find(lang => lang.value === i18n.resolvedLanguage)?.label}
      </div>
      {isDropdownOpen && (
        <div className="absolute mt-2 right-2 bg-white rounded-md shadow">
          {options.map(lang => (
            <div
              className="cursor-pointer py-1 px-5 hover:bg-gray-100"
              key={lang.value}
              onClick={() => handleChange(lang.value)}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
