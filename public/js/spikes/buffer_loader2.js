// copied from https://code.google.com/p/html5rocks/source/browse/www.html5rocks.com/content/tutorials/webaudio/intro/static/js/buffer-loader.js?r=3b26076e516475bdcbab6c64e517e598be56c181
// used to simplify loading of buffers into audiocontext
// modifying this to make this synchronous

function loadMultipleSources(current_sources, urls){
  for (i in urls){
    current_sources.push(loadSource(urls[i]));
  }
  return current_sources;
}

function loadSource(url){
  source = context.createBufferSource();
  source.buffer = loadBuffer(url);
  return source;
}

function loadBuffer(url) {
  request = new XMLHttpRequest();
  request.responseType = 'arraybuffer';
  request.open('GET',url, false); //false makes this synchronous
  request.send();
  return context.createBuffer(request.response,true);
}

