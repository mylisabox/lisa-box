# L.I.S.A.

[![Gitter][gitter-image]][gitter-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Follow @mylisabox on Twitter][twitter-image]][twitter-url]

Home automation system L.I.S.A. http://mylisabox.com

WORK IN PROGRESS

## Development
To run the project you need to do multiple things:

### 1) Retrieve the project
- `git clone https://github.com/mylisabox/lisa-box.git` 
- `yarn //or npm i`
- For some functionality L.I.S.A. need some linux module already installed, please check [install.sh](https://github.com/mylisabox/lisa-box/blob/master/scripts/install.sh) and install what's missing for you

### 2) Initialize plugins
 For now no UI or way to install plugins, you have to do it manually, for that clone or copy plugins project you want 
 under `/plugins`, if plugins need dependencies don't `forget to yarn/npm them.
 
 After that you need to enable plugins on database in order to them to be loaded, you have an example on 
 `config/bootstrap.js` on how to do this (at the bottom, the commented part).
  
### 3) Setup voice recognition
Voice recognition work in 2 phases thanks to the [sonus](https://github.com/evancohen/sonus) module:
- First offline recognition of the hotwords "Hey lisa", nothing to do here it should work
- Then the next part use Google Speech API to recognize the voice command, Google API need a config file to work. 
 This file should be under `/config/speech/LISA-gfile.json`, to create this file please follow 
 [those steps](https://cloud.google.com/speech/docs/getting-started) and copy/paste/rename the file in the correct place.

### 4) Run the project
- `yarn start //npm start //node index.js`

## Notification
There multiple template available for notifications. Here there are : 

- Basic with left image, title and message
- Basic with right button 
- Basic with two right button 

## Contributing
We love contributions! Please see our [Contribution Guide](https://github.com/mylisabox/lisa-box/blob/master/.github/CONTRIBUTING.md)
for more information.

## License
[GPL-3.0](https://github.com/mylisabox/lisa-box/blob/master/LICENSE)


[snyk-image]: https://snyk.io/test/github/mylisabox/lisa-box/badge.svg
[snyk-url]: https://snyk.io/test/github/mylisabox/lisa-box/
[npm-image]: https://img.shields.io/npm/v/lisa-box.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lisa-box
[ci-image]: https://img.shields.io/travis/mylisabox/lisa-box.svg?style=flat-square&label=Linux%20/%20OSX
[ci-url]: https://travis-ci.org/mylisabox/lisa-box
[npm-download]: https://img.shields.io/npm/dt/lisa-box.svg
[codeclimate-image]: https://img.shields.io/codeclimate/github/mylisabox/lisa-box.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/mylisabox/lisa-box
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/mylisabox/Lobby
[daviddm-image]: http://img.shields.io/david/mylisabox/lisa-box.svg?style=flat-square
[daviddm-url]: https://david-dm.org/mylisabox/lisa-box
[twitter-image]: https://img.shields.io/twitter/follow/mylisabox.svg?style=social
[twitter-url]: https://twitter.com/mylisabox
