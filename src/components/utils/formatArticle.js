import { format } from 'date-fns';

const formattedDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return format(date, 'MMMM d, yyyy');
};

export default formattedDate;
