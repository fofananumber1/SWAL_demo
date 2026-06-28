const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);

const gainNode = audioContext.createGain();
const volumeControl = document.getElementById("volumeSlider");

track.connect(audioContext.destination)
track.connect(gainNode).connect(audioContext.destination);

const playPause = document.querySelector("button");

playPause.addEventListener("click", () => {
    // Check if context is suspended, if so, resume it
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    // Toggle between play and pause
    if (playPause.dataset.playing === "false") {
        audioElement.play();
        playPause.dataset.playing = "true";
    }
    else if (playPause.dataset.playing === "true") {
        audioElement.pause();
        playPause.dataset.playing = "false";
    }
});

audioElement.addEventListener("ended", () => {
    playPause.dataset.playing = "false";
});

volumeControl.addEventListener("input", () => {
    gainNode.gain.value = volumeControl.value;
});

