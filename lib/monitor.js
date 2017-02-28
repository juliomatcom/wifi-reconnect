'use strict'
const WiFiControl = require('wifi-control')
const tcpp = require('tcp-ping')
const address = 'google.com'
const retryInterval = 1000
let maxSecondsLost = 10

function init (device) {
  console.log(`Using ${device.interface}`)

  //  Initialize wifi-control package with verbose output
  WiFiControl.init({
    debug: true,
    iface: device.interface
  })
}

function monitoring (opts) {
  return function (device) {
    init(device)

    if (opts.seconds) {
      console.log(`Setting max seconds with package lost to ${opts.seconds}`)
      maxSecondsLost = opts.seconds
    }
    const _ap = {
      ssid: opts.essid,
      password: opts.password
    }

    connectToAP(_ap)
      .then(watch)
      .catch(console.log)

    function watch (response) {
      console.log(response.msg)
      console.log('Watching...')

      let total = 0
      let reconnecting = false

      setInterval(probeAddress, retryInterval)

      function probeAddress () {
        tcpp.probe(address, 80, callback)

        function callback (err, available) {
          if (err) {
            console.log(`Error: ${address}:80`)
            throw err
          }
          if (!available) {
            total++
            console.log(`Connection to ${address} not available - ${total}s`)

            // After maxSecondsLost seconds reconnect
            if (total >= maxSecondsLost && !reconnecting) {
              console.log('Reconnecting...')
              reconnecting = true

              connectToAP(_ap)
                .then(reset)
                .catch(resetError)

              function reset () {
                total = 0
                reconnecting = false
              }

              function resetError (err) {
                console.log(err)
                reset()
              }
            }
          } else {
            total = 0
          }
        }
      }
    }
  }
}

function connectToAP (_ap) {
  return new Promise(function (resolve, reject) {
    WiFiControl.connectToAP( _ap, function(err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

module.exports = monitoring
