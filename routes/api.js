var express = require('express');
var router = express.Router();
var oprRecord = require('../model.js');
var async = require('async');

/* GET */
router.get('/*select*%20B%3D\':imagedir\'*', function (req, res, next) {

    console.log(req.params['imagedir']);

    oprRecord.find({imageUrl:req.params['imagedir']}, function (err, docs) {
        var onerow;
        var result;

        result = JSON.parse('{"table":{"cols":[{"label":"stars"},{"label":"author"},{"label":"duplicate"},{"label":"reasons"}],"rows":[]}}');
        onerow = JSON.parse('{"c":[{"v":0},{"v":""},{"v":""},{"v":null},{"v":""}]}');//?

        async.each (
            docs,
            function(doc, callback) {
                onerow.c[0].v=doc.stars;
                onerow.c[1].v=doc.author;
                onerow.c[2].v=doc.duplicate?doc.duplicate:null;
                onerow.c[3].v=doc.reasons;
                result.table.rows.push (onerow);
                callback ();
            },
            function (err) {
                if (req.app.get('env') === 'development') {
                    console.log(JSON.stringify(result));
                }
                res.render('api', {objects: result});
            });
    });
});

router.post('/', function (req, res) {
    if (req.app.get('env') === 'development') {
        console.log(req.body);
    }
    var record = new oprRecord ();
    var keys=['title','imageUrl','description','streetAddress','lat','lng','author','stars','duplicate','reasons','JSON'];
    keys.forEach( function (key) {
        record[key]=req.body[key];
    });
    record.save();
    res.status(200).end();
});

module.exports = router;
