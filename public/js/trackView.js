function TrackView(track) {
  this.track = track;
  this.index = playlist.tracks.length;

  this.template = _.template(
    $( "script.template" ).html()
  );

  var thisView = this;

  this.initializeView = function(track){
    if (thisView.track === track ){
      var elem = thisView.template( thisView );
      $('ul').append(elem);
      $('.audio_clip').draggable({ axis: "x" });

    }
  };

  this.render = function(track){
    if (thisView.track === track ){
      $('#track_'+thisView.index).replaceWith(thisView.template( thisView ));
      $('.audio_clip').draggable({ axis: "x" });
    }
  };

  $.Topic("Track:bufferLoaded").subscribe(this.initializeView);
  $.Topic("Track:setDelay").subscribe(this.render);
  $.Topic("Track:setOffset").subscribe(this.render);
  $.Topic("Track:setDuration").subscribe(this.render);
}
