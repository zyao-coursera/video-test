const video = document.getElementById("my-video");
const customSeekbar = document.getElementById("custom-seekbar");
const highlightedTimestamp = document.getElementById("highlighted-timestamp");
const timestampToHighlight = 60; // Set the timestamp in seconds you want to highlight

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progressPercentage = (currentTime / duration) * 100;
  
  customSeekbar.style.width = progressPercentage + "%";
  
  const highlightPosition = (timestampToHighlight / duration) * 100;
  highlightedTimestamp.style.left = highlightPosition + "%";

  if (currentTime >= timestampToHighlight) {
    highlightedTimestamp.style.backgroundColor = "#f00";
  } else {
    highlightedTimestamp.style.backgroundColor = "#0f0";
  }
});

// Update the video timestamp when clicking on the custom progress bar
document.getElementById("custom-progressbar").addEventListener("click", (event) => {
  const progressBarRect = event.currentTarget.getBoundingClientRect();
  const clickPosition = event.clientX - progressBarRect.left;
  const progressBarWidth = progressBarRect.width;
  const clickPercentage = clickPosition / progressBarWidth;
  const newTime = video.duration * clickPercentage;
  
  video.currentTime = newTime;
});
