document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('audio-element');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');

    // Set the audio source (replace with your actual audio file URL)
    audioElement.src = 'WP Samples.mp3/Dragon Lore-WP Sample.mp3';

    playPauseButton.addEventListener('click', togglePlayPause);
    progressBar.addEventListener('input', seekTo);
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateDuration);

    function togglePlayPause() {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.innerHTML = 'Pause';
        } else {
            audioElement.pause();
            playPauseButton.innerHTML = 'Play';
        }
    }

    function updateProgress() {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = progress;
        currentTimeSpan.textContent = formatTime(audioElement.currentTime);
    }

    function updateDuration() {
        durationSpan.textContent = formatTime(audioElement.duration);
    }

    function seekTo() {
        const seekTime = (progressBar.value / 100) * audioElement.duration;
        audioElement.currentTime = seekTime;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
});\