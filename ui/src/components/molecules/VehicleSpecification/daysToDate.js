import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

const daysToDate = date => {
  return differenceInCalendarDays(new Date(date), new Date());
};

export default daysToDate;
