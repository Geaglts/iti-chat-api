const moment = require('moment-timezone');

function getTimeNow() {
  moment.tz.setDefault('America/Mexico_City');
  return {
    hour: moment().format('HH:mm:ss:SSSS'),
    date: moment().format('L'),
  };
}

module.exports = getTimeNow;
