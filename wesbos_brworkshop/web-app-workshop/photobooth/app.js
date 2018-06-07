import { populateVideo, drawToCanvas } from './src/video';
import { takePhoto, countdown } from './src/photo';

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

  let interval;

  const draw = () => {
    drawToCanvas(videoEl, canvasEl);
    interval = window.requestAnimationFrame(draw);
  }
  interval = window.requestAnimationFrame(draw);

  canvasEl.addEventListener('click', () => {
    takePhoto(videoEl, canvasEl, strip);
  });

  countdownButton.addEventListener('click', () => {
    countdown(videoEl, canvasEl, strip);
  });



  filterButtons.forEach(button => {
    button.addEventListener('click', async function() {
      cancelAnimationFrame(interval);
      // lazy load the filters
      const filters = await import('./src/filters');
      const draw = () => {
        drawToCanvas(videoEl, canvasEl, filters[this.dataset.filter]);
        interval = window.requestAnimationFrame(draw);
      }
      interval = window.requestAnimationFrame(draw);    
    });
  });


  
}

// call that function on page load
go();

// this is just a little bit of code that makes our tooling reload the page if and then the modules are updated. For development only
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register('./service-worker.js', {
      scope: '/',
    });
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // TODO: listen for updates
    registration.onupdatefound = () => {
      alert('Hey, there is an update to this app! Just refresh your browser to see');
    };
  });
}
