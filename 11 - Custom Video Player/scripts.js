// 1. Get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const controls = player.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const playerSlider = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

console.log(player);
console.log(video);
console.log(controls);
console.log(progress);
console.log(progressFilled);
console.log(toggle);
console.log(playerSlider);
console.log(skipButtons);

// 2. Build functions

function togglePlay() {
    // call .play or .pause on the video -> pause is a prop on the video, not play
    // if(video.paused) {
    //     console.log('ayo')
    //     video.play();
    // } else {
    //     video.pause();
    // }

    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// togglePlay()

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log(icon)
    console.log('Update play button')
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}

function slide() {
    video[this.name] = this.value;
    console.log(this.value);
    console.log(this.name);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

function glide(e) {
    console.log(e);
    const glideTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = glideTime;
}

// 3. Hook up to event listeners

video.addEventListener('click', togglePlay);
// listen to the video wherever it is paused and update from there
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
playerSlider.forEach(slider => slider.addEventListener('change', slide));
playerSlider.forEach(slider => slider.addEventListener('mousemove', slide));

let mousedown = false
progress.addEventListener('click', glide);
progress.addEventListener('mousemove', (e) => mousedown && glide(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

