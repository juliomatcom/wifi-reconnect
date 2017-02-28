#!/usr/bin/env node
'use strict'
const meow = require('meow')
const ifconfig = require('wireless-tools/ifconfig')
const getWirelessInterface = require('./lib/util.js').getWirelessInterface

const cli = meow(`
    Usage
      $ wifi-reconnect <SSID>

    Options
      --password, -p  Access password
      --seconds, -s   Max seconds with package lost allowed
      --help          Display this help

    Example
      $ wifi-reconnect livingRoom -p passwordHere
`, {
    alias: {
        p: 'password',
        s: 'seconds'
    }
})


const opts = {
  essid: cli.input[0],
  password: cli.flags.password || undefined,
  seconds: cli.flags.seconds
}

if (opts.essid) {
  const monitoring = require('./lib/monitor')(opts)

  getInterfaces()
    .then(getWirelessInterface)
    .then(monitoring)
    .catch(console.log)
} else {
  console.log('Please provide a valid SSID to connect with, more info in --help')
}

function getInterfaces () {
  return new Promise(function (resolve, reject) {
    ifconfig.status(function(err, status) {
      if (err) {
        reject(err)
      }
      resolve(status)
    })
  })
}
