export async function populateVideo(videoEl) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
    videoEl.srcObject = stream;
    await videoEl.play();
  }

  export async function drawToCanvas(video, canvas, filter) {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
  }