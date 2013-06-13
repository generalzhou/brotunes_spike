var Track = function(name, length) {
    this.name = name;
    this.length = length;
    this.start= 0;
    this.stop = this.start + this.length;
}

Track.prototype = {
  update: function(start) {
    this.start = start;
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
    var track = new Track(name, 250);
    $('#track_list').append('<li class="track_line"><div class="track"></div></li>');
    $('.track').draggable( { containment: "parent" });
    $('#track_list').on("click", ".track", function(e) {
      var parentOffset = $(this).offset();
      var relX = e.pageX - parentOffset.left;
      track.shorten(relX);
      $(this).css("width", track.length + "px");
    });

    $('li').mouseup( function() {
      var start = parseInt($(this).find('.track').css("left"),10);
      track.update(start);
    });
  });
});


