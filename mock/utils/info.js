
var logger = require('./logger')
const chalk = require('chalk')

const consoleInfo = function consoleInfo (fn) {
  return function * () {
    consoleRequest(this) //请求发送方式
    fn.bind(this)()
    consoleResponse(this, true) // false -  true 是否显示请求返回结果
  }
}

const consoleRequest = function consoleRequest (that) {
  var url = that.url && that.url.split('?')[0]
  var method = that.method
  var params = that.query || that.request.body

  logger.info(chalk.yellow('[' + method + ']'), chalk.magenta(url), params)
}
const consoleResponse = function consoleResponse (that, isHidden) {
  if (!isHidden) {
    logger.info(chalk.blue('[RESPONSE]'), that.body)
  }
}

module.exports = consoleInfo
