var backward = document.getElementById('backward');
var toggle = document.getElementById('toggle');
var mediaControls = document.getElementById('mediaControls');
var forward = document.getElementById('forward');
var volDown = document.getElementById('volDown');
var volUp = document.getElementById('volUp');
var volRange = document.getElementById('volRange');
var fontAwesome;

volRange.value = musicPlayer.volume;
console.log("Initial Volume : " + musicPlayer.volume);

//Event Listeners

backward.addEventListener('click', () => {
    alert('Not Supported');
})
toggle.addEventListener('click', () => {
    musicPlayer.play();
    mediaControls.removeChild(toggle);
    toggle = document.createElement('a');
        toggle.href = "#";
        toggle.id = 'toggle';
    fontAwesome = document.createElement('i')
        fontAwesome.className = 'fa fa-pause';
    toggle.appendChild(fontAwesome);
    mediaControls.appendChild(toggle);
    console.log('Current Volume: ' + musicPlayer.volume);
    console.log('Toggle Complete');
})
forward.addEventListener('click', () => {
    alert('not Supported');
})
volDown.addEventListener('click', () => {
    musicPlayer.volume -= 0.02;
    volRange.value = musicPlayer.volume;
    console.log('Button Pressed. New Vol: ' + musicPlayer.volume);
})
volUp.addEventListener('click', () => {
    musicPlayer.volume += 0.02;
    volRange.value = musicPlayer.volume;
    console.log('Button Pressed. New Vol: ' + musicPlayer.volume);
});

function updateVolume() {
    musicPlayer.volume = volRange.value;
    console.log('Slider Moved. New Vol: ' + musicPlayer.volume);
}