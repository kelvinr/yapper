module.exports = {
  entry: ['./client/main.jsx'],
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: []
};
