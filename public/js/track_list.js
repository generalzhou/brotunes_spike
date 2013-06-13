function TrackList(){

  this.tracks = [];

  this.addTrack = function(url){
    this.tracks.push(new Track(url));
  }

  this.playAll = function(){
    for (i in this.tracks) {
      this.tracks[i].play();
    }
  }

}
