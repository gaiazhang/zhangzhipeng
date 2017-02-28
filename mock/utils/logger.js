
const winston = require('winston')
const dateUtil = require('./date')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function () {
        return dateUtil.getDateFormat(new Date(), 'yyyy.MM.dd HH:mm:ss')
      },
      formatter: function (options) {
        // Return string will be passed to logger.
        return (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
      }
    })
  ]
})

module.exports = logger
