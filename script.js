const video = document.getElementById("video-player");
const progressBar = document.getElementById("custom-progress-bar");
const progress = document.getElementById("progress");
const markers = document.getElementsByClassName("marker");

// Position the markers based on their timestamp
for (let marker of markers) {
  const timestamp = parseFloat(marker.getAttribute("data-timestamp"));
  const percentage = (timestamp / video.duration) * 100;
  marker.style.left = percentage + "%";
}

// Update progress bar while the video is playing
video.addEventListener("timeupdate", function () {
    const percentage = (video.currentTime / video.duration) * 100;
    progress.style.width = percentage + "%";
});

// Update video's currentTime when the progress bar is clicked
progressBar.addEventListener("click", function (event) {
  const offsetX = event.clientX - progressBar.getBoundingClientRect().left;
  const percentage = (offsetX / progressBar.clientWidth) * 100;
  video.currentTime = (percentage * video.duration) / 100;
});
video.addEventListener("loadedmetadata", function () {
  // Add the marker positioning code here
});
