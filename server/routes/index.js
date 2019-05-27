var express = require('express');
var router = express.Router();

var issueRouter = require('./issues');
var candidateRouter = require('./candidates')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/issues/', issueRouter);
router.use('/candidates/', candidateRouter);


module.exports = router;