var express = require('express');
var routes = require('./routes/main');
var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.locals.mapkey = "AIzaSyDJ3psJ0cc_16yqizmCR4L5Dk7e-eLHAQk";

app.get('/', function(req, res) {
    res.send('Hello from <a href="http://appfog.com">AppFog.com</a>');
});

app.get('/main',routes.index);
app.get('/form', routes.form);
app.post('/create', routes.create);
app.get('/create-site', routes.createSite);
app.get('/sites', routes.sites);
app.post('/add-site', routes.addSite);

app.listen( process.env.VCAP_APP_PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});