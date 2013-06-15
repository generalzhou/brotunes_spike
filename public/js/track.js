// track = new Track({url:'one_blind.mp3',context: new webkitAudioContext});

function Track(options) {
  var defaults = {delay:0, offset:0};
  options = _.extend(defaults, options);
  this.url = options.url;
  this.context = options.context;
  this.speakers = this.context.destination;
  this.delay = options.delay;
  this.offset = options.offset;
  this.duration = options.duration;
  this.trackLength;
  this.buffer;
  this.startTime = 0; // = context.currenttime when play is started
  this.pauseTime = 0; // = context.currenttime when play is paused
  this.source;

  var thisTrack = this;

  this.setUpBuffer = function(){
    var source = this.context.createBufferSource();
    source.buffer = this.buffer;
    return source;
  };

  this.connectNodes = function(source){
    source.connect(this.speakers);
  };

  this.play = function(delay, offset, duration){
    if (typeof(this.source) !== 'undefined'){ this.source.stop(0) };
    this.source = this.setUpBuffer();
    this.connectNodes(this.source);
    this.source.start(this.context.currentTime + delay, offset, duration);
  };

  this.playAt = function(startingTime){
    console.log('startingTime = ' + startingTime + 'delay = ' + this.delay);
    var delay  = this.delay - startingTime;
    var offset = this.offset;
    var duration = this.duration;
    if (delay < 0){
      offset += Math.abs(delay);
      duration -= Math.abs(delay);
      delay = 0;
    }
    this.startTime = this.context.currentTime - startingTime;
    console.log('startTime = ' + this.startTime);
    this.play(delay, offset, duration);
  };

  this.pause = function(){
    this.pauseTime = this.context.currentTime;
    console.log('pauseTime = ' + this.pauseTime);
    this.source.stop(0);
  };

  this.resume = function(){
    this.playAt(Math.max((this.pauseTime - this.startTime),0));
  };

  this.bufferLoaded = function(buffer) {
    thisTrack.buffer = buffer;
    thisTrack.trackLength = buffer.duration;
    if (typeof(thisTrack.duration) === 'undefined') {
      thisTrack.duration = buffer.duration;
    }
    $.Topic("Track:bufferLoaded").publish(thisTrack);
  };

  this.setDelay = function(delay) {
    this.delay = delay;
    $.Topic("Track:setDelay").publish(this);
  };

  this.setOffset = function(offset) {
    this.offset = offset;
    $.Topic("Track:setOffset").publish(this);
  };

  this.setDuration = function(duration) {
    this.duration = duration;
    $.Topic("Track:setDuration").publish(this);
  };

  this.toJSON = function(){
    return {url:this.url, delay:this.delay, offset:this.offset, duration:this.duration};
  };

  BufferLoader.load(this.context, this.url, this.bufferLoaded);
}
