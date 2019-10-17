var express = require('express');
var router = express.Router();
var sql = require('../data/config');
var bodyParser = require('body-parser');

// const router = express.Router();

router.use(bodyParser.json()).post('/', (req, result) => {
    sql.query("INSERT INTO `orders-company` (companyName, contactPerson, companyNumber, vatNumber, productId) VALUES ('"+ req.body.companyname +"', '"+ req.body.contactperson +"', '"+ req.body.companynumber +"', '"+ req.body.vatnumber +"', '"+ req.body.productsId +"')", (err, res) => {
        if (!!err) {
            console.log('error in the order company query');
            result.send(err);
        } else {  
            console.log('successful order company query');
            console.log(res);
            result.send(res);
        }
    });
    // console.log(req.body)
})

module.exports = router;