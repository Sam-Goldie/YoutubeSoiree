const socket = io('http://localhost:3000/');

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[1];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady(url = 'sutxc3yGWEU') {
  player = new YT.Player('video-player', {
    height: '100%',
    width: '100%',
    videoId: url,
    playerVars: {
      'autoplay': 1,
      'controls': 1,
      'fs' : 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

const videoContainer = document.getElementById('video-container');
function resizeVideoContainer() {
  console.log('resizing now!');
  videoContainer.style.setProperty('width', window.innerWidth.toString());
  videoContainer.style.setProperty('height', window.innerHeight.toString());
}

function onPlayerReady(event) {
  event.target.playVideo();
  document.getElementById('fullscreen-toggle').addEventListener('click', function() {
    if (!document.fullscreenElement) {
      document.getElementById('video-container').requestFullscreen().then(function(err) {
        if (err) {
          throw err;
        }
        resizeVideoContainer();
      }).catch(function(err) {
        console.log(err);
      })
    } else {
      document.exitFullscreen().then(function(err) {
        if (err) {
          throw err;
        }
        resizeVideoContainer();
      }).catch(function(err) {
        console.log(err);
      })
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    socket.emit('play', player.getCurrentTime());
  } else if (event.data === YT.PlayerState.PAUSED) {
    socket.emit('pause', player.getCurrentTime());
  }
}