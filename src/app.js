"use strict";
exports.__esModule = true;
var path_1 = require("path");
var express_1 = require("express");
var hbs_1 = require("hbs");
var geocode_1 = require("./utils/geocode");
var forecast_1 = require("./utils/forecast");
var app = (0, express_1["default"])();
var port = process.env.PORT || 3000;
// Define paths for Express config
var publicDirectoryPath = path_1["default"].join(__dirname, '../public');
var viewsPath = path_1["default"].join(__dirname, '../templates/views');
var partialsPath = path_1["default"].join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs_1["default"].registerPartials(partialsPath);
// Setup static directory to serve
app.use(express_1["default"].static(publicDirectoryPath));
app.get('', function (req, res) {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});
app.get('/help', function (req, res) {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    });
});
app.get('/weather', function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    (0, geocode_1["default"])(req.query.address, function (error, _a) {
        var _b = _a === void 0 ? {} : _a, latitude = _b.latitude, longitude = _b.longitude, location = _b.location;
        if (error) {
            return res.send({ error: error });
        }
        (0, forecast_1["default"])(latitude, longitude, function (error, forecastData) {
            if (error) {
                return res.send({ error: error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});
app.get('/products', function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});
app.get('/help/*', function (req, res) {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    });
});
app.get('*', function (req, res) {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
});
app.listen(port, function () {
    console.log('Server is up on port ' + port);
});
