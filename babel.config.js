module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.js', '.jsx'],
        cwd: 'babelrc',
        alias: {
          'mark-format': './mark-format'
        }
      }
    ]
  ]
};