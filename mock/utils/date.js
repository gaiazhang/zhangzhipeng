
/**
 * 获取date对象
 * @param  {number | string} dateStr 形式日期
 * @return {Date}         日期对象
 */
const getDate = function (dateStr) {
  if (typeof dateStr === 'object') {
    return dateStr
  }
  if (typeof dateStr === 'number') {
    return new Date(dateStr)
  }
  dateStr = dateStr.replace(/(\d+)[^\d]+(\d+)[^\d]+(\d+)[^\d]*(.*)/, function () {
    var year = arguments[1]
    var month = arguments[2]
    var day = arguments[3]
    var others = arguments[4]
    if (others) {
      others = ' ' + others
    }
    return year + '/' + month + '/' + day + others
  })

  return new Date(dateStr)
}

/**
 * 获取Date格式化
 * @param  {object} date 日期对象
 * @param  {string} fmt  格式化
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 * @return {string}      格式化后的日期对象
 */
const getDateFormat = function (date, fmt) {
  if (typeof date !== 'object' && !date.getTime) {
    return date
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  var hexToDec = function (str) {
    str = str.replace(/\\/g, '%')
    return unescape(str)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return hexToDec(fmt)
}

module.exports = {
  getDate: getDate,
  getDateFormat: getDateFormat
}
