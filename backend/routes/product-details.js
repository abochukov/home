var express = require('express');
var router = express.Router();
var sql = require('../data/config');
// var bodyParser = require('body-parser');

router.get('/:id', (req, res) => {
    sql.query("SELECT * FROM `product-details` WHERE productId = '"+ req.params.id +"'", (error, result, fields) => {
        if (!!error) {
            console.log('error in the query');
            res.send(error);
        } else {  
            console.log('successful query');
            console.log(result);
            res.send(result);
        }
    })
});

module.exports = router;