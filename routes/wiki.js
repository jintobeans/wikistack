const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', function(req, res, next){
  //THIS IS WHERE WE STOPPED!!!!!!
  //res.redirect();
});

router.post('/', function(req, res, next){
  // res.send('post works');
})

router.get('/add', function(req, res, next){
  // res.send('add get route works');
  res.render('addpage');
})

