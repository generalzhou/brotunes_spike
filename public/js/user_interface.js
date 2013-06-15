$(document).ready(function() {

  playlist = new TrackList();

  function pixelize(seconds){
    return seconds / playlist.longestDuration * 700;
  }

  function secondize(pixels){
    return pixels / 700 * playlist.longestDuration;
  }

  function UserInterface() {
    var CKEY = 67;
    var SKEY = 83;
    var selectStart;
    var selectEnd;
    var context = new webkitAudioContext();
    var selectedTrack;

  // Review why this function needs to exist. Out of place here
    function playAll() { playlist.playAll(); }
    $('#add_track').click( addTrack );
    $('#play_all').click( playAll );

    function addTrack() {
      var url = "top_gun.mp3";
      var track = new Track({url:url, context:context});
      var trackIndex = playlist.tracks.length;
      // Pull these out into <script type="text/template"> elements on the HTML page, render using
      // underscore.js' templating library
      var trackElement = $('<li class="track_line" id="track_'+trackIndex+'", data-trackindex="'+trackIndex+'"><div class="track"></div></li>');
      // trackElement.hide();
      playlist.addTrack(track);
      $('#track_list').append(trackElement);
      trackElement.find('.track').draggable({ axis: "x" });
    }

    $('#track_list').on('mouseup', '.track', updateDelay);

    function setSelectedTrack(e) {
      var index = $(e.target.parentElement).data('trackindex');
      selectedTrack = playlist.tracks[index];
    }

    function updateDelay(e) {
      setSelectedTrack(e);
      var left = parseInt($(this).css("left"), 10);
      var delay = secondize(left);
      selectedTrack.setDelay(delay);
    }

    $(document).on("keyup", keyUpEvent);
    $(document).on("keydown", keyDownEvent);

    function keyDownEvent(e) {
      switch (e.which) {
        case (SKEY):
          createSoundSelection();
          break;
      }
    }

    function keyUpEvent(e) {
      switch (e.which) {
        case (CKEY):
          cropSelection();
        break;
      }
    }
   
    function createSoundSelection() {
      $('.track').draggable('disable');
      $('#track_list').on("mousedown", ".track", startSoundSelection);
      enableDragging();
    }

    function startSoundSelection(e) {
      setSelectedTrack(e);
      var parentOffset = $(this).offset();
      selectStart = e.pageX - parentOffset.left;
      $(this).mouseup( endSoundSelection );
    }

    function endSoundSelection(e) {
      var parentOffset = $(this).offset();
      selectEnd = e.pageX - parentOffset.left;
    }

    function enableDragging() {
      $(document).on("keyup", function() {
        $('.track').draggable('enable');
      });
    }

    function cropSelection() {
      selectedTrack.setOffset(secondize(Math.min(selectStart, selectEnd)));
      selectedTrack.setDelay(secondize(Math.min(selectStart, selectEnd)));
      selectedTrack.setDuration(secondize(Math.abs(selectEnd - selectStart)));
    }
  }
  UserInterface();
});
