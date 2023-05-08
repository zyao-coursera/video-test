const video = document.getElementById("my-video");
const highlightedTimestamp = document.getElementById("highlighted-timestamp");
const timestampToHighlight = 60; // Set the timestamp in seconds you want to highlight

document.body.style.position = "relative"; // The absolute positioned highlight will be positioned with respect to the body.

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progressPercentage = (currentTime / duration) * 100;

  const highlightPosition = (timestampToHighlight / duration) * 100;
  highlightedTimestamp.style.left = `calc(${highlightPosition}% - 1px)`; // Offset by half the highlight width.

  if (currentTime >= timestampToHighlight) {
    highlightedTimestamp.style.backgroundColor = "#f00";
  } else {
    highlightedTimestamp.style.backgroundColor = "#0f0";
  }
});

video.addEventListener("loadedmetadata", () => {
  const videoRect = video.getBoundingClientRect(); 
  const progressBarRect = videoRect.y + videoRect.height - 5; // Adjust 5 pixels from bottom
  highlightedTimestamp.style.top = `${progressBarRect}px`; 
});
