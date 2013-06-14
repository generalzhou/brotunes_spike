$(document).ready(function() {

  playlist = new TrackList();
  // Review why this function needs to exist. Out of place here
  function playAll() { playlist.playAll(); }


  function UserInterface() {
    function init() {
      var context = new webkitAudioContext();

    }

  }
  // Why not create a UserInterface object/class?
  var CKEY = 67;
  var SKEY = 83;
  var selectStart;
  var selectEnd;
  // You're using this as the index at all times, but it's not named that way
  // Regardless, just save the track here, not the index.
  var selectedTrack;

  // Two different approaches to the same callback...why?
  $('#add_track').click( addTrack );
  $('#play_all').on('click', playAll);

  function addTrack() {
    // camelCase is standard in JS
    var track_index = playlist.tracks.length;
    // Pull these out into <script type="text/template"> elements on the HTML page, render using
    // underscore.js' templating library
    var trackElement = $('<li class="track_line" id="track_'+track_index+'", data-track_index="'+track_index+'"><div class="track"></div></li>');
    trackElement.hide();
    // Pull 'tony_montatna.wav' out to a variable as an attribute on the UserInterface object
    playlist.addTrack('tony_montana.wav', trackElement);

    $('#track_list').append(trackElement);
    // Only call draggable on the new track elements
    trackElement.find('.track').draggable({ axis: "x" });
  }

  $('#track_list').on('mouseup', '.track', updateStartTime);

  function updateStartTime(e) {
    selectedTrack = $(e.target.parentElement).data('track_index');
    var track = playlist.tracks[selectedTrack];
    var left = parseInt($(this).css("left"), 10);
    var startTime = secondize(left);
    track.updateStartTime(startTime);

    // Would be good have the track fire an 'changed' event and have the view pickup on the event
    // which would then call track.render();
    track.render();
  };

  $(document).on("keydown", function(e) {
    // write a descriptive method call which explains in plain english what's happening here
    if ( e.which == SKEY) {
      $('.track').draggable('disable');
      $('#track_list').on("mousedown", ".track", select);
      enableDragging();
    }
  });

  $(document).on("keyup", cropSelection);

  $(document).on("keyup", function(e) {
    if(e.code == "") {
      cropSelection(e);

    }
  });

  


  // change this method's name
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
      // this will go away when selectedTrack is a track, not an index
      track = playlist.tracks[selectedTrack];
      var selection = Math.abs(selectEnd - selectStart);
      var offset = secondize(Math.min(selectStart, selectEnd));
      var startTime += secondize(Math.min(selectStart, selectEnd));
      var playTime = secondize(selection);

      track.cropPlayback( offset, startTime, playTime);
      // this also can be removed after you start firing events for track changes
      track.render();
    }
  }
});


