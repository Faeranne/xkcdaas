var express = require('express')

var regex = require('./208/')
var trySci = require('./208-var/')

var server = express();

regex.init();
trySci.init();

server.listen(process.env.PORT || 8000);
server.get('/regex/:what/:lang', function(req,res){
  res.contentType('image/png');
  var stream = regex.render(req.params);
  stream.on('data', function(chunk){
    res.write(chunk);
  });
  stream.on('end', function(chunk){
    res.end();
  });
});

server.get('/try/:do', function(req,res){
  res.contentType('image/png');
  var stream = trySci.render(req.params);
  stream.on('data', function(chunk){
    res.write(chunk);
  });
  stream.on('end', function(chunk){
    res.end();
  });
});

server.get('/', function(req,res){
  res.send('API is depentend on which comic you are using.  Comic 208, "Regular Expressions" and the 208 t-shirt variant, "try Science" are avaible.  208 api is /regex/:what/:lang where :what refers to panel 2 I know ...  :lang is the language in panel 4.  This currently supports the languages python, ruby, node, html, java, and perl.  Submit an issue if you would like othr languages supported. 208 variant api is /try/:what where :what is what to try. Original comics are from <a href="http://xkcd.com">XKCD</a>  <a href="http://github.com/blister75/xkcdaas/">Github</a>');
});
