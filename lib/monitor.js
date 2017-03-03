'use strict'
const WiFiControl = require('wifi-control')
const tcpp = require('tcp-ping')
const chalk = require('chalk')
const log = console.log
const error = str => log(chalk.red(str))
const retryInterval = 1000
let attempts = 30
let host = 'google.com'

function init (device) {
  log(chalk.green(`Using ${device.interface}`))

  //  Initialize wifi-control package with verbose output
  WiFiControl.init({
    debug: true,
    iface: device.interface
  })
}

function configure (opts) {
  if (opts.attempts) {
    log(` - Setting max attempts to: ${opts.attempts}`)
    attempts = opts.attempts
  }
  if (opts.host) {
    log(` - Setting host to: ${opts.host}`)
    host = opts.host
  }
}

function monitoring (opts) {
  configure(opts)
  return function (device) {
    init(device)

    const _ap = {
      ssid: opts.essid,
      password: opts.password
    }

    connectToAP(_ap)
      .then(watch)
      .catch(error)

    function watch (response) {
      log(chalk.green(response.msg))
      log('Watching...')

      let total = 0
      let reconnecting = false

      setInterval(probeAddress, retryInterval)

      function probeAddress () {
        tcpp.probe(host, 80, callback)

        function callback (err, available) {
          if (err) {
            error(`Error: ${host}:80`)
            throw err
          }
          if (!available) {
            total++
            error(`Connection to ${host} not available # ${total}`)

            // After total attempts reconnect
            if (total >= attempts && !reconnecting) {
              log('Reconnecting...')
              reconnecting = true

              connectToAP(_ap)
                .then(reset)
                .catch(resetError)
            }
          } else {
            total = 0
          }

          function reset (response) {
            total = 0
            reconnecting = false
            log(chalk.green(response.msg))
          }

          function resetError (err) {
            error(err)
            reset()
          }
        }
      }
    }
  }
}

function connectToAP (_ap) {
  return new Promise(function (resolve, reject) {
    WiFiControl.connectToAP(_ap, function (err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

module.exports = monitoring
