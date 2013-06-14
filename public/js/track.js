//Move these
function pixelize(seconds){
  return seconds / playlist.longestDuration * 700;
}

function secondize(pixels){
  return pixels / 700 * playlist.longestDuration;
}

// Move this to the UserInterface
var context = new webkitAudioContext();


function TrackView(el, track) {
  sub("trackChanged", function(track) {
    if( track == this ) {
      this.render();
    }
  });

  this.render = function(){
    this.elem.children('.track').css("width", pixelize(this.playTime) + "px");
    this.elem.children('.track').css("left", pixelize(this.startTime) + "px");
    this.elem.children('.track').css("visibility",'');
  };
}

function Track(options) { //url, elem, startTime, offset, playTime) {
  var defaults = {startTime: 0, offset: 0}
  options = defaults.extend(options);

  this.buffer;
  // using the options hash instead of a long list of params
  this.url = options.url;
  this.startTime = typeof(startTime) !== 'undefined' ? startTime : 0;
  this.offset = typeof(offset) !== 'undefined' ? offset : 0;
  this.playTime;
  this.duration;
  this.elem = elem;

  this.setUpBuffer = function(){
    var source = context.createBufferSource();
    source.buffer = this.buffer;
    return source;
  };

  this.connectNodes = function(source){
    // Connect source to output (speakers)
    source.connect(context.destination);
  };

  this.play = function(){
    source = this.setUpBuffer();
    this.connectNodes(source);
    source.start(this.delayUntilPlay,this.offset,this.playDuration);
  };

  this.loadSound = function() {
    soundLoader.loadSound(url, this.soundLoaded)
    var thisTrack = this;

    var request = new XMLHttpRequest();
    request.open('GET', this.url, true);
    request.responseType = 'arraybuffer';

    // What about errors? What if the URL doesn't exist or can't be parsed?
    // Feature enhancment, spinner as you load URLs
    request.onload = function(){
      context.decodeAudioData(request.response, function(buffer){
        console.log("Back with the song");
        callback(buffer);

      });
    };
    request.send();
  };


  // This function is passed to the SoundLoader class, called when the sound has been loaded
  this.soundLoaded(buffer) {
    thisTrack.buffer = buffer;
    thisTrack.duration = buffer.duration;
    thisTrack.playTime = buffer.duration;
    pub("trackLoaded", this);
  }

  this.updateDelayUntiPlay = function(startTime) {
    this.delayUntilPlay = startTime;
  }

  this.loadSound();
}
