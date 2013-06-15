describe("A Track", function(){
  
  var bufferLoader;
  var track; 
  var context;

  beforeEach(function(){
    track = new Track({url : "/james_bond.wav", context : new webkitAudioContext});
    spyOn(BufferLoader, 'load').andReturn(123);
  });

  it("should have a url", function(){
    expect(track.url).toEqual("/james_bond.wav");
  });

  it("should have an audio context", function(){
    expect(track.context).toBeDefined();
  });

  it("should have an audio destination", function(){
    expect(track.speakers).toEqual(track.context.destination); 
  });

  it("should have a trackLength", function(){
    expect(track.trackLength).toBeDefined();
  });

  it("should have an audio buffer to play", function(){
    expect(track.buffer).toBeDefined();
  });

  it("should have a duration", function(){
    expect(track.duration).toBeDefined();
  });

  it("should have a 'delay' playback property that defaults to 0", function(){
    expect(track.delay).toEqual(0);
  });

  it("should have an offset playback property that defaults to 0", function(){
    expect(track.offset).toEqual(0);
  });

});
