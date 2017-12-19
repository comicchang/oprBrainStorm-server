var express = require('express');
var router = express.Router();
var oprRecord = require('../model.js');

/* GET */
router.get('/', function (req, res, next) {

    res.render('index', {title: 'Express'});
});

router.post('/', function (req, res) {
    //console.log(req.body);
    var record = new oprRecord ();
    var keys=['title','imageUrl','description','streetAddress','lat','lng','author','stars','duplicate','reasons','JSON'];
    keys.forEach( function (key) {
        record[key]=req.body[key];
    });
    record.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
        }});
    oprRecord.find({}, function (err, docs) {
        console.log (docs);
        res.status(200).json(docs).end();
    });
});

module.exports = router;
