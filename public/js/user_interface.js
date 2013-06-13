var TrackUi = function(name, length) {
    this.name = name;
    this.length = length;
    this.start= 0;
    this.stop = this.start + this.length;
}

TrackUi.prototype = {
  update: function(start, length) {
    this.start = start;
    this.length = length;
    this.stop = this.start + this.length;
  },
  shorten: function(position) {
    this.length = position;
    this.stop = this.start + this.length;
  }
}

$(document).ready(function() {

  $('#add_track').click( function() {
    var count = $('#track_list li').size();
    var name = "track_" + count;
    var track = new TrackUi(name, 250);
    $('#track_list').append('<li class="track_line"><div class="track"></div></li>');

    $('#track_list').on("mousedown", ".track", function(e){
      var parentOffset = $(this).offset();
      var selectStart = e.pageX - parentOffset.left;
      $(this).mouseup(function(e2){
        var parentOffset = $(this).offset();
        var selectEnd = e2.pageX - parentOffset.left;
        var selection = selectEnd - selectStart;
        track.update(selectStart, selection);
        $(this).css("width", track.length + "px");
        $(this).css("left", track.start + "px");
      });
    });
  });
});


