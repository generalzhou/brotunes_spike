var buffers = [];

$(document).ready(function(){


  function play(track_num, start_time){
    source = context.createBufferSource();
    source.buffer = buffers[track_num];
    source.connect(context.destination);
    source.start(start_time);
  }

  $('#file_player').submit(function(e){
    e.preventDefault();
    var file1 = $(this).find('input[name=file1]').val();
    var file2 = $(this).find('input[name=file2]').val();
    var file1offset = $(this).find('input[name=file1offset]').val();
    var file2offset = $(this).find('input[name=file2offset]').val();

    var urls = [file1, file2];


    bufferLoader = new BufferLoader(context, urls, finishedLoading);
    bufferLoader.load();

    function finishedLoading(bufferList) {
      for (i in bufferList) {
        buffers.push(bufferList[i]);
      }
      alert('audio loaded!');
    }
  });

  $('#play').click(function{
    for (i in buffers) {
      play(i, 0);
    }
  });

});
