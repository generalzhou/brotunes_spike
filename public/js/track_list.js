function TrackList(savedList){

  this.tracks = [];
  this.longestDuration = 10;

  // function save() {}
  if (savedList !== undefined) {
    this.load(savedList);
  }


  // Do this instead
  this.addTrack = function(track) {
    this.tracks.push(track);
  }

  //this.addTrack = function(url, elem, startTime, offset, playTime){
  //  this.tracks.push(new Track(url,elem, startTime, offset, playTime));
  //};

  // Move this to UserInterface
  this.playAll = function(){
    for (i in this.tracks) {
      this.tracks[i].play();
    }
  };

  // This is a LIE. It's not saving anything.
  this.save = function() {
    return JSON.stringify(this)
  };

  this.load = function(json) {
    tracks = JSON.parse(json)['tracks'];
    for (i in tracks){
      var track = tracks[i]
      // pass in options here, instead of the individual params
      this.tracks.push(new Track(track.url,
                                track.startTime,
                                track.trackOffset,
                                track.playTime
                                ));
    }
  };

}
