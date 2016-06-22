const path = require('path')
const express = require('express')
const cors = require('cors');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
module.exports = {
    app: function() {
        const app = express()
        const indexPath = path.join(__dirname, 'index.html')
        const publicPath = express.static(path.join(__dirname, 'assets'))
        app.use(cors());
        app.use('/', express.static(__dirname))
        app.get('/', function(_, res) { res.sendFile(indexPath) })

        return app
    }
}
