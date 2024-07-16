document.addEventListener("visibilitychange", () => {
    let video = document.querySelector("video");
    if (document.hidden) {
      if (!video.paused) {
        video.pause();
      }
    } else {
      if (video.paused) {
        video.play();
      }
    }
  });
  