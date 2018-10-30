const config = require('./config')

const Webpack = require('webpack')
const Server = require('webpack-dev-server')
Server.addDevServerEntrypoints(config.webpack, config.webpack.devServer)

const compiler = Webpack(config.webpack);

const server = new Server(compiler, config.webpack.devServer);

server.listen(
  config.webpack.devServer.port, config.webpack.devServer.host,
  () => {
  console.log(`Starting server on http://${config.webpack.devServer.host}:${config.webpack.devServer.port}`);
});
