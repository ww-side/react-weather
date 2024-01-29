import { useTranslation } from 'react-i18next';
import dateformat from 'dateformat';

export const useFormattedDateTime = (date: Date) => {
  const weekDay = dateformat(date, 'ddd');
  const day = dateformat(date, 'd');
  const month = dateformat(date, 'mmmm');
  const time = dateformat(date, 'HH:MM');

  const { t } = useTranslation();

  return `${t(`days.${weekDay}`, weekDay)}, ${day} ${t(
    `months.${month}`,
    month
  )}, ${time}`;
};
