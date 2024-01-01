"use strict"

const $ = document;

const motherImg = $.querySelector('.mother-title-img');
const textImg = $.querySelector('.mother-description-img');
const music = $.getElementById('music');
const musicBtn = $.getElementById('music-btn')
const pauseIcon = $.querySelector('.fa-pause');
const playIcon = $.querySelector('.fa-play');
const graficContainer = $.getElementById('grafic-container');
const modal = $.getElementById('data-modal')
const submitBtn = $.getElementById('submit-btn');
const phoneInput = $.getElementById('phone-input');
const cardInput = $.getElementById('card-input');
const errorText = $.querySelector('small');
const spinner = $.querySelector('.commonninja_component')

const setFadeIn = () => {
    motherImg.classList.add('fade-in');
    setTimeout(() => {
        textImg.classList.add('fade-in');
    }, 1000);
}

const setMusic = () => {
    music.play();
}

async function checkNumber () {
    let response = await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/users');
    let users = await response.json();
    console.log(console.log(users));
}

const showContainer = () => {
    if (phoneInput.value && cardInput.value) {
        errorText.classList.remove('display-inline');
        modal.classList.add('display-none');
        graficContainer.style.filter = 'none';
        spinner.classList.add('display-inline');
        $.body.classList.add('height-110')
        setFadeIn();
        setMusic();
        resetInputs();
    }else {
        errorText.classList.add('display-inline');
        setTimeout(() => {
            errorText.classList.remove('display-inline');
        }, 3000)
    }
}

const resetInputs = () => {
    phoneInput.value = '';
    cardInput.value = '';
}

const changeMusicStatus = () => {
    if (musicBtn.className.includes('pause')) {
        music.pause();
        musicBtn.className = 'play';
    }else {
        music.play()
        .then(res => musicBtn.className = 'pause')
        .catch(err => {
            musicBtn.className = 'play',
            console.log('error');
        })
    }
}

window.addEventListener('load', () => {
    // setFadeIn();
    // setMusic();
})

musicBtn.addEventListener('click', () => {
    changeMusicStatus();
})

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    // showContainer();
    checkNumber();
})
