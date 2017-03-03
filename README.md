# wifi-reconnect :: WIP
📡 Connect or reconnect your Wifi if your connection dies

[![Build Status](https://travis-ci.org/juliomatcom/wifi-reconnect.svg?branch=master)](https://travis-ci.org/juliomatcom/wifi-reconnect)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

### Why ?
Because [Vodafone's](https://www.google.es/url?sa=t&rct=j&q=&esrc=s&source=web&cd=29&cad=rja&uact=8&ved=0ahUKEwiFx4PR7LrSAhVBWhoKHbd2Bb0Q-TAIgAIoADAc&url=http%3A%2F%2Fwww.vodafone.com%2F&usg=AFQjCNHQlwH-hCrMCRE-SFgSnl6pKSMrcw&sig2=3H4bpNhBmg7QIDCaD9YFag) APs are 💩💩💩 and I got tired to restart by hand my wireless connection 😤

## Usage
`$ node cli.js --help`

```
Usage
  $ node cli.js <SSID>

Options
  --password, -p  Access password
  --attempts, -a  (30) Max attempts with package lost allowed
  --host, -h      (google.com) Set host to test against
  --help          Display this help

Example
  $ node cli.js livingRoomWifi -p passwordHere
```


MIT © [Julio Cesar Martin](https://twitter.com/juliomatcom)
