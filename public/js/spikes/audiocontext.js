var context;
var audioBuffer;

window.addEventListener('load', init, false);
window.onload = init;

function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}
// url has to be same domain
function loadSound(url){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function(){
    // decodeAudioData is async call, the function is a callback
    context.decodeAudioData(request.response, function(buffer){
      audioBuffer = buffer;
    });
  }
  // code above sets up the request and onload callback
  // this sends the prepared request
  request.send();
}

function playSound(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

