const colors = [
  "#E57373", // Red
  "#FFB74D", // Orange
  "#FFF176", // Yellow
  "#81C784", // Green
  "#64B5F6", // Blue
  "#F06292", // Pink
  "#9575CD", // Purple
  "#BA68C8", // Lavender
  "#FFD54F", // Amber
  "#4FC3F7", // Sky Blue
  "#4DB6AC", // Teal
  "#AED581", // Lime
  "#FFD600", // Lemon
  "#90A4AE", // Gray
  "#FF8A65", // Rose
  "#FFCC80", // Cream
  "#FF7043", // Peach
  "#F06292", // Lavender Blush
  "#7986CB", // Periwinkle
  "#4DD0E1", // Aqua
];

 function generateId() {
  const newId =
    Math.random().toString(36).substring(2, 9) + Date.now().toString();
  return newId;
}
 function getDateInDDMMYY(currentDate) {
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  const dateInDdmmyy = `${day}-${month}-${year}`;
  return dateInDdmmyy;
}
 function getWeekStartAndEnd() {
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
 function getDatesBetween(startDate, endDate) {
  const dates = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const dateInDdmmyy = getDateInDDMMYY(currentDate);
    dates.push(dateInDdmmyy);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
 function getAllYear() {
  const currentYear = new Date().getFullYear();
  let startDate = new Date(currentYear, 0, 1); // January 1st of the current year
  const result = [];

  // Ensure we start on Monday, adjusting to include January 1st
  let dayOfWeek = startDate.getDay();
  if (dayOfWeek !== 1) {
    startDate.setDate(
      startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );
  }

  for (let i = 0; i < 4; i++) {
    const setStart = new Date(startDate);

    // Move to the end of the 12th week
    const setEnd = new Date(setStart);
    setEnd.setDate(setEnd.getDate() + (12 * 7 - 1)); // 12 weeks * 7 days/week - 1 day

    // Break week
    const breakWeekStart = new Date(setEnd);
    breakWeekStart.setDate(breakWeekStart.getDate() + 1); // The day after the end of the 12th week
    const breakWeekEnd = new Date(breakWeekStart);
    breakWeekEnd.setDate(breakWeekEnd.getDate() + 6); // One week later

    result.push({
      yearNumber: i + 1,
      type: 'year',
      startDate: setStart,
      endDate: setEnd,
      formatStartDate: getDateInDDMMYY(setStart),
      formatEndDate: getDateInDDMMYY(setEnd),
      color: colors[i],
    });

    result.push({
      yearNumber: 0,
      type: 'break',
      startDate: breakWeekStart,
      endDate: breakWeekEnd,
      formatStartDate: getDateInDDMMYY(breakWeekStart),
      formatEndDate: getDateInDDMMYY(breakWeekEnd),
      color: colors[6],
    });

    // Move to the next week after the break
    startDate = new Date(breakWeekEnd);
    startDate.setDate(startDate.getDate() + 1);
  }

  return result;
}
 function generate12Weeks(start) {
  const current = new Date(start);
  const result = [];
  // Adjust start date to the nearest preceding Monday
  let dayOfWeek = current.getDay();
  if (dayOfWeek !== 1) {
    // If it's not Monday
    current.setDate(current.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  }

  for (let i = 0; i < 12; i++) {
    const newStart = new Date(current); // Store the current start date
    current.setDate(current.getDate() + 6); // Move to the end of the week

    result.push({
      month: `${i + 1} Month`,
      startWeek: newStart,
      endWeek: current,
      formatStartDate: getDateInDDMMYY(newStart),
      formatEndDate: getDateInDDMMYY(current),
      color: colors[i],
    });

    // Move to the start of the next week
    current.setDate(current.getDate() + 1);
  }

  return result;
}

module.exports = {
  generate12Weeks,
  generate12Weeks,
  getDateInDDMMYY,
  getWeekStartAndEnd,
  getDatesBetween,
  getAllYear,
};
