function TrackList(savedList){

  this.tracks = [];
  this.longestDuration = 10;

  this.addTrack = function(url, elem, startTime, offset, playTime){
    this.tracks.push(new Track(url,elem, startTime, offset, playTime));
  };

  this.playAll = function(){
    for (i in this.tracks) {
      this.tracks[i].play();
    }
  };

  this.save = function() {
    return JSON.stringify(this)
  };

  this.load = function(json) {
    tracks = JSON.parse(json)['tracks'];
    for (i in tracks){
      track = tracks[i]
      this.tracks.push(new Track(track.url,
                                track.startTime,
                                track.trackOffset,
                                track.playTime
                                ));
    }
  };

  if (savedList !== undefined) {
    this.load(savedList);
  }

}
