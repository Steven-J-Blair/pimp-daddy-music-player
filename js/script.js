 // Set your audio file URL here (can be MP3 or MP4)
 const AUDIO_URL = 'https://youtu.be/tPDtiMKL0sQ?si=j1oNWJvm__lv9waD';

 const audioElement = document.getElementById('audio-element');
 const playPauseButton = document.getElementById('play-pause');
 const progressBar = document.getElementById('progress');
 const currentTimeSpan = document.getElementById('current-time');
 const durationSpan = document.getElementById('duration');
 const titleDiv = document.getElementById('title');

 audioElement.src = AUDIO_URL;
 titleDiv.textContent = "Your Audio Title"; // Set your audio title here

 playPauseButton.addEventListener('click', togglePlayPause);
 progressBar.addEventListener('input', seekTo);
 audioElement.addEventListener('timeupdate', updateProgress);
 audioElement.addEventListener('loadedmetadata', () => {
     durationSpan.textContent = formatTime(audioElement.duration);
 });

 function togglePlayPause() {
     if (audioElement.paused) {
         audioElement.play();
         updatePlayPauseButton(true);
     } else {
         audioElement.pause();
         updatePlayPauseButton(false);
     }
 }

 function updatePlayPauseButton(isPlaying) {
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
     const progress = (audioElement.currentTime / audioElement.duration) * 100;
     progressBar.value = progress;
     currentTimeSpan.textContent = formatTime(audioElement.currentTime);
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