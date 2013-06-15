var playlist = new TrackList();

function pixelize(seconds){
  return seconds / playlist.longestDuration * 700;
}

function secondize(pixels){
  return pixels / 700 * playlist.longestDuration;
}
$(document).ready(function() {

  function UserInterface() {
    var CKEY = 67;
    var SKEY = 83;
    var selectStart;
    var selectEnd;
    var context = new webkitAudioContext();
    var selectedTrack;

    $(document).on("keyup", keyUpEvent);
    $(document).on("keydown", keyDownEvent);
    $('#track_list').on('mouseup', '.track', updateDelay);
    $('#add_track').click( addTrack );
    $('#play_all').click( playAll );

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

    function addTrack() {
      var url = 'james_bond.wav';
      var track = new Track({url:url, context:context});
      var trackView = new TrackView(track);
      playlist.addTrack(track);
    }

    function playAll() {
      playlist.playAllAt(0);
    }

    function setSelectedTrack(e) {
      var index = $(e.target.parentElement).data('index');
      selectedTrack = playlist.tracks[index];
    }

    function updateDelay(e) {
      setSelectedTrack(e);
      var left = parseInt($(this).css("left"), 10);
      var delay = secondize(left);
      selectedTrack.setDelay(delay);
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
      console.log('current offset = ' + selectedTrack.offset + ' , current delay = ' + selectedTrack.delay)
      selectedTrack.setOffset(selectedTrack.offset + secondize(Math.min(selectStart, selectEnd)));
      selectedTrack.setDelay(selectedTrack.delay + secondize(Math.min(selectStart, selectEnd)));
      console.log('new offset = ' + selectedTrack.offset + ' , new delay = ' + selectedTrack.delay)

      selectedTrack.setDuration(secondize(Math.abs(selectEnd - selectStart)));
    }
  }
  UserInterface();
});
