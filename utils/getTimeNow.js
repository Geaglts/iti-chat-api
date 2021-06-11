const moment = require('moment-timezone');

moment.tz.setDefault('America/Mexico_City');

module.exports = {
  hour: moment().format('LT'),
  date: moment().format('L'),
};
