const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'assets'))

    app.use('/', express.static(__dirname))
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}