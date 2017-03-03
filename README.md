# 📡 wifi-reconnect
Connect or reconnect your Wifi if your connection dies

[![Build Status](https://travis-ci.org/juliomatcom/wifi-reconnect.svg?branch=master)](https://travis-ci.org/juliomatcom/wifi-reconnect)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

### Why ?
Because [Vodafone's](http://www.vodafone.com/) APs are 💩💩💩 and I got tired to restart by hand my wireless connection 😤

## Install
`$ npm install wifi-reconnect -g`

## Usage
`$ wifi-reconnect <SSID> -p <password>`   

![gif](example.gif)   

Once connected to `SSID` **it will monitor and reconnect your connection** every time you loose connectivity with host (`ping` default: google.com) in more than *n* attempts (default: 30).  

```
$ wifi-reconnect --help

Options
  --password, -p  Access password
  --attempts, -a  (30) Max attempts with package lost allowed
  --host, -h      (google.com) Set host to test against
  --help          Display this help

Example
  $ node cli.js livingRoomWifi -p passwordHere
```


MIT © [Julio Cesar Martin](https://twitter.com/juliomatcom)
