const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event; // get the npm life-cycle-event such as `npm run build` result: TARGET = 'build'
const PATHS = {
  src_dir: __dirname + '/src',
  bower_dir: __dirname + '/bower_components'
}
const HTML_GENERATOR_OPTIONS = {
    title: "ReactAppBasic",
    template: "./src/app/index.ejs", // custom template
    inject: 'body', // inject all scripts tag to body
    favicon: './public/favicon.ico'
}

// set BABEL_ENV environment = npm life-cycle-event
process.env.BABEL_ENV = TARGET;

var config = {
  resolve: {
    alias: {
      animateCss: PATHS.bower_dir + '/animate.css/animate.min.css',
      fontAwesome: PATHS.bower_dir + '/font-awesome/css/font-awesome.min.css',
      jquery: PATHS.bower_dir + '/jquery/dist/jquery.min.js',
      hammerjs: PATHS.bower_dir + '/materialize/js/hammer.min.js',
      materialCss: PATHS.bower_dir + '/materialize/dist/css/materialize.min.css',
      materialJs: PATHS.bower_dir + '/materialize/dist/js/materialize.min.js',
      mainStyle: PATHS.src_dir + '/styles/main.scss'
    },
    extensions: ['','.js','.jsx']
  },

  // seperate the entry point to multiple points for eacy chunking of the code
  // seperate the application code and vendor code
  entry: {
    app: ['./src'],
    vendors: [ 'react', 'react-dom', 'jquery', 'hammerjs', 'materialJs' ]
  },

  // Output
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: "js/[name].bundle.min.js" // produce: app.bundle.js and vendors.bundle.js
  },

  plugins: [
    // inject globals
    new webpack.ProvidePlugin({ jQuery: 'jquery', 'window.jQuery': 'jquery', '$': 'jquery', 'window.$': 'jquery' }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.bundle.js', Infinity),
    new HtmlWebpackPlugin(HTML_GENERATOR_OPTIONS)
  ],

  // modules
  module: {
    loaders: [
      //{ test: /\.jsx$/, loader: 'react-hot', include: PATHS.src_dir },
      { test: /\.js$/, loader: 'babel', include: PATHS.src_dir },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=1000&name=images/img_[hash].[ext]', include: PATHS.img_dir},
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: PATHS.src_dir },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/font_[hash].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/font_[hash].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?&name=fonts/font_[hash].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/font_[hash].[ext]' }
    ]
  }
}

if(TARGET === 'dev' || !TARGET){
  module.exports = merge(config, {
    resolve: {
      alias: {
        config: PATHS.src_dir + '/app/_app-config.dev.js'
      }
    }
  })
}

if(TARGET === 'build') {
  module.exports = merge(config, {
    resolve: {
      alias: {
        config: PATHS.src_dir + '/app/_app-config.prod.js'
      }
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  })
}
