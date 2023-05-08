const video = document.getElementById("video-player");
const progressBar = document.getElementById("custom-progress-bar");
const progress = document.getElementById("progress");

// Update progress bar while the video is playing
video.addEventListener("timeupdate", function () {
    const percentage = (video.currentTime / video.duration) * 100;
    progress.style.width = percentage + "%";
});
