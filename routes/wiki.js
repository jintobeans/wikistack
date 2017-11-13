const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.author,
      email: req.body.email,
    }
  }).then(function(values){
    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    })
    return page.save().then(function(page){
      return page.setAuthor(user);
    });
  })
  // var user = User.build({
  //   name: req.body.author,
  //   email: req.body.email,
  //   })
  // user.save();
  .then(function (savedPage) {
    // res.render('wikipage',{page: page});
    //savedPage.route is a virtual method on the instance that saves the route!!!!
    res.redirect(savedPage.route);
  })
  .catch(next);
})

router.get('/add', function (req, res, next) {
  // res.send('add get route works');
  res.render('addpage');
})

router.get('/:url', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.url,
    }
  }).then(function(found){
    res.render('wikipage', {page: found});
  }).catch(next);
});

router.get('/users', function(req, res, next){
  User.findAll().then(function(found){
    res.render('users', {users: found})
  }).catch(next);
})
