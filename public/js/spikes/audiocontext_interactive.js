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

// bufferLoader = new BufferLoader(context, urls, playAudio);
