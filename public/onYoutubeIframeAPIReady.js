const socket = io('http://localhost:3000');

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[1];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady(videoId = 'WvUmb98EZps') {
  console.log('onYoutubeIframe activated!');
  player = new YT.Player('video-player', {
    // why am i hardcapped on iframe dimensions?
    height: '100%',
    width: '100%',
    videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  // player.src = `http://www.youtube.com/embed/${url}`;
}

function onPlayerReady(event) {
  event.target.playVideo();
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
      Array.from(videoPlayer.getElementsByClassName('ytp-videowall-still ytp-suggestion-set')).forEach((suggestion) => {
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
