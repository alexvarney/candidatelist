var express = require('express');
var router = express.Router();

var Issue = require('../models/Issue');

/* GET /issues/ page. */
router.get('/', function(req, res, next) {
    Issue.find({}).then((issues)=>{
        res.send(issues);
    })
});

/* Get a single issue by ID */
router.get('/id/:id', (req, res) =>{
    Issue.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        res.send(doc);
    })
})

/* POST new issue to the db */
router.post('/', (req, res) =>{
    const newIssue = new Issue(req.body);
    newIssue.save((error)=>{
        if (error) {console.log("Oh no! An error occured.")}
        else{
            res.send(newIssue);
        };
    });

})

/* Delete an issue */
router.delete('/id/:id', (req, res)=>{
    Issue.findByIdAndDelete(req.params.id).exec((error)=>{
        if (error) {
            console.log(error);
            return res.send(500);
        }
        res.send(200);
    })
})

module.exports = router;
