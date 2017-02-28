'use strict'
module.exports = {
  getWirelessInterface: getWirelessInterface
}

function getWirelessInterface (interfaces) {
  const device = interfaces.find((intf) => {
    if (intf.broadcast) {
      return true
    }
  })

  if (!device) {
    throw new Error('No wireless interfaces found')
  }

  return device
}
