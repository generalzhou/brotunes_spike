$(document).ready(function() {

  playlist = new TrackList();

  var CKEY = 67;
  var SKEYPRESS = 115;
  var selectStart;
  var selectEnd;
  var selectedTrack;

  $('#add_track').click( addTrack );

  $(document).on("keypress", function(e) {
      if ( e.which == SKEYPRESS) {
        $('.track').draggable('disable');
        $('#track_list').on("mousedown", ".track", select);
      }
    });
  $(document).on("keyup", cropSelection);

  function addTrack() {
    var track_index = playlist.tracks.length;
    var trackElement = $('<li class="track_line" id="track_'+track_index+'", data-track_index="'+track_index+'"><div class="track" style="visibility:hidden;"></div></li>');
    playlist.addTrack('tony_montana.wav', trackElement);
    $('#track_list').append(trackElement);
    $('.track').draggable({ axis: "x" });
  }

  function select(e){
    var parentOffset = $(this).offset();
    selectStart = e.pageX - parentOffset.left;

    selectedTrack = $(e.target.parentElement).data('track_index');
    console.log(selectedTrack);

    $(this).mouseup(function(e2){
      var parentOffset = $(this).offset();
      selectEnd = e2.pageX - parentOffset.left;
    });
    enableDragging();
  }

  function enableDragging() {
    $(document).on("keyup", function() {
      $('.track').draggable('enable');
    });
  }

  function cropSelection(e) {
    if ( event.which == CKEY ) {
      
      track = playlist.tracks[selectedTrack];
      var selection = Math.abs(selectEnd - selectStart);
      track.offset = secondize(Math.min(selectStart, selectEnd));
      console.log(track.offset + " offset");
      console.log(track.startTime + " start")
      track.startTime += secondize(Math.min(selectStart, selectEnd));
      console.log(track.startTime + " afterstart")
      track.playTime = secondize(selection);
      track.render();
    }
  }

  $('#track_list').on('mouseup', '.track', function(e) {
    selectedTrack = $(e.target.parentElement).data('track_index');
    var track = playlist.tracks[selectedTrack];
    var left = parseInt($(this).css("left"), 10);
    var startTime = secondize(left);
    track.update(startTime);
    track.render();
  });
});


