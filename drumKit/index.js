'use strict';

const sounds = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav',
}

const createDiv = (text) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = text;
    div.id = text;
    document.getElementById('container').appendChild(div);
}

const showSounds = (sounds) => {
    Object.keys(sounds).forEach(createDiv)
}

const playSound = (word) => {
    const audio = new Audio(`./sounds/${sounds[word]}`);
    audio.play();
}

const addEffect = (word) => document.getElementById(word)
                                    .classList.add('active');

const removeEffect = (word) => {
    const div = document.getElementById(word);
    const removeAtive = () => div.classList.remove('active');
    div.addEventListener('transitionend', removeAtive)
}            

const activateDiv = (event) => {

    const word = event.type == 'click' ? event.target.id : event.key.toUpperCase();

    const wordPermission = sounds.hasOwnProperty(word);
    if (wordPermission) {
        addEffect(word);
        playSound(word);
        removeEffect(word)
    }
}

showSounds(sounds);

document.getElementById('container')
        .addEventListener('click', activateDiv)

window.addEventListener('keydown', activateDiv)