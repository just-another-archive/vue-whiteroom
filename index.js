const { resolve } = require('path')
const Webpack = require('webpack')
const Server = require('webpack-dev-server')

module.exports = ({ entrypoint, host, port }) => {
  const config = require('./webpack.config')

  if (!!entrypoint)
    config.entry.experiments = resolve(process.env.PWD, entrypoint)

  if (!!host)
    config.devServer.host = host

  if (!!port)
    config.devServer.port = parseInt(port)

  Server.addDevServerEntrypoints(config, config.devServer)

  const compiler = Webpack(config);

  const server = new Server(compiler, config.devServer);

  server.listen(
    config.devServer.port, config.devServer.host,
    () => {
    console.log(`Starting server on http://${config.devServer.host}:${config.devServer.port}`);
  });
}
