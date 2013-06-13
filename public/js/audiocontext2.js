var context;
var buffer;
var urls;
window.onload = init;

function init(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext;
}

// callback takes a list of buffers
function playAudio(buffers){
  var sources = [];
  for(i in buffers){
    sources.push(context.createBufferSource());
    sources[i].buffer = buffers[i];
    sources[i].connect(context.destination);
    sources[i].start(0);
  }
}

// takes care of the request XMLHttp
// takes context (AudioContext obj), array of urls, callback
//
//https://code.google.com/p/html5rocks/source/browse/www.html5rocks.com/content/tutorials/webaudio/intro/static/js/buffer-loader.js?r=3b26076e516475bdcbab6c64e517e598be56c181

// bufferLoader = new BufferLoader(context, urls, playAudio);
