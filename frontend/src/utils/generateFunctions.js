import {Dimensions} from 'react-native';

export function getHeightAndWidth() {
  const {height, width} = Dimensions.get('window');
  const hp = height / 100;
  const wp = width / 100;
  return {hp, wp};
}

export function generateId() {
  const newId =
    Math.random().toString(36).substring(2, 9) + Date.now().toString();
  return newId;
}
export function getDateInDDMMYY(date) {
  const currentDate = new Date(date);
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();

  const dateInDdmmyy = `${day}-${month}-${year}`;
  return dateInDdmmyy;
}
export function getWeekStartAndEnd() {
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const dayOfWeek = currentDate.getDay();

  const firstDayOfWeek = dayOfMonth - ((dayOfWeek + 6) % 7);
  const endDayOfWeek = firstDayOfWeek + 6;

  const startOfWeek = new Date(currentDate.setDate(firstDayOfWeek));
  const endOfWeek = new Date(currentDate.setDate(endDayOfWeek));

  return {
    startOfWeek,
    endOfWeek,
  };
}

export function getDatesBetween(startDate, endDate) {
  const dates = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const dateInDdmmyy = getDateInDDMMYY(currentDate);
    dates.push(dateInDdmmyy);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
