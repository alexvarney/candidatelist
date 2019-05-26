var express = require('express');
var router = express.Router();

var Candidate = require('../models/Candidate');

/* GET /Candidates/ page. */
router.get('/', function(req, res, next) {
    Candidate.find({}).then((candidates)=>{
        res.send(candidates);
    })
});

/* Get a single candidate by ID */
router.get('/id/:id', (req, res) =>{
    Candidate.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        res.send(doc);
    })
})

/* Get a candidate issues by ID */
router.get('/id/:id/positions', (req, res) =>{
    Candidate.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        res.send(doc.positions);
    })
})

/* Add a new policy position to the candidate's list */
router.post('/id/:id/positions', (req, res)=>{
    Candidate.update(
        {_id: req.params.id},
        {$push: {positions: req.body}},
        (error, success) => {
            if (error) {
                console.log(error);
                res.send(500);
            }
            else{
                res.send(200);
            }
        }
        )
})

/* Delete a candidate policy position */
router.delete('/positions/:positionId', (req, res)=>{
    Candidate.update(
        {},
        {$pull: {positions: {_id: req.params.positionId}}},
        {multi: true},
        (error, success) => {
            if (error) {
                console.log(error);
                res.send(500);
            }
            else{
                res.send(200);
            }
        }
    )
})

/* Update a policy position */

router.put('/positions/:positionId', (req, res)=>{

    console.log(req.body.status + req.body.description);

    Candidate.update(
        {'positions._id': req.params.positionId},
        {$set: {'positions.$.status': req.body.status,
                'positions.$.description':req.body.description}},
        {multi: true},
        (error, success) => {
            if (error) {
                console.log(error);
                res.send(500);
            } else {
                res.send(200);
            }
        }
    )
})

/* Add a link to a policy position */ 
router.post('/id/:id/positions/:positionId/links', (req, res) =>{
    Candidate.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        Candidate.update(
            {_id: req.params.id, 'positions._id': req.params.positionId},
            {$push: {'positions.$.links': req.body}},
            (error, success) => {
                if (error) {
                    console.log(error);
                    res.send(500);
                }
                else{
                    res.send(200);
                }
            }
        )
    })
})

/* Delete a policy link */ 
router.delete('/id/:id/positions/:positionId/links/:linkId', (req, res) =>{
    Candidate.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        doc.positions.id(req.params.positionId).links.id(req.params.linkId).remove();

        doc.save();
        
        res.send(200);
    })
})



/* POST new candidate to the db */
router.post('/', (req, res) =>{
    const newItem = new Candidate(req.body);
    newItem.save((error)=>{
        if (error) {console.log("Oh no! An error occured.")}
        else{
            res.send(newItem);
        };
    });
})

/* Update an candidate */
router.put('/id/:id', (req, res) =>{
    Candidate.findByIdAndUpdate(req.params.id, req.body).exec((error, doc)=>{
        if (error) {
            console.log(error)
            return res.send(500);
        }
        res.send(doc);
    })
})

/*DELETE an candidate */
router.delete('/id/:id', (req, res)=>{
    Candidate.findByIdAndDelete(req.params.id).exec((error)=>{
        if (error) {
            console.log(error);
            return res.send(500);
        }
        res.send(200);
    })
})

module.exports = router;
