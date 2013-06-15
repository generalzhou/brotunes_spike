describe("A Track", function(){
  
  var bufferLoader;
  var track; 
  var song;
  var context;

  beforeEach(function(){
    song = new Track({url : "/james_bond.wav", context : new webkitAudioContext});
    // track = jasmine.createSpyObj('Track', ['url', 'context', 'speakers', 'delay', 'offest', 'duration', 'trackLength', 'buffer', 'setUpBuffer', 'connectNodes', 'play', 'bufferLoaded', 'setDelay', 'setOffset', 'setDuration']);
    // bufferLoader = jasmine.createSpyObj('BufferLoader', ['load']);
    spyOn(BufferLoader, 'load').andReturn(123);
  });

  it("should have a url", function(){
    expect(song.url).toEqual("/james_bond.wav");
  });

  it("should have an audio context", function(){
    expect(song.context).toBeDefined();
  });

  it("should have an audio destination", function(){
    expect(song.speakers).toEqual(song.context.destination); 
  });

  it("should have a trackLength", function(){
    expect(song.trackLength).toBeDefined();
  });

  it("should have an audio buffer to play", function(){
    expect(song.buffer).toBeDefined();
  });

  it("should have a duration", function(){
    expect(song.duration).toBeDefined();
  });

  it("should have a 'delay' playback property that defaults to 0", function(){
    expect(song.delay).toEqual(0);
  });

  it("should have an offset playback property that defaults to 0", function(){
    expect(song.offset).toEqual(0);
  });

});
