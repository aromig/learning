export async function populateVideo(videoEl) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
    videoEl.srcObject = stream;
    await videoEl.play();
  }

  export async function drawToCanvas(video, canvas, filter) {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    // Check if a filter was passed in
    if (filter) {
      // grab the pixesl from the canvas
      let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // filter those pixels
      pixels = filter(pixels);
      // put them back into the canvas
      ctx.putImageData(pixels, 0, 0);
    }
    
  }