# 📡 wifi-reconnect
Connect or reconnect your Wifi if your connection dies

[![Build Status](https://travis-ci.org/juliomatcom/wifi-reconnect.svg?branch=master)](https://travis-ci.org/juliomatcom/wifi-reconnect)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

### Why ?
Because [Vodafone's](http://www.vodafone.com/) APs are 💩💩💩 and I got tired to restart by hand my wireless connection 😤

## Install
`$ npm i wifi-reconnect -g`
## Usage
`$ wifi-reconnect --help`

```
Usage
  $ wifi-reconnect <SSID>

Options
  --password, -p  Access password
  --attempts, -a  (30) Max attempts with package lost allowed
  --host, -h      (google.com) Set host to test against
  --help          Display this help

Example
  $ node cli.js livingRoomWifi -p passwordHere
```


MIT © [Julio Cesar Martin](https://twitter.com/juliomatcom)
