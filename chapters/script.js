const customProgressbar = document.getElementById("custom-progressbar");
const video = document.getElementById("my-video");
const chaptersWrapper = document.getElementById("chapters-wrapper");
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
  const progressBarRect = `${video.clientWidth}px`;
  const clickPosition = event.clientX - progressBarRect.left;
  const progressBarWidth = `${video.clientWidth}px`;
  const clickPercentage = clickPosition / progressBarWidth;
  const newTime = video.duration * clickPercentage;

  video.currentTime = newTime;
});

const chapters = [
  { title: "Introduction", start: 0 },
  { title: "Section 1", start: 60 },
  { title: "Section 2", start: 120 },
  { title: "Section 3", start: 180 },
  { title: "Conclusion", start: 240 }
];

function createChapters() {
  const duration = video.duration;

  chapters.forEach((chapter) => {
    const chapterEl = document.createElement("div");
    chapterEl.textContent = chapter.title;
    chapterEl.classList.add("video-chapter");

    const chapterPosition = (chapter.start / duration) * 100;
    chapterEl.style.left = `calc(${chapterPosition}% - ${chapterPosition * 0.5}px)`; // Offset by half of the percentage for better alignment

    chapterEl.addEventListener("click", (event) => {
      event.stopPropagation();
      video.currentTime = chapter.start;
    });

    chaptersWrapper.appendChild(chapterEl);
  });
}

video.addEventListener("loadedmetadata", () => {
  createChapters();
});
