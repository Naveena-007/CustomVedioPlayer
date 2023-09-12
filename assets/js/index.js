/* Get Our Elements */
const player = document.querySelector(".player"); // all the div that cover video
const video = player.querySelector(".viewer"); // it refers to video
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle"); // pause play button is indigates to toggle
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// if call this function  means only that video will are else it will not run
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// toggle button works respectively when call this function
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚"; // if else for the icon
  console.log(icon);
  toggle.textContent = icon; // by this text of icon can change
}

// skip which means skipt the video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// mouse the range of the video and speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// it handle the time of the video
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// clicking the range of the video at sadden part of the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay); // when click the video at that time the video will run
video.addEventListener("play", updateButton); // play means "❚ ❚" this is used
video.addEventListener("pause", updateButton); // pause means "►" this is used
skipButtons.forEach((button) => button.addEventListener("click", skip)); // when click that skip button then it will skip
video.addEventListener("timeupdate", handleProgress); // after handle the time it will update
toggle.addEventListener("click", togglePlay); // pause button click means this function works
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
let mousedown = false; // range works as a respectively
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
