import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const config: webpack.Configuration = {
  entry: [path.join(__dirname, './packages/client/src/index.tsx')],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '.build'),
    clean: {
      dry: true,
    },
  },
  stats: {
    all: false,
    entrypoints: true,
    modules: true,
    reasons: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './packages/client/src/index.html'),
    }),
    !isProduction &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
  ].filter(Boolean) as webpack.Configuration['plugins'],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'babel-loader',
        options: {
          cwd: '../../',
          plugins: [!isProduction && require.resolve('react-refresh/babel')].filter(Boolean),
        },
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      client: path.join(__dirname, './packages/client/src'),
      server: path.join(__dirname, './packages/server/src'),
    },
  },
}

export default () => {
  if (isProduction) {
    config.mode = 'production'

    if (Array.isArray(config.entry)) {
      config.entry.unshift(require.resolve('core-js/stable'), require.resolve('regenerator-runtime/runtime'))
    }

    if (Array.isArray(config.plugins)) {
      config.plugins.push(new MiniCssExtractPlugin())
    }
  } else {
    config.mode = 'development'
  }

  return config
}
