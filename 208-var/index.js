var canvas = require('canvas')
var fs = require('fs')

var Image = canvas.Image

var template = new Image;

module.exports.init = function(){
  template.src = fs.readFileSync(__dirname + '/template.png')
  console.log(template)
}
var xkcdFont = new canvas.Font('xkcd','xkcd.ttf')

module.exports.render = function(params){
  var ctx = new canvas(template.width,template.height).getContext('2d');
  ctx.addFont(xkcdFont)
  ctx.font = "13px xkcd"
  ctx.drawImage(template,0,0);
  ctx.fillColor = "white"
  shrinkToFit(params.do,425-77,120,ctx);
  var doWidth = ctx.measureText(params.do);
  ctx.fillText(params.do,247-(doWidth.width/2),423);
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
