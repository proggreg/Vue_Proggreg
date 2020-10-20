const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "": {
        target: "http://localhost:4000"
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  outputDir: path.resolve(__dirname, '../proggreg-backend/public'),
  assetsDir: ""
};