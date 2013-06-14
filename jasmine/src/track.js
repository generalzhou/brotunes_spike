function pixelize(seconds){
  return seconds / playlist.longestDuration * 700;
}

function secondize(pixels){
  return pixels / 700 * playlist.longestDuration;
}

var context = new webkitAudioContext();

function Track(url, elem, startTime, offset, playTime) {
  this.buffer;
  this.url = url;
  this.startTime = typeof(startTime) !== 'undefined' ? startTime : 0;
  this.offset = typeof(offset) !== 'undefined' ? offset : 0;
  this.playTime;
  this.duration;
  this.elem = elem;


  this.render = function(){
    this.elem.children('.track').css("width", pixelize(this.playTime) + "px");
    this.elem.children('.track').css("left", pixelize(this.startTime) + "px");
    this.elem.children('.track').css("visibility",'');
  };

  this.setUpBuffer = function(){
    source = context.createBufferSource();
    source.buffer = this.buffer;
    return source;
  };

  this.connectNodes = function(source){
    source.connect(context.destination);
  };

  this.play = function(){
    source = this.setUpBuffer();
    this.connectNodes(source);
    source.noteGrainOn(this.startTime,this.offset,this.playTime);
  };

  this.loadSound = function() {
    var thisTrack = this;

    var request = new XMLHttpRequest();
    request.open('GET', this.url, true);
    request.responseType = 'arraybuffer';

    request.onload = function(){
      context.decodeAudioData(request.response, function(buffer){
        console.log("Back with the song");
        thisTrack.buffer = buffer;
        thisTrack.duration = buffer.duration;
        thisTrack.playTime = buffer.duration;
        thisTrack.render();
      });
    };
    request.send();
  };

  this.update = function(startTime) {
    this.startTime = startTime;
  }

  this.loadSound();
}
