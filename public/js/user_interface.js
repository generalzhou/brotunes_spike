$(document).ready(function() {

  playList = new TrackList();


  var selectStart;
  var selectEnd;
  var track;

  $('#add_track').click( addTrack );
  $('#track_list').on("mousedown", ".track", select);
  $(document).on("keyup", cropSelection);

  function addTrack() {
    var trackElement = $('<li class="track_line" css="visibility=hidden;" data-track_index="'+track_index+'"><div class="track"></div></li>');

    var new_track = new Track('tony_montana.wav', trackElement, playList.getLongestDuration());
    playList.tracks.push(new_track);
    var track_index = playList.tracks.length - 1;

    $('#track_list').append(trackElement);
  }

  function select(e){
    var parentOffset = $(this).parent().offset();
    selectStart = e.pageX - parentOffset.left;

    track_id = $(e.target.parentElement).data('track_index');
    console.log(track_id);

    $(this).mouseup(function(e2){
      var parentOffset = $(this).parent().offset();
      selectEnd = e2.pageX - parentOffset.left;
    });
  }

  function cropSelection(e) {
    if ( event.which == 67 ) {
      var selection = selectEnd - selectStart;
      track.update(selectStart, selection);
      $('#track_list').find('.track').css("width", track.length + "px");
      $('#track_list').find('.track').css("left", track.start + "px");
    }
  }
});


