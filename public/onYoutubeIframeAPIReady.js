const socket = io('http://localhost:3000');

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[1];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-player', {
    // why am i hardcapped on iframe dimensions?
    height: '100%',
    width: '100%',
    videoId: 'M7lc1UVf-VE',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
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
  }
}

// console.log('im in the oniframeapiready file!');

// function stopVideo() {
//   player.stopVideo();
// }

// ====== MY CODE ABOVE ^^^ ========
