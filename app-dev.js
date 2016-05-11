var express = require('express'),
    http = require('http'),
    path = require('path'),
    jade = require('jade'),
    favicon = require('serve-favicon');

var app = module.exports = express();

var mockData = {
    staticBaseUrl: "/static/",
    isDeploy: false
};
app.set('port', 8000);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './src/templates/'));
app.use(favicon(path.join(__dirname,'./src/assets/favicon.ico')));

app.use('/static', express.static(path.join(__dirname, './dist')));

app.get('/:templateName?', function (req, res) {
    res.render(req.params.templateName || "index", mockData);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("[Frontend DEV]\t Server started. 0.0.0.0:" + app.get('port'));
});