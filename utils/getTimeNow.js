const moment = require('moment-timezone');

const addZero = (number) => (number > 9 ? number : '0' + number);

const getTimeNow = () => {
  const mexicanDate = moment
    .tz(Date.now(), 'America/Mexico_City')
    .format();
  const date = new Date(mexicanDate);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

module.exports = getTimeNow;
