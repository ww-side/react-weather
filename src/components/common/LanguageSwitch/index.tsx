import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TfiWorld } from 'react-icons/tfi';

const LanguageSwitch: FC = () => {
  const { i18n } = useTranslation();

  const lngs: Record<string, { nativeName: string }> = {
    en: { nativeName: 'EN' },
    ua: { nativeName: 'UA' },
    he: { nativeName: 'HE' },
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 justify-end">
      <TfiWorld size={12} color="#AFAFAF" />
      <select
        className="outline-none bg-white text-[#AFAFAF]"
        value={i18n.resolvedLanguage}
        onChange={e => handleChangeLanguage(e.target.value)}
      >
        {Object.keys(lngs).map((lng: string) => (
          <option className="text-black" key={lng} value={lng}>
            {lngs[lng].nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;
