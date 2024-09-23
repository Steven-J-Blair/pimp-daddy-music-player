let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    const loadButton = document.getElementById('load-button');
    loadButton.addEventListener('click', loadAudio);
}

function loadAudio() {
    const url = document.getElementById('youtube-url').value;
    const videoId = extractVideoId(url);
    
    if (videoId) {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        alert('Invalid YouTube URL');
    }
}

function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function onPlayerReady(event) {
    document.getElementById('player').classList.remove('hidden');
    document.getElementById('title').textContent = player.getVideoData().title;
    updateDuration();
    
    const playPauseButton = document.getElementById('play-pause');
    playPauseButton.addEventListener('click', togglePlayPause);
    
    const progressBar = document.getElementById('progress');
    progressBar.addEventListener('input', seekTo);
    
    setInterval(updateProgress, 1000);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        document.getElementById('play-pause').textContent = 'Play';
    }
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
        isPlaying = false;
        document.getElementById('play-pause').textContent = 'Play';
    } else {
        player.playVideo();
        isPlaying = true;
        document.getElementById('play-pause').textContent = 'Pause';
    }
}

function updateProgress() {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progress = (currentTime / duration) * 100;
    document.getElementById('progress').value = progress;
    document.getElementById('current-time').textContent = formatTime(currentTime);
}

function updateDuration() {
    const duration = player.getDuration();
    document.getElementById('duration').textContent = formatTime(duration);
}

function seekTo() {
    const progress = document.getElementById('progress').value;
    const duration = player.getDuration();
    const seekTime = (progress / 100) * duration;
    player.seekTo(seekTime, true);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}