const video = document.getElementById("my-video");
const customProgressbarWrapper = document.getElementById("custom-progressbar-wrapper");
const customProgressbar = document.getElementById("custom-progressbar");
const highlightedTimestamp = document.getElementById("highlighted-timestamp");
const timestampToHighlight = 60; // Set the timestamp in seconds you want to highlight

// Function to position and set the width of the custom progress bar wrapper
function setProgressBarWrapperSize() {
  const videoRect = video.getBoundingClientRect();
  const progressBarTop = videoRect.y + videoRect.height - 5; // Adjust 5 pixels from bottom
  customProgressbarWrapper.style.top = `${progressBarTop}px`;
  customProgressbarWrapper.style.width = `${videoRect.width}px`; // Set the width of the wrapper to match the video
}

// Position the custom progress bar wrapper
video.addEventListener("loadedmetadata", setProgressBarWrapperSize);
window.addEventListener("resize", setProgressBarWrapperSize);

// Handle video time updates
video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progressPercentage = (currentTime / duration) * 100;

  // Update custom progress bar width
  customProgressbar.style.width = progressPercentage + "%";

  const highlightPosition = (timestampToHighlight / duration) * 100;
  highlightedTimestamp.style.left = highlightPosition + "%";

  if (currentTime >= timestampToHighlight) {
    highlightedTimestamp.style.backgroundColor = "#f00";
  } else {
    highlightedTimestamp.style.backgroundColor = "#0f0";
  }
});

// Enable seeking in the custom progress bar
customProgressbarWrapper.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event from reaching the video element.

  const wrapperRect = customProgressbarWrapper.getBoundingClientRect();
  const clickedPosition = event.clientX - wrapperRect.left;
  const clickedPercentage = clickedPosition / wrapperRect.width;
  const newTime = video.duration * clickedPercentage;

  video.currentTime = newTime;
});

// Prevent the video from pausing when clicking on the custom progress bar
document.getElementById("my-video").addEventListener("click", event => {
  event.preventDefault(); // Prevent the click event from pausing the video
