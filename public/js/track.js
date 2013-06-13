var context = new webkitAudioContext();


function Track(url) {
  this.buffer;
  this.url = url;

  this.play = function(start_time){
    source = context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(context.destination);
    source.start(start_time);
  }


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
  }
  this.loadSound();
}

