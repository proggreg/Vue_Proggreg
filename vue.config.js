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
  outputDir: path.resolve(__dirname, '../proggreg-backend/public'),
  assetsDir: ""
};