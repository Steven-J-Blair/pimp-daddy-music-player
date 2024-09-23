// Set your YouTube video ID here
const YOUTUBE_VIDEO_ID = 'tJkz2NxEtvgfXGPz'; // Replace with your desired video ID

let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-container', {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
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
        updatePlayPauseButton();
    }
}

function togglePlayPause() {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    const playPauseButton = document.getElementById('play-pause');
    if (isPlaying) {
        playPauseButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;
    } else {
        playPauseButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;
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