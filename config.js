const { existsSync, readFileSync } = require('fs')
const { resolve } = require('path')

// default config
const defaults = {
  webpack: require('./webpack.config'),
}

// convenient argv
let options = require('minimist')(process.argv.slice(2))

// ignore argv if config file is here or provided
if (existsSync(resolve(process.env.PWD, '.whiteroomrc')))
  options = require(resolve(process.env.PWD, '.whiteroomrc'))
else if (!!options.config)
  options = require(resolve(process.env.PWD, options.config))

const { entrypoint, host, port } = options

if (!!entrypoint)
  defaults.webpack.entry.experiments = resolve(process.env.PWD, entrypoint)

if (!!host)
  defaults.webpack.devServer.host = host

if (!!port)
  defaults.webpack.devServer.port = parseInt(port)

module.exports = {
  ...defaults,
  ...options,
}
