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

  var thisTrack = this;

  this.toJSON = function(){
    return {url:this.url, delay:this.delay, offset:this.offset, duration:this.duration};
  }

  this.setUpBuffer = function(){
    var source = this.context.createBufferSource();
    source.buffer = this.buffer;
    return source;
  };

  this.connectNodes = function(source){
    source.connect(this.speakers);
  };

  this.play = function(){
    source = this.setUpBuffer();
    this.connectNodes(source);
    source.start(this.context.currentTime + this.delay,this.offset,this.duration);
  };

  this.bufferLoaded = function(buffer) {
    thisTrack.buffer = buffer;
    thisTrack.trackLength = buffer.duration;
    if (typeof(thisTrack.duration) === 'undefined') {
      thisTrack.duration = buffer.duration;
    }
    $.Topic("Track:bufferLoaded").publish(this);
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

  BufferLoader.load(this.context, this.url, this.bufferLoaded);
}
