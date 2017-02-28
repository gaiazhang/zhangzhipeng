var ip = require('ip')
var port = 4040

module.exports = {
  ip: ip.address(),
  port: port
}
