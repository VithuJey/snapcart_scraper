const express = require('express');
const router = express.Router();
const Schema = require('../db/Schema')
const Grocery = Schema.model('grocery')

router.post('/', (req,res) => {
    // req.body ---->  ?
    let newGrocery = {};
    newGrocery.name = 
    newGrocery.type = 
    newGrocery.weight = 
    newGrocery.detail = [{
        date: ,
        price: 
    }]
    const grocery = new Grocery()
});

module.exports = router;