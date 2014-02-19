var canvas = require('canvas')
var fs = require('fs')

var Image = canvas.Image

var template = new Image;

module.exports.init = function(){
  template.src = fs.readFileSync(__dirname + '/template.png')
  console.log(__dirname + '/template.png')
}

var xkcdFont = new canvas.Font('xkcd','xkcd.ttf')

module.exports.render = function(params){
  var ctx = new canvas(template.width,template.height).getContext('2d');
  ctx.addFont(xkcdFont)
  ctx.font = "13px xkcd"
  ctx.drawImage(template,0,0);
  setFontSize(14,ctx);
  /*panel 1*/
  shrinkToFit(params.who,66,30,ctx);
  var whoWidth = ctx.measureText(params.who);
  ctx.fillText(params.who,106-(whoWidth.width),21);
  shrinkToFit(params.how,52,30,ctx);
  var howWidth = ctx.measureText(params.how);
  ctx.fillText(params.how,116-(howWidth.width),42);
  shrinkToFit(params.what,44,30,ctx);
  var whatWidth = ctx.measureText(params.what);
  ctx.fillText(params.what,164-(whatWidth.width),110);
  /*panel 2*/
  shrinkToFit(params.what,44,30,ctx);
  ctx.fillText(params.what,290-(whatWidth.width),23);
  shrinkToFit(params.how,52,30,ctx);
  ctx.fillText(params.how,275-(howWidth.width),42);
  shrinkToFit(params.what,44,30,ctx);
  ctx.fillText(params.what,344-(whatWidth.width),91);
  /*panel 3*/
  shrinkToFit(params.what,44,30,ctx);
  ctx.fillText(params.what,504-(whatWidth.width),23);
  shrinkToFit(params.how,52,30,ctx);
  ctx.fillText(params.how,477-(howWidth.width),40);
  shrinkToFit(params.what,44,30,ctx);
  ctx.fillText(params.what,521-(whatWidth.width),70);
  shrinkToFit(params.whoP,68,30,ctx);
  var whoPWidth = ctx.measureText(params.whoP);
  ctx.fillText(params.whoP,439-(whoPWidth.width),204);
  shrinkToFit(params.where,82,30,ctx);
  /*panel 4*/
  var whereWidth = ctx.measureText(params.where);
  ctx.fillText(params.where,676-(whereWidth.width),42);
  shrinkToFit(params.whatP,44,30,ctx);
  var whatPWidth = ctx.measureText(params.whatP);
  ctx.fillText(params.whatP,646-(whatPWidth.width),92);
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
