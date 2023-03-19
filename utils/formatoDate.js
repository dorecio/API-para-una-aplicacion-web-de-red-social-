const formato = require('date-fns/format');

module.exports = {
    formatoDate: (date) => {
      //  console.log('FORMATO FECHA', formato(date, "MMM do, yyy 'at hh:mm aaaa"));
        return formato(date, "MMM do, yyy 'at hh:mm aaaa");
    }
}