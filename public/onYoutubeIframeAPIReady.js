let player;

const togglePlayback = (event) => {
  if (event.data === YT.PlayerState.playing) {
    document.getElementById('playButton').innerHTML = 'Pause';
    document.getElementById('playButton').onclick = () => {
      player.pauseVideo();
    };
  } else if (event.data === YT.PlayerState.paused) {
    document.getElementById('playButton').innerHTML = 'Play';
    document.getElementById('playButton').onclick = () => {
      player.playVideo();
    };
  }
};

console.log('im in the oniframeapiready file!');

const onYoutubeIframeAPIReady = () => {
  console.log('Youtube Iframe is ready!');
  player = new YT.Player('video-player', {
    width: '560',
    height: '315',
    videoId: 'IY9YNF5MMQo',
    events: {
      onStateChange: togglePlayback,
    },
  });
};

module.exports = onYoutubeIframeAPIReady;
