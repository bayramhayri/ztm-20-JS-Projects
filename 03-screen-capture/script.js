const videoEl = document.getElementById('video');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');

function dumpOptionsInfo() {
  const videoTrack = videoEl.srcObject.getVideoTracks()[0];

  console.info('Track settings:');
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info('Track constraints:');
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

// Prompt to select media stream, pass to video element, then play
async function startCapture() {
  try {
    videoEl.srcObject = await navigator.mediaDevices.getDisplayMedia();
    dumpOptionsInfo();
  } catch (err) {
    // Catch errors
    console.error('Error: ' + err);
  }
}

function stopCapture(e) {
  let tracks = videoEl.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoEl.srcObject = null;
}

// Set event listeners for the start and stop buttons
btnStart.addEventListener('click', (e) => startCapture());
btnStop.addEventListener('click', (e) => stopCapture());
