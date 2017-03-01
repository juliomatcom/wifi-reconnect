/* eslint-env mocha */
'use strict'
const assert = require('assert')
const getWirelessInterface = require('../lib/util.js').getWirelessInterface
const monitoring = require('../lib/monitor.js')

describe('util.js', function () {
  describe('#getWirelessInterface()', function () {
    it('should return an interface', function () {
      const ifconfigStatusMock = [
        {
          interface: 'eth0',
          link: 'ethernet',
          address: 'b8:27:eb:da:52:ad',
          ipv4_address: '192.168.1.2',
          ipv4_broadcast: '192.168.1.255',
          ipv4_subnet_mask: '255.255.255.0',
          up: true,
          broadcast: true,
          running: true,
          multicast: true
        },
        {
          interface: 'lo',
          link: 'local',
          ipv4_address: '127.0.0.1',
          ipv4_subnet_mask: '255.0.0.0',
          up: true,
          running: true,
          loopback: true
        }
      ]
      const actual = getWirelessInterface(ifconfigStatusMock)
      const expected = {
        interface: 'eth0',
        link: 'ethernet',
        address: 'b8:27:eb:da:52:ad',
        ipv4_address: '192.168.1.2',
        ipv4_broadcast: '192.168.1.255',
        ipv4_subnet_mask: '255.255.255.0',
        up: true,
        broadcast: true,
        running: true,
        multicast: true
      }

      assert.deepEqual(actual, expected)
    })
  })
})

describe('monitor.js', function () {
  describe('#monitoring()', function () {
    it('should return a function', function () {
      const actual = typeof monitoring({})
      const expected = 'function'
      assert.equal(actual, expected)
    })
  })
})
