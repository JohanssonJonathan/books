const getDateString = (date?: string) => {
  const currentDate = date ? new Date(date) : new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const monthString = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const dayString = currentDay < 10 ? `0${currentDay}` : currentDay;

  return `${currentDate.getFullYear()}-${monthString}-${dayString}`;
};

export default getDateString;
