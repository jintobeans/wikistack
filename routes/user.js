const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
  User.findAll().then(function(found){
    res.render('users', {users: found})
  }).catch(next);
})
