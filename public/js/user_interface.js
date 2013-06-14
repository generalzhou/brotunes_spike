$(document).ready(function() {

  playlist = new TrackList();


  var selectStart;
  var selectEnd;
  var track;
  var selectedTrack;

  $('#add_track').click( addTrack );
  $('#track_list').on("mousedown", ".track", select);
  $(document).on("keyup", cropSelection);

  function addTrack() {
    var track_index = playlist.tracks.length;
    var trackElement = $('<li class="track_line" id="track_'+track_index+'", data-track_index="'+track_index+'"><div class="track" style="visibility:hidden;"></div></li>');
    playlist.addTrack('tony_montana.wav', trackElement);
    $('#track_list').append(trackElement);
  }

  function select(e){
    var parentOffset = $(this).parent().offset();
    selectStart = e.pageX - parentOffset.left;

    selectedTrack = $(e.target.parentElement).data('track_index');
    console.log(selectedTrack);

    $(this).mouseup(function(e2){
      var parentOffset = $(this).parent().offset();
      selectEnd = e2.pageX - parentOffset.left;
    });
  }

  function cropSelection(e) {
    if ( event.which == 67 ) {
      track = playlist.tracks[selectedTrack];
      var selection = Math.abs(selectEnd - selectStart);
      track.offset = secondize(Math.min(selectStart, selectEnd));
      track.playTime = secondize(selection);
      track.render();
      // debugger;
    }
  }
});


