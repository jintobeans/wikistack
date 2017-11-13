const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const models = require('./models');

//templating with nunjucks
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

//set up logging middlewhere
app.use(morgan('dev'));

//set up body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//routes
app.use('/', routes);

//set up static server
//beware of where we put this because index.html is also in 'public' - will look for matching names if this line is put before the routes
app.use(express.static('public'));

//sync database then server is listening
models.db.sync().then(function(){
  app.listen(3000, function () {
    console.log('server is listening');
  })
}).catch(console.error);

//{force: true}
