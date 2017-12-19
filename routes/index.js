var express = require('express');
var router = express.Router();
var oprRecord = require('../model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    oprRecord.find({}, function (err, docs) {
        console.log (docs);
        res.render('index', {title: 'title', docs: docs});
    });

});

module.exports = router;
