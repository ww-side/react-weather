import { type FC } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../ui/Dropdown';

const LanguageSwitch: FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: 'en', label: 'EN' },
    { value: 'uk', label: 'UA' },
    { value: 'he', label: 'HE' },
  ];

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      <TfiWorld size={14} color="#AFAFAF" />
      <Dropdown options={languages} onChange={handleChangeLanguage} />
    </div>
  );
};

export default LanguageSwitch;
