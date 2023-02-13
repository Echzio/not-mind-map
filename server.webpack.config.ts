import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

const isProduction = process.env.NODE_ENV === 'production'

const config: webpack.Configuration = {
  entry: [path.join(__dirname, './packages/server/src/index.ts')],
  target: 'node',
  output: {
    path: path.resolve(__dirname, '.build'),
    filename: 'server.bundle.js',
    clean: {
      dry: true,
    },
  },
  context: path.resolve(__dirname, './packages/server/src'),
  externals: [nodeExternals()],
  resolve: {
    modules: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, './packages/server/src')],
    extensions: ['.ts', '.js'],
    alias: {
      client: path.join(__dirname, './packages/client/src'),
      server: path.join(__dirname, './packages/server/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cwd: '../../',
            },
          },
        ],
      },
    ],
  },
}

export default () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
    config.watch = true
    config.watchOptions = {
      poll: 1000,
    }
  }

  return config
}
