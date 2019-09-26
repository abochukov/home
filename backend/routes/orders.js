var express = require('express');
var router = express.Router();
var sql = require('../data/config');
var bodyParser = require('body-parser');

// const router = express.Router();

router.use(bodyParser.json()).post('/', (req, result) => {
    sql.query("INSERT INTO customers (customerName, customerFamily, customerPhone, customerMail, customerAddress, productId, date) VALUES ('"+ req.body.firstname +"', '"+ req.body.family +"', '"+ req.body.phone +"', '"+ req.body.mail +"', '"+ req.body.address +"', '"+ req.body.productsId +"', '"+ req.body.date +"')", (err, res) => {
        if (!!err) {
            console.log('error in the query');
            result.send(err);
        } else {  
            console.log('successful query');
            console.log(res);
            result.send(res);
        }
    });
    // console.log(req.body)
})

module.exports = router;