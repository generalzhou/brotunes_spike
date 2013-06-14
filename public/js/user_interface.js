$(document).ready(function() {

  playlist = new TrackList();
  function playAll() { playlist.playAll(); }

  var CKEY = 67;
  var SKEY = 83;
  var selectStart;
  var selectEnd;
  var selectedTrack;

  $('#add_track').click( addTrack );
  $('#play_all').on('click', playAll);

  function addTrack() {
    var track_index = playlist.tracks.length;
    var trackElement = $('<li class="track_line" id="track_'+track_index+'", data-track_index="'+track_index+'"><div class="track" style="visibility:hidden;"></div></li>');
    playlist.addTrack('tony_montana.wav', trackElement);
    $('#track_list').append(trackElement);
    $('.track').draggable({ axis: "x" });
  }

  $('#track_list').on('mouseup', '.track', function(e) {
    selectedTrack = $(e.target.parentElement).data('track_index');
    var track = playlist.tracks[selectedTrack];
    var left = parseInt($(this).css("left"), 10);
    var startTime = secondize(left);
    track.update(startTime);
    track.render();
  });

  $(document).on("keydown", function(e) {
    if ( e.which == SKEY) {
      $('.track').draggable('disable');
      $('#track_list').on("mousedown", ".track", select);
      enableDragging();
    }
  });

  $(document).on("keyup", cropSelection);

  function select(e) {
    var parentOffset = $(this).offset();
    selectStart = e.pageX - parentOffset.left;
    selectedTrack = $(e.target.parentElement).data('track_index');
    $(this).mouseup(function(e2) {
      var parentOffset = $(this).offset();
      selectEnd = e2.pageX - parentOffset.left;
    });
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
      track.startTime += secondize(Math.min(selectStart, selectEnd));
      track.playTime = secondize(selection);
      track.render();
    }
  }
});


