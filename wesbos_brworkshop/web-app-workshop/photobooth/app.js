import { populateVideo, drawToCanvas } from "./src/video";

// lets go!
async function go() {
  const videoEl = document.querySelector('video');
  const canvasEl = document.querySelector('canvas');
  const strip = document.querySelector('.strip');
  const filterButtons = document.querySelectorAll('button.filter');
  const countdownButton = document.querySelector('.count');

  if (!videoEl) throw Error('No Video Element Found on the page');

  // get stream from webcam
  await populateVideo(videoEl);

  canvasEl.height = videoEl.videoHeight;
  canvasEl.width = videoEl.videoWidth;

  // start to draw the video
  let interval = setInterval(() => {
    drawToCanvas(videoEl, canvasEl);
  }, 16);
}

// call that function on page load
go();

// this is just a little bit of code that makes our tooling reload the page if and then the modules are updated. For development only
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
