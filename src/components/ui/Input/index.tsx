import { ChangeEvent, type FC, useState, useRef, useEffect } from 'react';

const Input: FC<{
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoCompleteValues: string[];
}> = ({ placeholder, value, onChange, autoCompleteValues }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    const filteredSuggestions = autoCompleteValues.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setIsOpen(filteredSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange({
      target: { value: suggestion },
    } as ChangeEvent<HTMLInputElement>);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={inputRef}>
      <input
        className="bg-white rounded shadow outline-none px-1 py-2 w-[569px]"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow rounded w-[569px] mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer px-2 py-1 hover:bg-[#F2F2F2]"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Input;
