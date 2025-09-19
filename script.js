import {
  animate,
} from "https://cdn.jsdelivr.net/npm/animejs/+esm";

const dekorAnimation = animate(".dekor", {
  opacity: [{ to: 0.2, ease: "inOut(3)", duration: 1500 }],
  scale: { to: 0.8, ease: "inOut(3)", duration: 1500 },
  autoplay: false,
  alternate: true,
  loop: true,
  loopDelay: 250,
});

// Select the target div
const targetDiv = document.querySelectorAll(".fade-in"); // Replace 'yourTargetDivId' with the actual ID of your div

// Define the class to add
const activeClass = "fade-in-active";
const inactiveClass = "fade-in";

window.onload = function () {
  // Get the div's position relative to the viewport
  targetDiv.forEach((element) => {
    const divPosition = element.getBoundingClientRect();

    // Check if the div is within the viewport (e.g., its top is above the bottom of the viewport and its bottom is below the top of the viewport)
    // You can adjust the offset values (e.g., -100, 100) to fine-tune when the class is added/removed
    if (divPosition.top <= window.innerHeight / 2 && divPosition.bottom >= 0) {
      // Add the class if the div is in view
      element.classList.add(activeClass);
      element.classList.remove(inactiveClass);
    }
  });
};

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
  // Get the div's position relative to the viewport
  targetDiv.forEach((element) => {
    const divPosition = element.getBoundingClientRect();

    // Check if the div is within the viewport (e.g., its top is above the bottom of the viewport and its bottom is below the top of the viewport)
    // You can adjust the offset values (e.g., -100, 100) to fine-tune when the class is added/removed
    if (
      divPosition.top <= window.innerHeight * 0.9 &&
      divPosition.bottom >= 0
    ) {
      // Add the class if the div is in view
      element.classList.add(activeClass);
      element.classList.remove(inactiveClass);
    } else if (divPosition.top > window.innerHeight) {
      // Remove the class if the div is out of view
      element.classList.remove(activeClass);
      element.classList.add(inactiveClass);
    }
  });
});

const playPauseButton = document.querySelector("#play-pause-button");
const playIcon = document.querySelector("#play-icon");
const pauseIcon = document.querySelector("#pause-icon");
const audio = document.querySelector("#soundplayer");
let isPlay = false;

const rotateMusicAnimation = animate("#music-player-icon", {
  autoplay: false,
  rotate: 360,
  duration: 10000,
  ease: "none",
  loop: true,
});

playPauseButton.addEventListener("click", () => {
  if (isPlay) {
    isPlay = false;
    pauseIcon.classList.add("d-none");
    playIcon.classList.remove("d-none");
    audio.pause();
    rotateMusicAnimation.pause();
  } else {
    isPlay = true;
    playIcon.classList.add("d-none");
    pauseIcon.classList.remove("d-none");
    audio.play();
    rotateMusicAnimation.resume();
  }
});

const bukaUndanganButton = document.querySelector("#buka-undangan");
const openingContent = document.querySelector("#opening-content");
const mainContent = document.querySelector("#main-content");
let dibuka = false;

bukaUndanganButton.addEventListener("click", () => {
  openingContent.classList.add("opening-screen-disappear");
  setTimeout(() => {
    openingContent.classList.add("d-none");
    mainContent.classList.remove("d-none");
    toggleAudio(false);
    dekorAnimation.play();
    dibuka = true;
  }, 1500);
});

function toggleAudio(pause) {
  if (!isPlay && !pause) {
    playIcon.classList.add("d-none");
    pauseIcon.classList.remove("d-none");
    audio.play();
    rotateMusicAnimation.play();
    isPlay = true;
  } else {
    pauseIcon.classList.add("d-none");
    playIcon.classList.remove("d-none");
    audio.pause();
    rotateMusicAnimation.pause();
    isPlay = false;
  }
}

document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState === "visible") {
    
  } else {
    if (dibuka) {
      // turn off if udah dibuka
      toggleAudio(true);
    }
  }
});
