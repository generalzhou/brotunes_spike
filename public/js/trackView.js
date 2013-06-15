function TrackView(elem, track) {

  $.Topic("Track:bufferLoaded").subscribe(initializeView);
  $.Topic("Track:setDelay").subscribe(render);
  $.Topic("Track:setOffset").subscribe(render);
  $.Topic("Track:setDuration").subscribe(render);

  function initializeView(){

  }

  function render(track){
    if( track == this ) {
      this.elem.children('.track').css("width", pixelize(track.playTime) + "px");
      this.elem.children('.track').css("left", pixelize(track.startTime) + "px");
      this.elem.children('.track').css("visibility",'');
    }
  }
}
