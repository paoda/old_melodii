var backward = document.getElementById('backward');
var play = document.getElementById('play');
var forward = document.getElementById('forward');

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