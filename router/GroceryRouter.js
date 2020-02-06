const express = require('express');
const router = express.Router();
const Schema = require('../db/Schema')
const Grocery = Schema.model('grocery')

/*
router.post('/',(req,res) => {
    const course = new Course(req.body);
    course.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err))
});

router.get("/", (req,res) => {
    Course.find()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
});

router.get('/:id', (req,res) => {
    Course.findById({'_id':req.params.id})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
});

router.put('/:id', (req,res) => {
    Course.updateOne({'_id':req.params.id}, req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(data))
})

*/

module.exports = router;