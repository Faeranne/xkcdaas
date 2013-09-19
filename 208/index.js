var canvas = require('canvas')
var fs = require('fs')

var Image = canvas.Image

var languages = {
  "perl":{},
  "node":{},
  "python":{},
  "html":{},
  "java":{},
  "ruby":{},
  "lisp":{},
  "scala":{}
}

var template = new Image;

module.exports.init = function(){
  template.src = fs.readFileSync(__dirname + '/template.png')
  console.log(__dirname + '/template.png')
  for(language in languages){
    image = fs.readFileSync(__dirname + '/'+language+'.png')
    languages[language].Image = new Image;
    languages[language].Image.src = image;
  }
}

module.exports.render = function(params){
  var ctx = new canvas(template.width,template.height).getContext('2d');
  ctx.drawImage(template,0,0);
  setFontSize(13,ctx);
  ctx.fillText('know',460,56);
  shrinkToFit(params.what,120,11,ctx);
  var whatWidth = ctx.measureText(params.what);
  ctx.fillText(params.what,465-(whatWidth.width/2),69);
  if(languages[params.lang]){
    ctx.drawImage(languages[params.lang].Image,0,0);
  }
  var stream = ctx.canvas.createPNGStream();
  return stream;
}

function setFontSize(size,ctx){
  var fontArgs = ctx.font.split(' ');
  var newSize = size+'px';
  ctx.font =  newSize + ' ' + fontArgs[fontArgs.length - 1]; /// using the last part
}

function shrinkToFit(text,size,init,ctx){
  ctx.font = setFontSize(init,ctx);
  var currentSize = init;
  while(ctx.measureText(text).width>size){
    currentSize--
    setFontSize(currentSize,ctx)
  }
}
