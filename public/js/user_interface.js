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
  // You're using this as the index at all times, but it's not named that way
  // Regardless, just save the track here, not the index.
    var selectedTrack;

    function init() {
      var context = new webkitAudioContext();
    }

  // Review why this function needs to exist. Out of place here
    function playAll() { playlist.playAll(); }
    $('#add_track').click( addTrack );
    $('#play_all').click( playAll);

    function addTrack() {
      var trackIndex = playlist.tracks.length;
      // Pull these out into <script type="text/template"> elements on the HTML page, render using
      // underscore.js' templating library
      var trackElement = $('<li class="track_line" id="track_'+trackIndex+'", data-trackIndex="'+trackIndex+'"><div class="track"></div></li>');
      // trackElement.hide();
      // Pull 'tony_montatna.wav' out to a variable as an attribute on the UserInterface object
      playlist.addTrack('tony_montana.wav', trackElement);

      $('#track_list').append(trackElement);
      // Only call draggable on the new track elements
      trackElement.find('.track').draggable({ axis: "x" });
    }

    $('#track_list').on('mouseup', '.track', updateStartTime);

    function setSelectedTrack(e) {
      var index = $(e.target.parentElement).data('trackIndex');
      selectedTrack = playlist.tracks[index];
    }

    // make more descriptive
    function updateStartTime(e) {
      setSelectedTrack(e);
      var left = parseInt($(this).css("left"), 10);
      var startTime = secondize(left);
      selectedTrack.updateStartTime(startTime);

      // Would be good have the track fire an 'changed' event and have the view pickup on the event
      // which would then call track.render();
      selectedTrack.render();
    }

    $(document).on("keyup", keyUpEvent);
    $(document).on("keydown", keyDownEvent);

    function keyDownEvent(e) {
      switch (e) {
        case (e.which == SKEY):
        createSoundSelection();
        break;
      }
    }

    function keyUpEvent(e) {
      switch (e) {
        case (e.which == CKEY):
        cropSelection();
        break;
      }
    }
   
    function createSoundSelection() {
      $('.track').draggable('disable');
      $('#track_list').on("mousedown", ".track", startSoundSelection);
      enableDragging();
    }

    // change this method's name
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

  //   function cropSelection() {
  //     // this will go away when selectedTrack is a track, not an index
  //     var selection = Math.abs(selectEnd - selectStart);
  //     var offset = secondize(Math.min(selectStart, selectEnd));
  //     var startTime += secondize(Math.min(selectStart, selectEnd));
  //     var playTime = secondize(selection);

  //     selectedTrack.cropPlayback( offset, startTime, playTime);
  //     // this also can be removed after you start firing events for track changes
  //     selectedTrack.render();
  //   }
  }
});
