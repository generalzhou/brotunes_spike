function TrackView(track) {
  this.track = track;
  this.index = playlist.tracks.length;
  this.elem = $('<li class="track_line" id="track_'+this.index+'" data-index="'+this.index+'"><div class="track"></div></li>');
  // pull this out into a template....later
  this.elem.find('.track').hide();
  $('#track_list').append(this.elem);

  var thisView = this;

  this.initializeView = function(track){
    if (thisView.track === track ){
      console.log('initialize');
      thisView.elem.find('.track').show();
      thisView.render(track);
      thisView.elem.find('.track').draggable({ axis: "x" });
    }
  };

  this.render = function(track){
    if (thisView.track === track ){
      console.log('delay = ' + track.delay + ', duration =' + track.duration);
      thisView.elem.children('.track').css("left", pixelize(track.delay) + "px");
      thisView.elem.children('.track').css("width", pixelize(track.duration) + "px");
    }
  };

  $.Topic("Track:bufferLoaded").subscribe(this.initializeView);
  $.Topic("Track:setDelay").subscribe(this.render);
  $.Topic("Track:setOffset").subscribe(this.render);
  $.Topic("Track:setDuration").subscribe(this.render);
}


