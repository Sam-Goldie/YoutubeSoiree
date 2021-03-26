// all the socket stuff in here can go later - just look up socket.io again

const socket = io('http://localhost:3000');

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[1];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
<<<<<<< HEAD:public/onYoutubeIframeAPIReady.js
function onYouTubeIframeAPIReady(url = 'M7lc1UVf-VE') {
=======
function onYouTubeIframeAPIReady(videoId = 'WvUmb98EZps') {
>>>>>>> 8dcb348aadd99852a874c62a4a1a3a188212d495:dist/onYoutubeIframeAPIReady.js
  console.log('onYoutubeIframe activated!');
  player = new YT.Player('video-player', {
    // why am i hardcapped on iframe dimensions?
    height: '100%',
    width: '100%',
<<<<<<< HEAD:public/onYoutubeIframeAPIReady.js
    videoId: url,
    playerVars: {
      'autoplay': 1,
      'controls': 1,
      'fs' : 0,
    },
=======
    videoId,
>>>>>>> 8dcb348aadd99852a874c62a4a1a3a188212d495:dist/onYoutubeIframeAPIReady.js
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  // player.src = `http://www.youtube.com/embed/${url}`;
}

function onPlayerReady(event) {
  event.target.playVideo();
  console.log(player);
  document.getElementById('fullscreen-toggle').addEventListener('click', function() {
    if (!document.fullscreenElement) {
      document.getElementById('video-container').requestFullscreen().catch(function(err) {
        if (err) {
          console.log(err);
        }
      })
    } else {
      document.exitFullscreen();
    }
  });
  const originalButton = event.target.getElementsByClassName('ytp-fullscreen-button ytp-button')[0];
  const fullscreenButton = originalButton.cloneNode(true);
  originalButton.parentNode.replaceChild(fullscreenButton, originalButton);
  fullscreenButton.addEventListener('click', function() {
    if (!document.fullscreenElement) {
      document.getElementById('video-container').requestFullscreen().catch(function(err) {
        if (err) {
          console.log(err);
        }
      })
    } else {
      document.exitFullscreen();
    }
  });
}

function onPlayerStateChange(event) {
  console.log(`heres the event: ${JSON.stringify(event)}`);
  console.log('onPlayerStateChange just fired!');
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }
  // for some reason, neither of these two are actually happening
  if (event.data === YT.PlayerState.PLAYING) {
    // document.getElementById('ytp-play-button ytp-button').innerHTML = 'Pause';
    console.log('player now playing');
    socket.emit('play', player.getCurrentTime());
    // document.getElementById('ytp-play-button ytp-button').onclick = () => {
    //   player.pauseVideo();
    // };
  } else if (event.data === YT.PlayerState.PAUSED) {
    console.log('player now paused');
    socket.emit('pause', player.getCurrentTime());
    // document.getElementById('ytp-play-button ytp-button').innerHTML = 'Play';
    // document.getElementById('ytp-play-button ytp-button').onclick = () => {
    //   player.playVideo();
    // };
  } else if (event.data === YT.PlayerState.ENDED) {
    console.log('reached the end!');
    const videoPlayer = document.getElementById('video-player');
    // this needs to somehow wait until the requests come back for the end screen links -- how do I know when that happens?
    setTimeout(() => {
      console.log('about to get elements by class name');
      Array.from(videoPlayer.contentDocument.getElementsByClassName('ytp-videowall-still ytp-suggestion-set')).forEach((suggestion) => {
        console.log('heres a suggestion!');
        suggestion.onclick((e) => {
          player.loadVideoById(e.target.href);
        });
      });
    }, 2000);
  }
}

// console.log('im in the oniframeapiready file!');

// function stopVideo() {
//   player.stopVideo();
// }

// ====== MY CODE ABOVE ^^^ ========
