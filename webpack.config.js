const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith('.pug'))

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    }, 
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                browsers: 'last 3 versions',
                autoprefixer: {grid: true},
              }
            ]
          ]
        }
      }
    }
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const babelOptions = preset => {
  const opts = {
    presets: [
      ['@babel/preset-env', 
        {
        useBuiltIns: 'usage',
        corejs: 3
        }
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions()
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  const base = [
    ...PAGES.map(page => new HTMLWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      inject: 'body',
      minify: {
        collapseWhitespace: isProd
      }
    })),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/${filename('css')}`
    }),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: `${PATHS.src}/${PATHS.assets}`,
        //   to: `${PATHS.assets}img`
        // },
        {
          from: `${PATHS.src}/static`,
          to: `${PATHS.dist}/static`
        },
        // {
        //   from: `${PATHS.src}/${PATHS.assets}/fonts`,
        //   to: `${PATHS.assets}fonts`
        // },
      ]
    })
  ]

  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: `${PATHS.src}/js/index.js`
  },
  output: {
    filename: `${PATHS.assets}js/${filename('js')}`,
    path: PATHS.dist
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  target: 'web',
  devServer: {
    port: 8081,
    hot: isDev,
    watchContentBase: true,
    index: 'colors-type.html'
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}img/[name][ext]`
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}fonts/[name][ext]`
        }
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      },
    ]
  }
}