export const convertToReadableDate = (UnixTimestamp: number) => {
  const a = new Date(UnixTimestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const displayMin = min < 10 ? `0${min}` : min;
  const time = `${date} ${month} ${year} at ${hour}:${displayMin}`;
  return time;
};

export const dayLookup = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const monthLookup = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// eslint-disable-next-line no-undef
const lengthOfMonthLookup: Record<string, number> = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

export const getLengthOfMonth = (year: number, month: number) => {
  if (month === 1 && year % 4 === 0) {
    return 29;
  }
  return lengthOfMonthLookup[monthLookup[month]];
};

export const getFirstDayOfMonth = (month: number, year: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay() - 1;
  if (firstDayOfMonth === -1) {
    return 6;
  }
  return firstDayOfMonth;
};

export const toUnix = (date: Date) => Math.floor(date.getTime() / 1000);
