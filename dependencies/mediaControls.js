var backward = document.getElementById('backward');
var play = document.getElementById('play');
var forward = document.getElementById('forward');
var volDown = document.getElementById('volDown');
var volUp = document.getElementById('volUp');
var volRange = document.getElementById('volRange');

//Event Listeners

backward.addEventListener('click', () => {
    alert('Not Supported');
})
play.addEventListener('click', () => {
    musicPlayer.play();
    alert('this works');
})
forward.addEventListener('click', () => {
    alert('not Supported');
})
volDown.addEventListener('click', () => {
    musicPlayer.volume -= 0.02;
})
volUp.addEventListener('click', () => {
    musicPlayer.volume += 0.02;
})
