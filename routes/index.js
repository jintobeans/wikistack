const express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  Page.findAll().then(function(found){
    res.render('index.html', {pages: found})
  }).catch(next);
});

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;
