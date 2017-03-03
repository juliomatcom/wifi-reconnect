#!/usr/bin/env node
'use strict'
const meow = require('meow')
const ifconfig = require('wireless-tools/ifconfig')
const chalk = require('chalk')
const log = console.log
const error = str => log(chalk.red(str))
const getWirelessInterface = require('./lib/util.js').getWirelessInterface
const logo = '📡 wifi-reconnect'

const cli = meow(
`
    Usage
      $ wifi-reconnect <SSID>

    Options
      --password, -p  Access password
      --attempts, -a  Max attempts with package lost allowed
      --host, -h     Set host to test against
      --help          Display this help

    Example
      $ wifi-reconnect livingRoomWifi -p passwordHere
`, {
  alias: {
    p: 'password',
    a: 'attempts',
    h: 'host'
  }
})

const opts = {
  essid: cli.input[0],
  host: cli.flags.host,
  password: cli.flags.password || undefined,
  attempts: cli.flags.attempts
}

if (opts.essid) {
  log(chalk.bold(logo))
  const monitoring = require('./lib/monitor')(opts)

  getInterfaces()
    .then(getWirelessInterface)
    .then(monitoring)
    .catch(error)
} else {
  log('Please provide a valid SSID to connect with, more info in --help')
}

function getInterfaces () {
  return new Promise(function (resolve, reject) {
    ifconfig.status(function (err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}
