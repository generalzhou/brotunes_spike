var context = new webkitAudioContext();

function Track(url) {
  this.buffer;
  this.url = url;
  this.startTime = 0;
  this.trackOffset = 0;
  this.playTime = null;
  this.loop = false;

  this.setUpBuffer = function(){
    source = context.createBufferSource();
    source.buffer = this.buffer;
    source.loopStart = this.trackOffset;
    source.loop = this.loop;
    return source;
  };

  this.connectNodes = function(source){
    source.connect(context.destination);
  };

  this.play = function(){
    source = this.setUpBuffer();
    this.connectNodes(source);
    source.noteGrainOn(this.startTime,this.trackOffset,this.playTime);
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
      });
    }
    request.send();
  };
  this.loadSound();
}
