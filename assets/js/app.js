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
const errorText = $.querySelector('small');
const spinnerContainer = $.getElementById('spinner-container')

const setFadeIn = () => {
    motherImg.classList.add('fade-in');
    setTimeout(() => {
        textImg.classList.add('fade-in');
    }, 1000);
}

const setMusic = () => {
    music.play();
}

const showSpinner = () => {
    spinnerContainer.style.display = 'flex';
}

const showContainer = () => {
        errorText.classList.remove('display-inline');
        modal.classList.add('display-none');
        graficContainer.style.filter = 'none';
        $.body.classList.add('height-110')
        setFadeIn();
        setMusic();
        resetInputs();
        showSpinner();
}

const loginError = () => {
    errorText.classList.add('display-inline');
    setTimeout(() => {
        errorText.classList.remove('display-inline');
    }, 3000)
}

const resetInputs = () => {
    phoneInput.value = '';
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

musicBtn.addEventListener('click', () => {
    changeMusicStatus();
})

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    // getData();
})

