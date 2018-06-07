import wait from 'waait';

export async function takePhoto(video, canvas, strip) {
    console.log('Taking photo');
    document.body.classList.add('taking');
    // get the image from the canvas
    const data = canvas.toDataURL('image/jpeg');
    // create an image element
    const img = document.createElement('img');
    // set the src of that image to the data
    img.src = data;
    // create a link
    const link = document.createElement('a');
    // set some attributes on that link
    link.setAttribute('download', `handsome-${Date.now()}.jpg`);
    link.setAttribute('href', data);
    link.classList.add('full');
    link.appendChild(img);
    strip.insertBefore(link, strip.firstChild);
    await wait(250);
    link.classList.remove('full');
    document.body.classList.remove('taking');
}

export async function countdown(video, canvas, strip) {
    const span = document.querySelector('.countdown');
    span.textContent = 3;
    await wait(1000);
    span.textContent = 2;
    await wait(1000);
    span.textContent = 1;
    await wait(1000);
    span.textContent = '🐧';
    await wait(500);
    span.textContent = '';
    await wait(300);
    takePhoto(video, canvas, strip);
}