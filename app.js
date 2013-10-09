var express = require('express')
var crypto = require('crypto')
var path = require('path')
var fs = require('fs')

var regex = require('./208/')
var trySci = require('./208-var/')

var server = express();

server.configure(function(){
  server.use(express.static(__dirname + '/public'));
})

regex.init();
trySci.init();

fs.mkdir('/tmp/xkcd',function(err){
  fs.mkdir('/tmp/xkcd/images/',function(err){
    fs.mkdir('/tmp/xkcd/images/regex/',function(err){
      fs.mkdir('/tmp/xkcd/images/try/')
    })
  })
})

server.listen(process.env.PORT || 8000);
var image = null
server.get('/regex/:what/:lang', function(req,res){
  console.log('incomming request for:'+req.url);
  if(req.get('referrer')){
    console.log('request from:'+req.get('referrer'));
  }
  var hash = '/tmp/xkcd/images/regex/' + crypto.createHash('md5').update(req.url).digest("hex") +'.png'
    if(path.existsSync(hash)){
       res.contentType('image/png');
       res.sendfile(hash) 
    }else{
       res.contentType('image/png');
       var stream = regex.render(req.params);
       var image = null
       var out = fs.createWriteStream(hash)
       stream.on('data',function(chunk){
         res.write(chunk);
         out.write(chunk);
       })
       stream.on('end', function(chunk){
         res.end()
         out.end()
       });
    }
});

server.get('/regex/:what/', function(req,res){
  req.params.lang = ''
  console.log('incomming request for:'+req.url);
  if(req.get('referrer')){
    console.log('request from:'+req.get('referrer'));
  }
  var hash = '/tmp/xkcd/images/regex/' + crypto.createHash('md5').update(req.url).digest("hex") +'.png'
    if(path.existsSync(hash)){
       res.contentType('image/png');
       res.sendfile(hash) 
    }else{
       res.contentType('image/png');
       var stream = regex.render(req.params);
       var image = null
       var out = fs.createWriteStream(hash)
       stream.on('data',function(chunk){
         res.write(chunk);
         out.write(chunk);
       })
       stream.on('end', function(chunk){
         res.end()
         out.end()
       });
    }
});

server.get('/get_image/regex',function(req,res){
  console.log('incomming request for:'+req.url);
  if(req.get('referrer')){
    console.log('request from:'+req.get('referrer'));
  }
  var imageSrc='/regex/'+encodeURIComponent(req.query.what)+'/'+encodeURIComponent(req.query.lang)
  var html ='<body><img src="'+imageSrc+'"><br/><h2>Paste the HTML below to show off your image.</h2><p>&lt;img src="http://xkcdaas.heroku.com'+imageSrc+'"&gt;</p>'
  res.send(html);
})

server.get('/try/:do', function(req,res){
  console.log('incomming request for:'+req.url);
  if(req.get('referrer')){
    console.log('request from:'+req.get('referrer'));
  }
  var hash = '/tmp/xkcd/images/try/' + crypto.createHash('md5').update(req.url).digest("hex") +'.png'
    if(path.existsSync(hash)){
       res.contentType('image/png');
       res.sendfile(hash) 
    }else{
       res.contentType('image/png');
       var stream = trySci.render(req.params);
       var image = null
       var out = fs.createWriteStream(hash)
       stream.on('data',function(chunk){
         res.write(chunk);
         out.write(chunk);
       })
       stream.on('end', function(chunk){
         res.end()
         out.end()
       });
    }
});

server.get('/get_image/try',function(req,res){
  console.log('incomming request for:'+req.url);
  if(req.get('referrer')){
    console.log('request from:'+req.get('referrer'));
  }
  var imageSrc='/try/'+encodeURIComponent(req.query.what)
  var html ='<body><img src="'+imageSrc+'"><br/><h2>Paste the HTML below to show off your image.</h2><p>&lt;img src="http://xkcdaas.heroku.com'+imageSrc+'"&gt;</p>'
  res.send(html);
})

server.get('/', function(req,res){
  console.log('incomming request for:'+req.url);
  if(req.get('referrer')){
    console.log('request from:'+req.get('referrer'));
  }
  //res.send('API is depentend on which comic you are using.  Comic 208, "Regular Expressions" and the 208 t-shirt variant, "try Science" are avaible.  208 api is /regex/:what/:lang where :what refers to panel 2 I know ...  :lang is the language in panel 4.  This currently supports the languages python, ruby, node, html, java, and perl.  Submit an issue if you would like othr languages supported. 208 variant api is /try/:what where :what is what to try. Original comics are from <a href="http://xkcd.com">XKCD</a>  <a href="http://github.com/blister75/xkcdaas/">Github</a>');
  res.sendfile(__dirname+"/index.html")
});
